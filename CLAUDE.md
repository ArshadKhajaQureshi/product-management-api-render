# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install: `npm install`
- Run: `node src/index.js` (listens on `PORT`, default `3000`)
- Tests/lint: none configured. `npm test` is the default placeholder and exits 1.
- `render.yaml` runs `npm start`, but `package.json` has no `start` script. Add one (`node src/index.js`) before relying on the Render deploy.

## Architecture

ESM project (`"type": "module"`) on Express 5. `src/app.js` builds the app (`createApp`) and `src/index.js` only calls `listen`. It mounts two surfaces over the same data:

- **REST**: `/products` → `routes/products.js` (express-validator chains + `checkBodyNotEmpty`/`validate` from `middleware/validator.js`) → `controllers/product.controller.js` → `models/product.js`.
- **MCP**: `/mcp` → `src/mcp.js`, a stateless Streamable HTTP MCP server built fresh per POST request. It exposes tools (`list_products`, `create_product`, `get_product`), resources (`product://catalogue`, `product://stats`) and prompts. It calls `models/product.js` directly, bypassing the controller and Express validators, so its Zod schemas duplicate the REST validation rules. Keep the two in sync when changing product fields or enums.
- `.mcp.json` points Claude Code at the local `product-api` MCP server (`http://localhost:3000/mcp`), so the API must be running for it to connect. Set `MCP_API_KEY` to require an `x-mcp-api-key` header. If unset, the endpoint is open.

### Data layer gotcha

Storage is an in-memory array, so data resets on restart. There are **two separate stores**: `models/product.js` (UUIDs, used by the controller and MCP) and `repositories/product.repository.js` (a different array, `Date.now()` ids). They don't share data. The repository is currently unused by working code, and `patchProduct` references `productRepository` without importing it, so PATCH throws a ReferenceError. Use `productModel` for new code.

### Response conventions

All REST responses go through `sendResponse` in `middleware/responseHandler.js` and use the envelope `{ success, data, error }`. Validation failures return 422, an empty body returns 400, and unhandled errors go to `errorHandler` (which includes the stack only when `NODE_ENV=development`). Unknown routes return a 404 envelope from `app.js`.

## Product schema

Enums: category is `electronics|clothing|food|books|other`, status is `active|inactive|discontinued`. SKU matches `^[A-Z0-9-]{3,20}$`. Products carry `id`, `createdAt` and `archivedAt`. Full endpoint and field tables are in `README.md`, which the `readme-checker` agent verifies.

## Project agents

`.claude/agents/` defines `api-reviewer` (read-only source review) and `readme-checker` (README vs. code).
