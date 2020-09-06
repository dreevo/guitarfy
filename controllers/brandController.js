const Brand = require("../models/brand");
const Guitar = require("../models/guitar");

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
    res.redirect(`brands/${newBrand.id}`);
  } catch (err) {
    res.render("brands/new", { brand, errorMessage: "Error creating brand" });
  }
};

module.exports.showBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    const guitars = await Guitar.find({ brand: brand.id }).limit(6).exec();
    res.render("brands/show", { brand, guitarsByBrand: guitars });
  } catch {
    res.redirect("/");
  }
};

module.exports.editBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.render("brands/edit", { brand });
  } catch {
    res.redirect("/brands");
  }
};

module.exports.updateBrand = async (req, res) => {
  let brand;
  try {
    brand = await Brand.findById(req.params.id);
    brand.name = req.body.name;
    await brand.save();
    res.redirect(`/brands/${brand.id}`);
  } catch (err) {
    if (brand == null) {
      res.redirect("/");
    } else {
      console.log(err);
      res.render("brands/new", { brand, errorMessage: "Error updating brand" });
    }
  }
};

module.exports.deleteBrand = async (req, res) => {
  let brand;
  try {
    brand = await Brand.findById(req.params.id);
    await brand.remove();
    res.redirect(`/brands`);
  } catch (err) {
    if (brand == null) {
      res.redirect("/");
    } else {
      console.log(err);
      res.redirect(`/brands/${brand.id}`);
    }
  }
};
