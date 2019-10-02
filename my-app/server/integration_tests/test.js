const assert = require('assert');
const app = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Server test', () => {

    before(() => {
        console.log("Before test");
    });

    after(() => {
        console.log("After test");
    });

    //api-get-users
    describe('/getUsers', () => {
        it('should get all users', (done) => {
            chai.request(app).get('/getUsers').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    //api-get-groups
    describe('/getGroups', () => {
      it('should get all groups', (done) => {
          chai.request(app).get('/getUsers').end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
    });

    //api-add-user
    describe('/addUser', () => {
      it('should add user if non-existing', (done) => {
          chai.request(app).post('/addUser').type('form')
            .send({
              username: 'testUser',
              email: 'testUser@mail.com',
              pwd: '123',
              status: 'Regular',
              groups: [ ]
            })
              .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body, false);
                done();
            });
        });

      it('should not add user if existing', (done) => {
          chai.request(app).post('/addUser').type('form')
            .send({
              username: 'testUser',
              email: 'testUser@mail.com',
              pwd: '123',
              status: 'Regular',
              groups: [ ]
            })
              .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body, true);
                done();
            });
        });
      });

    //api-login
    describe('/login', () => {
      it('should login with valid user', (done) => {
          chai.request(app).post('/login').type('form')
            .send({'userEmail': 'testUser@mail.com', 'userPwd': 123})
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid');
                assert.equal(res.body.valid, true);
                done();
            });
        });

      it('should not login with invalid user', (done) => {
          chai.request(app).post('/login').type('form')
            .send({'userEmail': '', 'userPwd': 0})
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('valid');
                assert.equal(res.body.valid, false);
                done();
            });
        });
    });

    //api-update-status
    describe('/updateStatus', () => {
      it('should update the status of user to GroupAssis', (done) => {
        chai.request(app).post('/updateStatus').type('form')
          .send({username: 'testUser', status: 'GroupAssis'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.ok, 1);
              done();
            });
        });

      it('should update the status of user to GroupAdmin', (done) => {
        chai.request(app).post('/updateStatus').type('form')
          .send({username: 'testUser', status: 'GroupAdmin'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.ok, 1);
              done();
            });
        });

      it('should update the status of user to SuperAdmin', (done) => {
        chai.request(app).post('/updateStatus').type('form')
          .send({username: 'testUser', status: 'SuperAdmin'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.ok, 1);
              done();
            });
        });
    });

    // api-add-group
    describe('/createGroup', () => {
      it('should add group if non-existing', (done) => {
        chai.request(app).post('/createGroup').type('form')
          .send({groupName: 'testGroup', channels: []})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not add group if existing', (done) => {
        chai.request(app).post('/createGroup').type('form')
          .send({groupName: 'testGroup', channels: []})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-add-channel
    describe('/createChannel', () => {
      it('should add channel if non-existing', (done) => {
        chai.request(app).post('/createChannel').type('form')
          .send({group: "testGroup", channel: "testChannel"})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not add channel if existing', (done) => {
        chai.request(app).post('/createChannel').type('form')
          .send({group: "testGroup", channel: "testChannel"})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-add-to-group
    describe('/addToGroup', () => {
      it('should add user to group if not already memember', (done) => {
        chai.request(app).post('/addToGroup').type('form')
          .send({user: 'testUser', group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not add user to group if already member', (done) => {
        chai.request(app).post('/addToGroup').type('form')
          .send({user: 'testUser', group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-add-to-channel
    describe('/addToChannel', () => {
      it('should add user to channel if not already memember', (done) => {
        chai.request(app).post('/addToChannel').type('form')
          .send({user: 'testUser', group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not add user to channel if already member', (done) => {
        chai.request(app).post('/addToChannel').type('form')
          .send({user: 'testUser', group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-remove-from-channel
    describe('/removeFromChannel', () => {
      it('should remove user from channel if member', (done) => {
        chai.request(app).post('/removeFromChannel').type('form')
          .send({user: 'testUser', group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not remove user from channel if not member', (done) => {
        chai.request(app).post('/removeFromChannel').type('form')
          .send({user: 'testUser', group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-remove-from-group
    describe('/removeFromGroup', () => {
      it('should remove user from group if member', (done) => {
        chai.request(app).post('/removeFromGroup').type('form')
          .send({user: 'testUser', group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not remove user from group if not member', (done) => {
        chai.request(app).post('/removeFromGroup').type('form')
          .send({user: 'testUser', group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    // api-delete-channel
    describe('/deleteChannel', () => {
      it('should delete channel if existing', (done) => {
        chai.request(app).post('/deleteChannel').type('form')
          .send({group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not delete channel if dose not exist', (done) => {
        chai.request(app).post('/deleteChannel').type('form')
          .send({group: 'testGroup', channel: 'testChannel'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });


    // api-delete-group
    describe('/deleteGroup', () => {
      it('should delete group if existing', (done) => {
        chai.request(app).post('/deleteGroup').type('form')
          .send({group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, false);
              done();
            });
        });

      it('should not delete group if dose not exist', (done) => {
        chai.request(app).post('/deleteGroup').type('form')
          .send({group: 'testGroup'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body, true);
              done();
            });
        });
    });

    //api-delete-user
    describe('/deleteUser', () => {
      it('should delete an existing user', (done) => {
        chai.request(app).post('/deleteUser').type('form')
          .send({username: 'testUser'})
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.ok, 1);
              done();
            });
        });
    });
});
