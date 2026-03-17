const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Các đường dẫn
router.get('/', productController.getAllProducts);
router.get('/add', (req, res) => res.render('add'));
router.post('/add', upload.single('image'), productController.addProduct);

// Bổ sung các đường dẫn Xem, Xóa, Sửa
router.get('/delete/:id', productController.deleteProduct);
router.get('/detail/:id', productController.getDetail);
router.get('/edit/:id', productController.renderEditForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);

module.exports = router;

module.exports = router;