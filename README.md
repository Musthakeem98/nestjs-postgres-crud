# NestJS PostgreSQL CRUD Operation Application

🚀 Welcome to the NestJS PostgreSQL CRUD Operation Application! This project demonstrates basic CRUD operations using NestJS and PostgreSQL.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js and npm/yarn
- PostgreSQL
- Code Editor (e.g., Visual Studio Code)
- Postman
- Git
- Nest CLI
- Docker (Optional)

## How to Run the Project

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Musthakeem98/nestjs-postgres-crud.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd nestjs-postgres-crud
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Copy the .env.example file to .env:**
   ```bash
   cp .env.example .env
   ```
5. **Edit the .env file with your database configuration:**
   ```bash
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=password
   DATABASE_NAME=curddb
   ```
6. **Start the server:**
   ```bash
   npm run start
   ```
7. **Verify server startup:**  
   Ensure no errors are displayed in the terminal. Upon successful startup, you should see a message like "Hello user, welcome" at localhost:3000.  
   🔗 Click here to view [Here](http://localhost:3000)

🎉 You have successfully set up and run the NestJS PostgreSQL CRUD Operation Application. 🚀

# Test Using Postman

In this section, we will guide you through testing all the endpoints using Postman. Make sure you have Postman installed. 🧪

1. **Ensure there is a 'postman collections' folder in the root directory** containing the file 'nestjs-postgres-crud.postman_collection.json'. 📁

2. **Import the collection into Postman:**

   ![Import into Postman](/postman-collections/ReadmeImg/Import-into-Postman.png 'Import into Postman')

   - Open Postman.
   - Click on File > Import.
   - Choose the 'nestjs-postgres-crud.postman_collection.json' file and import it.

3. **View and test the collections:**

   ![Postman Collections](/postman-collections/ReadmeImg/Postman-Collections.png 'Postman Collections')

   Now you can see all the collections like in the picture. This includes all the details in headers and bodies that need to be included. You can view them, verify, send requests, and check if they work as expected. 📋✅

4. **Detailed walkthrough of each request:**

   **User Routes**

   - **Create a User:**

     URL: POST http://localhost:3000/users
     Body:

     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password"
     }
     ```

     Creates a new user with the given name, email, and password. 🧑‍💻

   - **Get All Users:**

     URL: GET http://localhost:3000/users
     Fetches all users from the database. 📊

   - **Get a User by ID:**

     URL: GET http://localhost:3000/users/1
     Fetches a user with ID 1. 🔍

   - **Update a User:**

     URL: PUT http://localhost:3000/users/1
     Body:

     ```json
     {
       "name": "John Smith",
       "email": "john.smith@example.com",
       "password": "newpassword"
     }
     ```

     Updates the user with ID 1. 🔄

   - **Delete a User:**

     URL: DELETE http://localhost:3000/users/1
     Deletes the user with ID 1. ❌

   - **Login to Get JWT Token:**

     URL: POST http://localhost:3000/auth/login
     Body:

     ```json
     {
       "email": "john.doe@example.com",
       "password": "password"
     }
     ```

     Logs in and returns a JWT token. 🔑

     ***

   **Post Routes**

   - **Note: Add the JWT token as an environment variable and select it for each step. Follow the image guide for the path.**

   - Attempting to make a request without including the token will result in a **401 Unauthorized error**, indicating that authentication is required.

   ![Add Token](postman-collections/ReadmeImg/Add-Token.png 'Add Token')

   - Ensure that each request related to posts uses the environment variable for the authorization token. This should be done similarly to how it's shown in the image below:
     ![env](postman-collections/ReadmeImg/env-variable.png 'env')

   - **Create a Post:**

     URL: POST http://localhost:3000/posts
     Headers:

     ```
     Authorization: Bearer {{jwt_token}}
     ```

     Body:

     ```json
     {
       "title": "First Post",
       "content": "This is the content of the first post."
     }
     ```

     Creates a new post. Requires JWT token for authorization. 📝

   - **Get All Posts:**

     URL: GET http://localhost:3000/api/posts
     Headers:

     ```
     Authorization: Bearer {{jwt_token}}
     ```

     Fetches all posts. Requires JWT token for authorization. 📜

   - **Get a Post by ID:**

     URL: GET http://localhost:3000/api/posts/1
     Headers:

     ```
     Authorization: Bearer {{jwt_token}}
     ```

     Fetches a post with ID 1. Requires JWT token for authorization. 🔍

   - **Update a Post:**

     URL: PUT http://localhost:3000/api/posts/1
     Headers:

     ```
     Authorization: Bearer {{jwt_token}}
     ```

     Body:

     ```json
     {
       "title": "Updated Post",
       "content": "This is the updated content."
     }
     ```

     Updates the post with ID 1. Requires JWT token for authorization. 🔄

   - **Delete a Post:**

     URL: DELETE http://localhost:3000/api/posts/1  
     Headers:

     ```
     Authorization: Bearer {{jwt_token}}
     ```

     Deletes the post with ID 1. Requires JWT token for authorization. ❌

---

**🌟 Thank you for using the NestJS PostgreSQL CRUD Operation Application! We hope this guide helps you get started smoothly. Happy coding and feel free to contribute or reach out if you have any questions! 🙌🚀**
