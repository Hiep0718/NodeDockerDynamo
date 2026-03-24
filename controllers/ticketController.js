
const Ticket = require('../models/ticketModel');
const crypto = require('crypto');

exports.getAllTickets = async (req, res) => {
    try {
        const data = await Ticket.getAll();
        res.render('index', { action: 'list', Tickets: data.Items || [] });
    } catch (err) {
        res.status(500).send("Lỗi lấy dữ liệu: " + err.message);
    }
};

exports.renderAddForm = (req, res) => {
    res.render('index', { action: 'add' });
};

exports.addTicket = async (req, res) => {
    try {
        const { eventName, holderName, category, quantity, pricePerTicket, eventDate, status, createdAt } = req.body;
        const newItem = {
            ticketId: crypto.randomUUID(), 
            eventName: eventName,
            holderName: holderName,
            category: category,
            quantity: Number(quantity),
            pricePerTicket: Number(pricePerTicket),
            eventDate: eventDate,
            status: status,
            imageUrl: req.file ? req.file.location : '',
            createdAt: createdAt || new Date().toISOString()
        };
        await Ticket.save(newItem);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi thêm ticket: " + err.message);
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        await Ticket.delete(req.params.ticketId);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi xóa: " + err.message);
    }
};


exports.getDetail = async (req, res) => {
    try {
        const data = await Ticket.getById(req.params.ticketId);
        res.render('index', { action: 'detail', ticket: data.Item });
    } catch (err) {
        res.status(404).send("Không tìm thấy sản phẩm");
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const data = await Ticket.getById(req.params.ticketId);
        if (!data.Item) return res.status(404).send("Không tìm thấy");
        res.render('index', { action: 'edit', ticket: data.Item });
    } catch (err) {
        res.status(500).send("Lỗi lấy thông tin: " + err.message);
    }
};


exports.updateTicket = async (req, res) => {
    try {
        const {ticketId, eventName, holderName, category, quantity, pricePerTicket, eventDate, status, imageUrl, createdAt, old_image} = req.body;
        let url_image = old_image; 

        
        if (req.file) {
            url_image = req.file.location;
        }

        const updatedItem = {
            ticketId: ticketId,
            eventName: eventName,
            holderName: holderName,
            category: category,
            quantity: Number(quantity),
            pricePerTicket: Number(pricePerTicket),
            eventDate: eventDate,
            status: status,
            imageUrl: req.file ? req.file.location : '',
            createdAt: createdAt || new Date().toISOString()
        };

        // Trong DynamoDB, lệnh put (hàm save của bạn) sẽ tự động ghi đè nếu id đã tồn tại
        await Ticket.save(updatedItem); 
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi cập nhật: " + err.message);
    }
};