const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: "Product description here",
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: "https://user-images.githubusercontent.com/5661040/43248183-3259e226-90e1-11e8-8574-87a33f5dfe6f.png"
  }
});

module.exports = Product;
