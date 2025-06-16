# Car Trader App Documentation

This document provides a detailed overview of the Car Trader application, including its architecture, API endpoints, and implementation details.

## 1. User API

The User API handles user management, including retrieving, updating, and deleting user information.

### 1.1. Endpoints

#### `GET /user/:id`

- **Description:** Retrieves a single user by their ID.
- **Parameters:**
  - `id` (number): The unique identifier of the user.
- **Response:**
  - `200 OK`: Returns the user object.
  - `404 Not Found`: If the user with the specified ID does not exist.

#### `GET /user`

- **Description:** Finds a user by their email address.
- **Query Parameters:**
  - `email` (string): The email address of the user.
- **Response:**
  - `200 OK`: Returns the user object.

#### `DELETE /user/:id`

- **Description:** Deletes a user by their ID.
- **Parameters:**
  - `id` (number): The unique identifier of the user.
- **Response:**
  - `200 OK`: Returns the deleted user object.
  - `404 Not Found`: If the user with the specified ID does not exist.

#### `PATCH /user/:id`

- **Description:** Updates a user's information.
- **Parameters:**
  - `id` (number): The unique identifier of the user.
- **Request Body:**
  - `UpdateUserDto`: An object containing the fields to update.
- **Response:**
  - `200 OK`: Returns the updated user object.
  - `404 Not Found`: If the user with the specified ID does not exist.

## 2. Reports API

The Reports API is responsible for creating and managing car reports.

### 2.1. Endpoints

#### `POST /reports`

- **Description:** Creates a new car report.
- **Authentication:** Requires a valid user session (protected by `AuthGuard`).
- **Request Body:**
  - `CreateReportsDto`: An object containing the report details.
- **Response:**
  - `201 Created`: Returns the newly created report object.

## 3. API Contracts (DTOs)

This section outlines the data transfer objects (DTOs) used in the API, defining the structure of request and response bodies.

### 3.1. User DTOs

#### `UserDto`

- **Description:** Used when creating a new user.
- **Properties:**
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password.

#### `UpdateUserDto`

- **Description:** Used when updating an existing user.
- **Properties:**
  - `email` (string, optional): The user's new email address.
  - `password` (string, optional): The user's new password.

#### `ViewUserDto`

- **Description:** Used for serializing user data in responses. Excludes the `password` field for security.
- **Properties:**
  - `id` (number): The user's unique identifier.
  - `email` (string): The user's email address.

### 3.2. Report DTOs

#### `CreateReportsDto`

- **Description:** Used when creating a new car report.
- **Properties:**
  - `price` (number, required): The price of the car.
  - `make` (string, required): The make of the car.
  - `model` (string, required): The model of the car.
  - `year` (number, required): The manufacturing year of the car.
  - `mileage` (number, required): The mileage of the car.
  - `long` (number, required): The longitude of the car's location.
  - `lat` (number, required): The latitude of the car's location.

#### `ViewReportsDto`

- **Description:** Used for serializing report data in responses.
- **Properties:**
  - `price` (number): The price of the car.
  - `make` (string): The make of the car.
  - `model` (string): The model of the car.
  - `year` (number): The manufacturing year of the car.
  - `mileage` (number): The mileage of the car.
  - `long` (number): The longitude of the car's location.
  - `lat` (number): The latitude of the car's location.
  - `userId` (number): The ID of the user who created the report.

## 4. Implementation Details

This section provides an overview of the project's technical implementation, including the technologies used, code structure, and key architectural decisions.

### 4.1. Technologies Used

- **Framework:** NestJS
- **Database:** TypeORM with SQLite
- **Validation:** class-validator
- **Serialization:** class-transformer

### 4.2. Code Structure

The project is organized into the following modules:

- **`auth`:** Handles user authentication, including registration, login, and session management.
- **`users`:** Manages user data and provides CRUD operations for users.
- **`reports`:** Manages car reports, including creation and retrieval.

### 4.3. Authentication

User authentication is handled using a custom `AuthGuard`, which protects routes that require a valid user session. The `@CurrentUser()` decorator is used to inject the current user object into the request context, making it accessible to the route handlers.

### 4.4. Data Serialization

The `class-transformer` library is used to control the serialization of data in API responses. The `@Serialize()` decorator is a custom interceptor that applies a DTO to transform the response object before it is sent to the client. This is used to exclude sensitive information, such as user passwords, from the response.
