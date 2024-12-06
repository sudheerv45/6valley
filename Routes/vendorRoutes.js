const express = require("express");
const router = express.Router();
const vendorController = require("../Controllers/vendorController");
const multer = require('multer');



const {upload} = require("../Middlewares/fileupload")

router.post(
    '/create', 
    upload.fields([
        { name: 'vendorImage', maxCount: 1 },
        { name: 'shopLogo', maxCount: 1 },
        { name: 'shopBanner', maxCount: 1 }
    ]), 
    vendorController.createVendor
);

// Update Vendor with Image Uploads
router.put("/updateVendor/:id",vendorController.updateVendor);
router.get("/getAllVendors", vendorController.getAllVendors);
router.get("/getVendorById/:id", vendorController.getVendorById);
router.delete("/deleteVendor/:id", vendorController.deleteVendor);

module.exports = router;