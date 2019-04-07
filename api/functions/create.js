const uuid = require('uuid')
const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      board: data,
      createdAt: timestamp
    }
  }

  // write the soundboard to the database
  dynamoDb.put(params, error => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Couldn't create the soundboard item."
      })
      return
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  })
}
