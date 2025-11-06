const Router = require('express');
const ProductController = require('../controllers/productController.js');
const productController = require('../controllers/productController.js');

const router = new Router();


router.post('/product', ProductController.addProduct);
router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getOneProduct);
router.put("/product/update", productController.updateProduct);
router.patch("/product/:id", productController.editProduct);
// router.delete("/product/:id");



module.exports = router
