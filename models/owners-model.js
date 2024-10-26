const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLengh: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
    gstN: String,
})

module.exports = mongoose.model('Owner', ownerSchema);