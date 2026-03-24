const { docClient } = require('../config/dynamodb');
const TABLE_NAME = "EventTickets";

const Ticket = {

    getAll: async () => {
        const params = { TableName: TABLE_NAME };
        return await docClient.scan(params).promise();
    },


    save: async (ticket) => {
        const params = {
            TableName: TABLE_NAME,
            Item: ticket
        };
        return await docClient.put(params).promise();
    },

  
    getById: async (ticketId) => {
        const params = {
            TableName: TABLE_NAME,
            Key: { ticketId: ticketId }
        };
        return await docClient.get(params).promise();
    },

  
    delete: async (TicketId) => {
        const params = {
            TableName: TABLE_NAME,
            Key: { ticketId: TicketId }
        };
        return await docClient.delete(params).promise();
    }
};

module.exports = Ticket;