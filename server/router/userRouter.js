const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  createusers,
  updateuser,
  deleteuser,
  getusers,
  getuser,
  signinUsers,
} = require("../controller/userController");
router.route("/:id").get(getuser).delete(deleteuser).patch(updateuser);
router.route("/").get(getusers);
router.route("/create").post(upload, createusers);
router.route("/signin").post(signinUsers);

module.exports = router;
