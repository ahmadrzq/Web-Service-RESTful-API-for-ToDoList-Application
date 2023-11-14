## **ToDoList Application API Endpoints Documentation**

This is an application that allows users to create, view, change, and delete to-do lists (ToDoList). This application was built using Express.js and MongoDB, and is equipped with authentication and authorization features to protect user data.

## **Base URL**

The base URL for the deployed API is:

[https://jolly-gray-slippers.cyclic.app/api/v1](https://jolly-gray-slippers.cyclic.app/)

## **Endpoints**

### **Authentication**

#### Register

*   **Endpoint:** **POST /auth/register**
*   **Description:** Register a new user.
*   **Request:**

```plaintext
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

*   **Response:**

```plaintext
{
  "code": 201,
  "message": "User registered successfully.",
  "userData": {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login

*   **Endpoint:** **POST /auth/login**
*   **Description:** Login with username or email.
*   **Request:**

```plaintext
{
  "usernameOrEmail": "johndoe",
  "password": "secretpassword"
}
```

*   **Response:**

```plaintext
{
  "code": 200,
  "message": "Login successful.",
  "userData": {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "your_jwt_token_here"
}
```

### **Todos**

#### Create Todo

*   **Endpoint:** **POST /todos**
*   **Description:** Create a new todo.
*   **Request:**

```plaintext
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

*   **Response:**

```plaintext
{
  "code": 201,
  "message": "Todo created successfully.",
  "data": {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "user": "user_id_here",
    "_id": "todo_id_here",
    "__v": 0
  }
}
```

#### Get All Todos

*   **Endpoint:** **GET /todos**
*   **Description:** Get all todos for the authenticated user.
*   **Response:**

```plaintext
{
  "code": 200,
  "message": "Todos retrieved successfully.",
  "data": [
    {
      "_id": "todo_id_1",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "user": "user_id_here",
      "__v": 0
    },
    {
      "_id": "todo_id_2",
      "title": "Read a book",
      "description": "Choose a novel",
      "user": "user_id_here",
      "__v": 0
    }
    // ...
  ]
}
```

#### Get Todo by ID

*   **Endpoint:** **GET /todos/:id**
*   **Description:** Get a specific todo by ID.
*   **Response:**

```plaintext
{
  "code": 200,
  "message": "Todo retrieved successfully.",
  "data": {
    "_id": "todo_id_here",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "user": "user_id_here",
    "__v": 0
  }
}
```

#### Update Todo

*   **Endpoint:** **PUT /todos/:id**
*   **Description:** Update a todo by ID.
*   **Request:**

```plaintext
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese"
}
```

*   **Response:**

```plaintext
{
  "code": 200,
  "message": "Todo updated successfully.",
  "data": {
    "_id": "todo_id_here",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
   	"user": "user_id_here",
    "__v": 0
  }
}
```

#### Delete Todo

*   **Endpoint:** **DELETE /todos/:id**
*   **Description:** Delete a todo by ID.
*   **Response:**

```plaintext
{
  "code": 200,
  "message": "Todo deleted successfully.",
  "data": {
    "_id": "todo_id_here",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
    "user": "user_id_here",
    "__v": 0
  }
}
```

#### Delete All Todos

*   **Endpoint:** **DELETE /todos**
*   **Description:** Delete all todos for the authenticated user.
*   **Response:**

```plaintext
{
  "code": 200,
  "message": "All todos deleted successfully.",
  "data": {
	"acknowledged": true,
    "deletedCount": 3
  }
}
```

## **Authentication**

*   Bearer Token authentication is used.
*   Include the token in the Authorization header for protected routes.