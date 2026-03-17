const express = require('express');
const app = express();
const path = require('path');
const productRoutes = require('./routes/productRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Để truy cập được ảnh trong thư mục uploads

app.use('/', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});