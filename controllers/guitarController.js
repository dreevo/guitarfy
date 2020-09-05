const Guitar = require("../models/guitar");
const Brand = require("../models/brand");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

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
  const guitar = new Guitar({
    name: req.body.name,
    brand: req.body.brand,
    manufactureDate: new Date(req.body.manufactureDate),
    price: req.body.price,
    description: req.body.description,
  });
  saveModel(guitar, req.body.model);
  try {
    const newGuitar = await guitar.save();
    //res.redirect(`guitars/${newGuitar.id}`);
    res.redirect("guitars");
  } catch (err) {
    console.log(err);
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

function saveModel(guitar, modelEncoded) {
  if (modelEncoded == null) return;
  const model = JSON.parse(modelEncoded);
  if (model != null && imageMimeTypes.includes(model.type)) {
    guitar.modelImage = new Buffer.from(model.data, "base64");
    guitar.modelImageType = model.type;
  }
}
