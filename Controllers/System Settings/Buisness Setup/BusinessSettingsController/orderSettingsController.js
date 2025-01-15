const OrderSettings = require('../../../../Models/System Settings/Buiness Setup/Business Settings/orderSettingsModel');

// Create or Update Order Settings
const createOrUpdateOrderSettings = async (req, res) => {
    try {
        const existingSettings = await OrderSettings.findOne({ deleted: false });
        if (existingSettings) {
            Object.assign(existingSettings, req.body);
            await existingSettings.save();
            return res.status(200).json({
                status: true,
                message: 'Order settings updated successfully',
                data: existingSettings,
            });
        }
        const newSettings = new OrderSettings(req.body);
        await newSettings.save();
        res.status(201).json({
            status: true,
            message: 'Order settings created successfully',
            data: newSettings,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Order Settings
const getOrderSettings = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Order settings not found' });
        }
        res.status(200).json({ status: true, data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Soft Delete Order Settings
const deleteOrderSettings = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Order settings not found' });
        }
        settings.deleted = true;
        await settings.save();
        res.status(200).json({ status: true, message: 'Order settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Order Settings
const restoreOrderSettings = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: true });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'No deleted order settings found' });
        }
        settings.deleted = false;
        await settings.save();
        res.status(200).json({ status: true, message: 'Order settings restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};


// Toggle Order Delivery Verification
const toggleOrderDeliveryVerification = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) return res.status(404).json({ status: false, message: 'Order settings not found' });

        settings.orderDeliveryVerification = !settings.orderDeliveryVerification;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'Order delivery verification toggled successfully',
            data: { orderDeliveryVerification: settings.orderDeliveryVerification },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Minimum Order Amount
const toggleMinimumOrderAmount = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) return res.status(404).json({ status: false, message: 'Order settings not found' });

        settings.minimumOrderAmount = !settings.minimumOrderAmount;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'Minimum order amount toggled successfully',
            data: { minimumOrderAmount: settings.minimumOrderAmount },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Show Billing Address in Checkout
const toggleShowBillingAddressInCheckout = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) return res.status(404).json({ status: false, message: 'Order settings not found' });

        settings.showBillingAddressInCheckout = !settings.showBillingAddressInCheckout;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'Show billing address in checkout toggled successfully',
            data: { showBillingAddressInCheckout: settings.showBillingAddressInCheckout },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};


// Toggle Free Delivery
const toggleFreeDelivery = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) return res.status(404).json({ status: false, message: 'Order settings not found' });

        settings.freeDelivery = !settings.freeDelivery;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'Free delivery toggled successfully',
            data: { freeDelivery: settings.freeDelivery },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Guest Checkout
const toggleGuestCheckout = async (req, res) => {
    try {
        const settings = await OrderSettings.findOne({ deleted: false });
        if (!settings) return res.status(404).json({ status: false, message: 'Order settings not found' });

        settings.guestCheckout = !settings.guestCheckout;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'Guest checkout toggled successfully',
            data: { guestCheckout: settings.guestCheckout },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};


module.exports = {
    createOrUpdateOrderSettings,
    getOrderSettings,
    deleteOrderSettings,
    restoreOrderSettings,
    toggleFreeDelivery,
    toggleGuestCheckout,
    toggleMinimumOrderAmount,
    toggleOrderDeliveryVerification,
    toggleShowBillingAddressInCheckout
}

// Add more toggle APIs similarly for the other boolean fields...
