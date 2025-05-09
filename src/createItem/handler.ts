import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

interface CreateItemRequest {
  name: string;
  description?: string;
}

export const create = async (event: any) => {
  try {
    const body: CreateItemRequest = JSON.parse(event.body);
    const item = {
      id: uuidv4(),
      name: body.name,
      description: body.description,
      createdAt: new Date().toISOString(),
    };

    await client.send(new PutItemCommand({
      TableName: process.env.ITEMS_TABLE,
      Item: marshall(item),
    }));

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.error('Error creating item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};