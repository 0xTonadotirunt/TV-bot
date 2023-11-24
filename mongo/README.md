# Express.js MongoDB API

This is a Express.js application with MongoDB integration. It provides API endpoints for handling user accounts, user data, and existence checks.

## Environment Variables (docker)

```
MONGO_URI = "mongodb://mongodb:27017/TVtele"
API_VERSION = "v1"
MONGO_ENDPOINT_URL = "http://mongo:3000"
MONGO_PORT = 3000
```

# Running the microservice without Docker

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- MongoDB
  `https://www.mongodb.com/`
- Mongod server `https://www.mongodb.com/docs/manual/reference/program/mongod/`
- npm (Node Package Manager)

## Installation

To run the isolated service,

1. Navigate to the project directory:

   ```
   cd mongo
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a .env file in the folder root and add the following:

   ```
   MONGO_URI = "mongodb://localhost:<mongodb-port>/TVtele"
   API_VERSION = "v1"
   MONGO_PORT = <mongo-endpoint-port>
   MONGO_ENDPOINT_URL = "http://localhost:<mongo-endpoint-port>"
   ```

   - replace <mongodb-port> with your mongodb port (default is 27017)
   - replace <mongo-endpoint-port> with your mongodb port (comment out to use default port of 3000)

### Usage

1. Start your MongoDB server (Mongod) .
2. Run the Express.js application:

```
npm start
```

The server will start, and you'll see a message in the console indicating that the server is listening on the specified port.

By default Access the API at
`http://localhost:3000/v1`

## API Endpoints

`/v1/accounts`: Endpoint for handling user accounts.
`/v1/user`: Endpoint for handling user data.
`/v1/exist`: Endpoint for existence checks.
