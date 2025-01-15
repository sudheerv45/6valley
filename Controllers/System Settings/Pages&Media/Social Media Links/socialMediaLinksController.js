const SocialMediaLinks = require('../../../../Models/System Settings/Pages&Media/Social Media Links/socialMediaLinksModel');

const createSocialMediaLink = async (req, res) => {
    try {
        const { name, socialMediaLink } = req.body;

        const link = new SocialMediaLinks({ name, socialMediaLink });
        await link.save();

        res.status(201).json({ status: true, message: 'Social media link created successfully', data: link });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating social media link', error: error.message });
    }
};

const getSocialMediaLinks = async (req, res) => {
    try {
        const links = await SocialMediaLinks.find({ deleted: false });
        res.status(200).json({ status: true, data: links });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getSocialMediaLink = async (req, res) => {
    try {
        const link = await SocialMediaLinks.findOne({ _id: req.params.id, deleted: false });
        if (!link) return res.status(404).json({ status: false, message: 'Social media link not found' });

        res.status(200).json({ status: true, data: link });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateSocialMediaLink = async (req, res) => {
    try {
        const { name, socialMediaLink } = req.body;

        const link = await SocialMediaLinks.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { name, socialMediaLink },
            { new: true }
        );
        if (!link) return res.status(404).json({ status: false, message: 'Social media link not found' });

        res.status(200).json({ status: true, message: 'Social media link updated successfully', data: link });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating social media link', error: error.message });
    }
};

const deleteSocialMediaLink = async (req, res) => {
    try {
        const link = await SocialMediaLinks.findById(req.params.id);
        if (!link) return res.status(404).json({ status: false, message: 'Social media link not found' });

        link.deleted = true;
        await link.save();

        res.status(200).json({ status: true, message: 'Social media link deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreSocialMediaLink = async (req, res) => {
    try {
        const link = await SocialMediaLinks.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!link) return res.status(404).json({ status: false, message: 'Social media link not found' });

        res.status(200).json({ status: true, message: 'Social media link restored successfully', data: link });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};


const toggleSocialMediaLinkStatus = async (req, res) => {
    try {
        const link = await SocialMediaLinks.findOne({ _id: req.params.id, deleted: false });
        if (!link) return res.status(404).json({ status: false, message: 'Social media link not found' });

        link.status = !link.status;
        await link.save();

        res.status(200).json({ status: true, message: 'Social media link status toggled successfully', data: link });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createSocialMediaLink,
    getSocialMediaLinks,
    getSocialMediaLink,
    updateSocialMediaLink,
    deleteSocialMediaLink,
    restoreSocialMediaLink,
    toggleSocialMediaLinkStatus
};
