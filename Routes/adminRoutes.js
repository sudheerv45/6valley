const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authenticate'); // Ensure you
const { upload } = require('../Middlewares/fileupload')
const checkPermission = require('../Middlewares/permissionAuthorizer')
const { adminauthenticate } = require('../Middlewares/authenticate');
 
 
const categoryController = require('../Controllers/Product Management/Category Setup/categoryController');
const userController = require('../Controllers/userController')
const subCategoryController = require('../Controllers/Product Management/Category Setup/subCategoryController');
const subSubCategoryController = require('../Controllers/Product Management/Category Setup/subSubCategoryController');
const brandController = require('../Controllers/Product Management/Brands/brandController');
const deliveryManController = require('../Controllers/deliveryManController');
const emergencyContactController = require('../Controllers/emergencyContactController');
const attributeSetupController = require('../Controllers/Product Management/Product Attribute Setup/attributeSetupController');
const termsAndConditionsController = require('../Controllers/System Settings/Pages&Media/Business Pages/termsAndConditionsController');
const privacypolicyController = require('../Controllers/System Settings/Pages&Media/Business Pages/privacyPolicyController');
const refundPolicyController = require('../Controllers/System Settings/Pages&Media/Business Pages/refundPolicyController');
const returnPolicyController = require('../Controllers/System Settings/Pages&Media/Business Pages/returnPolicyController');
const cancellationPolicyController = require('../Controllers/System Settings/Pages&Media/Business Pages/cancellationPolicyController');
const shippingPolicyController = require('../Controllers/System Settings/Pages&Media/Business Pages/shippingPolicyController');
const aboutUsController = require('../Controllers/System Settings/Pages&Media/Business Pages/aboutUsController');
const helpTopicController = require('../Controllers/System Settings/Pages&Media/Business Pages/helpTopicController');
const companyReliabilityController = require('../Controllers/System Settings/Pages&Media/Business Pages/companyReliabilityController');
 
const socialMediaController = require("../Controllers/socialMediaController");
const bannerController = require("../Controllers/bannerController");
const couponController = require("../Controllers/couponController");
const flashDealController = require("../Controllers/flashDealController");
const dealController = require("../Controllers/dealOfTheDayController");
const featureDealController = require("../Controllers/featureDealController");
const clearanceSaleController = require ("../Controllers/clearanceSaleController");
const announcementController = require("../Controllers/announcementController");
const helpSupportController = require("../Controllers/helpSupportController");
 
 
// User Routes
router.post('/users/create',  adminauthenticate, checkPermission("Product management", "Create"), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'idImage', maxCount: 1 }]), userController.createUser);
router.get('/users/getall',  adminauthenticate, checkPermission("Product management", "Read"), userController.getAllUsers);
router.get('/users/get/:id',  adminauthenticate, checkPermission("Product management", "Read"), userController.getUserById);
router.put('/users/status/:id',  adminauthenticate, checkPermission("Product management", "Update"), userController.userStatus);
router.put('/users/delete/:id',  adminauthenticate, checkPermission("Product management", "Delete"), userController.deleteUserById);
router.post('/users/update/:id',  adminauthenticate, checkPermission("Product management", "Restore"), userController.updateUserById);
router.post('/users/userlogin',   userController.loginUser);
 
// Routes for Categories
router.post('/categories/add',  adminauthenticate, checkPermission("Product management", "Create"), categoryController.addCategory);
router.get('/categories/getall',  adminauthenticate, checkPermission("Product management", "Read"), categoryController.getAllCategories);
router.get('/categories/get/:id',  adminauthenticate, checkPermission("Product management", "Read"), categoryController.getCategoryById);
router.put('/categories/update/:id',  adminauthenticate, checkPermission("Product management", "Update"), categoryController.updateCategory);
router.delete('/categories/delete/:id',  adminauthenticate, checkPermission("Product management", "Delete"), categoryController.deleteCategory);
router.patch('/categories/restore/:id',  adminauthenticate, checkPermission("Product management", "Restore"), categoryController.restoreCategory);
 
// Routes for Subcategories
router.post('/subcategories/add',  adminauthenticate, checkPermission("Product management", "Create"), subCategoryController.addSubCategory);
router.get('/subcategories/getall',  adminauthenticate, checkPermission("Product management", "Read"), subCategoryController.getAllSubCategories);
router.get('/subcategories/get/:id',  adminauthenticate, checkPermission("Product management", "Read"), subCategoryController.getSubCategoryById);
router.get('/subcategories/filter',  adminauthenticate, checkPermission("Product management", "Read"), subCategoryController.getSubCategoryByName);
router.put('/subcategories/update/:id',  adminauthenticate, checkPermission("Product management", "Update"), subCategoryController.updateSubCategory);
router.delete('/subcategories/delete/:id',  adminauthenticate, checkPermission("Product management", "Delete"), subCategoryController.deleteSubCategory);
router.patch('/subcategories/restore/:id',  adminauthenticate, checkPermission("Product management", "Restore"), subCategoryController.restoreSubCategory);
 
// Routes for SubSubCategories
router.post('/subSubCategories/add',  adminauthenticate, checkPermission("Product management", "Create"), subSubCategoryController.addSubSubCategory);
router.get('/subSubCategories/getall',  adminauthenticate, checkPermission("Product management", "Read"), subSubCategoryController.getSubSubCategories);
router.get('/subSubCategories/get/:id',  adminauthenticate, checkPermission("Product management", "Read"), subSubCategoryController.getSubSubCategoryById);
router.put('/subSubCategories/update/:id',  adminauthenticate, checkPermission("Product management", "Update"), subSubCategoryController.updateSubSubCategory);
router.delete('/subSubCategories/delete/:id',  adminauthenticate, checkPermission("Product management", "Delete"), subSubCategoryController.deleteSubSubCategory);
router.patch('/subSubCategories/restore/:id',  adminauthenticate, checkPermission("Product management", "Restore"), subSubCategoryController.restoreSubSubCategory);
router.get('/subSubCategories/get',  adminauthenticate, checkPermission("Product management", "Read"), subSubCategoryController.getSubSubCategoriesByCategory);
 
// Routes for Brands
router.post('/brands/add',  adminauthenticate, checkPermission("Product management", "Create"), brandController.addBrand);
router.get('/brands/getall',  adminauthenticate, checkPermission("Product management", "Read"), brandController.getBrands);
router.get('/brands/get/:id',  adminauthenticate, checkPermission("Product management", "Read"), brandController.getBrandById);
router.put('/brands/update/:id',  adminauthenticate, checkPermission("Product management", "Update"), brandController.updateBrand);
router.delete('/brands/delete/:id',  adminauthenticate, checkPermission("Product management", "Delete"), brandController.deleteBrand);
router.patch('/brands/restore/:id',  adminauthenticate, checkPermission("Product management", "Restore"), brandController.restoreBrand);
router.get('/brands/name/:brandName',  adminauthenticate, checkPermission("Product management", "Read"), brandController.getBrandByName);
 
// Routes for Delivery Man
router.post('/deliveryman/add',  adminauthenticate, checkPermission("User management", "Create"), deliveryManController.createDeliveryMan);
router.get('/deliveryman/getall',  adminauthenticate, checkPermission("User management", "Read"), deliveryManController.getDeliveryMen);
router.get('/deliveryman/get/:id',  adminauthenticate, checkPermission("User management", "Read"), deliveryManController.getDeliveryManById);
router.put('/deliveryman/update/:id',  adminauthenticate, checkPermission("User management", "Update"), deliveryManController.updateDeliveryMan);
router.patch('/deliveryman/softdelete/:id',  adminauthenticate, checkPermission("User management", "Delete"), deliveryManController.softDeleteDeliveryMan);
router.patch('/deliveryman/restore/:id',  adminauthenticate, checkPermission("User management", "Restore"), deliveryManController.restoreDeliveryMan);
router.delete('/deliveryman/delete/:id',  adminauthenticate, checkPermission("User management", "Delete"), deliveryManController.permanentDeleteDeliveryMan);
 
 
 
 
 
 
// Emergency Contact Routes
router.post('/emergencycontact/add', adminauthenticate, checkPermission("Product management", "Create"), emergencyContactController.createEmergencyContact);
router.get('/emergencycontact/getall', adminauthenticate, checkPermission("Product management", "Read"), emergencyContactController.getEmergencyContacts);
router.get('/emergencycontact/get/:id', adminauthenticate, checkPermission("Product management", "Read"), emergencyContactController.getEmergencyContactById);
router.put('/emergencycontact/update/:id', adminauthenticate, checkPermission("Product management", "Update"), emergencyContactController.updateEmergencyContact);
router.patch('/emergencycontact/softdelete/:id', adminauthenticate, checkPermission("Product management", "Delete"), emergencyContactController.softDeleteEmergencyContact);
router.patch('/emergencycontact/restore/:id', adminauthenticate, checkPermission("Product management", "Restore"), emergencyContactController.restoreEmergencyContact);
router.patch('/emergencycontact/status/:id', adminauthenticate, checkPermission("Product management", "Update"), emergencyContactController.toggleEmergencyContactStatus);
 
// Attribute Routes
router.post('/attributes/add', adminauthenticate, checkPermission("Product management", "Create"), attributeSetupController.createAttribute);
router.get('/attributes/getall', adminauthenticate, checkPermission("Product management", "Read"), attributeSetupController.getAttributes);
router.get('/attributes/get/:id', adminauthenticate, checkPermission("Product management", "Read"), attributeSetupController.getAttributeById);
router.put('/attributes/update/:id', adminauthenticate, checkPermission("Product management", "Update"), attributeSetupController.updateAttribute);
router.patch('/attributes/softdelete/:id', adminauthenticate, checkPermission("Product management", "Delete"), attributeSetupController.softDeleteAttribute);
router.patch('/attributes/restore/:id', adminauthenticate, checkPermission("Product management", "Restore"), attributeSetupController.restoreAttribute);
router.delete('/attributes/delete/:id', adminauthenticate, checkPermission("Product management", "Permanent Delete"), attributeSetupController.permanentDeleteAttribute);
 
// Terms and Conditions Routes
router.post('/terms&conditions/add', adminauthenticate, checkPermission("System settings", "Create"), termsAndConditionsController.createTermsAndConditions);
router.get('/terms&conditions/get/:id', adminauthenticate, checkPermission("System settings", "Read"), termsAndConditionsController.getTermsAndCondition);
router.get('/terms&conditions/getall', adminauthenticate, checkPermission("System settings", "Read"), termsAndConditionsController.getTermsAndConditions);
router.put('/terms&conditions/update/:id', adminauthenticate, checkPermission("System settings", "Update"), termsAndConditionsController.updateTermsAndConditions);
router.delete('/terms&conditions/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), termsAndConditionsController.deleteTermsAndConditions);
 
// Privacy Policy Routes
router.post('/privacypolicy/add', adminauthenticate, checkPermission("System settings", "Create"), privacypolicyController.createPrivacyPolicy);
router.get('/privacypolicy/getall', adminauthenticate, checkPermission("System settings", "Read"), privacypolicyController.getPrivacyPolicies);
router.get('/privacypolicy/get/:id', adminauthenticate, checkPermission("System settings", "Read"), privacypolicyController.getPrivacyPolicy);
router.put('/privacypolicy/update/:id', adminauthenticate, checkPermission("System settings", "Update"), privacypolicyController.updatePrivacyPolicy);
router.delete('/privacypolicy/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), privacypolicyController.deletePrivacyPolicy);
 
// Refund Policy Routes
router.post('/refundpolicy/add', adminauthenticate, checkPermission("System settings", "Create"), refundPolicyController.createRefundPolicy);
router.get('/refundpolicy/getall', adminauthenticate, checkPermission("System settings", "Read"), refundPolicyController.getRefundPolicies);
router.get('/refundpolicy/get/:id', adminauthenticate, checkPermission("System settings", "Read"), refundPolicyController.getRefundPolicy);
router.put('/refundpolicy/update/:id', adminauthenticate, checkPermission("System settings", "Update"), refundPolicyController.updateRefundPolicy);
router.delete('/refundpolicy/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), refundPolicyController.deleteRefundPolicy);
 
// Return Policy Routes
router.post('/returnpolicy/add', adminauthenticate, checkPermission("System settings", "Create"), returnPolicyController.createReturnPolicy);
router.get('/returnpolicy/getall', adminauthenticate, checkPermission("System settings", "Read"), returnPolicyController.getReturnPolicies);
router.get('/returnpolicy/get/:id', adminauthenticate, checkPermission("System settings", "Read"), returnPolicyController.getReturnPolicy);
router.put('/returnpolicy/update/:id', adminauthenticate, checkPermission("System settings", "Update"), returnPolicyController.updateReturnPolicy);
router.delete('/returnpolicy/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), returnPolicyController.deleteReturnPolicy);
 
// Cancellation Policy Routes
router.post('/cancellationpolicy/add', adminauthenticate, checkPermission("System settings", "Create"), cancellationPolicyController.createCancellationPolicy);
router.get('/cancellationpolicy/getall', adminauthenticate, checkPermission("System settings", "Read"), cancellationPolicyController.getCancellationPolicies);
router.get('/cancellationpolicy/get/:id', adminauthenticate, checkPermission("System settings", "Read"), cancellationPolicyController.getCancellationPolicy);
router.put('/cancellationpolicy/update/:id', adminauthenticate, checkPermission("System settings", "Update"), cancellationPolicyController.updateCancellationPolicy);
router.delete('/cancellationpolicy/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), cancellationPolicyController.deleteCancellationPolicy);
 
// Shipping Policy Routes
router.post('/shippingpolicy/add', adminauthenticate, checkPermission("System settings", "Create"), shippingPolicyController.createShippingPolicy);
router.get('/shippingpolicy/getall', adminauthenticate, checkPermission("System settings", "Read"), shippingPolicyController.getShippingPolicies);
router.get('/shippingpolicy/get/:id', adminauthenticate, checkPermission("System settings", "Read"), shippingPolicyController.getShippingPolicy);
router.put('/shippingpolicy/update/:id', adminauthenticate, checkPermission("System settings", "Update"), shippingPolicyController.updateShippingPolicy);
router.delete('/shippingpolicy/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), shippingPolicyController.deleteShippingPolicy);
 
// About Us Routes
router.post('/aboutus/add', adminauthenticate, checkPermission("System settings", "Create"), aboutUsController.createAboutUs);
router.get('/aboutus/getall', adminauthenticate, checkPermission("System settings", "Read"), aboutUsController.getAboutUs);
router.get('/aboutus/get/:id', adminauthenticate, checkPermission("System settings", "Read"), aboutUsController.getAboutUsById);
router.put('/aboutus/update/:id', adminauthenticate, checkPermission("System settings", "Update"), aboutUsController.updateAboutUs);
router.delete('/aboutus/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), aboutUsController.deleteAboutUs);
 
// Help Topic Routes
router.post('/helptopic/add', adminauthenticate, checkPermission("System settings", "Create"), helpTopicController.createHelpTopic);
router.get('/helptopic/getall', adminauthenticate, checkPermission("System settings", "Read"), helpTopicController.getHelpTopics);
router.get('/helptopic/get/:id', adminauthenticate, checkPermission("System settings", "Read"), helpTopicController.getHelpTopic);
router.put('/helptopic/update/:id', adminauthenticate, checkPermission("System settings", "Update"), helpTopicController.updateHelpTopic);
router.delete('/helptopic/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), helpTopicController.deleteHelpTopic);
router.put('/helptopic/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), helpTopicController.restoreHelpTopic);
router.put('/helptopic/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), helpTopicController.toggleHelpTopicStatus);
 
 
 
// Routes for companyreliability
router.post('/companyreliability/add', adminauthenticate, checkPermission("System settings", "Create"), companyReliabilityController.createCompanyReliability);
router.get('/companyreliability/getall', adminauthenticate, checkPermission("System settings", "Read"), companyReliabilityController.getCompanyReliabilities);
router.get('/companyreliability/get/:id', adminauthenticate, checkPermission("System settings", "Read"), companyReliabilityController.getCompanyReliability);
router.put('/companyreliability/update/:id', adminauthenticate, checkPermission("System settings", "Update"), companyReliabilityController.updateCompanyReliability);
router.delete('/companyreliability/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), companyReliabilityController.deleteCompanyReliability);
router.put('/companyreliability/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), companyReliabilityController.restoreCompanyReliability);
router.put('/companyreliability/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), companyReliabilityController.toggleCompanyReliabilityStatus);
 
const digitalPaymentMethodController = require("../Controllers/System Settings/3rd Party/Payment Methods/digitalPaymentMethodsController")
// Routes for digital payment
router.post('/digitalpayment/add', adminauthenticate, checkPermission("System settings", "Create"), digitalPaymentMethodController.createDigitalPaymentMethod);
router.get('/digitalpayment/getall', adminauthenticate, checkPermission("System settings", "Read"), digitalPaymentMethodController.getDigitalPaymentMethods);
router.get('/digitalpayment/get/:id', adminauthenticate, checkPermission("System settings", "Read"), digitalPaymentMethodController.getDigitalPaymentMethod);
router.put('/digitalpayment/update/:id', adminauthenticate, checkPermission("System settings", "Update"), digitalPaymentMethodController.updateDigitalPaymentMethod);
router.delete('/digitalpayment/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), digitalPaymentMethodController.deleteDigitalPaymentMethod);
router.put('/digitalpayment/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), digitalPaymentMethodController.restoreDigitalPaymentMethod);
router.put('/digitalpayment/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), digitalPaymentMethodController.toggleDigitalPaymentMethodStatus);
 
 
const offlinePaymentMethodController = require("../Controllers/System Settings/3rd Party/Payment Methods/offlinePaymentMethodsController")
// Routes for offline payment
router.post('/offlinepayment/add', adminauthenticate, checkPermission("System settings", "Create"), offlinePaymentMethodController.createOfflinePaymentMethod);
router.get('/offlinepayment/getall', adminauthenticate, checkPermission("System settings", "Read"), offlinePaymentMethodController.getOfflinePaymentMethods);
router.get('/offlinepayment/get/:id', adminauthenticate, checkPermission("System settings", "Read"), offlinePaymentMethodController.getOfflinePaymentMethod);
router.put('/offlinepayment/update/:id', adminauthenticate, checkPermission("System settings", "Update"), offlinePaymentMethodController.updateOfflinePaymentMethod);
router.delete('/offlinepayment/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), offlinePaymentMethodController.deleteOfflinePaymentMethod);
router.put('/offlinepayment/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), offlinePaymentMethodController.restoreOfflinePaymentMethod);
router.put('/offlinepayment/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), offlinePaymentMethodController.toggleOfflinePaymentMethodStatus);
 
 
const marketingToolController = require("../Controllers/System Settings/3rd Party/Marketing Tool/marketingToolController")
// Routes for Marketing Tool
router.post('/marketingtool/add', adminauthenticate, checkPermission("System settings", "Create"), marketingToolController.createMarketingTool);
router.get('/marketingtool/getall', adminauthenticate, checkPermission("System settings", "Read"), marketingToolController.getMarketingTools);
router.get('/marketingtool/get/:id', adminauthenticate, checkPermission("System settings", "Read"), marketingToolController.getMarketingTool);
router.put('/marketingtool/update/:id', adminauthenticate, checkPermission("System settings", "Update"), marketingToolController.updateMarketingTool);
router.delete('/marketingtool/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), marketingToolController.deleteMarketingTool);
router.put('/marketingtool/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), marketingToolController.restoreMarketingTool);
router.put('/marketingtool/togglestatus/:id', adminauthenticate, checkPermission("System settings", "Update"), marketingToolController.toggleMarketingToolStatus);
 
 
const customerController = require("../Controllers/POS/customerController")
// Routes for customers
router.post('/customers/add', adminauthenticate, checkPermission("User management", "Create"), customerController.addCustomer);
router.get('/customers/getall', adminauthenticate, checkPermission("User management", "Read"), customerController.getAllCustomers);
router.get('/customers/get/:id', adminauthenticate, checkPermission("User management", "Read"), customerController.getCustomerById);
router.put('/customers/update/:id', adminauthenticate, checkPermission("User management", "Update"), customerController.updateCustomer);
router.delete('/customers/delete/:id', adminauthenticate, checkPermission("User management", "Delete"), customerController.softDeleteCustomer);
router.patch('/customers/restore/:id', adminauthenticate, checkPermission("User management", "Restore"), customerController.restoreCustomer);
 
 
const orderController = require("../Controllers/POS/ordersController")
// Routes for Orders
router.post('/order/add', adminauthenticate, checkPermission("Order management", "Create"), orderController.createOrder);
router.get('/order/getall', adminauthenticate, checkPermission("Order management", "Read"), orderController.getOrders);
router.get('/order/get/:id', adminauthenticate, checkPermission("Order management", "Read"), orderController.getOrder);
router.put('/order/update/:id', adminauthenticate, checkPermission("Order management", "Update"), orderController.updateOrder);
router.delete('/order/delete/:id', adminauthenticate, checkPermission("Order management", "Delete"), orderController.deleteOrder);
router.put('/order/restore/:id', adminauthenticate, checkPermission("Order management", "Restore"), orderController.restoreOrder);
router.get('/order/status/:status', adminauthenticate, checkPermission("Order management", "Read"), orderController.getOrdersByStatus);
router.put('/order/updatestatus/:id', adminauthenticate, checkPermission("Order management", "Update"), orderController.updateOrderStatus);
 
 
const environmentInformationController = require("../Controllers/System Settings/System Setup/System Settings/environmentInformationController")
// Routes for environment Information
router.post("/environment/add", adminauthenticate, checkPermission("System settings", "Create"), environmentInformationController.createOrUpdateEnvironment);
router.get("/environment/get", adminauthenticate, checkPermission("System settings", "Read"), environmentInformationController.getEnvironmentInformation);
 
 
const appSettingsController = require("../Controllers/System Settings/System Setup/System Settings/appSettingsController")
// Routes for appSettings
router.post('/appsettings/add', adminauthenticate, checkPermission("System settings", "Create"), appSettingsController.createAppSettings);
router.get('/appsettings/getall', adminauthenticate, checkPermission("System settings", "Read"), appSettingsController.getAppSettings);
router.get('/appsettings/get/:id', adminauthenticate, checkPermission("System settings", "Read"), appSettingsController.getAppSettingsById);
router.put('/appsettings/update/:id', adminauthenticate, checkPermission("System settings", "Update"), appSettingsController.updateAppSettings);
router.delete('/appsettings/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), appSettingsController.deleteAppSettings);
router.put('/appsettings/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), appSettingsController.restoreAppSettings);
 
 
 
// Routes for software update
const SoftwareUpdateController = require('../Controllers/System Settings/System Setup/System Settings/softwareUpateController');
 
// Middleware for file upload
router.post('/softwareupdate/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('updatedFile'), SoftwareUpdateController.createOrUpdateSoftwareUpdate);
router.get('/softwareupdate/getall', adminauthenticate, checkPermission("System settings", "Read"), SoftwareUpdateController.getSoftwareUpdates);
router.get('/softwareupdate/get/:id', adminauthenticate, checkPermission("System settings", "Read"), SoftwareUpdateController.getSoftwareUpdate);
router.put('/softwareupdate/update/:id', adminauthenticate, checkPermission("System settings", "Update"), SoftwareUpdateController.updateSoftwareUpdate);
router.delete('/softwareupdate/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), SoftwareUpdateController.deleteSoftwareUpdate);
 
// Routes for language
const LanguageController = require('../Controllers/System Settings/System Setup/System Settings/languageController');
 
router.post('/language/add', adminauthenticate, checkPermission("System settings", "Create"), LanguageController.createLanguage);
router.get('/language/getall', adminauthenticate, checkPermission("System settings", "Read"), LanguageController.getLanguages);
router.get('/language/get/:id', adminauthenticate, checkPermission("System settings", "Read"), LanguageController.getLanguage);
router.put('/language/update/:id', adminauthenticate, checkPermission("System settings", "Update"), LanguageController.updateLanguage);
router.delete('/language/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), LanguageController.deleteLanguage);
router.post('/language/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), LanguageController.restoreLanguage);
 
// Routes for Currency
const CurrencyController = require('../Controllers/System Settings/System Setup/System Settings/currencyController');
 
router.post('/currency/add', adminauthenticate, checkPermission("System settings", "Create"), CurrencyController.createCurrency);
router.get('/currency/getall', adminauthenticate, checkPermission("System settings", "Read"), CurrencyController.getCurrencies);
router.get('/currency/get/:id', adminauthenticate, checkPermission("System settings", "Read"), CurrencyController.getCurrency);
router.put('/currency/update/:id', adminauthenticate, checkPermission("System settings", "Update"), CurrencyController.updateCurrency);
router.delete('/currency/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), CurrencyController.deleteCurrency);
router.post('/currency/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), CurrencyController.restoreCurrency);
router.post('/currency/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), CurrencyController.toggleCurrencyStatus);
 
// Routes for cookies
const CookieController = require('../Controllers/System Settings/System Setup/System Settings/cookieController');
 
router.post('/cookie/add', adminauthenticate, checkPermission("System settings", "Create"), CookieController.createOrUpdateCookie);
router.get('/cookie/getall', adminauthenticate, checkPermission("System settings", "Read"), CookieController.getCookies);
router.get('/cookie/get/:id', adminauthenticate, checkPermission("System settings", "Read"), CookieController.getCookie);
router.put('/cookie/update/:id', adminauthenticate, checkPermission("System settings", "Update"), CookieController.updateCookie);
router.delete('/cookie/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), CookieController.deleteCookie);
router.post('/cookie/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), CookieController.restoreCookie);
router.post('/cookie/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), CookieController.toggleCookieStatus);
 
// Routes for customer login
const CustomerLoginController = require('../Controllers/System Settings/System Setup/Login Settings/customerLoginController');
 
router.post('/customer-login/create', adminauthenticate, checkPermission("System settings", "Create"), CustomerLoginController.createCustomerLogin);
router.get('/customer-login/getall', adminauthenticate, checkPermission("System settings", "Read"), CustomerLoginController.getCustomerLogins);
router.get('/customer-login/get/:id', adminauthenticate, checkPermission("System settings", "Read"), CustomerLoginController.getCustomerLogin);
router.put('/customer-login/update/:id', adminauthenticate, checkPermission("System settings", "Update"), CustomerLoginController.updateCustomerLogin);
router.delete('/customer-login/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), CustomerLoginController.deleteCustomerLogin);
router.post('/customer-login/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), CustomerLoginController.restoreCustomerLogin);
router.post('/customer-login/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), CustomerLoginController.toggleSubLoginTypeStatus);
 
// Routes for login Attempts and login
const OtpLoginSettingsController = require('../Controllers/System Settings/System Setup/Login Settings/otp&LoginAttemptsController');
 
router.post('/otp-login-settings/create', adminauthenticate, checkPermission("System settings", "Create"), OtpLoginSettingsController.createOrUpdateOtpLoginSettings);
router.get('/otp-login-settings/get', adminauthenticate, checkPermission("System settings", "Read"), OtpLoginSettingsController.getOtpLoginSettings);
router.put('/otp-login-settings/update', adminauthenticate, checkPermission("System settings", "Update"), OtpLoginSettingsController.updateOtpLoginSettings);
router.delete('/otp-login-settings/delete', adminauthenticate, checkPermission("System settings", "Delete"), OtpLoginSettingsController.deleteOtpLoginSettings);
router.post('/otp-login-settings/restore', adminauthenticate, checkPermission("System settings", "Restore"), OtpLoginSettingsController.restoreOtpLoginSettings);
 
// Routes for login url
const LoginUrlController = require('../Controllers/System Settings/System Setup/Login Settings/loginUrlController');
 
router.post('/login-url/add', adminauthenticate, checkPermission("System settings", "Create"), LoginUrlController.createLoginUrl);
router.get('/login-url/getall', adminauthenticate, checkPermission("System settings", "Read"), LoginUrlController.getLoginUrls);
router.get('/login-url/get/:id', adminauthenticate, checkPermission("System settings", "Read"), LoginUrlController.getLoginUrl);
router.put('/login-url/update/:id', adminauthenticate, checkPermission("System settings", "Update"), LoginUrlController.updateLoginUrl);
router.delete('/login-url/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), LoginUrlController.deleteLoginUrl);
router.post('/login-url/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), LoginUrlController.restoreLoginUrl);
 
// Routes for theme setup
const ThemeSetupController = require('../Controllers/System Settings/System Setup/Themes&Addons/themeSetupController');
 
// Upload Middleware
router.post('/theme-setup/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('uploadTheme'), ThemeSetupController.createThemeSetup);
router.get('/theme-setup/getall', adminauthenticate, checkPermission("System settings", "Read"), ThemeSetupController.getThemeSetups);
router.get('/theme-setup/get/:id', adminauthenticate, checkPermission("System settings", "Read"), ThemeSetupController.getThemeSetup);
router.put('/theme-setup/update/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('uploadTheme'), ThemeSetupController.updateThemeSetup);
router.delete('/theme-setup/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), ThemeSetupController.deleteThemeSetup);
router.post('/theme-setup/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), ThemeSetupController.restoreThemeSetup);
 
// Routes for system addons
const SystemAddonsController = require('../Controllers/System Settings/System Setup/Themes&Addons/systemAddonsController');
 
// Upload Middleware
router.post('/system-addons/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('uploadAddons'), SystemAddonsController.createSystemAddon);
router.get('/system-addons/getall', adminauthenticate, checkPermission("System settings", "Read"), SystemAddonsController.getSystemAddons);
router.get('/system-addons/get/:id', adminauthenticate, checkPermission("System settings", "Read"), SystemAddonsController.getSystemAddon);
router.put('/system-addons/update/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('uploadAddons'), SystemAddonsController.updateSystemAddon);
router.delete('/system-addons/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), SystemAddonsController.deleteSystemAddon);
router.post('/system-addons/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), SystemAddonsController.restoreSystemAddon);
 
// Routes for Social media links
const SocialMediaLinksController = require('../Controllers/System Settings/Pages&Media/Social Media Links/socialMediaLinksController');
 
router.post('/social-media-links/add', adminauthenticate, checkPermission("System settings", "Create"), SocialMediaLinksController.createSocialMediaLink);
router.get('/social-media-links/getall', adminauthenticate, checkPermission("System settings", "Read"), SocialMediaLinksController.getSocialMediaLinks);
router.get('/social-media-links/get/:id', adminauthenticate, checkPermission("System settings", "Read"), SocialMediaLinksController.getSocialMediaLink);
router.put('/social-media-links/update/:id', adminauthenticate, checkPermission("System settings", "Update"), SocialMediaLinksController.updateSocialMediaLink);
router.delete('/social-media-links/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), SocialMediaLinksController.deleteSocialMediaLink);
router.post('/social-media-links/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), SocialMediaLinksController.restoreSocialMediaLink);
router.post('/social-media-links/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), SocialMediaLinksController.toggleSocialMediaLinkStatus);
 
 
//tiil here completed
 
 
// Routes for Gallery
const GalleryController = require('../Controllers/System Settings/Pages&Media/Gallery/galleryController');
 
// Gallery Routes
router.post('/gallery/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('uploadFile'), GalleryController.createGalleryItem);
router.get('/gallery/getall', adminauthenticate, checkPermission("System settings", "Read"), GalleryController.getGalleryItems);
router.get('/gallery/get/:id', adminauthenticate, checkPermission("System settings", "Read"), GalleryController.getGalleryItem);
router.put('/gallery/update/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('uploadFile'), GalleryController.updateGalleryItem);
router.delete('/gallery/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), GalleryController.deleteGalleryItem);
router.post('/gallery/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), GalleryController.restoreGalleryItem);
 
// Routes for Vendor Registration Header
const VendorRegistrationHeaderController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/vendorRegistrationHeaderController');
 
router.post('/vendorregistrationheader/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('image'), VendorRegistrationHeaderController.createVendorRegistrationHeader);
router.get('/vendorregistrationheader/getall', adminauthenticate, checkPermission("System settings", "Read"), VendorRegistrationHeaderController.getVendorRegistrationHeaders);
router.get('/vendorregistrationheader/get/:id', adminauthenticate, checkPermission("System settings", "Read"), VendorRegistrationHeaderController.getVendorRegistrationHeader);
router.put('/vendorregistrationheader/update/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('image'), VendorRegistrationHeaderController.updateVendorRegistrationHeader);
router.delete('/vendorregistrationheader/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), VendorRegistrationHeaderController.deleteVendorRegistrationHeader);
router.post('/vendorregistrationheader/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), VendorRegistrationHeaderController.restoreVendorRegistrationHeader);
 
// Routes for Why Sell With Us
const WhySellWithUsController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/whySellWithUsController');
 
router.post('/whysellwithus/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('image'), WhySellWithUsController.createWhySellWithUs);
router.get('/whysellwithus/getall', adminauthenticate, checkPermission("System settings", "Read"), WhySellWithUsController.getWhySellWithUsSections);
router.get('/whysellwithus/get/:id', adminauthenticate, checkPermission("System settings", "Read"), WhySellWithUsController.getWhySellWithUsSection);
router.put('/whysellwithus/update/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('image'), WhySellWithUsController.updateWhySellWithUs);
router.delete('/whysellwithus/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), WhySellWithUsController.deleteWhySellWithUs);
router.post('/whysellwithus/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), WhySellWithUsController.restoreWhySellWithUs);
 
// Routes for Reasons
const ReasonsController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/reasonsController');
 
router.post('/reasons/add', adminauthenticate, checkPermission("System settings", "Create"), ReasonsController.createReason);
router.get('/reasons/getall', adminauthenticate, checkPermission("System settings", "Read"), ReasonsController.getReasons);
router.get('/reasons/get/:id', adminauthenticate, checkPermission("System settings", "Read"), ReasonsController.getReason);
router.put('/reasons/update/:id', adminauthenticate, checkPermission("System settings", "Update"), ReasonsController.updateReason);
router.delete('/reasons/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), ReasonsController.deleteReason);
router.post('/reasons/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), ReasonsController.restoreReason);
router.post('/reasons/toggle/:id', adminauthenticate, checkPermission("System settings", "Update"), ReasonsController.toggleReasonStatus);
 
// Routes for Business Process
const BusinessProcessController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/businessProcessController');
 
router.post('/businessprocess/add', adminauthenticate, checkPermission("System settings", "Create"), BusinessProcessController.createBusinessProcess);
router.get('/businessprocess/getall', adminauthenticate, checkPermission("System settings", "Read"), BusinessProcessController.getAllBusinessProcesses);
router.get('/businessprocess/get/:id', adminauthenticate, checkPermission("System settings", "Read"), BusinessProcessController.getBusinessProcess);
router.put('/businessprocess/update/:id', adminauthenticate, checkPermission("System settings", "Update"), BusinessProcessController.updateBusinessProcess);
router.delete('/businessprocess/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), BusinessProcessController.deleteBusinessProcess);
router.post('/businessprocess/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), BusinessProcessController.restoreBusinessProcess);
 
// Routes for Download App
const DownloadAppController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/downloadAppController');
 
router.post('/downloadapp/add', adminauthenticate, checkPermission("System settings", "Create"), DownloadAppController.createOrUpdateDownloadApp);
router.get('/downloadapp/getall', adminauthenticate, checkPermission("System settings", "Read"), DownloadAppController.getAllDownloadApps);
router.get('/downloadapp/get/:id', adminauthenticate, checkPermission("System settings", "Read"), DownloadAppController.getDownloadApp);
router.delete('/downloadapp/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), DownloadAppController.deleteDownloadApp);
router.post('/downloadapp/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), DownloadAppController.restoreDownloadApp);
router.put('/downloadapp/toggle/:id/:buttonType', adminauthenticate, checkPermission("System settings", "Update"), DownloadAppController.toggleButtonStatus);
 
// Routes for Vendor Registration FAQs
const VendorRegistrationFaqController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/vendorRegistrationFAQControler');
 
router.post('/vendor-registration-faq/add', adminauthenticate, checkPermission("System settings", "Create"), VendorRegistrationFaqController.createOrUpdateFaq);
router.get('/vendor-registration-faq/getall', adminauthenticate, checkPermission("System settings", "Read"), VendorRegistrationFaqController.getAllFaqs);
router.get('/vendor-registration-faq/get/:id', adminauthenticate, checkPermission("System settings", "Read"), VendorRegistrationFaqController.getFaq);
router.delete('/vendor-registration-faq/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), VendorRegistrationFaqController.deleteFaq);
router.post('/vendor-registration-faq/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), VendorRegistrationFaqController.restoreFaq);
router.put('/vendor-registration-faq/toggle-status/:id', adminauthenticate, checkPermission("System settings", "Update"), VendorRegistrationFaqController.toggleFaqStatus);
 
// Routes for Invoice Settings
const InvoiceSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/invoiceSettingsController');
 
router.post('/invoice-settings/add', adminauthenticate, checkPermission("System settings", "Create"), upload.single('invoiceLogo'), InvoiceSettingsController.createOrUpdateInvoiceSettings);
router.get('/invoice-settings/get', adminauthenticate, checkPermission("System settings", "Read"), InvoiceSettingsController.getInvoiceSettings);
router.delete('/invoice-settings/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), InvoiceSettingsController.deleteInvoiceSettings);
router.post('/invoice-settings/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), InvoiceSettingsController.restoreInvoiceSettings);
router.put('/invoice-settings/toggle-logo-status/:id', adminauthenticate, checkPermission("System settings", "Update"), upload.single('invoiceLogo'), InvoiceSettingsController.toggleInvoiceLogoStatus);
 
// Routes for Delivery Man Settings
const DeliveryManSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/deliveryManSettingsController');
 
router.post('/delivery-man-settings/add', adminauthenticate, checkPermission("System settings", "Create"), DeliveryManSettingsController.createOrUpdateDeliveryManSettings);
router.get('/delivery-man-settings/get', adminauthenticate, checkPermission("System settings", "Read"), DeliveryManSettingsController.getDeliveryManSettings);
router.delete('/delivery-man-settings/delete', adminauthenticate, checkPermission("System settings", "Delete"), DeliveryManSettingsController.deleteDeliveryManSettings);
router.post('/delivery-man-settings/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), DeliveryManSettingsController.restoreDeliveryManSettings);
router.put('/delivery-man-settings/toggle-upload-picture', adminauthenticate, checkPermission("System settings", "Update"), DeliveryManSettingsController.toggleUploadPictureOnDelivery);
 
// Routes for Customer Settings
const CustomerSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/customerSettingsController');
 
router.post('/customer-settings/add', adminauthenticate, checkPermission("System settings", "Create"), CustomerSettingsController.createOrUpdateCustomerSettings);
router.get('/customer-settings/get', adminauthenticate, checkPermission("System settings", "Read"), CustomerSettingsController.getCustomerSettings);
router.delete('/customer-settings/delete', adminauthenticate, checkPermission("System settings", "Delete"), CustomerSettingsController.deleteCustomerSettings);
router.post('/customer-settings/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), CustomerSettingsController.restoreCustomerSettings);
router.post('/customer-settings/toggle-customer-wallet', adminauthenticate, checkPermission("System settings", "Update"), CustomerSettingsController.toggleCustomerWallet);
router.post('/customer-settings/toggle-customer-loyalty-points', adminauthenticate, checkPermission("System settings", "Update"), CustomerSettingsController.toggleCustomerLoyaltyPoints);
router.post('/customer-settings/toggle-customer-referral-earnings', adminauthenticate, checkPermission("System settings", "Update"), CustomerSettingsController.toggleCustomerReferralEarnings);
router.post('/customer-settings/toggle-add-refund-amount-to-wallet', adminauthenticate, checkPermission("System settings", "Update"), CustomerSettingsController.toggleAddRefundAmountToWallet);
router.post('/customer-settings/toggle-add-fund-to-wallet', adminauthenticate, checkPermission("System settings", "Update"), CustomerSettingsController.toggleAddFundToWallet);
 
// Routes for Vendor Settings
const VendorSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/vendorSettingsController');
 
router.post('/vendor-settings/add', adminauthenticate, checkPermission("System settings", "Create"), VendorSettingsController.createOrUpdateVendorSettings);
router.get('/vendor-settings/get', adminauthenticate, checkPermission("System settings", "Read"), VendorSettingsController.getVendorSettings);
router.delete('/vendor-settings/delete', adminauthenticate, checkPermission("System settings", "Delete"), VendorSettingsController.deleteVendorSettings);
router.post('/vendor-settings/restore', adminauthenticate, checkPermission("System settings", "Restore"), VendorSettingsController.restoreVendorSettings);
router.post('/vendor-settings/toggle/enablePOSInVendorPanel', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleEnablePOSInVendorPanel);
router.post('/vendor-settings/toggle/vendorRegistration', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleVendorRegistration);
router.post('/vendor-settings/toggle/setMinimumOrderAmount', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleSetMinimumOrderAmount);
router.post('/vendor-settings/toggle/vendorCanReplyOnReview', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleVendorCanReplyOnReview);
router.post('/vendor-settings/toggle/newProduct', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleNewProduct);
router.post('/vendor-settings/toggle/productWiseShippingCost', adminauthenticate, checkPermission("System settings", "Update"), VendorSettingsController.toggleProductWiseShippingCost);
 
 
 
 
// Routes for Order Settings
const OrderSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/orderSettingsController');
 
router.post('/order-settings/add', adminauthenticate, checkPermission("System settings", "Create"), OrderSettingsController.createOrUpdateOrderSettings);
router.get('/order-settings/get', adminauthenticate, checkPermission("System settings", "Read"), OrderSettingsController.getOrderSettings);
router.delete('/order-settings/delete', adminauthenticate, checkPermission("System settings", "Delete"), OrderSettingsController.deleteOrderSettings);
router.post('/order-settings/restore', adminauthenticate, checkPermission("System settings", "Restore"), OrderSettingsController.restoreOrderSettings);
router.post('/order-settings/toggle/orderDeliveryVerification', adminauthenticate, checkPermission("System settings", "Update"), OrderSettingsController.toggleOrderDeliveryVerification);
router.post('/order-settings/toggle/minimumOrderAmount', adminauthenticate, checkPermission("System settings", "Update"), OrderSettingsController.toggleMinimumOrderAmount);
router.post('/order-settings/toggle/showBillingAddressInCheckout', adminauthenticate, checkPermission("System settings", "Update"), OrderSettingsController.toggleShowBillingAddressInCheckout);
router.post('/order-settings/toggle/freeDelivery', adminauthenticate, checkPermission("System settings", "Update"), OrderSettingsController.toggleFreeDelivery);
router.post('/order-settings/toggle/guestCheckout', adminauthenticate, checkPermission("System settings", "Update"), OrderSettingsController.toggleGuestCheckout);
 
// Routes for Payment Options
const PaymentOptionsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/paymentOptionsController');
 
router.post('/payment-options/add', adminauthenticate, checkPermission("System settings", "Create"), PaymentOptionsController.addOrUpdatePaymentOptions);
router.get('/payment-options/get', adminauthenticate, checkPermission("System settings", "Read"), PaymentOptionsController.getPaymentOptions);
router.delete('/payment-options/delete', adminauthenticate, checkPermission("System settings", "Delete"), PaymentOptionsController.deletePaymentOptions);
router.post('/payment-options/restore', adminauthenticate, checkPermission("System settings", "Restore"), PaymentOptionsController.restorePaymentOptions);
router.post('/payment-options/toggle/cashOnDelivery', adminauthenticate, checkPermission("System settings", "Update"), PaymentOptionsController.toggleCashOnDelivery);
router.post('/payment-options/toggle/digitalPayment', adminauthenticate, checkPermission("System settings", "Update"), PaymentOptionsController.toggleDigitalPayment);
router.post('/payment-options/toggle/offlinePayment', adminauthenticate, checkPermission("System settings", "Update"), PaymentOptionsController.toggleOfflinePayment);
 
// Routes for Product Setup
const ProductSetupController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/productSetupController');
 
router.post('/product-setup/add', adminauthenticate, checkPermission("System settings", "Create"), ProductSetupController.addOrUpdateProductSetup);
router.get('/product-setup/get', adminauthenticate, checkPermission("System settings", "Read"), ProductSetupController.getProductSetup);
router.delete('/product-setup/delete', adminauthenticate, checkPermission("System settings", "Delete"), ProductSetupController.deleteProductSetup);
router.post('/product-setup/restore', adminauthenticate, checkPermission("System settings", "Restore"), ProductSetupController.restoreProductSetup);
router.post('/product-setup/toggle/sellDigitalProduct', adminauthenticate, checkPermission("System settings", "Update"), ProductSetupController.toggleSellDigitalProduct);
router.post('/product-setup/toggle/showBrand', adminauthenticate, checkPermission("System settings", "Update"), ProductSetupController.toggleShowBrand);
 
// Routes for General Settings
const GeneralController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/generalController');
 
router.post('/general/add', adminauthenticate, checkPermission("System settings", "Create"), GeneralController.addOrUpdateGeneral);
router.get('/general/get', adminauthenticate, checkPermission("System settings", "Read"), GeneralController.getGeneral);
router.delete('/general/delete', adminauthenticate, checkPermission("System settings", "Delete"), GeneralController.deleteGeneral);
router.post('/general/restore', adminauthenticate, checkPermission("System settings", "Restore"), GeneralController.restoreGeneral);
 
// Toggle Routes for General Settings
router.post('/general/toggle/appleStore', adminauthenticate, checkPermission("System settings", "Update"), GeneralController.toggleAppleStoreStatus);
router.post('/general/toggle/googlePlayStore', adminauthenticate, checkPermission("System settings", "Update"), GeneralController.toggleGooglePlayStoreStatus);
 
// Routes for Delivery Restrictions
const DeliveryRestrictionsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/deliverRestrictionsController');
 
router.post('/deliveryRestrictions/add', adminauthenticate, checkPermission("System settings", "Create"), DeliveryRestrictionsController.addOrUpdateDeliveryRestrictions);
router.get('/deliveryRestrictions/get', adminauthenticate, checkPermission("System settings", "Read"), DeliveryRestrictionsController.getDeliveryRestrictions);
router.delete('/deliveryRestrictions/delete', adminauthenticate, checkPermission("System settings", "Delete"), DeliveryRestrictionsController.deleteDeliveryRestrictions);
router.post('/deliveryRestrictions/restore', adminauthenticate, checkPermission("System settings", "Restore"), DeliveryRestrictionsController.restoreDeliveryRestrictions);
 
// Toggle Routes for Delivery Restrictions
router.post('/deliveryRestrictions/toggle/deliveryAvailableCountry', adminauthenticate, checkPermission("System settings", "Update"), DeliveryRestrictionsController.toggleDeliveryAvailableCountry);
router.post('/deliveryRestrictions/toggle/deliveryAvailableZipCodeArea', adminauthenticate, checkPermission("System settings", "Update"), DeliveryRestrictionsController.toggleDeliveryAvailableZipCodeArea);
 
// Routes for Shipping Methods
const ShippingMethodController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/shippingMethodsController');
 
router.post('/shippingMethod/add', adminauthenticate, checkPermission("System settings", "Create"), ShippingMethodController.addOrUpdateShippingMethod);
router.get('/shippingMethod/get', adminauthenticate, checkPermission("System settings", "Read"), ShippingMethodController.getShippingMethod);
router.delete('/shippingMethod/delete', adminauthenticate, checkPermission("System settings", "Delete"), ShippingMethodController.deleteShippingMethod);
router.post('/shippingMethod/restore', adminauthenticate, checkPermission("System settings", "Restore"), ShippingMethodController.restoreShippingMethod);
 
// Toggle Routes for Shipping Methods
router.post('/shippingMethod/toggle/status/:index', adminauthenticate, checkPermission("System settings", "Update"), ShippingMethodController.toggleShippingDetailStatus);
 
// Routes for Priority Setup
const PrioritySetupController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/prioritySetupController');
 
router.post('/priority-setup/add', adminauthenticate, checkPermission("System settings", "Create"), PrioritySetupController.addOrUpdatePrioritySetup);
router.get('/priority-setup/get', adminauthenticate, checkPermission("System settings", "Read"), PrioritySetupController.getPrioritySetup);
router.delete('/priority-setup/delete', adminauthenticate, checkPermission("System settings", "Delete"), PrioritySetupController.deletePrioritySetup);
router.patch('/priority-setup/restore', adminauthenticate, checkPermission("System settings", "Restore"), PrioritySetupController.restorePrioritySetup);
router.patch('/priority-setup/toggle/:section/:option', adminauthenticate, checkPermission("System settings", "Update"), PrioritySetupController.toggleSortingOption);
 
// Routes for In-House Shop
const inHouseShopController = require('../Controllers/System Settings/Buisness Setup/inHouseShopControler');
 
router.post('/houseShop/add', adminauthenticate, checkPermission("System settings", "Create"), inHouseShopController.createOrUpdateHouseShop);
router.get('/houseShop/get/:id', adminauthenticate, checkPermission("System settings", "Read"), inHouseShopController.getHouseShop);
router.get('/houseShop/get', adminauthenticate, checkPermission("System settings", "Read"), inHouseShopController.getAllHouseShops);
router.delete('/houseShop/delete/:id', adminauthenticate, checkPermission("System settings", "Delete"), inHouseShopController.softDeleteHouseShop);
router.post('/houseShop/restore/:id', adminauthenticate, checkPermission("System settings", "Restore"), inHouseShopController.restoreHouseShop);
router.post('/houseShop/toggleTemporaryClose/:id', adminauthenticate, checkPermission("System settings", "Update"), inHouseShopController.toggleTemporaryClose);
router.post('/houseShop/toggleVacationStatus/:id', adminauthenticate, checkPermission("System settings", "Update"), inHouseShopController.toggleVacationStatus);
 
 
 // Routes for Social Media Chat
const socialMediaChatController = require('../Controllers/System Settings/3rd Party/Other Configurations/socialMediaChatController');
 
router.post('/socialMediaChat/add', adminauthenticate, checkPermission("System settings", "Create"), socialMediaChatController.createOrUpdateSocialMediaChat);
router.get('/socialMediaChat/get', adminauthenticate, checkPermission("System settings", "Read"), socialMediaChatController.getSocialMediaChat);
router.delete('/socialMediaChat/delete', adminauthenticate, checkPermission("System settings", "Delete"), socialMediaChatController.softDeleteSocialMediaChat);
router.post('/socialMediaChat/restore', adminauthenticate, checkPermission("System settings", "Restore"), socialMediaChatController.restoreSocialMediaChat);
router.post('/socialMediaChat/toggleStatus', adminauthenticate, checkPermission("System settings", "Update"), socialMediaChatController.toggleStatus);
 
// Routes for Storage Connections
const storageConnectionsController = require('../Controllers/System Settings/3rd Party/Other Configurations/storageConnectionsController');
 
router.post('/storageConnections/add', adminauthenticate, checkPermission("System settingss", "Create"), storageConnectionsController.createOrUpdateStorageConnections);
router.get('/storageConnections/get', adminauthenticate, checkPermission("System settings", "Read"), storageConnectionsController.getStorageConnections);
router.delete('/storageConnections/delete', adminauthenticate, checkPermission("System settings", "Delete"), storageConnectionsController.softDeleteStorageConnections);
router.post('/storageConnections/restore', adminauthenticate, checkPermission("System settings", "Restore"), storageConnectionsController.restoreStorageConnections);
router.post('/storageConnections/toggleLocalSystem', adminauthenticate, checkPermission("System settings", "Update"), storageConnectionsController.toggleLocalSystem);
router.post('/storageConnections/toggleThirdPartyStorage', adminauthenticate, checkPermission("System settings", "Update"), storageConnectionsController.toggleThirdPartyStorage);
 
// Routes for Firebase Authentication
const fireBaseAuthController = require('../Controllers/System Settings/3rd Party/Other Configurations/fireBaseAuthController');
 
router.post('/firebaseAuth/add', adminauthenticate, checkPermission("System settings", "Create"), fireBaseAuthController.createOrUpdateFirebaseAuth);
router.get('/firebaseAuth/get', adminauthenticate, checkPermission("System settings", "Read"), fireBaseAuthController.getFirebaseAuth);
router.delete('/firebaseAuth/delete', adminauthenticate, checkPermission("System settings", "Delete"), fireBaseAuthController.softDeleteFirebaseAuth);
router.post('/firebaseAuth/restore', adminauthenticate, checkPermission("System settings", "Restore"), fireBaseAuthController.restoreFirebaseAuth);
router.post('/firebaseAuth/toggleVerificationStatus', adminauthenticate, checkPermission("System settings", "Update"), fireBaseAuthController.toggleFirebaseAuthVerificationStatus);
 
// Routes for Google Map APIs
const googleMapApisController = require('../Controllers/System Settings/3rd Party/Other Configurations/googleMapApisController');
 
router.post('/googleMapApis/add', adminauthenticate, checkPermission("System settings", "Create"), googleMapApisController.createOrUpdateGoogleMapApis);
router.get('/googleMapApis/get', adminauthenticate, checkPermission("System settings", "Read"), googleMapApisController.getGoogleMapApis);
router.delete('/googleMapApis/delete', adminauthenticate, checkPermission("System settings", "Delete"), googleMapApisController.softDeleteGoogleMapApis);
router.post('/googleMapApis/restore', adminauthenticate, checkPermission("System settings", "Restore"), googleMapApisController.restoreGoogleMapApis);
router.post('/googleMapApis/toggleSetup', adminauthenticate, checkPermission("System settings", "Update"), googleMapApisController.toggleGoogleMapApiSetup);
 
// Routes for ReCAPTCHA
const recaptchaControoler = require('../Controllers/System Settings/3rd Party/Other Configurations/recaptchaController');
 
router.post('/recaptcha/add', adminauthenticate, checkPermission("System settings", "Create"), recaptchaControoler.createOrUpdateRecaptcha);
router.get('/recaptcha/get', adminauthenticate, checkPermission("System settings", "Read"), recaptchaControoler.getRecaptcha);
router.delete('/recaptcha/delete', adminauthenticate, checkPermission("System settings", "Delete"), recaptchaControoler.softDeleteRecaptcha);
router.post('/recaptcha/restore', adminauthenticate, checkPermission("System settings", "Restore"), recaptchaControoler.restoreRecaptcha);
router.post('/recaptcha/toggleStatus', adminauthenticate, checkPermission("System settings", "Update"), recaptchaControoler.toggleRecaptchaStatus);
 
// Routes for Social Media Login
const socialMediaLoginController = require('../Controllers/System Settings/3rd Party/Other Configurations/socialMediaLoginController');
 
router.post('/socialMediaLogin/add', adminauthenticate, checkPermission("System settings", "Create"), socialMediaLoginController.createOrUpdateSocialMediaLogin);
router.get('/socialMediaLogin/get', adminauthenticate, checkPermission("System settings", "Read"), socialMediaLoginController.getSocialMediaLogin);
router.delete('/socialMediaLogin/delete', adminauthenticate, checkPermission("System settings", "Delete"), socialMediaLoginController.softDeleteSocialMediaLogin);
router.post('/socialMediaLogin/restore', adminauthenticate, checkPermission("System settings", "Restore"), socialMediaLoginController.restoreSocialMediaLogin);
 
// Routes for Mail Config
const mailConfigController = require('../Controllers/System Settings/3rd Party/Other Configurations/mailConfigController');
 
router.post('/mailConfig/add', adminauthenticate, checkPermission("System settings", "Create"), mailConfigController.createOrUpdateMailConfig);
router.get('/mailConfig/get', adminauthenticate, checkPermission("System settings", "Read"), mailConfigController.getMailConfig);
router.delete('/mailConfig/delete', adminauthenticate, checkPermission("System settings", "Delete"), mailConfigController.softDeleteMailConfig);
router.post('/mailConfig/restore', adminauthenticate, checkPermission("System settings", "Restore"), mailConfigController.restoreMailConfig);
router.post('/mailConfig/toggle-smtp-status', adminauthenticate, checkPermission("System settings", "Update"), mailConfigController.toggleSmtpStatus);
router.post('/mailConfig/toggle-sendgrid-status', adminauthenticate, checkPermission("System settings", "Update"), mailConfigController.toggleSendgridStatus);
 
// Routes for SMS Config
const smsConfigController = require('../Controllers/System Settings/3rd Party/Other Configurations/smsConfigController');
 
router.post('/smsConfig/add', adminauthenticate, checkPermission("System settings", "Create"), smsConfigController.createOrUpdateSmsConfig);
router.get('/smsConfig/get', adminauthenticate, checkPermission("System settings", "Read"), smsConfigController.getSmsConfig);
router.delete('/smsConfig/delete', adminauthenticate, checkPermission("System settings", "Delete"), smsConfigController.softDeleteSmsConfig);
router.post('/smsConfig/restore', adminauthenticate, checkPermission("System settings", "Restore"), smsConfigController.restoreSmsConfig);
router.post('/smsConfig/toggle-status/:section', adminauthenticate, checkPermission("System settings", "Update"), smsConfigController.toggleStatus);
 
 
//30
 
 
// we have to test 276 apis
 
//90+29 = 119 apis testing done
 
 
// Routes for Social Media Links
// router.post("/socialmedia/addSocialMedia", adminauthenticate, checkPermission("Social Media", "Create"), socialMediaController.addSocialMedia);
// router.get("/socialmedia/getAllSocialMedia", adminauthenticate, checkPermission("Social Media", "Read"), socialMediaController.getAllSocialMedia);
// router.put("/socialmedia/updateSocialMedia/:id", adminauthenticate, checkPermission("Social Media", "Update"), socialMediaController.updateSocialMedia);
// router.delete("/socialmedia/deleteSocialMedia/:id", adminauthenticate, checkPermission("Social Media", "Delete"), socialMediaController.deleteSocialMedia);
// router.patch("/socialmedia/toggleStatus/:id/status", adminauthenticate, checkPermission("Social Media", "Update"), socialMediaController.toggleStatus);
 
// Routes for Banner
router.post("/banner/createBanner", adminauthenticate, checkPermission("Promotion management", "Create"), upload.single("image"), bannerController.createBanner);
router.get("/banner/getBanners", adminauthenticate, checkPermission("Promotion management", "Read"), bannerController.getBanners);
router.delete("/banner/deleteBanner/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), bannerController.deleteBanner);
router.put("/banner/updateBanner/:id", adminauthenticate, checkPermission("Promotion management", "Update"), upload.single("image"), bannerController.updateBanner);
 
// Routes for Coupons
router.get("/coupons/generateCouponCode", adminauthenticate, checkPermission("Promotion management", "Generate"), couponController.generateCouponCode);
router.post("/coupons/createCoupon", adminauthenticate, checkPermission("Promotion management", "Create"), couponController.createCoupon);
router.get("/coupons/getAllCoupons", adminauthenticate, checkPermission("Promotion management", "Read"), couponController.getAllCoupons);
router.get("/coupons/getCouponById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), couponController.getCouponById);
router.put("/coupons/updateCoupon/:id", adminauthenticate, checkPermission("Promotion management", "Update"), couponController.updateCoupon);
router.delete("/coupons/deleteCoupon/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), couponController.deleteCoupon);
router.patch("/coupons/:id/status", adminauthenticate, checkPermission("Promotion management", "Update"), couponController.toggleCouponStatus);
 
// Routes for Flash Deals
router.post("/FlashDeals/createFlashDeal", adminauthenticate, checkPermission("Promotion management", "Create"), upload.single("image"), flashDealController.createFlashDeal);
router.get("/FlashDeals/getAllFlashDeals", adminauthenticate, checkPermission("Promotion management", "Read"), flashDealController.getAllFlashDeals);
router.get("/FlashDeals/getFlashDealById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), flashDealController.getFlashDealById);
router.put("/FlashDeals/updateFlashDeal/:id", adminauthenticate, checkPermission("Promotion management", "Update"), upload.single("image"), flashDealController.updateFlashDeal);
router.delete("/FlashDeals/deleteFlashDeal/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), flashDealController.deleteFlashDeal);
 
// Routes for Deal of the Day
router.post("/DealOfTheDay/createDeal", adminauthenticate, checkPermission("Promotion management", "Create"), dealController.createDeal);
router.get("/DealOfTheDay/getAllDeals", adminauthenticate, checkPermission("Promotion management", "Read"), dealController.getAllDeals);
router.get("/DealOfTheDay/getDealById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), dealController.getDealById);
router.put("/DealOfTheDay/updateDeal/:id", adminauthenticate, checkPermission("Promotion management", "Update"), dealController.updateDeal);
router.delete("/DealOfTheDay/deleteDeal/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), dealController.deleteDeal);
 
// Routes for Feature Deal
router.post("/Featuredeal/createFeatureDeal", adminauthenticate, checkPermission("Promotion management", "Create"), featureDealController.createFeatureDeal);
router.get("/Featuredeal/getAllFeatureDeals", adminauthenticate, checkPermission("Promotion management", "Read"), featureDealController.getAllFeatureDeals);
router.get("/Featuredeal/getFeatureDealById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), featureDealController.getFeatureDealById);
router.put("/Featuredeal/updateFeatureDeal/:id", adminauthenticate, checkPermission("Promotion management", "Update"), featureDealController.updateFeatureDeal);
router.delete("/Featuredeal/deleteFeatureDeal/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), featureDealController.deleteFeatureDeal);
 
// Routes for Clearance Sale
router.post("/ClearanceSale/createClearanceSale", adminauthenticate, checkPermission("Promotion management", "Create"), clearanceSaleController.createClearanceSale);
router.get("/ClearanceSale/getAllClearanceSales", adminauthenticate, checkPermission("Promotion management", "Read"), clearanceSaleController.getAllClearanceSales);
router.get("/ClearanceSale/getClearanceSaleById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), clearanceSaleController.getClearanceSaleById);
router.put("/ClearanceSale/updateClearanceSale/:id", adminauthenticate, checkPermission("Promotion management", "Update"), clearanceSaleController.updateClearanceSale);
router.delete("/ClearanceSale/deleteClearanceSale/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), clearanceSaleController.deleteClearanceSale);
 
// Routes for Announcements
router.post("/Announcements/createAnnouncement", adminauthenticate, checkPermission("Promotion management", "Create"), announcementController.createAnnouncement);
router.get("/Announcements/getAllAnnouncements", adminauthenticate, checkPermission("Promotion management", "Read"), announcementController.getAllAnnouncements);
router.get("/Announcements/getAnnouncementById/:id", adminauthenticate, checkPermission("Promotion management", "Read"), announcementController.getAnnouncementById);
router.put("/Announcements/updateAnnouncement/:id", adminauthenticate, checkPermission("Promotion management", "Update"), announcementController.updateAnnouncement);
router.delete("/Announcements/deleteAnnouncement/:id", adminauthenticate, checkPermission("Promotion management", "Delete"), announcementController.deleteAnnouncement);
 
// Routes for Notifications
 
// Message-related routes
router.post("/send-message", adminauthenticate, checkPermission("Help & support section", "Create"), helpSupportController.sendMessage);
router.get("/inbox", adminauthenticate, checkPermission("Help & support section", "Read"), helpSupportController.getInbox);
 
// Ticket-related routes
router.post("/create-ticket", adminauthenticate, checkPermission("Help & support section", "Create"), helpSupportController.createTicket);
router.patch("/update-ticket/:ticketId", adminauthenticate, checkPermission("Help & support section", "Update"), helpSupportController.updateTicket);
router.get("/tickets", adminauthenticate, checkPermission("Help & support section", "Read"), helpSupportController.getTickets);
router.get("/ticket/:ticketId", adminauthenticate, checkPermission("Help & support section", "Read"), helpSupportController.getTicketById);
 
 
module.exports = router
 