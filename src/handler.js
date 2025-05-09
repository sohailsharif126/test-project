
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.itemsHandler = async (event) => {
  const method = event.requestContext.http.method;
  const id = event.pathParameters?.id;
  
  try {
    switch(method) {
      case 'POST':
        return await createItem(JSON.parse(event.body));
      case 'GET':
        return id ? await getItem(id) : await listItems();
      case 'PUT':
        return await updateItem(id, JSON.parse(event.body));
      case 'DELETE':
        return await deleteItem(id);
      default:
        return { statusCode: 400, body: 'Invalid operation' };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};

async function createItem(item) {
  const params = {
    TableName: process.env.ITEMS_TABLE,
    Item: { ...item, id: Date.now().toString() }
  };
  await dynamodb.put(params).promise();
  return { statusCode: 201, body: JSON.stringify(params.Item) };
}

async function getItem(id) {
  const params = { TableName: process.env.ITEMS_TABLE, Key: { id } };
  const result = await dynamodb.get(params).promise();
  return result.Item 
    ? { statusCode: 200, body: JSON.stringify(result.Item) }
    : { statusCode: 404 };
}

async function listItems() {
  const params = { TableName: process.env.ITEMS_TABLE };
  const result = await dynamodb.scan(params).promise();
  return { statusCode: 200, body: JSON.stringify(result.Items) };
}

async function updateItem(id, updates) {
  const params = {
    TableName: process.env.ITEMS_TABLE,
    Key: { id },
    UpdateExpression: 'set #name = :n, description = :d',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: {
      ':n': updates.name,
      ':d': updates.description
    },
    ReturnValues: 'ALL_NEW'
  };
  const result = await dynamodb.update(params).promise();
  return { statusCode: 200, body: JSON.stringify(result.Attributes) };
}

async function deleteItem(id) {
  const params = { TableName: process.env.ITEMS_TABLE, Key: { id } };
  await dynamodb.delete(params).promise();
  return { statusCode: 204 };
}