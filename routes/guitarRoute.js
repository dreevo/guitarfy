const express = require("express");
const router = express.Router();
const guitarController = require("../controllers/guitarController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, guitarController.guitars);
router.get("/new", requireAuth, guitarController.newGuitar_get);
router.post("/", requireAuth, guitarController.newGuitar_post);
router.get("/:id", requireAuth, guitarController.showGuitar);
router.get("/:id/edit", requireAuth, guitarController.editGuitar);
router.put("/:id", requireAuth, guitarController.updateGuitar);
router.delete("/:id", requireAuth, guitarController.deleteGuitar);

module.exports = router;
