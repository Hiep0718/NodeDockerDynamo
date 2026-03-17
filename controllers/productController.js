const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const Product = require('../models/productModel');
const crypto = require('crypto');

exports.getAllProducts = async (req, res) => {
    try {
        const data = await Product.getAll();
        res.render('index', { products: data.Items });
    } catch (err) {
        res.status(500).send("Lỗi lấy dữ liệu: " + err.message);
    }
};

exports.renderAddForm = (req, res) => {
    res.render('add');
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, unit_in_stock } = req.body;
        const newItem = {
            id: crypto.randomUUID(), // Dùng hàm có sẵn của Node.js
            name,
            price: Number(price),
            unit_in_stock: Number(unit_in_stock),
            url_image: `/uploads/${req.file.filename}`
        };
        await Product.save(newItem);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi thêm sản phẩm: " + err.message);
    }
};
// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi xóa: " + err.message);
    }
};

// Hiển thị chi tiết (Tiêu chí 7)
exports.getDetail = async (req, res) => {
    try {
        const data = await Product.getById(req.params.id);
        res.render('detail', { product: data.Item });
    } catch (err) {
        res.status(404).send("Không tìm thấy sản phẩm");
    }
};