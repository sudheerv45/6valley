const OfflinePaymentMethod = require('../../../../Models/System Settings/3rd Party/Payment Methods/offlinePaymentMethodsModel');

// Create a new Offline Payment Method entry
const createOfflinePaymentMethod = async (req, res) => {
    try {
        const offlinePaymentMethod = new OfflinePaymentMethod(req.body);
        await offlinePaymentMethod.save();
        res.status(201).json({ status: true, message: 'Offline Payment Method created successfully', data: offlinePaymentMethod });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Offline Payment Method', error: error.message });
    }
};

// Read all Offline Payment Methods (excluding soft-deleted ones)
const getOfflinePaymentMethods = async (req, res) => {
    try {
        const offlinePaymentMethods = await OfflinePaymentMethod.find({ deleted: false });
        res.status(200).json({ status: true, data: offlinePaymentMethods });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Read a specific Offline Payment Method entry by ID
const getOfflinePaymentMethod = async (req, res) => {
    try {
        const offlinePaymentMethod = await OfflinePaymentMethod.findOne({ _id: req.params.id, deleted: false });
        if (!offlinePaymentMethod) return res.status(404).json({ status: false, message: 'Offline Payment Method not found' });
        res.status(200).json({ status: true, data: offlinePaymentMethod });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update an Offline Payment Method entry
const updateOfflinePaymentMethod = async (req, res) => {
    try {
        const offlinePaymentMethod = await OfflinePaymentMethod.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // Return the updated document
        );
        if (!offlinePaymentMethod) return res.status(404).json({ status: false, message: 'Offline Payment Method not found' });
        res.status(200).json({ status: true, message: 'Offline Payment Method updated successfully', data: offlinePaymentMethod });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Offline Payment Method', error: error.message });
    }
};

// Soft delete an Offline Payment Method entry
const deleteOfflinePaymentMethod = async (req, res) => {
    try {
        const offlinePaymentMethod = await OfflinePaymentMethod.findById(req.params.id);
        if (!offlinePaymentMethod) return res.status(404).json({ status: false, message: 'Offline Payment Method not found' });

        offlinePaymentMethod.deleted = true;
        await offlinePaymentMethod.save();
        res.status(200).json({ status: true, message: 'Offline Payment Method deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Offline Payment Method entry
const restoreOfflinePaymentMethod = async (req, res) => {
    try {
        const offlinePaymentMethod = await OfflinePaymentMethod.findById(req.params.id);
        if (!offlinePaymentMethod || !offlinePaymentMethod.deleted) {
            return res.status(404).json({ status: false, message: 'Offline Payment Method not found or not deleted' });
        }

        offlinePaymentMethod.deleted = false;
        await offlinePaymentMethod.save();
        res.status(200).json({ status: true, message: 'Offline Payment Method restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the status of an Offline Payment Method entry
const toggleOfflinePaymentMethodStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const offlinePaymentMethod = await OfflinePaymentMethod.findOne({ _id: id, deleted: false });
        if (!offlinePaymentMethod) {
            return res.status(404).json({ status: false, message: 'Offline Payment Method not found' });
        }

        // Toggle the status
        offlinePaymentMethod.status = offlinePaymentMethod.status === 'active' ? 'inactive' : 'active';
        await offlinePaymentMethod.save();

        res.status(200).json({
            status: true,
            message: `Offline Payment Method status changed to ${offlinePaymentMethod.status}`,
            data: offlinePaymentMethod,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOfflinePaymentMethod,
    getOfflinePaymentMethods,
    getOfflinePaymentMethod,
    updateOfflinePaymentMethod,
    deleteOfflinePaymentMethod,
    restoreOfflinePaymentMethod,
    toggleOfflinePaymentMethodStatus,
};
