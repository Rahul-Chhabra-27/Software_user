const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please add the field text']
    }
}, {
    timestams: true,
});
module.exports = mongoose.model('Goal',goalSchema)