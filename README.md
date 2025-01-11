# Blog API
Backend for blog web app (API).

API URL: [Blog API](#) - Will be available soon.

## Description
This web API is made with Express, PostgreSQL database and Prisma ORM. API creates new users or authors, handles logging in and out, genereates and verifies json web tokens for authorization and fetches/manages posts and comments. 

## Instalation
To run this application locally, follow these steps:
1. clone the repository: `git clone https://github.com/jangmz/blog-api.git
2. install dependencies: `npm install`
3. create .env file with database credentials and other neccessary information: 
    - `PORT=5000`
    - `ACCESS_TOKEN_SECRET="secret"`
    - `REFRESH_TOKEN_SECRET="secret2"`
    - `DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[database_name]?schema=public"`
4. migrate databse: `npx prisma migrate dev`
5. start the development server: `npm run dev`

## Routes
Token is sent in the "Authorization" header ( Authorization: Bearer token_value )

### Posts
- GET http://localhost:5000/posts -> returns all articles (only route that doesn't need token)
- GET http://localhost:5000/posts/:postId -> returns specific article
- POST http://localhost:5000/posts -> creates a new article
- DELETE http://localhost:5000/posts/:postId -> deletes a post
- PUT http://localhost:5000/posts/:postId -> updates the post
- PUT http://localhost:5000/posts/publish/:postId -> changes the publish status
- PUT http://localhost:5000/posts/unpublish/:postId -> changes the unpublish status

### Comments
- POST http://localhost:5000/comments -> creates a new comment in a specific article
- DELETE http://localhost:5000/comments/:commentId -> deletes a specific comment

### Users
- POST http://localhost:5000/users/sign-up -> creates a user account
- DELETE http://localhost:5000/users/:userId -> deletes a user

### JWT
- POST http://localhost:5000/log-in -> creates a JWT (access + refresh) for user
- DELETE http://localhost:5000/log-out -> deletes JWT refresh token in DB
- POST http://localhost:5000/token -> regenerates a new access token from the refresh token


## Technologies used
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)\
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)\
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)\
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)\
![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)\
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)\
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Contact
Contact me here for any collaborations/inquiries: [LinkedIn](https://si.linkedin.com/in/jan-jankovi%C4%8D-03429b247)