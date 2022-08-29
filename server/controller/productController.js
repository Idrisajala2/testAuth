const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const createitems = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const getUser = await userModel.findById(req.params.id);
    const makeItems = await new productModel({ name, price, quantity });
    makeItems.user = getUser;
    makeItems.save();

    getUser.item.push(mongoose.Types.ObjectId(makeItems._id));
    getUser.save();
    res.status(400).json({ message: "item created ", makeItems });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("item");
    res.status(201).json({ message: "success all items gotten", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const remove = await productModel.findByIdAndRemove(req.param.item);
    user.item.pull(remove);
    user.save();

    res.status(201).json({ message: "success all item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createitems, getItems, deleteItems };
