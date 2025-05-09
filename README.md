## Serverless REST API

### Features
- CRUD Operations
- Multi-stage deployments
- Automated CI/CD
- DynamoDB Integration

### Deployment
1. Setup AWS credentials in GitHub Secrets
2. Push to master branch to trigger deployment
3. Access endpoints:
   - POST /items
   - GET /items
   - GET /items/{id}
   - PUT /items/{id}
   - DELETE /items/{id}