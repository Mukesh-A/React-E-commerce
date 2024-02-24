const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {
  try {
    const Categories = await Category.find({}).exec();
    res.status(200).json(Categories);
  } catch (err) {
    res.status(400).json(err);
  }
};
