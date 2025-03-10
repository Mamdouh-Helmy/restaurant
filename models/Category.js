const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  id: { type: String, unique: true }, // unique constraint
  name: {
    ar: { type: String, required: true }, // الاسم بالعربية
    en: { type: String, required: true }  // الاسم بالإنجليزية
  },
  category_image: String, // إضافة حقل category_image
  products: [
    {
      id: { type: String, required: true },
      name: {
        ar: { type: String, required: true }, // الاسم بالعربية
        en: { type: String, required: true }  // الاسم بالإنجليزية
      },
      description: {
        ar: { type: String, required: true }, // الوصف بالعربية
        en: { type: String, required: true }  // الوصف بالإنجليزية
      },
      price: { type: Number, required: true },
      product_image: String, // إضافة حقل product_image
      discount: Boolean, // إضافة حقل discount
    }
  ]
});

module.exports = mongoose.model('Category', CategorySchema);