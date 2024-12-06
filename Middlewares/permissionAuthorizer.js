// middleware/permissionMiddleware.js
const User = require('../Models/userModel');
const AssignedPermissions = require('../Models/Roles/assignedPermissions');
const MasterModule = require('../Models/Roles/masterModuleModel');
const MasterPermissions = require('../Models/Roles/modulePermissions');
const Permission = require('../Models/Roles/permission');

// Middleware to check permissions
const checkPermission = (moduleName, permissionName) => async (req, res, next) => {
    try {
        // Assume user ID is available in the request (e.g., set by authentication middleware)
        //console.log("modulename" , moduleName  ,"permissionName" , permissionName);
        
        const userId = req.user.id;
        //console.log(("Permission"));
        
        // Fetch user with roles and permissions
        const user = await User.findById(userId).populate('role');
            
           // if(!(admin.role.name === 'Admin' || admin.role.name === 'SuperAdmin' )) return res.status(404).json('User not found');


        // Fetch the user's center-admin module permissions
        const assignedPermissions = await AssignedPermissions.findOne({ userId: userId })
            .populate('userId')
            .populate('modulePermissions.moduleId')
            .populate('modulePermissions.permissions');

            
        if (!assignedPermissions) return res.status(404).json('assignedPermissions not found');

        // Flatten all permissions
        const userPermissions = assignedPermissions.modulePermissions
            .filter(mod => mod.moduleId.modulename === moduleName)
            .flatMap(mod => mod.permissions.map(perm => perm.name));
        //console.log(userPermissions);
        
        // Check if user has the required permission
        if (userPermissions.includes(permissionName)) {
            next(); // Permission granted, proceed to the route handler
        } else {
            res.status(403).json('Forbidden: You do not have the required permissions');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = checkPermission;
