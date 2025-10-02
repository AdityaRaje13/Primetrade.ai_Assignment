# 📖 API Documentation

Base URL: `http://localhost:3000/api`

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // Optional: "user" or "admin", defaults to "user"
}
```

**Response (Success - 201):**
```json
{
  "msg": "User registered successfully",
  "User": {
    "_id": "654321abcdef",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-10-02T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "msg": "User logged in successfully",
  "user": {
    "_id": "654321abcdef",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📝 Notes CRUD Endpoints
*All endpoints require Authentication header*

### Get All Notes
```http
GET /notes/
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "notes": [
    {
      "_id": "654321abcdef",
      "title": "My First Note",
      "content": "This is the content of my note",
      "user": "654321abcdef",
      "createdAt": "2025-10-02T10:30:00.000Z",
      "updatedAt": "2025-10-02T10:30:00.000Z"
    }
  ]
}
```

### Create Note
```http
POST /notes/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My New Note",
  "content": "This is the content of my new note"
}
```

**Response (Success - 201):**
```json
{
  "msg": "Note created successfully",
  "note": {
    "_id": "654321abcdef",
    "title": "My New Note",
    "content": "This is the content of my new note",
    "user": "654321abcdef",
    "createdAt": "2025-10-02T10:30:00.000Z"
  }
}
```

### Get Single Note
```http
GET /notes/:id
Authorization: Bearer <token>
```

### Update Note
```http
PUT /notes/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "content": "Updated note content"
}
```

### Delete Note
```http
DELETE /notes/delete/:id
Authorization: Bearer <token>
```

## 🚫 Error Responses

### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Username must be at least 3 characters long",
      "param": "username",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "msg": "No token provided, access denied"
}
```

### Not Found Error (404)
```json
{
  "msg": "Note not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error message"
}
```

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

Tokens are also automatically sent as HTTP-only cookies named `token`.

## 📋 Request/Response Examples

### Complete Registration Flow
1. **Register** → Get token
2. **Use token** for all subsequent requests
3. **Create notes** using authenticated endpoints

### Complete CRUD Flow
1. **Login** → Get authentication token
2. **GET /notes/** → View all user notes
3. **POST /notes/create** → Create new note
4. **PUT /notes/update/:id** → Update existing note
5. **DELETE /notes/delete/:id** → Delete note
