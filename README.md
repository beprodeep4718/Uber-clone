# Uber Clone API Documentation

## Endpoints

### POST /user/register

Registers a new user.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    // ...other user fields...
  }
}
```

### POST /user/login

Logs in an existing user.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    // ...other user fields...
  }
}
```

### GET /user/profile

Gets the profile of the logged-in user.

#### Request Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Response

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  // ...other user fields...
}
```

### GET /user/logout

Logs out the current user.

#### Request Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Response

```json
{
  "message": "Logged out successfully"
}
```