const mongoose = require("mongoose");
const path = require("path");
const modelImageBasePath = "uploads/guitarModels";

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modelImageName: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
});

guitarSchema.virtual("modelImagePath").get(function () {
  if (this.modelImageName != null) {
    return path.join("/", modelImageBasePath, this.modelImageName);
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
module.exports.modelImageBasePath = modelImageBasePath;
