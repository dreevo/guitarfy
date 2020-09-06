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
    res.redirect(`guitars/${newGuitar.id}`);
  } catch (err) {
    console.log(err);
    renderNewPage(res, guitar, true);
  }
};

module.exports.showGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findById(req.params.id)
      .populate("brand")
      .exec();
    res.render("guitars/show", { guitar });
  } catch {
    res.redirect("/");
  }
};

module.exports.editGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findById(req.params.id);
    renderEditPage(res, guitar);
  } catch {
    res.redirect("/");
  }
};

module.exports.updateGuitar = async (req, res) => {
  let guitar;
  try {
    guitar = await Guitar.findById(req.params.id);
    guitar.name = req.body.name;
    guitar.brand = req.body.brand;
    guitar.manufactureDate = new Date(req.body.manufactureDate);
    guitar.price = req.body.price;
    guitar.description = req.body.description;
    if (req.body.model != null && req.body.model != "") {
      saveModel(guitar, req.body.model);
    }
    await guitar.save();
    res.redirect(`/guitars/${guitar.id}`);
  } catch (err) {
    if (guitar != null) {
      renderEditPage(res, guitar, true);
    } else {
      redirect("/");
    }
  }
};

module.exports.deleteGuitar = async (req, res) => {
  let guitar;
  try {
    guitar = await Guitar.findById(req.params.id);
    await guitar.remove();
    res.redirect("/guitars");
  } catch {
    if (guitar != null) {
      res.render("guitars/show", {
        guitar,
        errorMessage: "Could not remove guitar",
      });
    } else {
      res.redirect("/");
    }
  }
};

async function renderNewPage(res, guitar, hasError = false) {
  renderFormPage(res, guitar, "new", hasError);
}

function saveModel(guitar, modelEncoded) {
  if (modelEncoded == null) return;
  const model = JSON.parse(modelEncoded);
  if (model != null && imageMimeTypes.includes(model.type)) {
    guitar.modelImage = new Buffer.from(model.data, "base64");
    guitar.modelImageType = model.type;
  }
}

async function renderFormPage(res, guitar, form, hasError = false) {
  try {
    const brands = await Brand.find({});
    const params = {
      brands,
      guitar,
    };
    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error updating guitar";
      }
      params.errorMessage = "Error creating guitar";
    }
    res.render(`guitars/${form}`, params);
  } catch {
    res.redirect("/guitars");
  }
}

async function renderEditPage(res, guitar, hasError = false) {
  renderFormPage(res, guitar, "edit", hasError);
}
