
# BookStore API Documentation

## Overview
BookStore API is a system for managing authors, books, and users with multiple roles (admin, author, regular user). It provides CRUD operations, authentication, password reset, JWT protection, and advanced role-based access.

---

## Authentication & User Management


### Auth Endpoints
- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — User login
- `POST /api/v1/auth/forgot-password` — Send password reset code
- `POST /api/v1/auth/verify-reset-code` — Verify reset code
- `POST /api/v1/auth/reset-password` — Reset password


### User Profile
- `GET /api/v1/auth/my-profile` — Get current user profile
- `PUT /api/v1/auth/update-me` — Update current user profile
- `DELETE /api/v1/auth/delete-me` — Delete current user account
- `PUT /api/v1/auth/upload-photo` — Upload/change user profile photo


### Admin User Management
- `GET /api/v1/auth/` — Get all users (admin only)
- `GET /api/v1/auth/:id` — Get specific user
- `DELETE /api/v1/auth/:id` — Delete user (admin only)

---

## Author Management


### Author Profile (Logged-in Author)
- `GET /api/v1/authors/me` — Get current author profile
- `PUT /api/v1/authors/update-me` — Update current author profile
- `DELETE /api/v1/authors/delete-me` — Delete current author account
- `PUT /api/v1/authors/:id/upload-photo` — Upload/change author profile photo


### Admin Author Management
- `POST /api/v1/authors/` — Add new author (admin only)
- `GET /api/v1/authors/` — Get all authors (admin only)
- `GET /api/v1/authors/:id` — Get specific author (admin only)
- `PUT /api/v1/authors/:id` — Update author (admin only)
- `DELETE /api/v1/authors/:id` — Delete author (admin only)

---


## Books Management

- `POST /api/v1/books/` — Add new book (admin or author)
- `GET /api/v1/books/` — Get all books
- `GET /api/v1/books/:id` — Get specific book
- `PUT /api/v1/books/:id` — Update book (admin or author)
- `DELETE /api/v1/books/:id` — Delete book (admin or author)
- `PUT /api/v1/books/:id/upload-photo` — Upload/change book cover image

---

## Image Uploads
- Images are uploaded using endpoints like `/api/v1/auth/upload-photo`, `/api/v1/books/:id/upload-photo`, `/api/v1/authors/:id/upload-photo`.
- Use `form-data` with the field name `image`.
- Uploaded images are stored in the `uploads` folder and can be accessed via direct URL.

**Example request (using Postman):**
```
PUT /api/books/:id/upload-photo
Headers: Authorization: Bearer <token>
Body: form-data, key=image, value=<your image file>
```

---

## Middlewares
- JWT protection for all private routes
- Role-based access control using `allowedTo`
- Data validation using Validators

---

## Error Handling
- All errors are returned in JSON format with message and status code

---

## Technologies
- Node.js, Express.js
- MongoDB
- JWT Authentication

---

## Notes
- You must send the token in the header `Authorization: Bearer <token>` for protected routes
- All responses are in JSON format

---

## Contact
لأي استفسار أو دعم، تواصل مع المطور.