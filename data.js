const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Category = require('./models/Category'); // استيراد موديل الفئة

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/restaurant');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // قراءة ملف JSON
    const dataPath = path.join(__dirname, 'organized_data_with_categories.json');
    const rawData = fs.readFileSync(dataPath);
    const categoriesData = JSON.parse(rawData).categories;

    // حذف البيانات القديمة أولًا
    try {
        await Category.deleteMany({}); // حذف كل البيانات في collection الـ categories
        console.log('Old data deleted successfully');
    } catch (err) {
        console.error('Error deleting old data:', err);
    }

    // إدخال البيانات الجديدة
    try {
        await Category.insertMany(categoriesData);
        console.log('New data inserted successfully');
    } catch (err) {
        console.error('Error inserting new data:', err);
    } finally {
        mongoose.connection.close();
    }
});