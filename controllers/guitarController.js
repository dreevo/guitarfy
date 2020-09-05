const Guitar = require("../models/guitar");
const Brand = require("../models/brand");
const path = require("path");
const uploadPath = path.join("public", Guitar.modelImageBasePath);
const fs = require("fs");
const multer = require("multer");
const imageMimeTypes = ["images/jpeg", "image/png", "images/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

module.exports.guitars = async (req, res) => {
  let query = Guitar.find();
  if (req.query.name != null && req.query.name != "") {
    query = query.regex("name", new RegExp(req.query.name, "i"));
  }
  if (
    req.query.manufacturedBefore != null &&
    req.query.manufacturedBefore != ""
  ) {
    query = query.lte("manufactureDate", req.query.manufacturedBefore);
  }
  if (
    req.query.manufacturedAfter != null &&
    req.query.manufacturedAfter != ""
  ) {
    query = query.gte("manufactureDate", req.query.manufacturedAfter);
  }
  try {
    const guitars = await query.exec();
    res.render("guitars/index", { guitars, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
};

module.exports.newGuitar_get = async (req, res) => {
  renderNewPage(res, new Guitar());
};

module.exports.newGuitar_post = async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  const guitar = new Guitar({
    name: req.body.name,
    brand: req.body.brand,
    manufactureDate: new Date(req.body.manufactureDate),
    price: req.body.price,
    description: req.body.description,
    modelImageName: fileName,
  });
  try {
    const newGuitar = await guitar.save();
    //res.redirect(`guitars/${newGuitar.id}`);
    res.redirect("guitars");
  } catch {
    if (guitar.modelImageName != null) {
      removeGuitarImage(guitar.modelImageName);
    }

    renderNewPage(res, guitar, true);
  }
};

async function renderNewPage(res, guitar, hasError = false) {
  try {
    const brands = await Brand.find({});
    const params = {
      brands,
      guitar,
    };
    if (hasError) {
      params.errorMessage = "Error creating guitar";
    }
    res.render("guitars/new", params);
  } catch {
    res.redirect("/guitars");
  }
}

function removeGuitarImage(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}

module.exports.upload = upload;
