const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, brandController.brands);
router.get("/new", requireAuth, brandController.newBrand_get);
router.post("/", requireAuth, brandController.newBrand_post);
router.get("/:id", requireAuth, brandController.showBrand);
router.get("/:id/edit", requireAuth, brandController.editBrand);
router.put("/:id", requireAuth, brandController.updateBrand);
router.delete("/:id", requireAuth, brandController.deleteBrand);

module.exports = router;
