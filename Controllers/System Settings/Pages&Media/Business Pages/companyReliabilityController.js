const CompanyReliability = require('../../../../Models/System Settings/Pages&Media/Business Pages/companyReliabilityModel');

// Create a new Company Reliability entry
const createCompanyReliability = async (req, res) => {
    try {
        const companyReliability = new CompanyReliability(req.body);
        await companyReliability.save();
        res.status(201).json({ status: true, message: 'Company Reliability created successfully', data: companyReliability });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Company Reliability', error: error.message });
    }
};

// Read all Company Reliability entries (excluding soft-deleted ones)
const getCompanyReliabilities = async (req, res) => {
    try {
        const companyReliabilities = await CompanyReliability.find({ deleted: false });
        res.status(200).json({ status: true, data: companyReliabilities });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Read a specific Company Reliability entry by ID
const getCompanyReliability = async (req, res) => {
    try {
        const companyReliability = await CompanyReliability.findOne({ _id: req.params.id, deleted: false });
        if (!companyReliability) return res.status(404).json({ status: false, message: 'Company Reliability not found' });
        res.status(200).json({ status: true, data: companyReliability });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update a Company Reliability entry
const updateCompanyReliability = async (req, res) => {
    try {
        const companyReliability = await CompanyReliability.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // Return the updated document
        );
        if (!companyReliability) return res.status(404).json({ status: false, message: 'Company Reliability not found' });
        res.status(200).json({ status: true, message: 'Company Reliability updated successfully', data: companyReliability });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Company Reliability', error: error.message });
    }
};

// Soft delete a Company Reliability entry
const deleteCompanyReliability = async (req, res) => {
    try {
        const companyReliability = await CompanyReliability.findById(req.params.id);
        if (!companyReliability) return res.status(404).json({ status: false, message: 'Company Reliability not found' });

        companyReliability.deleted = true;
        await companyReliability.save();
        res.status(200).json({ status: true, message: 'Company Reliability deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Company Reliability entry
const restoreCompanyReliability = async (req, res) => {
    try {
        const companyReliability = await CompanyReliability.findById(req.params.id);
        if (!companyReliability || !companyReliability.deleted) {
            return res.status(404).json({ status: false, message: 'Company Reliability not found or not deleted' });
        }

        companyReliability.deleted = false;
        await companyReliability.save();
        res.status(200).json({ status: true, message: 'Company Reliability restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the status of a Company Reliability entry
const toggleCompanyReliabilityStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const companyReliability = await CompanyReliability.findOne({ _id: id, deleted: false });
        if (!companyReliability) {
            return res.status(404).json({ status: false, message: 'Company Reliability not found' });
        }

        // Toggle the status
        companyReliability.status = companyReliability.status === 'active' ? 'inactive' : 'active';
        await companyReliability.save();

        res.status(200).json({
            status: true,
            message: `Company Reliability status changed to ${companyReliability.status}`,
            data: companyReliability,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createCompanyReliability,
    getCompanyReliabilities,
    getCompanyReliability,
    updateCompanyReliability,
    deleteCompanyReliability,
    restoreCompanyReliability,
    toggleCompanyReliabilityStatus,
};
