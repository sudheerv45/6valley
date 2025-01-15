const DigitalPaymentMethod = require('../../../../Models/System Settings/3rd Party/Payment Methods/digitalPaymentMethodsModel');

// Create a new Digital Payment Method entry
const createDigitalPaymentMethod = async (req, res) => {
    try {
        const digitalPaymentMethod = new DigitalPaymentMethod(req.body);
        await digitalPaymentMethod.save();
        res.status(201).json({ status: true, message: 'Digital Payment Method created successfully', data: digitalPaymentMethod });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Digital Payment Method', error: error.message });
    }
};

// Read all Digital Payment Methods (excluding soft-deleted ones)
const getDigitalPaymentMethods = async (req, res) => {
    try {
        const digitalPaymentMethods = await DigitalPaymentMethod.find({ deleted: false });
        res.status(200).json({ status: true, data: digitalPaymentMethods });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Read a specific Digital Payment Method entry by ID
const getDigitalPaymentMethod = async (req, res) => {
    try {
        const digitalPaymentMethod = await DigitalPaymentMethod.findOne({ _id: req.params.id, deleted: false });
        if (!digitalPaymentMethod) return res.status(404).json({ status: false, message: 'Digital Payment Method not found' });
        res.status(200).json({ status: true, data: digitalPaymentMethod });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update a Digital Payment Method entry
const updateDigitalPaymentMethod = async (req, res) => {
    try {
        const digitalPaymentMethod = await DigitalPaymentMethod.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // Return the updated document
        );
        if (!digitalPaymentMethod) return res.status(404).json({ status: false, message: 'Digital Payment Method not found' });
        res.status(200).json({ status: true, message: 'Digital Payment Method updated successfully', data: digitalPaymentMethod });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Digital Payment Method', error: error.message });
    }
};

// Soft delete a Digital Payment Method entry
const deleteDigitalPaymentMethod = async (req, res) => {
    try {
        const digitalPaymentMethod = await DigitalPaymentMethod.findById(req.params.id);
        if (!digitalPaymentMethod) return res.status(404).json({ status: false, message: 'Digital Payment Method not found' });

        digitalPaymentMethod.deleted = true;
        await digitalPaymentMethod.save();
        res.status(200).json({ status: true, message: 'Digital Payment Method deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Digital Payment Method entry
const restoreDigitalPaymentMethod = async (req, res) => {
    try {
        const digitalPaymentMethod = await DigitalPaymentMethod.findById(req.params.id);
        if (!digitalPaymentMethod || !digitalPaymentMethod.deleted) {
            return res.status(404).json({ status: false, message: 'Digital Payment Method not found or not deleted' });
        }

        digitalPaymentMethod.deleted = false;
        await digitalPaymentMethod.save();
        res.status(200).json({ status: true, message: 'Digital Payment Method restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the status of a Digital Payment Method entry
const toggleDigitalPaymentMethodStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const digitalPaymentMethod = await DigitalPaymentMethod.findOne({ _id: id, deleted: false });
        if (!digitalPaymentMethod) {
            return res.status(404).json({ status: false, message: 'Digital Payment Method not found' });
        }

        // Toggle the status
        digitalPaymentMethod.status = digitalPaymentMethod.status === 'active' ? 'inactive' : 'active';
        await digitalPaymentMethod.save();

        res.status(200).json({
            status: true,
            message: `Digital Payment Method status changed to ${digitalPaymentMethod.status}`,
            data: digitalPaymentMethod,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createDigitalPaymentMethod,
    getDigitalPaymentMethods,
    getDigitalPaymentMethod,
    updateDigitalPaymentMethod,
    deleteDigitalPaymentMethod,
    restoreDigitalPaymentMethod,
    toggleDigitalPaymentMethodStatus,
};
