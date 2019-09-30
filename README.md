# Chat System
###### Lucas Guertjens - s5132841 - Web Programming

## Documentation

### Running Tests
Run e2e tests : `ng e2e`
Unit tests: `npm run-script unit`
Integration tests: `npm run-script integration`

### Git
#### Organisation
The organisation of the repository aims to be clear and easy to navigate. It stores a folder called ‘my-app’ which contains all source files related to the Angular project. In addition, relevant node package manager module (NPM) files are stored, allowing the user to quickly understand NPM dependencies. Lastly, a README file is provided to give brief documentation about the project. When the repository is cloned, it can run by entering `ng serve` within the ‘my-app’ directory and `node server.js` within the ‘my-app/server’ directory.

#### Usage
Throughout the project, Git commands were frequently used to provide version control. Firstly, git clone was used to initially download the repository from GitHub onto my local machine. In addition, while updating the application, frequent usage of git add, commit and push were used to save progress and milestones. Lastly, 2 branches were created and checked out while developing specific features in the application, helping to better categorise major additions being made.

### Data Structures
The application used 2 major data structures, stored in a mongo database:

<b>Users</b>
```mermaid
    users:[]
      |---> username: string
      |---> email: string
      |---> pwd: string
      |---> status: string
      |---> groups:[]
              |---> groupName: string
              |---> channels[]
```


<b>Groups</b>
```mermaid
    groups:[]
      |---> groupName: string
      |---> channels[]
```

### Angular Architecture


#### Components

- CreateUser: Contains relevent functions for admins to see a list of all users, change their permissions, and create new users to the systems, and uploading user profile images.

- Dashboard: Contains relevent functions for managing the groups/channels, and for joining a channel to chat within.

- Home: A blank home page to be used in the future as a generic website home page.

- Login: Contains relevent functions for user login.

- PageNotFound: Used for displaying a 404 error message if an invalid url is loaded on the page.

#### Services

- Socket: Contains socket related functions.

### Node Server Architecture
The Node server backend of the project uses files and modules to provide services to the frontend. The node server backend is made up of a directory of routes for storing the API calls, a groups and users, a listen file to listen on port 3000, and a main server.js file to start the server and link its files together. In addition, the modules used by the node server include: express for simplified routing, CORS allowing connection to the angular frontend, and an export listen module for opening the server on port 3000.

### REST API
To divide responsibilities between client and server REST API was used. Firstly, the server manages POST and GET requests which perform functions such as adding users to groups, authenticating users, getting all users in the system, etc. From this, the observables on the client are able to send and receive data without having to access and sort through data manually.

### Server Routes
| # | Route Name | Purpose | Params | Returns |
|:-:|------------|---------|--------|---------|
| 1 | Api-add-channel | Create channel | Group name, New channel name | N/A |
| 2 | Api-add-group | Create group | New group name | N/A |
| 3 | Api-add-to-channel | Add user to channel | Username, Group name, Channel name | N/A |
| 4 | Api-add-to-group | Add user to group | Username, Group name | N/A |
| 5 | Api-add-user | Create user | New username, New email, New password, New status, Blank group | Existing flag |
| 6 | Api-delete-channel | Delete channel | Group name, Channel name | N/A |
| 7 | Api-delete-group | Delete group | Group name | N/A |
| 8 | Api-delete-user | Delete user | Username | N/A |
| 9 | Api-get-groups | Get all groups in system | N/A | All group objects |
| 10 | Api-get-users | Get all users in system | N/A | All user objects |
| 11 | Api-login | Authenticate user login | Email, Password | Customer (logged in user) object |
| 12 | Api-remove-from-channel | Remove user from channel | Username, Group name, Channel name | N/A |
| 13 | Api-remove-from-group | Remove user from group | Username, Group name | N/A |
| 14 | Api-update-status | Update user permissions/status | Username, New status | N/A |
| 15 | Api-upload-image | Uploading an image | image file | N/A |

### State Change
The server side JSON files are updated through API requests made by the client. In this process, the JSON data is parsed into an object in which it can be changed, and is then parsed back into JSON and rewrites the existing JSON file. The components of the angular front-end components are chiefly handled through the NgModule. For example, when a user attempts to login but does not enter the correct information, a flag will check if data was received from the server and if not, will use ngIf to display a login error to the user. Furthermore, because only certain users are able to see certain components (such as the create user component), user permissions are checked and will use ngIf to only display content if it is available to that status. Lastly, it was attempted to dynamically display the most current data to the user on the component (such as groups and users in system) through the get-users API which is called whenever a data changing function is made. This however seemed to not work so well in the group and channels creation section of the dashboard component, but successfully worked in displaying user information in the createuser component.
