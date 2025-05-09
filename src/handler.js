const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.trackClick = async (event) => {
  try {
    const clickData = {
      id: uuid.v4(),
      timestamp: Date.now(),
      linkId: event.pathParameters.linkId,
      userAgent: event.headers['User-Agent'] || 'unknown',
      sourceIP: event.requestContext.identity.sourceIp,
      queryParams: event.queryStringParameters,
      headers: event.headers
    };

    const params = {
      TableName: process.env.CLICKS_TABLE,
      Item: clickData
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Click tracked successfully',
        clickId: clickData.id
      })
    };
  } catch (error) {
    console.error('Error tracking click:', error);
    return {
      statusCode: 500,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};