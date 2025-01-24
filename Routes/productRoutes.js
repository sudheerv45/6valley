// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary folder for file uploads
const productController = require("../Controllers/productController");
const checkPermission = require('../Middlewares/permissionAuthorizer')
const { adminauthenticate } = require('../Middlewares/authenticate');
 
router.post('/createProduct', adminauthenticate, checkPermission('Product management', 'Create'), productController.createProduct);
router.get('/getAllProducts', adminauthenticate, checkPermission('Product management', 'Read'), productController.getAllProducts);
router.get('/getProductById/:id', adminauthenticate, checkPermission('Product management', 'Read'), productController.getProductById);
router.put('/updateProduct/:id', adminauthenticate, checkPermission('Product management', 'Update'), productController.updateProduct);
router.delete('/deleteProduct/:id', adminauthenticate, checkPermission('Product management', 'Delete'), productController.deleteProduct);
 
router.post('/bulk-import', adminauthenticate, checkPermission('Product management', 'Create'), upload.single('file'), productController.bulkImport);
router.get('/bulk-export', adminauthenticate, checkPermission('Product management', 'Read'), productController.bulkExport);
 
router.get('/new-requests', adminauthenticate, checkPermission('Product management', 'Read'), productController.getNewProductRequests);
router.get('/update-requests', adminauthenticate, checkPermission('Product management', 'Read'), productController.getUpdateProductRequests);
router.get('/approved-products', adminauthenticate, checkPermission('Product management', 'Read'), productController.getApprovedProducts);
router.get('/denied-products', adminauthenticate, checkPermission('Product management', 'Read'), productController.getDeniedProducts);
router.post('/approve/:id', adminauthenticate, checkPermission('Product management', 'Update'), productController.approveRequest);
router.post('/deny/:id', adminauthenticate, checkPermission('Product management', 'Update'), productController.denyRequest);
 
 
 
//17
module.exports = router;