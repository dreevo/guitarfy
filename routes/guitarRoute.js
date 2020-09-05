const express = require("express");
const router = express.Router();
const guitarController = require("../controllers/guitarController");

router.get("/", guitarController.guitars);
router.get("/new", guitarController.newGuitar_get);
router.post("/", guitarController.newGuitar_post);

module.exports = router;
