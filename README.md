# Song CRUD App - Backend

## Overview

The backend of the Song CRUD App is built using Node.js and Express.js framework. It serves as the API server responsible for handling CRUD operations on the songs data stored in a MongoDB database. This backend application ensures efficient data management and communication between the frontend and the database.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A minimal and flexible Node.js web application framework for building APIs.
- **MongoDB**: A NoSQL database for storing song data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env.
- **cors**: A middleware for Express.js to enable Cross-Origin Resource Sharing (CORS).

## Installation

To set up the backend of the Song CRUD App locally, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/your/repository.git`

2. Navigate to the backend directory: `cd song_backend`

3. Install dependencies:
    ```
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `backend` directory.
    - Define the following environment variables:
        ```
        PORT=3001
        MONGODB_URI=mongodb://localhost:27017/song_crud
        ```

5. Start the backend server:
    ```
    npm start
    ```

## API Endpoints

The backend provides the following API endpoints:

- **GET /api/songs**: Get all songs.
- **GET /api/songs/:id**: Get a specific song by ID.
- **POST /api/songs**: Create a new song.
- **PUT /api/songs/:id**: Update an existing song by ID.
- **DELETE /api/songs/:id**: Delete a song by ID.

## Usage

Once the backend server is running, it will be ready to handle requests from the frontend application. You can make HTTP requests to the provided endpoints to perform CRUD operations on the songs data.

## Contributions

Contributions to the backend of the Song CRUD App are welcome! If you find any bugs, have feature requests, or want to contribute code, please feel free to open an issue or submit a pull request on GitHub.

