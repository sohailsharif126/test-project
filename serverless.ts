import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'fullstack-api',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    stage: '${opt:stage, "dev"}',
    environment: {
      ITEMS_TABLE: 'ItemsTable-${self:provider.stage}',
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:PutItem',
            'dynamodb:GetItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
            'dynamodb:Scan'
          ],
          Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.ITEMS_TABLE}'
        }]
      }
    }
  },
  functions: {
    createItem: {
      handler: 'src/handlers/createItem.handler',
      events: [{ http: { method: 'POST', path: 'items' } }]
    },
    getItem: {
      handler: 'src/handlers/getItem.handler',
      events: [{ http: { method: 'GET', path: 'items/{id}' } }]
    },
    listItems: {
      handler: 'src/handlers/listItems.handler',
      events: [{ http: { method: 'GET', path: 'items' } }]
    },
    updateItem: {
      handler: 'src/handlers/updateItem.handler',
      events: [{ http: { method: 'PUT', path: 'items/{id}' } }]
    },
    deleteItem: {
      handler: 'src/handlers/deleteItem.handler',
      events: [{ http: { method: 'DELETE', path: 'items/{id}' } }]
    }
  },
  resources: {
    Resources: {
      ItemsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.ITEMS_TABLE}',
          AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          BillingMode: 'PAY_PER_REQUEST'
        }
      }
    }
  },
  plugins: ['serverless-esbuild'],
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node'
    }
  }
};

module.exports = serverlessConfiguration;