const Order = require('../../Models/POS/ordersModel');

// Generate a unique 6-digit order ID
const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a new Order
const createOrder = async (req, res) => {
    try {
        const orderId = generateOrderId();
        const orderData = { ...req.body, orderId };
        const order = new Order(orderData);
        await order.save();
        res.status(201).json({ status: true, message: 'Order created successfully', data: order });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating order', error: error.message });
    }
};

// Get all Orders (excluding soft-deleted)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ deleted: false }).populate('customer', 'name email');
        res.status(200).json({ status: true, data: orders });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get an Order by ID
const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, deleted: false }).populate('customer', 'name email');
        if (!order) return res.status(404).json({ status: false, message: 'Order not found' });
        res.status(200).json({ status: true, data: order });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update an Order
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!order) return res.status(404).json({ status: false, message: 'Order not found' });
        res.status(200).json({ status: true, message: 'Order updated successfully', data: order });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating order', error: error.message });
    }
};

// Soft delete an Order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ status: false, message: 'Order not found' });

        order.deleted = true;
        await order.save();
        res.status(200).json({ status: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Order
const restoreOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order || !order.deleted) {
            return res.status(404).json({ status: false, message: 'Order not found or not deleted' });
        }

        order.deleted = false;
        await order.save();
        res.status(200).json({ status: true, message: 'Order restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};



// Get orders by order status
const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params; // Order status from URL parameter

        // Validate the status
        const validStatuses = [
            'pending', 'confirmed', 'packaging', 'out for delivery',
            'delivered', 'returned', 'failed to deliver', 'cancelled'
        ];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                status: false, 
                message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` 
            });
        }

        // Fetch orders with the specified status
        const orders = await Order.find({ orderStatus: status, deleted: false });

        res.status(200).json({
            status: true,
            data: orders,
            message: orders.length > 0 
                ? `${orders.length} order(s) found with status '${status}'`
                : `No orders found with status '${status}'`
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
  
      // Check if the provided status is valid
      const validStatuses = [
        'pending',
        'confirmed',
        'packaging',
        'out for delivery',
        'delivered',
        'returned',
        'failed to deliver',
        'cancelled',
      ];
  
      if (!validStatuses.includes(orderStatus)) {
        return res.status(400).json({ message: 'Invalid order status provided' });
      }
  
      // Find and update the order
      const order = await Order.findOneAndUpdate(
        { _id: id, deleted: false },
        { orderStatus },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found or deleted' });
      }
  
      res.status(200).json({
        message: 'Order status updated successfully',
        order,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    restoreOrder,
    getOrdersByStatus,
    updateOrderStatus
};
