const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.portal);
router.get("/home", indexController.home);

module.exports = router;
