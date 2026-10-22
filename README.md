# Complete Web App

## Description

This project combines CRUD operations and user authentication using Node.js and Express.js.

Users must sign up and log in to access the protected article endpoints. JWT is used for authentication.

## Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs
- Postman

## How to Run

1. Install dependencies using `npm install`.
2. Start the server using `node app.js`.
3. Test the endpoints using Postman.

## Authentication Endpoints

- `POST /signup` - Register a user.
- `POST /login` - Log in and receive a token.
- `GET /profile` - Access protected user information.

## CRUD Endpoints

- `POST /articles` - Create an article.
- `GET /articles` - Get all articles.
- `GET /articles/1` - Get an article by ID.
- `PUT /articles/1` - Replace an article.
- `PATCH /articles/1` - Update part of an article.
- `DELETE /articles/2` - Delete an article.

## Authentication

I made sure users must sign up and log in before they can access their profile and article routes using token-based authentication. When a user logs in successfully, the server generates a JWT token. The user must include that token in requests to access protected routes. If the token is missing or invalid, the server denies access.
