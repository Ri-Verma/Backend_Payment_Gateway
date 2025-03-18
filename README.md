Payment Gateway Security Challenge

Overview:
This project involves building a secure payment gateway using Node.js. Participants will solve the error "msg": "No token, authorization denied" by implementing proper authentication and authorization mechanisms. The goal is to ensure that only authenticated users can access the payment gateway and perform transactions.

Participants will also install and use the following Node.js libraries:

1. express: For building the server.
2. body-parser: For parsing incoming request bodies.
3. dotenv: For managing environment variables.
4. uuid: For generating unique identifiers.
5. bcrypt: For hashing sensitive data like passwords.
6. sqlite3: For interacting with a SQLite database.

Problem Statement
Secure and Scalable Payment Gateway Backend


The project aims to develop the backend infrastructure for a secure and scalable payment gateway. This backend will be responsible for handling user authentication, processing payment transactions, and generating relevant reports. The system utilizes Node.js with the Express.js framework and a SQLite database for data persistence. The frontend application (details not provided) will interact with this backend API to facilitate payment-related functionalities.Currently, there is no centralized and secure backend system in place to manage the core operations of the payment gateway. This necessitates the development of a robust backend that can:

1. Securely manage user accounts
2. Process payment transactions
3. Track and retrieve payment history
4. Generate administrative reports
5. Ensure data integrity and consistency
6. Maintain a modular and well-organized codebase
7. Implement basic security measures

When making a request to the payment gateway, the following error is returned:
Your task is to:

Identify the cause of the error.
Implement a secure authentication system using JSON Web Tokens (JWT).
Ensure that only authenticated users can access the payment gateway.
Secure sensitive data (e.g., passwords) using bcrypt.
Use sqlite3 to store user information and transaction details.
Tasks to Solve the Error
Implement User Registration and Login:
Use bcrypt to hash passwords before storing them in the database.
Generate a JWT token upon successful login.
Secure Endpoints:
Ensure that the /transactions endpoint requires a valid JWT token for access.
Return the error "msg": "No token, authorization denied" if no token is provided.
Store Transactions:
Use sqlite3 to store transaction details linked to the user.
Environment Variables:
Use dotenv to manage sensitive information like the JWT secret and database configuration.

