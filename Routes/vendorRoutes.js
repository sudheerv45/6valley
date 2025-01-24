const express = require("express");
const router = express.Router();
const vendorController = require("../Controllers/vendorController");
const multer = require('multer');
const checkPermission = require('../Middlewares/permissionAuthorizer')
const { adminauthenticate } = require('../Middlewares/authenticate');
 
 
 
const {upload} = require("../Middlewares/fileupload")
 
router.post(
    '/create',
     adminauthenticate, checkPermission('User management', 'Create'),
    upload.fields([
        { name: 'vendorImage', maxCount: 1 },
        { name: 'shopLogo', maxCount: 1 },
        { name: 'shopBanner', maxCount: 1 }
    ]),
    vendorController.createVendor
);
 
// Update Vendor with Image Uploads
router.put('/updateVendor/:id', adminauthenticate, checkPermission('User management', 'Update'), vendorController.updateVendor);
router.get('/getAllVendors', adminauthenticate, checkPermission('User management', 'Read'), vendorController.getAllVendors);
router.get('/getVendorById/:id', adminauthenticate, checkPermission('User management', 'Read'), vendorController.getVendorById);
router.delete('/deleteVendor/:id', adminauthenticate, checkPermission('User management', 'Delete'), vendorController.deleteVendor);
 
 
//4
module.exports = router;