const VendorRegistrationFaq = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/vendorRegistrationFAQModel');

// Create or Update a FAQ
const createOrUpdateFaq = async (req, res) => {
    try {
        const { question, answer, priority } = req.body;

        if (!question || !answer || priority === undefined) {
            return res.status(400).json({ status: false, message: 'Question, Answer, and Priority are required' });
        }

        let faq = await VendorRegistrationFaq.findOne({ deleted: false, question });

        if (faq) {
            // Update existing FAQ
            faq.answer = answer;
            faq.priority = priority;
            faq.status = true; // Ensure the status is true for updated records
            await faq.save();
            return res.status(200).json({ status: true, message: 'FAQ updated successfully', data: faq });
        } else {
            // Create new FAQ
            faq = new VendorRegistrationFaq({ question, answer, priority });
            await faq.save();
            return res.status(201).json({ status: true, message: 'FAQ created successfully', data: faq });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error processing request', error: error.message });
    }
};

// Get All FAQs
const getAllFaqs = async (req, res) => {
    try {
        const faqs = await VendorRegistrationFaq.find({ deleted: false }).sort({ priority: 1 }); // Sort by priority
        res.status(200).json({ status: true, data: faqs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get a Specific FAQ
const getFaq = async (req, res) => {
    try {
        const faq = await VendorRegistrationFaq.findOne({ _id: req.params.id, deleted: false });
        if (!faq) {
            return res.status(404).json({ status: false, message: 'FAQ not found' });
        }
        res.status(200).json({ status: true, data: faq });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Soft Delete a FAQ
const deleteFaq = async (req, res) => {
    try {
        const faq = await VendorRegistrationFaq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ status: false, message: 'FAQ not found' });
        }

        faq.deleted = true;
        await faq.save();

        res.status(200).json({ status: true, message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a Soft-Deleted FAQ
const restoreFaq = async (req, res) => {
    try {
        const faq = await VendorRegistrationFaq.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!faq) {
            return res.status(404).json({ status: false, message: 'FAQ not found' });
        }

        res.status(200).json({ status: true, message: 'FAQ restored successfully', data: faq });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle FAQ Status
const toggleFaqStatus = async (req, res) => {
    try {
        const faq = await VendorRegistrationFaq.findOne({ _id: req.params.id, deleted: false });
        if (!faq) {
            return res.status(404).json({ status: false, message: 'FAQ not found' });
        }

        faq.status = !faq.status;
        await faq.save();

        res.status(200).json({ status: true, message: 'FAQ status toggled successfully', data: faq });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error toggling status', error: error.message });
    }
};

module.exports = {
    createOrUpdateFaq,
    getAllFaqs,
    getFaq,
    deleteFaq,
    restoreFaq,
    toggleFaqStatus,
};
