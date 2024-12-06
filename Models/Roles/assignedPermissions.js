const mongoose = require('mongoose');

const assignedPermissionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    modulePermissions: [{
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MasterModule',
            required: true
        },
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }]
    }],
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('AssignedPermissions', assignedPermissionsSchema);
