const Guitar = require("../models/guitar");
module.exports.home = async (req, res) => {
  let guitars;
  try {
    guitars = await Guitar.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
  res.render("index", { guitars });
};
