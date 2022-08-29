const likemodel = require("../models/likeModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const createLike = async (req, res) => {
  try {
    const likeBefore = await likemodel.findById(req.params.id);
    if (likeBefore) {
      res.status(201).json({ status: "already liked" });
    } else {
      const getProduct = await productModel.findById(req.params.item);
      const createLike = await new likemodel({ _id: req.params.id });
      createLike.item = getProduct;
      createLike.save();

      getProduct.like.push(mongoose.Types.ObjectId(createLike._id));
      getProduct.save();
      res.status(200).json({ status: "like created", data: createLike });
    }
  } catch (error) {
    res.json({ message: error.error });
  }
};

const getAllikes = async (req, res) => {
  try {
    const getproduct = await productModel
      .findById(req.params.item)
      .populate("like");
    res.status(200).json({ status: "like seen", data: getproduct });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deletelikes = async (req, res) => {
  try {
    const itemsData = await productModel.findById(req.params.item);
    const remove = await likemodel.findByIdAndRemove(req.params.like);

    itemsData.like.pull(remove);
    itemsData.save();

    res.status(200).json({ status: "like seen", data: itemsData });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createLike, getAllikes, deletelikes };
