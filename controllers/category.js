let categoryModel  = require("../models/category");
let getAllCategory = async (req, res) => {
  try {
    let data = await categoryModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.json(err.message);
  }
};
let getCategory = async (req, res) => {
    let category = req.params.category;
    try {
      let data = await categoryModel.findOne({ cat_title: category });
      res.status(200).json(data);
    } catch (err) {
      res.json(err.message);
    }
};

module.exports = {
    getCategory,
    getAllCategory
};
