// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary folder for file uploads
const productController = require("../Controllers/productController");

// Create Product
router.post("/createProduct", productController.createProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

// Bulk Import & Export
router.post('/bulk-import', upload.single('file'), productController.bulkImport);
router.get('/bulk-export', productController.bulkExport);

// Admin APIs
router.get('/new-requests', productController.getNewProductRequests);
router.get('/update-requests', productController.getUpdateProductRequests);
router.get('/approved-products', productController.getApprovedProducts);
router.get('/denied-products', productController.getDeniedProducts);
router.post('/approve/:id', productController.approveRequest);
router.post('/deny/:id', productController.denyRequest);

module.exports = router;