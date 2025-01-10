const Banner = require("../Models/bannerModel");
const fs = require("fs");
const path = require("path");

// Create a new banner
const createBanner = async (req, res) => {
    const { bannerType, bannerURL, resourceType, resource } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Banner image is required" });
    }

    try {
        const newBanner = new Banner({
            bannerType,
            bannerURL,
            resourceType,
            resource,
            imagePath: req.file.path,
        });

        const savedBanner = await newBanner.save();
        res.status(201).json({ message: "Banner created successfully", data: savedBanner });
    } catch (error) {
        res.status(500).json({ message: "Failed to create banner", error: error.message });
    }
};

// Get all banners
const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ message: "Banners Retrieved Succesfully", data: banners });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch banners", error: error.message });
    }
};

// Update banner
const updateBanner = async (req, res) => {
    const { id } = req.params;
    const { bannerType, bannerURL, resourceType, resource } = req.body;

    try {
        // Find the banner by ID
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Update the fields
        if (bannerType) banner.bannerType = bannerType;
        if (bannerURL) banner.bannerURL = bannerURL;
        if (resourceType) banner.resourceType = resourceType;
        if (resource) banner.resource = resource;

        // Handle image update
        if (req.file) {
            // Delete the old image file
            if (banner.bannerImage && fs.existsSync(banner.bannerImage)) {
                fs.unlinkSync(banner.bannerImage);
            }

            // Update with the new image file path
            banner.bannerImage = req.file.path;
        }

        banner.updatedAt = Date.now();

        // Save the updated banner
        await banner.save();
        res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Failed to update banner", error: err.message });
    }
};

// Delete a banner
const deleteBanner = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBanner = await Banner.findByIdAndDelete(id);
        if (!deletedBanner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete banner", error: error.message });
    }
};

module.exports = {createBanner, getBanners, updateBanner, deleteBanner};