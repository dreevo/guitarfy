const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

router.get("/", brandController.brands);
router.get("/new", brandController.newBrand_get);
router.post("/", brandController.newBrand_post);

module.exports = router;
