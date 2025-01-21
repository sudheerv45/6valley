const SocialMedia = require("../Models/System Settings/Pages&Media/Social Media Links/socialMediaLinksModel");

// Add a new social media link
const addSocialMedia = async (req, res) => {
    const { name, link } = req.body;

    if (!name || !link) {
        return res.status(400).json({ message: "Name and link are required." });
    }

    try {
        const socialMedia = new SocialMedia({ name, link });
        await socialMedia.save();
        res.status(201).json({ message: "Social media added successfully.", socialMedia });
    } catch (error) {
        res.status(500).json({ message: "Error adding social media.", error });
    }
};

// Get all social media links
const getAllSocialMedia = async (req, res) => {
    try {
        const socialMediaLinks = await SocialMedia.find();
        res.status(200).json(socialMediaLinks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching social media links.", error });
    }
};

// Update a social media link by ID
const updateSocialMedia = async (req, res) => {
    const { id } = req.params;
    const { name, link } = req.body;

    try {
        const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
            id,
            { name, link },
            { new: true }
        );

        if (!updatedSocialMedia) {
            return res.status(404).json({ message: "Social media link not found." });
        }

        res.status(200).json({ message: "Social media updated successfully.", updatedSocialMedia });
    } catch (error) {
        res.status(500).json({ message: "Error updating social media link.", error });
    }
};

// Delete a social media link by ID
const deleteSocialMedia = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

        if (!deletedSocialMedia) {
            return res.status(404).json({ message: "Social media link not found." });
        }

        res.status(200).json({ message: "Social media link deleted successfully.", deletedSocialMedia });
    } catch (error) {
        res.status(500).json({ message: "Error deleting social media link.", error });
    }
};

// Toggle social media status (Active/Inactive)
const toggleStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const socialMedia = await SocialMedia.findById(id);

        if (!socialMedia) {
            return res.status(404).json({ message: "Social media link not found." });
        }

        socialMedia.status = socialMedia.status === "Active" ? "Inactive" : "Active";
        await socialMedia.save();

        res.status(200).json({ message: "Social media status updated.", socialMedia });
    } catch (error) {
        res.status(500).json({ message: "Error updating social media status.", error });
    }
};
module.exports = {addSocialMedia, updateSocialMedia, getAllSocialMedia, deleteSocialMedia, toggleStatus};