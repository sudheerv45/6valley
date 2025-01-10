const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authenticate'); // Ensure you
const { upload } = require('../Middlewares/fileupload')


const categoryController = require('../Controllers/categoryController');
const userController = require('../Controllers/userController')
const subCategoryController = require('../Controllers/subCategoryController');
const subSubCategoryController = require('../Controllers/subSubCategoryController');
const brandController = require('../Controllers/brandController');
const deliveryManController = require('../Controllers/deliveryManController');
const emergencyContactController = require('../Controllers/emergencyContactController');
const attributeSetupController = require('../Controllers/attributeSetupController');
const socialMediaController = require("../Controllers/socialMediaController");
const bannerController = require("../Controllers/bannerController");
const couponController = require("../Controllers/couponController");
const flashDealController = require("../Controllers/flashDealController");
const dealController = require("../Controllers/dealOfTheDayController");
const featureDealController = require("../Controllers/featureDealController");
const clearanceSaleController = require ("../Controllers/clearanceSaleController");
const announcementController = require("../Controllers/announcementController");
const helpSupportController = require("../Controllers/helpSupportController");

// User routes
router.post('/users/create',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'idImage', maxCount: 1 }]), userController.createUser)
router.get('/users/getall',userController.getAllUsers)
router.get('/users/get/:id', userController.getUserById)
router.put('/users/status/:id', userController.userStatus)
router.put('/users/delete/:id', userController.deleteUserById)
router.post('/users/update/:id',userController.updateUserById)
router.post('/users/userlogin',userController.loginUser)


//Routes for category
router.post('/categories/add', categoryController.addCategory);
router.get('/categories/getall', categoryController.getAllCategories);
router.get('/categories/get/:id', categoryController.getCategoryById);
router.put('/categories/update/:id', categoryController.updateCategory);
router.delete('/categories/delete/:id', categoryController.deleteCategory);
router.patch('/categories/restore/:id', categoryController.restoreCategory);



//Routes for SubCategories
router.post('/subcategories/add', subCategoryController.addSubCategory);
router.get('/subcategories/getall', subCategoryController.getAllSubCategories);
router.get('/subcategories/get/:id', subCategoryController.getSubCategoryById);
router.get('/subcategories/filter', subCategoryController.getSubCategoryByName);
router.put('/subcategories/update/:id', subCategoryController.updateSubCategory);
router.delete('/subcategories/delete/:id', subCategoryController.deleteSubCategory);
router.patch('/subcategories/restore/:id', subCategoryController.restoreSubCategory);




//Routes for sub sub category
router.post('/subSubCategories/add', subSubCategoryController.addSubSubCategory);
router.get('/subSubCategories/getall', subSubCategoryController.getSubSubCategories);
router.get('/subSubCategories/get/:id', subSubCategoryController.getSubSubCategoryById);
router.put('/subSubCategories/update/:id', subSubCategoryController.updateSubSubCategory);
router.delete('/subSubCategories/delete/:id', subSubCategoryController.deleteSubSubCategory);
router.patch('/subSubCategories/restore/:id', subSubCategoryController.restoreSubSubCategory);
router.get('/subSubCategories/get', subSubCategoryController.getSubSubCategoriesByCategory);




//Routes for Brands
router.post('/brands/add', brandController.addBrand);
router.get('/brands/getall', brandController.getBrands);
router.get('/brands/get/:id', brandController.getBrandById);
router.put('/brands/update/:id', brandController.updateBrand);
router.delete('/brands/delete/:id', brandController.deleteBrand);
router.patch('/brands/restore/:id', brandController.restoreBrand);
router.get('/brands/name/:brandName', brandController.getBrandByName);



// Routes for delivery man
router.post('/deliveryman/add', deliveryManController.createDeliveryMan);
router.get('/deliveryman/getall', deliveryManController.getDeliveryMen);
router.get('/deliveryman/get/:id', deliveryManController.getDeliveryManById);
router.put('/deliveryman/update/:id', deliveryManController.updateDeliveryMan);
router.patch('/deliveryman/softdelete/:id', deliveryManController.softDeleteDeliveryMan);
router.patch('/deliveryman/restore/:id', deliveryManController.restoreDeliveryMan);
router.delete('/deliveryman/delete/:id', deliveryManController.permanentDeleteDeliveryMan);


// Routes for emergency Contact
router.post('/emergencycontact/add', emergencyContactController.createEmergencyContact);
router.get('/emergencycontact/getall', emergencyContactController.getEmergencyContacts);
router.get('/emergencycontact/get/:id', emergencyContactController.getEmergencyContactById);
router.put('/emergencycontact/update/:id', emergencyContactController.updateEmergencyContact);
router.patch('/emergencycontact/softdelete/:id', emergencyContactController.softDeleteEmergencyContact);
router.patch('/emergencycontact/restore/:id', emergencyContactController.restoreEmergencyContact);
router.patch('/emergencycontact/status/:id', emergencyContactController.toggleEmergencyContactStatus);



// ROutes for attributes
router.post('/attributes/add', attributeSetupController.createAttribute);
router.get('/attributes/getall', attributeSetupController.getAttributes);
router.get('/attributes/get/:id', attributeSetupController.getAttributeById);
router.put('/attributes/update/:id', attributeSetupController.updateAttribute);
router.patch('/attributes/softdelete/:id', attributeSetupController.softDeleteAttribute);
router.patch('/attributes/restore/:id', attributeSetupController.restoreAttribute);
router.delete('/attributes/delete/:id', attributeSetupController.permanentDeleteAttribute);

//Routes for socialmedia links
router.post("/socialmedia/addSocialMedia", socialMediaController.addSocialMedia);
router.get("/socialmedia/getAllSocialMedia", socialMediaController.getAllSocialMedia);
router.put("/socialmedia/updateSocialMedia/:id", socialMediaController.updateSocialMedia);
router.delete("/socialmedia/deleteSocialMedia/:id", socialMediaController.deleteSocialMedia);
router.patch("/socialmedia/toggleStatus/:id/status", socialMediaController.toggleStatus);

// Routes for banner
router.post("/banner/createBanner",upload.single("image"),bannerController.createBanner);
router.get("/banner/getBanners", bannerController.getBanners);
router.delete("/banner/deleteBanner/:id", bannerController.deleteBanner);
router.put("/banner/updateBanner/:id",upload.single("image"),bannerController.updateBanner);

//Routes for coupons
router.get("/coupons/generateCouponCode", couponController.generateCouponCode); 
router.post("/coupons/createCoupon", couponController.createCoupon); 
router.get("/coupons/getAllCoupons", couponController.getAllCoupons); 
router.get("/coupons/getCouponById/:id", couponController.getCouponById); 
router.put("/coupons/updateCoupon/:id", couponController.updateCoupon); 
router.delete("/coupons/deleteCoupon/:id", couponController.deleteCoupon);
router.patch("/coupons/:id/status", couponController.toggleCouponStatus);


//Routes for FlashDeals
router.post("/FlashDeals/createFlashDeal", upload.single("image"), flashDealController.createFlashDeal);
router.get("/FlashDeals/getAllFlashDeals", flashDealController.getAllFlashDeals);
router.get("/FlashDeals/getFlashDealById/:id", flashDealController.getFlashDealById);
router.put("/FlashDeals/updateFlashDeal/:id", upload.single("image"), flashDealController.updateFlashDeal);
router.delete("/FlashDeals/deleteFlashDeal/:id", flashDealController.deleteFlashDeal);

//Routes for Dealof the Day 
router.post("/DealOfTheDay/createDeal", dealController.createDeal);
router.get("/DealOfTheDay/getAllDeals", dealController.getAllDeals);
router.get("/DealOfTheDay/getDealById/:id", dealController.getDealById);
router.put("/DealOfTheDay/updateDeal/:id", dealController.updateDeal);
router.delete("/DealOfTheDay/deleteDeal/:id", dealController.deleteDeal);

//Routes for Featuredeal
router.post("/Featuredeal/createFeatureDeal", featureDealController.createFeatureDeal);
router.get("/Featuredeal/getAllFeatureDeals", featureDealController.getAllFeatureDeals);
router.get("/Featuredeal/getFeatureDealById/:id", featureDealController.getFeatureDealById);
router.put("/Featuredeal/updateFeatureDeal/:id", featureDealController.updateFeatureDeal);
router.delete("/Featuredeal/deleteFeatureDeal/:id", featureDealController.deleteFeatureDeal);


//Routes for Clearance Sale
router.post("/ClearanceSale/createClearanceSale", clearanceSaleController.createClearanceSale);
router.get("/ClearanceSale/getAllClearanceSales", clearanceSaleController.getAllClearanceSales);
router.get("/ClearanceSale/getClearanceSaleById/:id", clearanceSaleController.getClearanceSaleById);
router.put("/ClearanceSale/updateClearanceSale/:id", clearanceSaleController.updateClearanceSale);
router.delete("/ClearanceSale/deleteClearanceSale/:id", clearanceSaleController.deleteClearanceSale);

//Routes for Announcements
router.post("/Announcements/createAnnouncement", announcementController.createAnnouncement);
router.get("/Announcements/getAllAnnouncements", announcementController.getAllAnnouncements);
router.get("/Announcements/getAnnouncementById/:id", announcementController.getAnnouncementById);
router.put("/Announcements/updateAnnouncement/:id", announcementController.updateAnnouncement);
router.delete("/Announcements/deleteAnnouncement/:id", announcementController.deleteAnnouncement);

//Routes for Notifications



// Message-related routes
router.post("/send-message",helpSupportController.sendMessage);
router.get("/inbox", helpSupportController.getInbox);

// Ticket-related routes
router.post("/create-ticket", helpSupportController.createTicket);
router.patch("/update-ticket/:ticketId", helpSupportController.updateTicket);
router.get("/tickets", helpSupportController.getTickets);
router.get("/ticket/:ticketId", helpSupportController.getTicketById);


module.exports = router