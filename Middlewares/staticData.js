const mongoose = require('mongoose');
const User = require('../Models/userModel');
const Role = require('../Models/Roles/roleModel')
const Permission = require('../Models/Roles/permission');
const MasterModule = require('../Models/Roles/masterModuleModel');
const MasterPermissions = require('../Models/Roles/modulePermissions');
const assignedPermissions = require('../Models/Roles/assignedPermissions');
const bcrypt = require('bcryptjs');

async function setupInitialData() {
  // Check if the SuperAdmin role exists
  let role = await Role.findOne({ name: 'Admin' });
  if (!role) {
    role = new Role({ name: 'Admin' });
    await role.save();
  }

  // Check if the SuperAdmin user exists
  let user = await User.findOne({ email: 'admin@admin.com' });
  if (!user) {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    user = new User({
      fullName: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      phoneNumber: '1234567890',
      role: role._id,
    });
    await user.save();
  }

  // Define permissions
  const permissions = ['Create', 'Read', 'Update', 'Delete'];
  for (const perm of permissions) {
    let permission = await Permission.findOne({ name: perm });
    if (!permission) {
      permission = new Permission({ name: perm });
      await permission.save();
    }
  }

  // Define master modules
  const modules = [
    'Dashboard',
    'Order management',
    'Promotion management',
    'Reports & analytics',
    'System settings',
    'Pos management',
    'Product management',
    'Help & support section',
    'User management',
  ];
  for (const moduleName of modules) {
    let module = await MasterModule.findOne({ modulename: moduleName });
    if (!module) {
      module = new MasterModule({ modulename: moduleName });
      await module.save();
    }
  }

  // Assign permissions to modules
  for (const moduleName of modules) {
    const module = await MasterModule.findOne({ modulename: moduleName });
    if (module) {
      const modulePermissions = await Permission.find();
      let masterPermission = await MasterPermissions.findOne({ moduleId: module._id });
      if (!masterPermission) {
        masterPermission = new MasterPermissions({
          moduleId: module._id,
          permissions: modulePermissions.map(p => p._id)
        });
        await masterPermission.save();
      }
    }
  }

    // Create CenterAdminModule
    const assignedPermission = await assignedPermissions.findOne({ userId: user._id });
    const userId = user._id
    if (!assignedPermission) {

        // Retrieve all modules and permissions from the database
        const modules = await MasterModule.find().exec();
        const permissions = await Permission.find().exec();
        // Ensure we have modules and permissions
        if (!modules.length || !permissions.length) {
            //return res.status(404).json({ error: 'No modules or permissions found' });
            console.log('No modules or permissions found');
            
        }

        // Map permissions to their IDs for easy lookup
        const permissionMap = permissions.reduce((map, permission) => {
            map[permission._id] = permission._id;
            return map;
        }, {});

        // Construct modulePermissions array
        const modulePermissions = modules.map(module => {
            // For simplicity, assume each module should get all permissions
            const modulePermission = {
                moduleId: module._id,
                permissions: permissions.map(permission => permission._id)
            };
            return modulePermission;
        });


        // Create and save the CenterAdminModule document
        const newAssignedPermissions = new assignedPermissions({
            userId,
            modulePermissions
        });

        await newAssignedPermissions.save();
        //res.status(201).json({ message: 'Permissionsassigned created successfully', data: newAssignedPermissions });
        console.log('Permissionsassigned created successfully')//, 'data :', newAssignedPermissions);
        

    } else {
      console.log('permissions for Admin already exists for Admin:')//, assignedPermission);
    }

  console.log('Setup completed successfully');
}

module.exports = setupInitialData;
