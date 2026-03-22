// Đã chuyển cấu hình upload sang routes/productRoutes.js
const Product = require('../models/productModel');
const crypto = require('crypto');

exports.getAllProducts = async (req, res) => {
    try {
        const data = await Product.getAll();
        res.render('index', { action: 'list', products: data.Items || [] });
    } catch (err) {
        res.status(500).send("Lỗi lấy dữ liệu: " + err.message);
    }
};

exports.renderAddForm = (req, res) => {
    res.render('index', { action: 'add' });
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price, unit_in_stock } = req.body;
        const newItem = {
            id: crypto.randomUUID(), // Dùng hàm có sẵn của Node.js
            name,
            price: Number(price),
            unit_in_stock: Number(unit_in_stock),
            url_image: req.file ? req.file.location : ''
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
        res.render('index', { action: 'detail', product: data.Item });
    } catch (err) {
        res.status(404).send("Không tìm thấy sản phẩm");
    }
};
// Hiển thị form sửa sản phẩm
exports.renderEditForm = async (req, res) => {
    try {
        const data = await Product.getById(req.params.id);
        if (!data.Item) return res.status(404).send("Không tìm thấy sản phẩm");
        res.render('index', { action: 'edit', product: data.Item });
    } catch (err) {
        res.status(500).send("Lỗi lấy thông tin: " + err.message);
    }
};

// Xử lý cập nhật thông tin sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const { id, name, price, unit_in_stock, old_image } = req.body;
        let url_image = old_image; // Mặc định giữ lại ảnh cũ

        // Nếu người dùng có chọn upload ảnh mới, thì lấy đường dẫn ảnh mới từ S3
        if (req.file) {
            url_image = req.file.location;
        }

        const updatedItem = {
            id: id,
            name: name,
            price: Number(price),
            unit_in_stock: Number(unit_in_stock),
            url_image: url_image
        };

        // Trong DynamoDB, lệnh put (hàm save của bạn) sẽ tự động ghi đè nếu id đã tồn tại
        await Product.save(updatedItem); 
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Lỗi cập nhật: " + err.message);
    }
};