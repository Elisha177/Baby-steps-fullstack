# Baby Steps Application

## Overview

The Baby Steps Application is a full-stack project with separate backend and frontend components. The backend is built using Node.js and Express, while the frontend is built using React and Redux.

## Project Structure
baby-steps-app/ ├── baby-steps-backend/ │ ├── config/ │ ├── routes/ │ ├── server.js │ ├── package.json │ └── .env ├── baby-steps-frontend/ │ ├── baby-steps-ui/ │ │ ├── src/ │ │ │ ├── redux/ │ │ │ ├── components/ │ │ │ ├── App.js │ │ │ ├── index.js │ │ ├── public/ │ │ ├── package.json │ │ └── .env └── README.md


## Backend Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Navigate to the backend directory:

    ```sh
    cd baby-steps-backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the [baby-steps-backend](http://_vscodecontentref_/0) directory and add the following environment variables:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/baby-steps
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

## Frontend Setup

### Prerequisites

- Node.js

### Installation

1. Navigate to the frontend directory:

    ```sh
    cd baby-steps-frontend/baby-steps-ui
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the [baby-steps-ui](http://_vscodecontentref_/1) directory and add the following environment variables:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Start the frontend development server:

    ```sh
    npm start
    ```

## Usage

- The backend server will be running on `http://localhost:5000`.
- The frontend development server will be running on `http://localhost:3000`.

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.