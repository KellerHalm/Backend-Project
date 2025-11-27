const Router = require('express');
const productController = require('../controllers/productController.js');

const router = new Router();


router.post('/product', productController.addProduct);
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.put("/product/update", productController.updateProduct);
router.patch("/product/:id", productController.editProduct);
router.delete("/product/:id", productController.deleteProduct); 


module.exports = router