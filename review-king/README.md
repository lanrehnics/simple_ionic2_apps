# Review King
## Usage
Review King allows users to upload reviews for their favorite films and rate the films on a 0-100 scale. Review King implements a mongo database, so data does persist indefinitely. 

## Installation
To locally install this app run the following commands in the root of the project. Once application is installed it will be served on `localhost:8100`. For this application to work properly you will need to install the server as well as the client.

##### Server
```
cd server
brew services start mongodb
mongo reviewking
npm install
node server.js              # begins the node server on port 8080
```

##### Client
```
cd review-king
npm install
ionic build
ionic serve                 # opens browser to port 8100 to view application
```