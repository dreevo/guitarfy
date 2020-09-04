const Brand = require("../models/brand");

module.exports.brands = async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const brands = await Brand.find(searchOptions);
    res.render("brands/index", { brands, searchOptions: req.query });
  } catch (err) {
    res.redirect("/");
  }
};

module.exports.newBrand_get = (req, res) => {
  res.render("brands/new", { brand: new Brand() });
};

module.exports.newBrand_post = async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
  });
  try {
    const newBrand = await brand.save();
    //res.redirect(`brands/${newBrand.id}`);
    res.redirect("brands");
  } catch (err) {
    res.render("brands/new", { brand, errorMessage: "Error creating brand" });
  }
};
