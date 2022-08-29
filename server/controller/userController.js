const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cloudinary = require("../utils/cloudinary");

const getusers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ status: "all the users in dabase", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getuser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ status: " user in dabase", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteuser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: " user removed in dabase", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateuser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json({ status: " user updated", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createusers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const image = await cloudinary.uploader.upload(req.file.path);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      name,
      password: hashed,
      avatar: req.body.path,
      // avatar: image.secure_url,
      // avatarID: image.public_id,
    });
    res.status(200).json({ message: "suceess", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const signinUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = jwt.sign({ _id: user._id }, "thisisthesecreate", {
          expiresIn: "1d",
        });
        const { password, ...info } = user._id;
        res
          .status(200)
          .json({ message: "login success", data: token, ...info });
      } else {
        res.status(200).json({ message: "password incorrect" });
      }
    } else {
      res.status(200).json({ message: "user not in database" });
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
module.exports = {
  getusers,
  getuser,
  createusers,
  updateuser,
  deleteuser,
  signinUsers,
};
