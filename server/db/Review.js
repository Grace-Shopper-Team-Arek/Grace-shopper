const conn = require('./conn');
const { UUID, UUIDV4, ENUM, TEXT } = conn.Sequelize;

const Review = conn.define("review",{
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    rating: {
        type: ENUM("1","2","3","4","5"),
        defaultValue: "3",
        allowNull: false,
    },
    review: {
        type: TEXT,
        allowNull: false,        
    }
});

module.exports = Review;