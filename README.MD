# Task Management Application

This is a task management application built using the MERN (MongoDB, Express, React, Node.js) stack, with Socket.IO for real-time updates and JSON Web Tokens (JWT) for authentication.

## Features

* User authentication using JWT
* Real-time updates using Socket.IO
* Task management:
	+ Create, read, update, and delete tasks
	+ Assign tasks to users
	+ Track task status (open, in progress, completed)

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a file named `.env` in the root directory and add the following variables:
	* `MONGO_URI`: the MongoDB connection string
	* `JWT_SECRET`: the secret key used to sign JWTs
	* `PORT`: the port number to use for the server
4. Run `npm start` to start the server

## Usage

1. Open a web browser and navigate to `http://localhost:5173`
2. Register a new user or log in with an existing user
3. Create a new task or view an existing task
4. Assign tasks to users or view tasks assigned to you
5. Update task status or view task status updates in real-time

## Development

1. Run `npm run dev` to start the server in development mode
2. Open a web browser and navigate to `http://localhost:5173`
3. Make changes to the code and see the changes reflected in the browser

## Tests

1. Run `npm run test` to run the tests

## License

This project is licensed under the MIT License. See the LICENSE file for details.
