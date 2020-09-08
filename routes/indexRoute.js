const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", indexController.portal);
router.get("/home", requireAuth, indexController.home);

module.exports = router;
