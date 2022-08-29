const express = require("express");
const router = express.Router();

const {
  createLike,
  getAllikes,
  deletelikes,
} = require("../controller/likeController");

router.route("/:id/:item").post(createLike);
router.route("/:id/:item/likes").get(getAllikes);
router.route("/:id/:item/:like").delete(deletelikes);

module.exports = router;
