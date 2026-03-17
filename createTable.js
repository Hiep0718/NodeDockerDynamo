const { dynamodb } = require('./config/dynamodb');

const params = {
    TableName: "Products",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" } // Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) console.error("Lỗi tạo bảng:", err);
    else console.log("Đã tạo bảng thành công!");
});