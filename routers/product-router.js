const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  addProduct,
  getAllProducts,
  getProductById,
  editProductById,
  removeProductById,
  uploadProductImages,
} = require("../controllers/product-controller");
const {
  addProductValidationSchema,
  editProductValidationSchema,
} = require("../validations/product-validation");

router.get("/", asyncHandler(getAllProducts));

router.post(
  "/",
  uploadProductImages,
  protect,
  restrictTo("ADMIN"),
  validator(addProductValidationSchema),
  asyncHandler(addProduct)
);

router.get("/:id", asyncHandler(getProductById));

router.patch(
  "/:id",
  uploadProductImages,
  protect,
  restrictTo("ADMIN"),
  validator(editProductValidationSchema),
  asyncHandler(editProductById)
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  asyncHandler(removeProductById)
);

module.exports = router;
