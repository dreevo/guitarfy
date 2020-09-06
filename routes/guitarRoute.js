const express = require("express");
const router = express.Router();
const guitarController = require("../controllers/guitarController");

router.get("/", guitarController.guitars);
router.get("/new", guitarController.newGuitar_get);
router.post("/", guitarController.newGuitar_post);
router.get("/:id", guitarController.showGuitar);
router.get("/:id/edit", guitarController.editGuitar);
router.put("/:id", guitarController.updateGuitar);
router.delete("/:id", guitarController.deleteGuitar);

module.exports = router;
