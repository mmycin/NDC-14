# NDC14 App API Documentation

## Introduction
Welcome to the **NDC14 App API Documentation**! This guide will help you understand how to interact with the NDC14 App API. Whether you're looking to retrieve notices, manage users, or integrate with other services, this guide has got you covered.

## Base URL
All API requests should be made to the following base URL: `https://localhost:8080`.

---

## Authentication

Most endpoints require authentication via a **JWT token**. This token should be included in the **Authorization** header of your requests. Here's how you can do that:

### Example:
Authorization: Bearer *<SECRET_KEY_FROM_JWT_TOKEN>*


---

## Endpoints

### Contacts

- **`GET /api/contacts`**  
  Retrieve a list of all contacts.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    [
      { "id": 1, "name": "John Doe", "email": "john@example.com" },
      { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }
    ]
    ```

- **`POST /api/contacts`**  
  Create a new contact.
  - **Request Body**:
    ```json
    { "name": "John Doe", "email": "john@example.com" }
    ```
  - **Response**: `201 Created`
  - **Example Response**:
    ```json
    { "id": 3, "name": "John Doe", "email": "john@example.com" }
    ```

- **`GET /api/contacts/{id}`**  
  Retrieve a specific contact by ID.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
    ```

- **`PUT /api/contacts/{id}`**  
  Update a contact by ID.
  - **Request Body**:
    ```json
    { "name": "John Smith", "email": "john.smith@example.com" }
    ```
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "name": "John Smith", "email": "john.smith@example.com" }
    ```

- **`DELETE /api/contacts/{id}`**  
  Delete a specific contact by ID.
  - **Response**: `204 No Content`
  - **Example Response**:
    ```json
    {}
    ```

---

### Notices

- **`GET /api/notices`**  
  Retrieve a list of all notices.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    [
      { "id": 1, "title": "Holiday Notice", "content": "School is closed on Friday." },
      { "id": 2, "title": "Exam Schedule", "content": "Exams will start on March 15th." }
    ]
    ```

- **`POST /api/notices`**  
  Create a new notice.
  - **Request Body**:
    ```json
    { "title": "New Event", "content": "A new event is scheduled for this weekend." }
    ```
  - **Response**: `201 Created`
  - **Example Response**:
    ```json
    { "id": 3, "title": "New Event", "content": "A new event is scheduled for this weekend." }
    ```

- **`GET /api/notices/{id}`**  
  Retrieve a specific notice by ID.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "title": "Holiday Notice", "content": "School is closed on Friday." }
    ```

- **`PUT /api/notices/{id}`**  
  Update an existing notice.
  - **Request Body**:
    ```json
    { "title": "Updated Event", "content": "The event has been postponed." }
    ```
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "title": "Updated Event", "content": "The event has been postponed." }
    ```

- **`DELETE /api/notices/{id}`**  
  Delete a specific notice by ID.
  - **Response**: `204 No Content`
  - **Example Response**:
    ```json
    {}
    ```

---

### Users

- **`GET /api/users`**  
  Retrieve a list of all users.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    [
      { "id": 1, "name": "Admin User", "email": "admin@example.com" },
      { "id": 2, "name": "Regular User", "email": "user@example.com" }
    ]
    ```

- **`POST /api/users`**  
  Create a new user.
  - **Request Body**:
    ```json
    { "name": "New User", "email": "newuser@example.com", "password": "securepassword" }
    ```
  - **Response**: `201 Created`
  - **Example Response**:
    ```json
    { "id": 3, "name": "New User", "email": "newuser@example.com" }
    ```

- **`GET /api/users/{id}`**  
  Retrieve a specific user by ID.
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "name": "Admin User", "email": "admin@example.com" }
    ```

- **`PUT /api/users/{id}`**  
  Update a user by ID.
  - **Request Body**:
    ```json
    { "name": "Updated User", "email": "updateduser@example.com" }
    ```
  - **Response**: `200 OK`
  - **Example Response**:
    ```json
    { "id": 1, "name": "Updated User", "email": "updateduser@example.com" }
    ```

- **`DELETE /api/users/{id}`**  
  Delete a specific user by ID.
  - **Response**: `204 No Content`
  - **Example Response**:
    ```json
    {}
    ```

---

## Error Codes
The API can return the following error codes:

- **400 Bad Request**: Invalid request format or missing parameters.
- **401 Unauthorized**: Authentication required. Ensure the `Authorization` header is provided with a valid token.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Rate Limiting
To ensure a smooth experience for all users, the API enforces rate limits. If you exceed the allowed number of requests, you'll receive a `429 Too Many Requests` error.

---

## Versioning
The current version of the API is **v1**. Any breaking changes or updates will be communicated through the repository.

---

## Conclusion
That's a wrap! This API is designed to be simple, efficient, and easy to use. If you have any questions or need assistance, feel free to open an issue in the GitHub repository or reach out to the team.

Happy coding! 🚀
