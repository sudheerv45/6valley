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


module.exports = router