# Product Management API

A simple REST API built with Node.js and Express.js for managing products.

## Features

- Create products
- View products (all or by id)
- Update products (full update with PUT, partial update with PATCH)
- Delete products
- MCP endpoint at `/mcp` (built on `@modelcontextprotocol/sdk`)

## Installation

```bash
npm install
```

## Run

```bash
node src/index.js
```

The server listens on the `PORT` environment variable, defaulting to `3000`.

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /products | List all products |
| GET | /products/:id | Get a product by id |
| POST | /products | Create a product |
| PUT | /products/:id | Replace a product (full update) |
| PATCH | /products/:id | Partially update a product |
| DELETE | /products/:id | Delete a product |
| - | /mcp | MCP server endpoint |

Requests with an empty body are rejected.

## Product Fields

| Field | Rules |
|----------|-------|
| name | Required, max 150 characters |
| category | Required, one of `electronics`, `clothing`, `food`, `books`, `other` |
| price | Required, positive, up to 2 decimals |
| sku | Required, matches `^[A-Z0-9-]{3,20}$` |
| stock | Required, integer >= 0 |
| status | One of `active`, `inactive`, `discontinued` |
| description | Optional (accepted on PATCH) |

## Example Product

```json
{
  "name": "Laptop",
  "category": "electronics",
  "price": 50000,
  "sku": "LAP-001",
  "stock": 10,
  "status": "active"
}
```
