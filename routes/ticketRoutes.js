const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
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
router.get('/', ticketController.getAllTickets);
router.get('/add', (req, res) => res.render('index', { action: 'add' }));
router.post('/add', upload.single('imageUrl'), ticketController.addTicket);

// Bổ sung các đường dẫn Xem, Xóa, Sửa
router.get('/delete/:ticketId', ticketController.deleteTicket);
router.get('/detail/:ticketId', ticketController.getDetail);
router.get('/edit/:ticketId', ticketController.renderEditForm);
router.post('/edit/:ticketId', upload.single('image'), ticketController.updateTicket);

module.exports = router;
