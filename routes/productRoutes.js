const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

require('../config/dynamodb'); // Đảm bảo cấu hình AWS (region, credentials...)
const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: function (req, file, cb) {
            cb(null, process.env.S3_BUCKET_NAME);
        },
        key: function (req, file, cb) {
            cb(null, 'uploads/' + Date.now().toString() + path.extname(file.originalname));
        }
    })
});

// Các đường dẫn
router.get('/', productController.getAllProducts);
router.get('/add', (req, res) => res.render('index', { action: 'add' }));
router.post('/add', upload.single('image'), productController.addProduct);

// Bổ sung các đường dẫn Xem, Xóa, Sửa
router.get('/delete/:id', productController.deleteProduct);
router.get('/detail/:id', productController.getDetail);
router.get('/edit/:id', productController.renderEditForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);

module.exports = router;

module.exports = router;