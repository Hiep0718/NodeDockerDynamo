const { docClient } = require('../config/dynamodb');
const TABLE_NAME = "Products";

const Product = {
    // Lấy tất cả sản phẩm
    getAll: async () => {
        const params = { TableName: TABLE_NAME };
        return await docClient.scan(params).promise();
    },

    // Thêm sản phẩm mới
    save: async (product) => {
        const params = {
            TableName: TABLE_NAME,
            Item: product
        };
        return await docClient.put(params).promise();
    },

    // Lấy chi tiết 1 sản phẩm
    getById: async (id) => {
        const params = {
            TableName: TABLE_NAME,
            Key: { id }
        };
        return await docClient.get(params).promise();
    },

    // Xóa sản phẩm
    delete: async (id) => {
        const params = {
            TableName: TABLE_NAME,
            Key: { id }
        };
        return await docClient.delete(params).promise();
    }
};

module.exports = Product;