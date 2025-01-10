const Announcement = require("../Models/Announcement");

// Create a new announcement
const createAnnouncement = async (req, res) => {
    try {
        const { status, backgroundColor, textColor, text } = req.body;

        const announcement = new Announcement({
            status,
            backgroundColor,
            textColor,
            text,
        });

        await announcement.save();
        res.status(201).json({ message: "Announcement created successfully", announcement });
    } catch (error) {
        res.status(500).json({ message: "Failed to create announcement", error: error.message });
    }
};

// Get all announcements
const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ announcements });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve announcements", error: error.message });
    }
};

// Get a single announcement by ID
const getAnnouncementById = async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json({ announcement });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve announcement", error: error.message });
    }
};

// Update an announcement
const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, backgroundColor, textColor, text } = req.body;

        const announcement = await Announcement.findById(id);

        if (!announcement) {  
            return res.status(404).json({ message: "Announcement not found" });
        }
        announcement.status = status || announcement.status;
        announcement.backgroundColor = backgroundColor || announcement.backgroundColor;
        announcement.textColor = textColor || announcement.textColor;
        announcement.text = text || announcement.text;
        announcement.updatedAt = new Date();

        await announcement.save();
        res.status(200).json({ message: "Announcement updated successfully", announcement });
    } catch (error) {
        res.status(500).json({ message: "Failed to update announcement", error: error.message });
    }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const announcement = await Announcement.findByIdAndDelete(id);

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete announcement", error: error.message });
    }
};

module.exports = {createAnnouncement, deleteAnnouncement, updateAnnouncement, getAllAnnouncements, getAnnouncementById};