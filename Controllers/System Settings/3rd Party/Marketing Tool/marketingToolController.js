const MarketingTool = require('../../../../Models/System Settings/3rd Party/Marketing Tool/marketingToolModel');

// Create a new Marketing Tool entry
const createMarketingTool = async (req, res) => {
    try {
        const marketingTool = new MarketingTool(req.body);
        await marketingTool.save();
        res.status(201).json({ status: true, message: 'Marketing Tool created successfully', data: marketingTool });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Marketing Tool', error: error.message });
    }
};

// Read all Marketing Tool entries (excluding soft-deleted ones)
const getMarketingTools = async (req, res) => {
    try {
        const marketingTools = await MarketingTool.find({ deleted: false });
        res.status(200).json({ status: true, data: marketingTools });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Read a specific Marketing Tool entry by ID
const getMarketingTool = async (req, res) => {
    try {
        const marketingTool = await MarketingTool.findOne({ _id: req.params.id, deleted: false });
        if (!marketingTool) return res.status(404).json({ status: false, message: 'Marketing Tool not found' });
        res.status(200).json({ status: true, data: marketingTool });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update a Marketing Tool entry
const updateMarketingTool = async (req, res) => {
    try {
        const marketingTool = await MarketingTool.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // Return the updated document
        );
        if (!marketingTool) return res.status(404).json({ status: false, message: 'Marketing Tool not found' });
        res.status(200).json({ status: true, message: 'Marketing Tool updated successfully', data: marketingTool });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Marketing Tool', error: error.message });
    }
};

// Soft delete a Marketing Tool entry
const deleteMarketingTool = async (req, res) => {
    try {
        const marketingTool = await MarketingTool.findById(req.params.id);
        if (!marketingTool) return res.status(404).json({ status: false, message: 'Marketing Tool not found' });

        marketingTool.deleted = true;
        await marketingTool.save();
        res.status(200).json({ status: true, message: 'Marketing Tool deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Marketing Tool entry
const restoreMarketingTool = async (req, res) => {
    try {
        const marketingTool = await MarketingTool.findById(req.params.id);
        if (!marketingTool || !marketingTool.deleted) {
            return res.status(404).json({ status: false, message: 'Marketing Tool not found or not deleted' });
        }

        marketingTool.deleted = false;
        await marketingTool.save();
        res.status(200).json({ status: true, message: 'Marketing Tool restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the status of a Marketing Tool entry
const toggleMarketingToolStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const marketingTool = await MarketingTool.findOne({ _id: id, deleted: false });
        if (!marketingTool) {
            return res.status(404).json({ status: false, message: 'Marketing Tool not found' });
        }

        // Toggle the status
        marketingTool.status = marketingTool.status === 'active' ? 'inactive' : 'active';
        await marketingTool.save();

        res.status(200).json({
            status: true,
            message: `Marketing Tool status changed to ${marketingTool.status}`,
            data: marketingTool,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createMarketingTool,
    getMarketingTools,
    getMarketingTool,
    updateMarketingTool,
    deleteMarketingTool,
    restoreMarketingTool,
    toggleMarketingToolStatus,
};
