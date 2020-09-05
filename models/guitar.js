const mongoose = require("mongoose");

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
  modelImage: {
    type: Buffer,
    required: true,
  },
  modelImageType: {
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
  if (this.modelImage != null && this.modelImageType != null) {
    return `data:${
      this.modelImageType
    };charset=utf-8;base64,${this.modelImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
