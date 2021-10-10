const mongoose = require('mongoose');
const NotesbookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "Genral"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notes', NotesbookSchema);