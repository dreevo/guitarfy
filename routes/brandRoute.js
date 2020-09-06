const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

router.get("/", brandController.brands);
router.get("/new", brandController.newBrand_get);
router.post("/", brandController.newBrand_post);
router.get("/:id", brandController.showBrand);
router.get("/:id/edit", brandController.editBrand);
router.put("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
