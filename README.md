# Blog RESTful API

## Description
This repository contains a robust and structured **RESTful API** designed for a blog application. The API is built with a focus on clean architecture, modularity, and essential user security features, using **MongoDB** for data persistence.

## Key Features
- **User Authentication:** Complete signup and signin workflow.
- **Secure Access:** Utilizes tokens (e.g., JWT) for session management and authorization.
- **Email Verification:** Implements a user email verification flow.
- **Password Security:** Securely hashes passwords using `bcrypt`.
- **Validation:** Comprehensive input validation for user routes (signup/signin).

## Technology Stack
* Node.js / Express 
* MongoDB
* `bcrypt` (for password hashing)
* Token-based authentication

## Getting Started

### Prerequisites
* Node.js
* MongoDB Instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Hikmah04525/blog-restful-api.git](https://github.com/Hikmah04525/blog-restful-api.git)
    cd blog-restful-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install 
    # or yarn
    ```

3.  **Configuration:**
    Create a `.env` file to store your MongoDB connection URI, token secret, and any other necessary configuration variables.

4.  **Run the API:**
    ```bash
    npm start 
    # Use the appropriate command defined in your package.json
    ```
