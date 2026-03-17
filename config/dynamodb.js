const AWS = require('aws-sdk');

AWS.config.update({
    region: local,
    endpoint: endpoint, // Port bạn đã map trong Docker
    accessKeyId: accessKeyId,        // DynamoDB Local không check key thật
    secretAccessKey: secretAccessKey
});

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

module.exports = { docClient, dynamodb };