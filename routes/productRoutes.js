const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/search", productController.searchProducts);

router.get("/category/:category", productController.filterByCategoryParams);
router.get("/search", productController.filterByCategoryQuery);

router.get("/price/:price", productController.getProductsUnderPrice);

router.get("/low-stock", productController.getLowStockProducts);

router.get("/value", productController.getInventoryValue);

// these are basic known CRUD

router.get("/", productController.getAllProducts);

router.get("/:id",productController.getProductById)

router.post("/",productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("id", productController.deleteProduct);

module.exports = router;