require('dotenv').config(); // Gọi thư viện để đọc file .env
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

module.exports = { docClient, dynamodb };