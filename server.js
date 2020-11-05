const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const books = require("./routes/books")
const cors = require('cors');
const flash = require("connect-flash")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


mongoose
    .connect(
        (process.env.MONGODB_URI || "mongodb+srv://talmageluke:hangpassword@cluster0.jyodq.mongodb.net/googlebooks?retryWrites=true&w=majority"),
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.use(flash())
// Routes
app.use("/api/books", books);

app.listen(port, () => console.log(`Server running on port ${port} !`));