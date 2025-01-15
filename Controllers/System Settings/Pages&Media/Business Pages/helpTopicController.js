const HelpTopic = require('../../../../Models/System Settings/Pages&Media/Business Pages/helpTopicModel');

// Create a new Help Topic
const createHelpTopic = async (req, res) => {
    try {
        const helpTopic = new HelpTopic(req.body);
        await helpTopic.save();
        res.status(201).json({ status: true, message: 'Help Topic created successfully', data: helpTopic });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Help Topic', error: error.message });
    }
};

// Read all Help Topics (excluding soft-deleted ones)
const getHelpTopics = async (req, res) => {
    try {
        const helpTopics = await HelpTopic.find({ deleted: false });
        res.status(200).json({ status: true, data: helpTopics });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Read a specific Help Topic by ID
const getHelpTopic = async (req, res) => {
    try {
        const helpTopic = await HelpTopic.findOne({ _id: req.params.id, deleted: false });
        if (!helpTopic) return res.status(404).json({ status: false, message: 'Help Topic not found' });
        res.status(200).json({ status: true, data: helpTopic });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update a Help Topic
const updateHelpTopic = async (req, res) => {
    try {
        const helpTopic = await HelpTopic.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // Return the updated document
        );
        if (!helpTopic) return res.status(404).json({ status: false, message: 'Help Topic not found' });
        res.status(200).json({ status: true, message: 'Help Topic updated successfully', data: helpTopic });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Help Topic', error: error.message });
    }
};

// Soft delete a Help Topic
const deleteHelpTopic = async (req, res) => {
    try {
        const helpTopic = await HelpTopic.findById(req.params.id);
        if (!helpTopic) return res.status(404).json({ status: false, message: 'Help Topic not found' });

        helpTopic.deleted = true;
        await helpTopic.save();
        res.status(200).json({ status: true, message: 'Help Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Help Topic
const restoreHelpTopic = async (req, res) => {
    try {
        const helpTopic = await HelpTopic.findById(req.params.id);
        if (!helpTopic || !helpTopic.deleted) {
            return res.status(404).json({ status: false, message: 'Help Topic not found or not deleted' });
        }

        helpTopic.deleted = false;
        await helpTopic.save();
        res.status(200).json({ status: true, message: 'Help Topic restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the status of a Help Topic
const toggleHelpTopicStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const helpTopic = await HelpTopic.findOne({ _id: id, deleted: false });
        if (!helpTopic) {
            return res.status(404).json({ status: false, message: 'Help Topic not found' });
        }

        // Toggle the status
        helpTopic.status = helpTopic.status === 'active' ? 'inactive' : 'active';
        await helpTopic.save();

        res.status(200).json({
            status: true,
            message: `Help Topic status changed to ${helpTopic.status}`,
            data: helpTopic,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createHelpTopic,
    getHelpTopics,
    getHelpTopic,
    updateHelpTopic,
    deleteHelpTopic,
    restoreHelpTopic,
    toggleHelpTopicStatus
};
