const AssignedPermissions = require('../../Models/Roles/assignedPermissions');

// Create a new AssignedPermissions
const addAssignedpermissions = async (req, res) => {
    try {
        let assignedPermissions;

    
            const { userId, modulePermissions } = req.body;
            assignedPermissions = new AssignedPermissions({ userId, modulePermissions });
       

        await assignedPermissions.save();
        res.status(201).json({ status: true, data: assignedPermissions });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get all AssignedPermissionss (excluding soft-deleted ones)
const getAllAssignedpermissions = async (req, res) => {
    try {
        const assignedPermissionss = await AssignedPermissions.find({ deletedAt: null })
            .populate('userId')
            .populate('modulePermissions.moduleId')
            .populate('modulePermissions.permissions');
        
        res.status(200).json({ status: true, data: assignedPermissionss });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get a single AssignedPermissions by ID (excluding soft-deleted ones)
const getAssignedpermissions = async (req, res) => {
    try {
        const assignedPermissions = await AssignedPermissions.findOne({ _id: req.params.id, deletedAt: null })
            .populate({
                path: 'userId',
                populate: { path: 'role' }
            })
            .populate('modulePermissions.moduleId')
            .populate('modulePermissions.permissions');

        if (!assignedPermissions) {
            return res.status(404).json({ status: false, message: 'AssignedPermissions not found' });
        }

        res.status(200).json({ status: true, data: assignedPermissions });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update a AssignedPermissions
const updateAssignedpermissions = async (req, res) => {
    try {
        const {  userId, modulePermissions } = req.body;

        const assignedPermissions = await AssignedPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { userId, modulePermissions },
            { new: true, runValidators: true }
        )
        .populate('userId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!assignedPermissions) {
            return res.status(404).json({ status: false, message: 'AssignedPermissions not found' });
        }

        res.status(200).json({ status: true, data: assignedPermissions });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Soft delete a AssignedPermissions
const deleteAssignedpermissions = async (req, res) => {
    try {
        const assignedPermissions = await AssignedPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        )
        .populate('userId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!assignedPermissions) {
            return res.status(404).json({ status: false, message: 'AssignedPermissions not found' });
        }

        res.status(200).json({ status: true, data: assignedPermissions });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Restore a soft-deleted AssignedPermissions
const restoreAssignedpermissions = async (req, res) => {
    try {
        const assignedPermissions = await AssignedPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        )
        .populate('userId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!assignedPermissions) {
            return res.status(404).json({ status: false, message: 'AssignedPermissions not found' });
        }

        res.status(200).json({ status: true, data: assignedPermissions });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    addAssignedpermissions,
    getAllAssignedpermissions,
    getAssignedpermissions,
    updateAssignedpermissions,
    deleteAssignedpermissions,
    restoreAssignedpermissions
};
