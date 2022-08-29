const express = require("express");
const router = express.Router();

const {
  createitems,
  getItems,
  deleteItems,
} = require("../controller/productController");
router.route("/:id/create").post(createitems);
router.route("/:id/items").get(getItems);
router.route("/:id/:item/delete").delete(deleteItems);

module.exports = router;
