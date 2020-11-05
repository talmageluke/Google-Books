const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController")


router.route("/")
    .get(bookController.findAll)
    .post(bookController.create);

router
    .route("/:id")
    .get(bookController.findById)
    .put(bookController.update)
    .delete(bookController.remove);





module.exports = router;
