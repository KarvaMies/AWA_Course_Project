const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model("Comment", commentSchema);
