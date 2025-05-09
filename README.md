# AppSync CRUD API with Lambda Resolvers

## Architecture
![Architecture Diagram](./docs/architecture.png)

## CI/CD Pipeline
![GitHub Actions Setup](./docs/ci-cd.png)

## Setup
1. Clone repo
2. Install dependencies: `npm install`
3. Deploy: 
   - Dev: `npx serverless deploy --stage dev`
   - Prod: `npx serverless deploy --stage prod`

## API Operations
- Create item: 
  ```graphql
  mutation Create {
    createItem(input: {name: "Test", description: "Test item"}) {
      id
      name
      description
    }
  }