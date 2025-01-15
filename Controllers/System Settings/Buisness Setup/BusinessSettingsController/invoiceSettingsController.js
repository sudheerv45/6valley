const InvoiceSettings = require('../../../../Models/System Settings/Buiness Setup/Business Settings/invoiceSettingsModel');
const { uploadFile } = require('../../../../Middlewares/fileupload'); // Assume file upload utility exists

// Create or Update Invoice Settings
const createOrUpdateInvoiceSettings = async (req, res) => {
    try {
        const { termsAndConditions, businessIdentity, businessIdentityType } = req.body;

        // Handle file upload if exists
        if (req.files && req.files.invoiceLogo) {
            const invoiceLogoPath = await uploadFile(req.files.invoiceLogo);
            req.body.invoiceLogo = invoiceLogoPath;
        }

        let invoiceSettings = await InvoiceSettings.findOne({ deleted: false });

        if (invoiceSettings) {
            // Update existing settings
            invoiceSettings.termsAndConditions = termsAndConditions;
            invoiceSettings.businessIdentity = businessIdentity;
            invoiceSettings.businessIdentityType = businessIdentityType;
            if (req.files && req.files.invoiceLogo) {
                invoiceSettings.invoiceLogo = req.body.invoiceLogo;
            }
            await invoiceSettings.save();
            return res.status(200).json({ status: true, message: 'Invoice settings updated successfully', data: invoiceSettings });
        } else {
            // Create new settings
            invoiceSettings = new InvoiceSettings({ termsAndConditions, businessIdentity, businessIdentityType });
            await invoiceSettings.save();
            return res.status(201).json({ status: true, message: 'Invoice settings created successfully', data: invoiceSettings });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error processing request', error: error.message });
    }
};

// Get Invoice Settings
const getInvoiceSettings = async (req, res) => {
    try {
        const invoiceSettings = await InvoiceSettings.findOne({ deleted: false });
        if (!invoiceSettings) {
            return res.status(404).json({ status: false, message: 'Invoice settings not found' });
        }
        res.status(200).json({ status: true, data: invoiceSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Soft Delete Invoice Settings
const deleteInvoiceSettings = async (req, res) => {
    try {
        const invoiceSettings = await InvoiceSettings.findById(req.params.id);
        if (!invoiceSettings) {
            return res.status(404).json({ status: false, message: 'Invoice settings not found' });
        }

        invoiceSettings.deleted = true;
        await invoiceSettings.save();

        res.status(200).json({ status: true, message: 'Invoice settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore Soft-Deleted Invoice Settings
const restoreInvoiceSettings = async (req, res) => {
    try {
        const invoiceSettings = await InvoiceSettings.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!invoiceSettings) {
            return res.status(404).json({ status: false, message: 'Invoice settings not found' });
        }

        res.status(200).json({ status: true, message: 'Invoice settings restored successfully', data: invoiceSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle Invoice Logo Status
const toggleInvoiceLogoStatus = async (req, res) => {
    try {
        const invoiceSettings = await InvoiceSettings.findOne({ _id: req.params.id, deleted: false });
        if (!invoiceSettings) {
            return res.status(404).json({ status: false, message: 'Invoice settings not found' });
        }

        invoiceSettings.invoiceLogo = !invoiceSettings.invoiceLogo ? req.body.invoiceLogo : null;
        await invoiceSettings.save();

        res.status(200).json({ status: true, message: 'Invoice logo status toggled successfully', data: invoiceSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error toggling status', error: error.message });
    }
};

module.exports = {
    createOrUpdateInvoiceSettings,
    getInvoiceSettings,
    deleteInvoiceSettings,
    restoreInvoiceSettings,
    toggleInvoiceLogoStatus
};
