const mongoose = require("mongoose");
const Guitar = require("./guitar");
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

brandSchema.pre("remove", function (next) {
  Guitar.find({ brand: this.id }, (err, brands) => {
    if (err) {
      next(err);
    } else if (brands.length > 0) {
      next(new Error("This brand has guitars still"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Brand", brandSchema);
