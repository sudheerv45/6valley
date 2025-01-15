const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authenticate'); // Ensure you
const { upload } = require('../Middlewares/fileupload')


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

// Routes for terms and conditions
router.post('/terms&conditions/add', termsAndConditionsController.createTermsAndConditions);
router.get('/terms&conditions/get/:id', termsAndConditionsController.getTermsAndCondition);
router.get('/terms&conditions/getall', termsAndConditionsController.getTermsAndConditions);
router.put('/terms&conditions/update/:id', termsAndConditionsController.updateTermsAndConditions);
router.delete('/terms&conditions/delete/:id', termsAndConditionsController.deleteTermsAndConditions);

// Routes for privacy policy
router.post('/privacypolicy/add', privacypolicyController.createPrivacyPolicy);
router.get('/privacypolicy/getall', privacypolicyController.getPrivacyPolicies);
router.get('/privacypolicy/get/:id', privacypolicyController.getPrivacyPolicy);
router.put('/privacypolicy/update/:id', privacypolicyController.updatePrivacyPolicy);
router.delete('/privacypolicy/delete/:id', privacypolicyController.deletePrivacyPolicy);

// Routes for  refund Policy
router.post('/refundpolicy/add', refundPolicyController.createRefundPolicy);
router.get('/refundpolicy/getall', refundPolicyController.getRefundPolicies);
router.get('/refundpolicy/get/:id', refundPolicyController.getRefundPolicy);
router.put('/refundpolicy/update/:id', refundPolicyController.updateRefundPolicy);
router.delete('/refundpolicy/delete/:id', refundPolicyController.deleteRefundPolicy);

// Routes for return policy
router.post('/returnpolicy/add', returnPolicyController.createReturnPolicy);
router.get('/returnpolicy/getall', returnPolicyController.getReturnPolicies);
router.get('/returnpolicy/get/:id', returnPolicyController.getReturnPolicy);
router.put('/returnpolicy/update/:id', returnPolicyController.updateReturnPolicy);
router.delete('/returnpolicy/delete/:id', returnPolicyController.deleteReturnPolicy);

// Routes for  cancellation policy
router.post('/cancellationpolicy/add', cancellationPolicyController.createCancellationPolicy);
router.get('/cancellationpolicy/getall', cancellationPolicyController.getCancellationPolicies);
router.get('/cancellationpolicy/get/:id', cancellationPolicyController.getCancellationPolicy);
router.put('/cancellationpolicy/update/:id', cancellationPolicyController.updateCancellationPolicy);
router.delete('/cancellationpolicy/delete/:id', cancellationPolicyController.deleteCancellationPolicy);

// Routes for shipping policy
router.post('/shippingpolicy/add', shippingPolicyController.createShippingPolicy);
router.get('/shippingpolicy/getall', shippingPolicyController.getShippingPolicies);
router.get('/shippingpolicy/get/:id', shippingPolicyController.getShippingPolicy);
router.put('/shippingpolicy/update/:id', shippingPolicyController.updateShippingPolicy);
router.delete('/shippingpolicy/delete/:id', shippingPolicyController.deleteShippingPolicy);

// Routes for aboutUs
router.post('/aboutus/add', aboutUsController.createAboutUs);
router.get('/aboutus/getall', aboutUsController.getAboutUs);
router.get('/aboutus/get/:id', aboutUsController.getAboutUsById);
router.put('/aboutus/update/:id', aboutUsController.updateAboutUs);
router.delete('/aboutus/delete/:id', aboutUsController.deleteAboutUs);

//90
//till here testing done all are working fine


// Routes for /help topic
router.post('/helptopic/add', helpTopicController.createHelpTopic);
router.get('/helptopic/getall', helpTopicController.getHelpTopics);
router.get('/helptopic/get/:id', helpTopicController.getHelpTopic);
router.put('/helptopic/update/:id', helpTopicController.updateHelpTopic);
router.delete('/helptopic/delete/:id', helpTopicController.deleteHelpTopic);
router.put('/helptopic/restore/:id', helpTopicController.restoreHelpTopic);
router.put('/helptopic/toggle-status/:id', helpTopicController.toggleHelpTopicStatus);


// Routes for companyreliability
router.post('/companyreliability/add', companyReliabilityController.createCompanyReliability);
router.get('/companyreliability/getall', companyReliabilityController.getCompanyReliabilities);
router.get('/companyreliability/get/:id', companyReliabilityController.getCompanyReliability);
router.put('/companyreliability/update/:id', companyReliabilityController.updateCompanyReliability);
router.delete('/companyreliability/delete/:id', companyReliabilityController.deleteCompanyReliability);
router.put('/companyreliability/restore/:id', companyReliabilityController.restoreCompanyReliability);
router.put('/companyreliability/toggle-status/:id', companyReliabilityController.toggleCompanyReliabilityStatus);


// ROutes for digital payment
const digitalPaymentMethodController = require('../Controllers/System Settings/3rd Party/Payment Methods/digitalPaymentMethodsController');

router.post('/digitalpayment/add', digitalPaymentMethodController.createDigitalPaymentMethod);
router.get('/digitalpayment/getall', digitalPaymentMethodController.getDigitalPaymentMethods);
router.get('/digitalpayment/get/:id', digitalPaymentMethodController.getDigitalPaymentMethod);
router.put('/digitalpayment/update/:id', digitalPaymentMethodController.updateDigitalPaymentMethod);
router.delete('/digitalpayment/delete/:id', digitalPaymentMethodController.deleteDigitalPaymentMethod);
router.put('/digitalpayment/restore/:id', digitalPaymentMethodController.restoreDigitalPaymentMethod);
router.put('/digitalpayment/toggle-status/:id', digitalPaymentMethodController.toggleDigitalPaymentMethodStatus);

// Routes for offline payment
const offlinePaymentMethodController = require('../Controllers/System Settings/3rd Party/Payment Methods/offlinePaymentMethodsController');

router.post('/offlinepayment/add', offlinePaymentMethodController.createOfflinePaymentMethod);
router.get('/offlinepayment/getall', offlinePaymentMethodController.getOfflinePaymentMethods);
router.get('/offlinepayment/get/:id', offlinePaymentMethodController.getOfflinePaymentMethod);
router.put('/offlinepayment/update/:id', offlinePaymentMethodController.updateOfflinePaymentMethod);
router.delete('/offlinepayment/delete/:id', offlinePaymentMethodController.deleteOfflinePaymentMethod);
router.put('/offlinepayment/restore/:id', offlinePaymentMethodController.restoreOfflinePaymentMethod);
router.put('/offlinepayment/toggle-status/:id', offlinePaymentMethodController.toggleOfflinePaymentMethodStatus);

// Routes for Marketing Tool
const marketingToolController = require('../Controllers/System Settings/3rd Party/Marketing Tool/marketingToolController');

router.post('/marketingtool/add', marketingToolController.createMarketingTool);
router.get('/marketingtool/getall', marketingToolController.getMarketingTools);
router.get('/marketingtool/get/:id', marketingToolController.getMarketingTool);
router.put('/marketingtool/update/:id', marketingToolController.updateMarketingTool);
router.delete('/marketingtool/delete/:id', marketingToolController.deleteMarketingTool);
 
router.put('/marketingtool/restore/:id', marketingToolController.restoreMarketingTool);
router.put('/marketingtool/togglestatus/:id', marketingToolController.toggleMarketingToolStatus);

const customerController = require('../Controllers/POS/customerController');


router.post('/customers/add', customerController.addCustomer);
router.get('/customers/getall', customerController.getAllCustomers);
router.get('/customers/get/:id', customerController.getCustomerById);
router.put('/customers/update/:id', customerController.updateCustomer);
router.delete('/customers/delete/:id', customerController.softDeleteCustomer);
router.patch('/customers/restore/:id', customerController.restoreCustomer);

// Routes for Orders
const orderController = require('../Controllers/POS/ordersController');


router.post('/order/add', orderController.createOrder);
router.get('/order/getall', orderController.getOrders);
router.get('/order/get/:id', orderController.getOrder);
router.put('/order/update/:id', orderController.updateOrder);
router.delete('/order/delete/:id', orderController.deleteOrder);
router.put('/order/restore/:id', orderController.restoreOrder);
router.get('/order/status/:status', orderController.getOrdersByStatus);
router.put('/order/updatestatus/:id', orderController.updateOrderStatus);

//42

//Routes for environment Information
const environmentInformationController= require("../Controllers/System Settings/System Setup/System Settings/environmentInformationController");


router.post("/environment/add", environmentInformationController.createOrUpdateEnvironment);
router.get("/environment/get", environmentInformationController.getEnvironmentInformation);

//Routes for appSettings
const appSettingsController = require('../Controllers/System Settings/System Setup/System Settings/appSettingsController');

router.post('/appsettings/add', appSettingsController.createAppSettings);
router.get('/appsettings/getall', appSettingsController.getAppSettings);
router.get('/appsettings/get/:id', appSettingsController.getAppSettingsById);
router.put('/appsettings/update/:id', appSettingsController.updateAppSettings);
router.delete('/appsettings/delete/:id', appSettingsController.deleteAppSettings);
router.put('/appsettings/restore/:id', appSettingsController.restoreAppSettings);

//Routes for software update
const SoftwareUpdateController = require('../Controllers/System Settings/System Setup/System Settings/softwareUpateController');



// Middleware for file upload
router.post('/softwareupdate/add', upload.single('updatedFile'), SoftwareUpdateController.createOrUpdateSoftwareUpdate);
router.get('/softwareupdate/getall', SoftwareUpdateController.getSoftwareUpdates);
router.get('/softwareupdate/get/:id', SoftwareUpdateController.getSoftwareUpdate);
router.put('/softwareupdate/update/:id', SoftwareUpdateController.updateSoftwareUpdate);
router.delete('/softwareupdate/delete/:id', SoftwareUpdateController.deleteSoftwareUpdate);

//Routes for language
const LanguageController = require('../Controllers/System Settings/System Setup/System Settings/languageController');


router.post('/language/add', LanguageController.createLanguage);
router.get('/language/getall', LanguageController.getLanguages);
router.get('/language/get/:id', LanguageController.getLanguage);
router.put('/language/update/:id', LanguageController.updateLanguage);
router.delete('/language/delete/:id', LanguageController.deleteLanguage);
router.post('/language/restore/:id', LanguageController.restoreLanguage);

// Routes for Currency 
const CurrencyController = require('../Controllers/System Settings/System Setup/System Settings/currencyController');


router.post('/currency/add', CurrencyController.createCurrency);
router.get('/currency/getall', CurrencyController.getCurrencies);
router.get('/currency/get/:id', CurrencyController.getCurrency);
router.put('/currency/update/:id', CurrencyController.updateCurrency);
router.delete('/currency/delete/:id', CurrencyController.deleteCurrency);
router.post('/currency/restore/:id', CurrencyController.restoreCurrency);
router.post('/currency/toggle-status/:id', CurrencyController.toggleCurrencyStatus);


//Routes for cookies
const CookieController = require('../Controllers/System Settings/System Setup/System Settings/cookieController');
router.post('/cookie/add', CookieController.createOrUpdateCookie);
router.get('/cookie/getall', CookieController.getCookies);
router.get('/cookie/get/:id', CookieController.getCookie);
router.put('/cookie/update/:id', CookieController.updateCookie);
router.delete('/cookie/delete/:id', CookieController.deleteCookie);
router.post('/cookie/restore/:id', CookieController.restoreCookie);
router.post('/cookie/toggle-status/:id', CookieController.toggleCookieStatus);


// Routes for customer login
const CustomerLoginController = require('../Controllers/System Settings/System Setup/Login Settings/customerLoginController');


router.post('/customer-login/create', CustomerLoginController.createCustomerLogin);
router.get('/customer-login/getall', CustomerLoginController.getCustomerLogins);
router.get('/customer-login/get/:id', CustomerLoginController.getCustomerLogin);
router.put('/customer-login/update/:id', CustomerLoginController.updateCustomerLogin);
router.delete('/customer-login/delete/:id', CustomerLoginController.deleteCustomerLogin);
router.post('/customer-login/restore/:id', CustomerLoginController.restoreCustomerLogin);
router.post('/customer-login/toggle-status/:id', CustomerLoginController.toggleSubLoginTypeStatus);

// Routes for login Attempts and login
const OtpLoginSettingsController = require('../Controllers/System Settings/System Setup/Login Settings/otp&LoginAttemptsController');

router.post('/otp-login-settings/create', OtpLoginSettingsController.createOrUpdateOtpLoginSettings);
router.get('/otp-login-settings/get', OtpLoginSettingsController.getOtpLoginSettings);
router.put('/otp-login-settings/update', OtpLoginSettingsController.updateOtpLoginSettings);
router.delete('/otp-login-settings/delete', OtpLoginSettingsController.deleteOtpLoginSettings);
router.post('/otp-login-settings/restore', OtpLoginSettingsController.restoreOtpLoginSettings);

// Routes fo login url
const LoginUrlController = require('../Controllers/System Settings/System Setup/Login Settings/loginUrlController');
router.post('/login-url/add', LoginUrlController.createLoginUrl);
router.get('/login-url/getall', LoginUrlController.getLoginUrls);
router.get('/login-url/get/:id', LoginUrlController.getLoginUrl);
router.put('/login-url/update/:id', LoginUrlController.updateLoginUrl);
router.delete('/login-url/delete/:id', LoginUrlController.deleteLoginUrl);
router.post('/login-url/restore/:id', LoginUrlController.restoreLoginUrl);


//Routes for theme setup
const ThemeSetupController = require('../Controllers/System Settings/System Setup/Themes&Addons/themeSetupController');

// Upload Middleware

router.post('/theme-setup/add', upload.single('uploadTheme'), ThemeSetupController.createThemeSetup);
router.get('/theme-setup/getall', ThemeSetupController.getThemeSetups);
router.get('/theme-setup/get/:id', ThemeSetupController.getThemeSetup);
router.put('/theme-setup/update/:id', upload.single('uploadTheme'), ThemeSetupController.updateThemeSetup);
router.delete('/theme-setup/delete/:id', ThemeSetupController.deleteThemeSetup);
router.post('/theme-setup/restore/:id', ThemeSetupController.restoreThemeSetup);


//Routes for system addons
const SystemAddonsController = require('../Controllers/System Settings/System Setup/Themes&Addons/systemAddonsController');

// Upload Middleware
//const upload = SystemAddonsController.upload;

router.post('/system-addons/add', upload.single('uploadAddons'), SystemAddonsController.createSystemAddon);
router.get('/system-addons/getall', SystemAddonsController.getSystemAddons);
router.get('/system-addons/get/:id', SystemAddonsController.getSystemAddon);
router.put('/system-addons/update/:id', upload.single('uploadAddons'), SystemAddonsController.updateSystemAddon);
router.delete('/system-addons/delete/:id', SystemAddonsController.deleteSystemAddon);
router.post('/system-addons/restore/:id', SystemAddonsController.restoreSystemAddon);



//Routes for Social media links 
const SocialMediaLinksController = require('../Controllers/System Settings/Pages&Media/Social Media Links/socialMediaLinksController');


router.post('/social-media-links/add', SocialMediaLinksController.createSocialMediaLink);
router.get('/social-media-links/getall', SocialMediaLinksController.getSocialMediaLinks);
router.get('/social-media-links/get/:id', SocialMediaLinksController.getSocialMediaLink);
router.put('/social-media-links/update/:id', SocialMediaLinksController.updateSocialMediaLink);
router.delete('/social-media-links/delete/:id', SocialMediaLinksController.deleteSocialMediaLink);
router.post('/social-media-links/restore/:id', SocialMediaLinksController.restoreSocialMediaLink);
router.post('/social-media-links/toggle-status/:id', SocialMediaLinksController.toggleSocialMediaLinkStatus);


const GalleryController = require('../Controllers/System Settings/Pages&Media/Gallery/galleryController');


// Routes
router.post('/gallery/add', upload.single('uploadFile'), GalleryController.createGalleryItem);
router.get('/gallery/getall', GalleryController.getGalleryItems);
router.get('/gallery/get/:id', GalleryController.getGalleryItem);
router.put('/gallery/update/:id', upload.single('uploadFile'), GalleryController.updateGalleryItem);
router.delete('/gallery/delete/:id', GalleryController.deleteGalleryItem);
router.post('/gallery/restore/:id', GalleryController.restoreGalleryItem);


// Routes for vendor registration
const VendorRegistrationHeaderController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/vendorRegistrationHeaderController');

router.post('/vendorregistrationheader/add', upload.single('image'), VendorRegistrationHeaderController.createVendorRegistrationHeader);
router.get('/vendorregistrationheader/getall', VendorRegistrationHeaderController.getVendorRegistrationHeaders);
router.get('/vendorregistrationheader/get/:id', VendorRegistrationHeaderController.getVendorRegistrationHeader);
router.put('/vendorregistrationheader/update/:id', upload.single('image'), VendorRegistrationHeaderController.updateVendorRegistrationHeader);
router.delete('/vendorregistrationheader/delete/:id', VendorRegistrationHeaderController.deleteVendorRegistrationHeader);
router.post('/vendorregistrationheader/restore/:id', VendorRegistrationHeaderController.restoreVendorRegistrationHeader);


// Routes for Why sell With Us

const WhySellWithUsController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/whySellWithUsController');

router.post('/whysellwithus/add', upload.single('image'), WhySellWithUsController.createWhySellWithUs);
router.get('/whysellwithus/getall', WhySellWithUsController.getWhySellWithUsSections);
router.get('/whysellwithus/get/:id', WhySellWithUsController.getWhySellWithUsSection);
router.put('/whysellwithus/update/:id', upload.single('image'), WhySellWithUsController.updateWhySellWithUs);
router.delete('/whysellwithus/delete/:id', WhySellWithUsController.deleteWhySellWithUs);
router.post('/whysellwithus/restore/:id', WhySellWithUsController.restoreWhySellWithUs);



// Routes for reasons
const ReasonsController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/reasonsController');


router.post('/reasons/add', ReasonsController.createReason);
router.get('/reasons/getall', ReasonsController.getReasons);
router.get('/reasons/get/:id', ReasonsController.getReason);
router.put('/reasons/update/:id', ReasonsController.updateReason);
router.delete('/reasons/delete/:id', ReasonsController.deleteReason);
router.post('/reasons/restore/:id', ReasonsController.restoreReason);
router.post('/reasons/toggle/:id', ReasonsController.toggleReasonStatus);



// Routes for business process controller
const BusinessProcessController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/businessProcessController');


router.post('/businessprocess/add', BusinessProcessController.createBusinessProcess);
router.get('/businessprocess/getall', BusinessProcessController.getAllBusinessProcesses);
router.get('/businessprocess/get/:id', BusinessProcessController.getBusinessProcess);
router.put('/businessprocess/update/:id', BusinessProcessController.updateBusinessProcess);
router.delete('/businessprocess/delete/:id', BusinessProcessController.deleteBusinessProcess);
router.post('/businessprocess/restore/:id', BusinessProcessController.restoreBusinessProcess);


//101
// Routes for download app 
const DownloadAppController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/downloadAppController');

router.post('/downloadapp/add', DownloadAppController.createOrUpdateDownloadApp);
router.get('/downloadapp/getall', DownloadAppController.getAllDownloadApps);
router.get('/downloadapp/get/:id', DownloadAppController.getDownloadApp);
router.delete('/downloadapp/delete/:id', DownloadAppController.deleteDownloadApp);
router.post('/downloadapp/restore/:id', DownloadAppController.restoreDownloadApp);
router.put('/downloadapp/toggle/:id/:buttonType', DownloadAppController.toggleButtonStatus);



// Routes for vendor registration FAQs
const VendorRegistrationFaqController = require('../Controllers/System Settings/Pages&Media/Vendor Registration Controllers/vendorRegistrationFAQControler');

router.post('/vendor-registration-faq/add', VendorRegistrationFaqController.createOrUpdateFaq);
router.get('/vendor-registration-faq/getall', VendorRegistrationFaqController.getAllFaqs);
router.get('/vendor-registration-faq/get/:id', VendorRegistrationFaqController.getFaq);
router.delete('/vendor-registration-faq/delete/:id', VendorRegistrationFaqController.deleteFaq);
router.post('/vendor-registration-faq/restore/:id', VendorRegistrationFaqController.restoreFaq);
router.put('/vendor-registration-faq/toggle-status/:id', VendorRegistrationFaqController.toggleFaqStatus);


// Routes for invoice settings
const InvoiceSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/invoiceSettingsController');

router.post('/invoice-settings/add', upload.single('invoiceLogo'), InvoiceSettingsController.createOrUpdateInvoiceSettings);
router.get('/invoice-settings/get', InvoiceSettingsController.getInvoiceSettings);
router.delete('/invoice-settings/delete/:id', InvoiceSettingsController.deleteInvoiceSettings);
router.post('/invoice-settings/restore/:id', InvoiceSettingsController.restoreInvoiceSettings);
router.put('/invoice-settings/toggle-logo-status/:id', upload.single('invoiceLogo'), InvoiceSettingsController.toggleInvoiceLogoStatus);


// Routes for deliverman settings
const DeliveryManSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/deliveryManSettingsController');

router.post('/delivery-man-settings/add', DeliveryManSettingsController.createOrUpdateDeliveryManSettings);
router.get('/delivery-man-settings/get', DeliveryManSettingsController.getDeliveryManSettings);
router.delete('/delivery-man-settings/delete', DeliveryManSettingsController.deleteDeliveryManSettings);
router.post('/delivery-man-settings/restore/:id', DeliveryManSettingsController.restoreDeliveryManSettings);
router.put('/delivery-man-settings/toggle-upload-picture', DeliveryManSettingsController.toggleUploadPictureOnDelivery);

// Routes for customer settings
const CustomerSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/customerSettingsController');

router.post('/customer-settings/add', CustomerSettingsController.createOrUpdateCustomerSettings);
router.get('/customer-settings/get', CustomerSettingsController.getCustomerSettings);
router.delete('/customer-settings/delete', CustomerSettingsController.deleteCustomerSettings);
router.post('/customer-settings/restore/:id', CustomerSettingsController.restoreCustomerSettings);
router.post('/customer-settings/toggle-customer-wallet', CustomerSettingsController.toggleCustomerWallet);
router.post('/customer-settings/toggle-customer-loyalty-points', CustomerSettingsController.toggleCustomerLoyaltyPoints);
router.post('/customer-settings/toggle-customer-referral-earnings', CustomerSettingsController.toggleCustomerReferralEarnings);
router.post('/customer-settings/toggle-add-refund-amount-to-wallet', CustomerSettingsController.toggleAddRefundAmountToWallet);
router.post('/customer-settings/toggle-add-fund-to-wallet', CustomerSettingsController.toggleAddFundToWallet);



//Routes for vendor setings
const VendorSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/vendorSettingsController');

router.post('/vendor-settings/add', VendorSettingsController.createOrUpdateVendorSettings);
router.get('/vendor-settings/get', VendorSettingsController.getVendorSettings);
router.delete('/vendor-settings/delete', VendorSettingsController.deleteVendorSettings);
router.post('/vendor-settings/restore', VendorSettingsController.restoreVendorSettings);
router.post('/vendor-settings/toggle/enablePOSInVendorPanel', VendorSettingsController.toggleEnablePOSInVendorPanel);
router.post('/vendor-settings/toggle/vendorRegistration', VendorSettingsController.toggleVendorRegistration);
router.post('/vendor-settings/toggle/setMinimumOrderAmount', VendorSettingsController.toggleSetMinimumOrderAmount);
router.post('/vendor-settings/toggle/vendorCanReplyOnReview', VendorSettingsController.toggleVendorCanReplyOnReview);
router.post('/vendor-settings/toggle/newProduct', VendorSettingsController.toggleNewProduct);
router.post('/vendor-settings/toggle/productWiseShippingCost', VendorSettingsController.toggleProductWiseShippingCost);



// Routes for order settings
const OrderSettingsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/orderSettingsController');

router.post('/order-settings/add', OrderSettingsController.createOrUpdateOrderSettings);
router.get('/order-settings/get', OrderSettingsController.getOrderSettings);
router.delete('/order-settings/delete', OrderSettingsController.deleteOrderSettings);
router.post('/order-settings/restore', OrderSettingsController.restoreOrderSettings);
router.post('/order-settings/toggle/orderDeliveryVerification', OrderSettingsController.toggleOrderDeliveryVerification);
router.post('/order-settings/toggle/minimumOrderAmount', OrderSettingsController.toggleMinimumOrderAmount);
router.post('/order-settings/toggle/showBillingAddressInCheckout', OrderSettingsController.toggleShowBillingAddressInCheckout);
router.post('/order-settings/toggle/freeDelivery', OrderSettingsController.toggleFreeDelivery);
router.post('/order-settings/toggle/guestCheckout', OrderSettingsController.toggleGuestCheckout);


// Routes for Payment Options
const PaymentOptionsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/paymentOptionsController');

router.post('/payment-options/add', PaymentOptionsController.addOrUpdatePaymentOptions);
router.get('/payment-options/get', PaymentOptionsController.getPaymentOptions);
router.delete('/payment-options/delete', PaymentOptionsController.deletePaymentOptions);
router.post('/payment-options/restore', PaymentOptionsController.restorePaymentOptions);
router.post('/payment-options/toggle/cashOnDelivery', PaymentOptionsController.toggleCashOnDelivery);
router.post('/payment-options/toggle/digitalPayment', PaymentOptionsController.toggleDigitalPayment);
router.post('/payment-options/toggle/offlinePayment', PaymentOptionsController.toggleOfflinePayment);



// Routes for product setup
const ProductSetupController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/productSetupController');

// CRUD Routes
router.post('/product-setup/add', ProductSetupController.addOrUpdateProductSetup);
router.get('/product-setup/get', ProductSetupController.getProductSetup);
router.delete('/product-setup/delete', ProductSetupController.deleteProductSetup);
router.post('/product-setup/restore', ProductSetupController.restoreProductSetup);
router.post('/product-setup/toggle/sellDigitalProduct', ProductSetupController.toggleSellDigitalProduct);
router.post('/product-setup/toggle/showBrand', ProductSetupController.toggleShowBrand);


const GeneralController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/generalController');

// CRUD Routes
router.post('/general/add', GeneralController.addOrUpdateGeneral);
router.get('/general/get', GeneralController.getGeneral);
router.delete('/general/delete', GeneralController.deleteGeneral);
router.post('/general/restore', GeneralController.restoreGeneral);

// Toggle Routes
router.post('/general/toggle/appleStore', GeneralController.toggleAppleStoreStatus);
router.post('/general/toggle/googlePlayStore', GeneralController.toggleGooglePlayStoreStatus);


const DeliveryRestrictionsController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/deliverRestrictionsController');

// CRUD Routes
router.post('/deliveryRestrictions/add', DeliveryRestrictionsController.addOrUpdateDeliveryRestrictions);
router.get('/deliveryRestrictions/get', DeliveryRestrictionsController.getDeliveryRestrictions);
router.delete('/deliveryRestrictions/delete', DeliveryRestrictionsController.deleteDeliveryRestrictions);
router.post('/deliveryRestrictions/restore', DeliveryRestrictionsController.restoreDeliveryRestrictions);

// Toggle Routes
router.post('/deliveryRestrictions/toggle/deliveryAvailableCountry', DeliveryRestrictionsController.toggleDeliveryAvailableCountry);
router.post('/deliveryRestrictions/toggle/deliveryAvailableZipCodeArea', DeliveryRestrictionsController.toggleDeliveryAvailableZipCodeArea);


const ShippingMethodController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/shippingMethodsController');

// CRUD Routes
router.post('/shippingMethod/add', ShippingMethodController.addOrUpdateShippingMethod);
router.get('/shippingMethod/get', ShippingMethodController.getShippingMethod);
router.delete('/shippingMethod/delete', ShippingMethodController.deleteShippingMethod);
router.post('/shippingMethod/restore', ShippingMethodController.restoreShippingMethod);

// Toggle Routes
router.post('/shippingMethod/toggle/status/:index', ShippingMethodController.toggleShippingDetailStatus);


const PrioritySetupController = require('../Controllers/System Settings/Buisness Setup/BusinessSettingsController/prioritySetupController');


router.post('/priority-setup/add', PrioritySetupController.addOrUpdatePrioritySetup);
router.get('/priority-setup/get', PrioritySetupController.getPrioritySetup);
router.delete('/priority-setup/delete', PrioritySetupController.deletePrioritySetup);
router.patch('/priority-setup/restore', PrioritySetupController.restorePrioritySetup);
router.patch('/priority-setup/toggle/:section/:option', PrioritySetupController.toggleSortingOption);


 const inHouseShopController= require('../Controllers/System Settings/Buisness Setup/inHouseShopControler');
  
  router.post('/houseShop/add', inHouseShopController.createOrUpdateHouseShop);
  router.get('/houseShop/get/:id', inHouseShopController.getHouseShop);
  router.get('/houseShop/get', inHouseShopController.getAllHouseShops);
  router.delete('/houseShop/delete/:id', inHouseShopController.softDeleteHouseShop);
  router.post('/houseShop/restore/:id', inHouseShopController.restoreHouseShop);
  router.post('/houseShop/toggleTemporaryClose/:id', inHouseShopController.toggleTemporaryClose);
  router.post('/houseShop/toggleVacationStatus/:id', inHouseShopController.toggleVacationStatus);

  const socialMediaChatController = require('../Controllers/System Settings/3rd Party/Other Configurations/socialMediaChatController');
  
  router.post('/socialMediaChat/add', socialMediaChatController.createOrUpdateSocialMediaChat);
  router.get('/socialMediaChat/get', socialMediaChatController.getSocialMediaChat);
  router.delete('/socialMediaChat/delete', socialMediaChatController.softDeleteSocialMediaChat);
  router.post('/socialMediaChat/restore', socialMediaChatController.restoreSocialMediaChat);
  router.post('/socialMediaChat/toggleStatus', socialMediaChatController.toggleStatus);

  const storageConnectionsController = require('../Controllers/System Settings/3rd Party/Other Configurations/storageConnectionsController');
  
  router.post('/storageConnections/add', storageConnectionsController.createOrUpdateStorageConnections);
  router.get('/storageConnections/get', storageConnectionsController.getStorageConnections);
  router.delete('/storageConnections/delete', storageConnectionsController.softDeleteStorageConnections);
  router.post('/storageConnections/restore', storageConnectionsController.restoreStorageConnections);
  router.post('/storageConnections/toggleLocalSystem', storageConnectionsController.toggleLocalSystem);
  router.post('/storageConnections/toggleThirdPartyStorage', storageConnectionsController.toggleThirdPartyStorage); 

//103


  const fireBaseAuthController = require('../Controllers/System Settings/3rd Party/Other Configurations/fireBaseAuthController');
  
  router.post('/firebaseAuth/add',fireBaseAuthController.createOrUpdateFirebaseAuth);
  router.get('/firebaseAuth/get', fireBaseAuthController.getFirebaseAuth);
  router.delete('/firebaseAuth/delete', fireBaseAuthController.softDeleteFirebaseAuth);
  router.post('/firebaseAuth/restore', fireBaseAuthController.restoreFirebaseAuth);
  router.post('/firebaseAuth/toggleVerificationStatus', fireBaseAuthController.toggleFirebaseAuthVerificationStatus);

  const googleMapApisController = require('../Controllers/System Settings/3rd Party/Other Configurations/googleMapApisController');
  
  router.post('/googleMapApis/add', googleMapApisController.createOrUpdateGoogleMapApis);
  router.get('/googleMapApis/get', googleMapApisController.getGoogleMapApis);
  router.delete('/googleMapApis/delete', googleMapApisController.softDeleteGoogleMapApis);
  router.post('/googleMapApis/restore', googleMapApisController.restoreGoogleMapApis);
  router.post('/googleMapApis/toggleSetup', googleMapApisController.toggleGoogleMapApiSetup);


  const recaptchaControoler = require('../Controllers/System Settings/3rd Party/Other Configurations/recaptchaController');
  
  router.post('/recaptcha/add', recaptchaControoler.createOrUpdateRecaptcha);
  router.get('/recaptcha/get', recaptchaControoler.getRecaptcha);
  router.delete('/recaptcha/delete', recaptchaControoler.softDeleteRecaptcha);
  router.post('/recaptcha/restore', recaptchaControoler.restoreRecaptcha);
  router.post('/recaptcha/toggleStatus', recaptchaControoler.toggleRecaptchaStatus);


  const socialMediaLoginController = require('../Controllers/System Settings/3rd Party/Other Configurations/socialMediaLoginController');
  
  router.post('/socialMediaLogin/add', socialMediaLoginController.createOrUpdateSocialMediaLogin);
  router.get('/socialMediaLogin/get', socialMediaLoginController.getSocialMediaLogin);
  router.delete('/socialMediaLogin/delete', socialMediaLoginController.softDeleteSocialMediaLogin);
  router.post('/socialMediaLogin/restore', socialMediaLoginController.restoreSocialMediaLogin);

  const mailConfigController = require('../Controllers/System Settings/3rd Party/Other Configurations/mailConfigController');
  
  router.post('/mailConfig/add', mailConfigController.createOrUpdateMailConfig);
  router.get('/mailConfig/get', mailConfigController.getMailConfig);
  router.delete('/mailConfig/delete', mailConfigController.softDeleteMailConfig);
  router.post('/mailConfig/restore', mailConfigController.restoreMailConfig);
  router.post('/mailConfig/toggle-smtp-status', mailConfigController.toggleSmtpStatus);
  router.post('/mailConfig/toggle-sendgrid-status', mailConfigController.toggleSendgridStatus);
  
  const smsConfigController= require('../Controllers/System Settings/3rd Party/Other Configurations/smsConfigController');
  
  router.post('/smsConfig/add', smsConfigController.createOrUpdateSmsConfig);
  router.get('/smsConfig/get', smsConfigController.getSmsConfig);
  router.delete('/smsConfig/delete', smsConfigController.softDeleteSmsConfig);
  router.post('/smsConfig/restore', smsConfigController.restoreSmsConfig);
  router.post('/smsConfig/toggle-status/:section', smsConfigController.toggleStatus);

//30
module.exports = router

// we have to test 276 apis

//90+29 = 119 apis testing done

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