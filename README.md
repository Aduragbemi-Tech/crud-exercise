# Articles CRUD API

## Project Overview
A simple REST API built with Node.js and Express.js to create, view, update, and delete articles.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- Postman
- Git and GitHub

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/articles` | Create an article |
| GET | `/articles` | Get all articles |
| GET | `/articles/1` | Get an article by ID |
| PUT | `/articles/1` | Update an article |
| PATCH | `/articles/1` | Partially update an article |
| DELETE | `/articles/1` | Delete an article |

## How to Run
1. Run `npm install`.
2. Run `node server.js`.
3. Test the endpoints using Postman.

## Note
My Articles CRUD API uses a JavaScript array to store articles. This allows me to create, view, update, and delete articles while the server is running. Howver, it does not use a database yet.
