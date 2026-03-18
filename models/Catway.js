const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    catwayType: {
        type: String,
        required: true
    },
    catwayState: {
        type: String,
        default: 'disponible'
    }
});

module.exports = mongoose.model('Catway', catwaySchema);