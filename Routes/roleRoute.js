const express = require('express');
const router = express.Router();
const roleController = require('../Controllers/RolesControllers/roleController');
const moduleController = require('../Controllers/RolesControllers/masterModuleController')
const masterpermissionController = require('../Controllers/RolesControllers/masterPermissionsController')
const assignedpermissionsController = require('../Controllers/RolesControllers/assignedPermissionsController')
const permissionController = require('../Controllers/RolesControllers/permissionController')
//const authentication = require('../middlewares/authenticate')
const { adminauthenticate } = require('../Middlewares/authenticate');
 
// Role Routes
router.post('/addroles', adminauthenticate, roleController.addRole);
router.put('/updaterole/:id',adminauthenticate, roleController.updateRole);
router.delete('/deleterole/:id',adminauthenticate, roleController.deleteRole);
router.get('/getallroles', adminauthenticate, roleController.getAllRole);
router.get('/getrole/:id',adminauthenticate, roleController.getRole);
router.patch('/restorerole/:id',adminauthenticate, roleController.restoreRole);
 
//master module Routes
router.post('/addmastermodule',adminauthenticate, moduleController.addmasterModule);
router.put('/updatemastermodule/:id',adminauthenticate, moduleController.updatemasterModule);
router.delete('/deletemastermodule/:id',adminauthenticate, moduleController.deletemasterModule);
router.get('/getallrmastermodule',adminauthenticate, moduleController.getallmasterModule);
router.get('/getmastermodule/:id',adminauthenticate, moduleController.getmasterModule);
router.patch('/restoremastermodule/:id',adminauthenticate, moduleController.restoremasterModule);
 
// master permissions Routes
router.post('/addmasterpermission',adminauthenticate, masterpermissionController.addPermission);
router.put('/updatemasterpermission/:id',adminauthenticate, masterpermissionController.updatePermission);
router.delete('/deletemasterpermission/:id',adminauthenticate, masterpermissionController.deletePermission);
router.get('/getallrmasterpermission',adminauthenticate, masterpermissionController.getAllPermission);
router.get('/getmasterpermission/:id',adminauthenticate, masterpermissionController.getPermission);
router.patch('/restoremastepermission/:id',adminauthenticate, masterpermissionController.restorePermission);
 
// permissions centers Routes
router.post('/addpermissioncenter',adminauthenticate, assignedpermissionsController.addAssignedpermissions);
router.put('/updatepermissioncenter/:id',adminauthenticate, assignedpermissionsController.updateAssignedpermissions);
router.delete('/deletepermissioncenter/:id',adminauthenticate, assignedpermissionsController.deleteAssignedpermissions);
router.get('/getallpermissioncenter',adminauthenticate, assignedpermissionsController.getAllAssignedpermissions);
router.get('/getpermissioncenter/:id',adminauthenticate, assignedpermissionsController.getAssignedpermissions);
router.patch('/restorepermissioncenter/:id',adminauthenticate, assignedpermissionsController.restoreAssignedpermissions);
 
 
// Permission Routes
router.post('/permissions',adminauthenticate, permissionController.addPermission);
router.put('/permissions/:id',adminauthenticate, permissionController.editPermission);
router.delete('/permissions/:id',adminauthenticate, permissionController.deletePermission);
router.get('/permissions',adminauthenticate, permissionController.getPermissions);
router.get('/permissions/:id',adminauthenticate, permissionController.getPermissionById);
 
module.exports = router;