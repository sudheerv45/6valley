const Gallery = require('../../../../Models/System Settings/Pages&Media/Gallery/galleryModel');
const path = require('path');
const fs = require('fs');

const createGalleryItem = async (req, res) => {
    try {
        const { fileName } = req.body;

        const uploadFile = req.file ? req.file.path : null;

        console.log(fileName , uploadFile, req.file, req.file.path );
        

        if (!fileName || !uploadFile) {
            return res.status(400).json({ status: false, message: 'File name and uploaded file are required' });
        }

        const galleryItem = new Gallery({ fileName, uploadFile });
        await galleryItem.save();

        res.status(201).json({ status: true, message: 'Gallery item created successfully', data: galleryItem });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error creating gallery item', error: error.message });
    }
};

const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find({ deleted: false });
        res.status(200).json({ status: true, data: galleryItems });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findOne({ _id: req.params.id, deleted: false });
        if (!galleryItem) {
            return res.status(404).json({ status: false, message: 'Gallery item not found' });
        }
        res.status(200).json({ status: true, data: galleryItem });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateGalleryItem = async (req, res) => {
    try {
        const { fileName } = req.body;
        const uploadFile = req.file ? req.file.path : null;

        const updateData = { fileName };
        if (uploadFile) {
            updateData.uploadFile = uploadFile;
        }

        const galleryItem = await Gallery.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            updateData,
            { new: true }
        );
        if (!galleryItem) {
            return res.status(404).json({ status: false, message: 'Gallery item not found' });
        }

        res.status(200).json({ status: true, message: 'Gallery item updated successfully', data: galleryItem });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error updating gallery item', error: error.message });
    }
};

const deleteGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ status: false, message: 'Gallery item not found' });
        }

        galleryItem.deleted = true;
        await galleryItem.save();

        res.status(200).json({ status: true, message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!galleryItem) {
            return res.status(404).json({ status: false, message: 'Gallery item not found' });
        }

        res.status(200).json({ status: true, message: 'Gallery item restored successfully', data: galleryItem });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createGalleryItem,
    getGalleryItems,
    getGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    restoreGalleryItem,
};
