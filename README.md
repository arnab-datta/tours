# Tours Application

![Tours App](https://cdn.prod.website-files.com/664d0f8b7d168b5bb6003084/674d2dac2b9fde47301013c2_full-stack-applications-nodejs-express-mongodb.png)


(https://deepwiki.com/arnab-datta/tours)

This repository contains the backend for "Tours," a fictional tour booking application. It is a RESTful API built with Node.js, Express, and MongoDB, providing a complete solution for managing tours, users, and authentication.

## Features

- **Complete Authentication:** Secure user authentication using JSON Web Tokens (JWT), including signup, login, and password management (update, forgot, reset).
- **Advanced Tour Management:** Full CRUD (Create, Read, Update, Delete) functionality for tours.
- **Powerful API Features:** Supports advanced filtering, sorting, field limiting, and pagination for tour queries.
- **Role-Based Access Control:** Differentiated user roles (user, guide, lead-guide, admin) with protected and restricted routes.
- **Security Focused:** Implements various security best practices including rate limiting, setting security HTTP headers with Helmet, data sanitization against NoSQL query injection and XSS, and preventing parameter pollution.
- **Data Aggregation:** Provides aggregated tour statistics and monthly tour plans.
- **Robust Error Handling:** Global error handling middleware that distinguishes between development and production environments for safer and more informative error responses.
- **Email Integration:** Built-in email functionality for sending password reset links using Nodemailer.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Security:** `helmet`, `express-rate-limit`, `express-mongo-sanitize`, `xss-clean`, `hpp`
- **Environment:** `dotenv` for environment variables
- **Email:** `nodemailer`
- **Other:** `morgan` for logging, `slugify` for creating URL-friendly slugs

## Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/arnab-datta/tours.git
    cd tours
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create a `config.env` file:**
    Create a `config.env` file in the root directory and add the following environment variables.

    ```env
    NODE_ENV=development
    PORT=3000
    DATABASE_LOCAL=your-database-connection-string

    JWT_SECRET=your-super-secret-jwt-key
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    # Email configuration for password reset (using Mailtrap.io is recommended for development)
    EMAIL_HOST=smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_USERNAME=your-mailtrap-username
    EMAIL_PASSWORD=your-mailtrap-password
    EMAIL_SENDER_NAME="Your Name"
    EMAIL_SENDER_MAIL="hello@example.com"
    ```

4.  **Import development data (optional):**
    The `dev-data` folder contains sample data for tours, users, and reviews. Use the following commands to import or delete this data from your local database.

    ```sh
    # Import data
    node dev-data/data/import-dev-data.js --import

    # Delete all data from collections
    node dev-data/data/import-dev-data.js --delete
    ```

5.  **Run the server:**
    ```sh
    # For development (with nodemon)
    npm start

    # For production
    npm run start:prod
    ```
    The API will be available at `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### User & Authentication Routes

| HTTP Method | Endpoint                    | Description                                        | Access       |
|-------------|-----------------------------|----------------------------------------------------|--------------|
| `POST`      | `/users/signup`             | Register a new user                                | Public       |
| `POST`      | `/users/login`              | Log in a user and receive a JWT                    | Public       |
| `POST`      | `/users/forgotPassword`     | Send a password reset token to the user's email    | Public       |
| `PATCH`     | `/users/resetPassword/:token` | Reset password using the provided token          | Public       |
| `PATCH`     | `/users/updateMyPassword`   | Update the currently logged-in user's password     | Logged-in User |
| `PATCH`     | `/users/updateMe`           | Update the currently logged-in user's data         | Logged-in User |
| `DELETE`    | `/users/deleteMe`           | Deactivate the currently logged-in user's account  | Logged-in User |
| `GET`       | `/users`                    | Get all users                                      | Admin        |

### Tour Routes

| HTTP Method | Endpoint                | Description                                                          | Access                      |
|-------------|-------------------------|----------------------------------------------------------------------|-----------------------------|
| `GET`       | `/tours`                | Get all tours (supports filtering, sorting, pagination, and fields)  | Logged-in User               |
| `POST`      | `/tours`                | Create a new tour                                                    | Admin, Lead-Guide           |
| `GET`       | `/tours/:id`            | Get a single tour by ID                                              | Logged-in User               |
| `PATCH`     | `/tours/:id`            | Update a tour                                                        | Admin, Lead-Guide           |
| `DELETE`    | `/tours/:id`            | Delete a tour                                                        | Admin, Lead-Guide           |
| `GET`       | `/tours/top-5-cheap`    | Get the top 5 cheapest tours with the best ratings                   | Logged-in User               |
| `GET`       | `/tours/tour-stats`     | Get aggregated statistics about tours (avg rating, price, etc.)      | Logged-in User               |
| `GET`       | `/tours/monthly-plan/:year`| Get a monthly plan of tours for a given year                      | Logged-in User               |

## Project Structure

The repository follows a modular structure to keep the codebase organized and maintainable.

```
.
├── app.js                  # Express application setup and middleware
├── server.js               # Server startup and DB connection
├── package.json
├── controllers/            # Route handlers (business logic)
│   ├── authController.js
│   ├── errorController.js
│   ├── tourController.js
│   └── userController.js
├── models/                 # Mongoose data models
│   ├── tourModel.js
│   └── userModel.js
├── routes/                 # Express route definitions
│   ├── tourRoutes.js
│   └── userRoutes.js
├── utils/                  # Utility classes and helper functions
│   ├── apiFeatures.js      # Class for advanced API features
│   ├── appError.js         # Custom error class
│   └── email.js            # Email sending utility
├── public/                 # Static files (HTML, CSS for a simple frontend)
└── dev-data/               # Development data and import scripts
