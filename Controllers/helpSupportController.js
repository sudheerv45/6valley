const Message = require("../Models/Message");
const Ticket = require("../Models/Ticket");

// Send a message
const sendMessage = async (req, res) => {
    const { senderType, senderId, message } = req.body;

    try {
        const newMessage = new Message({ senderType, senderId, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
};

// Get inbox messages
const getInbox = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }); // Fetch latest messages first
        res.status(200).json({ success: true, message: "Inbox fetched successfully", data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch inbox", error: error.message });
    }
};

// Create a support ticket
const createTicket = async (req, res) => {
    const { customerId, issue } = req.body;

    try {
        const newTicket = new Ticket({ customerId, issue });
        await newTicket.save();

        res.status(201).json({ success: true, message: "Ticket created successfully", data: newTicket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create ticket", error: error.message });
    }
};

// Update a ticket (respond or change status)
const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { response, status } = req.body;

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { response, status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        res.status(200).json({ success: true, message: "Ticket updated successfully", data: updatedTicket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update ticket", error: error.message });
    }
};

// Get all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 }); // Fetch latest tickets first
        res.status(200).json({ success: true, message: "Tickets fetched successfully", data: tickets });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch tickets", error: error.message });
    }
};

// Get a ticket by ID
const getTicketById = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const ticket = await Ticket.findById(ticketId).populate("customerId", "name email"); // Populating customer details if needed

        if (!ticket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        res.status(200).json({ success: true, message: "Ticket fetched successfully", data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch ticket", error: error.message });
    }
};


module.exports = { sendMessage, getInbox, createTicket, updateTicket, getTickets, getTicketById };