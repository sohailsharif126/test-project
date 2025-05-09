# Serverless REST API with CRUD Operations

## Architecture
![Architecture Diagram](./docs/architecture.png)

## API Endpoints
| Method | Path        | Description       |
|--------|-------------|-------------------|
| POST   | /items      | Create new item   |
| GET    | /items      | List all items    |
| GET    | /items/{id} | Get single item   |
| PUT    | /items/{id} | Update item       |
| DELETE | /items/{id} | Delete item       |

## CI/CD Pipeline
![GitHub Actions Setup](./docs/ci-cd-setup.png)

## Local Development
1. Install dependencies:
```bash
npm install