const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { input } = event.arguments;
  const now = new Date().toISOString();
  
  const params = {
    TableName: process.env.ITEMS_TABLE,
    Item: {
      id: uuid.v4(),
      name: input.name,
      description: input.description,
      createdAt: now,
      updatedAt: now
    }
  };

  try {
    await dynamodb.put(params).promise();
    return params.Item;
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Could not create item');
  }
};