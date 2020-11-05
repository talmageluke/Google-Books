const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hangSchema = new Schema({

    title: { type: String, required: true },
    author: { type: String, required: true },
    details: { type: String, required: true },
    thumbnail: { type: String, required: true },
    previewLink: { type: String, required: true }

});

const Hang = mongoose.model("Hang", hangSchema);

module.exports = Hang;