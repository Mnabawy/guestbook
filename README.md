# guestbook

Minimal full-stack MERN app with.

This project uses the following technologies:

* authentication using passport and JWT
* React and React Router for frontend
* Express and Node for the backend
* MongoDB for the database
* Redux for state management between React components

# configuration 

Make sure to add your own MONGOURI from your mLab database in config/keys.js.
~~~~
`module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};`
~~~~

# Quick Start

~~~~
`
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
`
~~~~
