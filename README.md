# Chat System
###### Lucas Guertjens - s5132841 - Web Programming

## Documentation

### Git
#### Organisation
The organisation of the repository aims to be clear and easy to navigate. It stores a folder called ‘my-app’ which contains all source files related to the Angular project. In addition, relevant node package manager module (NPM) files are stored, allowing the user to quickly understand NPM dependencies. Lastly, a README file is provided to give brief documentation about the project. When the repository is cloned, it can run by entering `ng serve` within the ‘my-app’ directory and `node server.js` within the ‘my-app/server’ directory.

#### Usage
Throughout the project, Git commands were frequently used to provide version control. Firstly, git clone was used to initially download the repository from GitHub onto my local machine. In addition, while updating the application, frequent usage of git add, commit and push were used to save progress and milestones. Lastly, 2 branches were created and checked out while developing specific features in the application, helping to better categorise major additions being made.

### Data Structures
The application used 2 major data structures, stored in a mongo database, for storing user and group information.

<b>Users:</b>
```mermaid
    users
      ---> username
      ---> email
      ---> pwd
      ---> status
      ---> groups
            ---> groupName
            ---> channels

```


<b>Groups:</b>

groupName
channels[]


### Angular Architecture
The Angular frontend of the project utilizes architecture such as components, models and routes. Firstly, the application has 5 different components. This includes a ‘createuser’ component, responsible for creating new users, displaying a table of all users in the system and changing the status (permissions) of users. The ‘createuser’ component is only visible to users with SuperAdmin or GroupAdmin status. In addition, the ‘dashboard’ component is responsible for allowing a user to join different groups and channels, as well as providing authorised users to invite/remove users from groups/channels and creating/deleting groups/channels. Because some key functions seemed to crossover between the ‘dashboard’ and ‘createuser’ components, the attempt at creating service was made but never fully implemented. Furthermore, a ‘login’ component is responsible for authenticating users and storing their information into session memory. When a user has logged in, they are then able to logout, clearing session memory. From this, a ‘pagenotfound’ component is also used to display a 404-error message to the user if the path they are trying to access is unrecognised. And lastly, a ‘home’ page component is used as a template for a not yet implemented home screen to the application. In addition, routes have been implemented into the application to allow the navigation between components. This is chiefly handled in the navigation bar of the application. Here, when a path is called, the route will display a user with its specific component. Nevertheless, when a wildcard path is entered, a user will be redirected to the before mentioned 404-error pagenotfound component. Lastly, the application utilises a set of modules. This includes the AppRoutingModule for routing, NgModule for dynamic interactions between the typescript and html, HttpClientModule for communication with the server, and the bootstrap module for styling.

### Node Server Architecture
The Node server backend of the project uses files and modules to provide services to the frontend. The node server backend is made up of a directory of routes for storing the API calls, a groups and users JSON file for storing data, a listen file to listen on port 3000, and a main server.js file to start the server and link its files together. In addition, the modules used by the node server include: express for simplified routing, CORS allowing connection to the angular frontend, and an export listen module for opening the server on port 3000.

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

### State Change
The server side JSON files are updated through API requests made by the client. In this process, the JSON data is parsed into an object in which it can be changed, and is then parsed back into JSON and rewrites the existing JSON file. The components of the angular front-end components are chiefly handled through the NgModule. For example, when a user attempts to login but does not enter the correct information, a flag will check if data was received from the server and if not, will use ngIf to display a login error to the user. Furthermore, because only certain users are able to see certain components (such as the create user component), user permissions are checked and will use ngIf to only display content if it is available to that status. Lastly, it was attempted to dynamically display the most current data to the user on the component (such as groups and users in system) through the get-users API which is called whenever a data changing function is made. This however seemed to not work so well in the group and channels creation section of the dashboard component, but successfully worked in displaying user information in the createuser component.
