# Chirps API Server

A TypeScript-based REST API server for a microblogging platform similar to Twitter following a boot.dev guide for TypeScript servers course.

## Features

- Create, read, and delete chirps (140-character messages)
- Filter chirps by author
- Sort chirps in ascending or descending order
- JWT-based authentication
- TypeScript implementation

## API Endpoints

- `GET /chirps` - List all chirps
  - Query params:
    - `authorId`: Filter by author
    - `sort`: Sort order ('asc' or 'desc')
- `GET /chirps/:id` - Get a specific chirp
- `POST /chirps` - Create a new chirp
  - Requires JWT authentication
  - Body: `{ "body": "chirp content" }`
- `DELETE /chirps/:id` - Delete a chirp
  - Requires JWT authentication
  - Only the author can delete their chirps

## Requirements

- Node.js
- TypeScript
- Express.js
- JWT for authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- `DB_URL`: Postgres database connection string with `sslmode` set to `disable`
- `SECRET`: JWT secret key

3. Start the server (automatically runs the migrations):
```bash
npm run dev
``` 