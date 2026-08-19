const Ticket = require("../models/Ticket");
const Route = require("../models/Route");
const Notification = require("../models/Notification");


const createTicket = async (req, res) => {
    try {
        const {
            ticketNumber,
            route,
            journeyDate,
            fare
        } = req.body;

        if (!ticketNumber || !route || !journeyDate || fare === undefined) {
            return res.status(400).json({
                message: "Please provide all required ticket details"
            });
        }
        const existingTicket = await Ticket.findOne({
            ticketNumber
        });
        if (existingTicket) {
            return res.status(400).json({
                message: "Ticket number already exists"
            });
        }
        const routeExists = await Route.findById(route);

        if (!routeExists) {
            return res.status(404).json({
                message: "Route not found"
            });
        }
        const ticket = await Ticket.create({
            ticketNumber,
            user: req.user._id,
            route,
            journeyDate,
            fare,
            status: "Confirmed"
        });

        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("route")
            .populate("user", "name email");
        await Notification.create({
            user: req.user._id,
            title: "Booking Confirmed",
            message: `Your ticket ${ticket.ticketNumber} has been booked successfully.`,
            type: "Booking"
        });

        res.status(201).json({
            message: "Ticket created successfully",
            ticket: populatedTicket
        });

    } catch (error) {
        console.error("Create ticket error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({
            user: req.user._id
        })
            .populate("route")
            .sort({ createdAt: -1 });
        res.status(200).json({
            tickets
        });
    } catch (error) {
        console.error("Get tickets error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate("route");
        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }
        res.status(200).json({
            ticket
        });
    } catch (error) {
        console.error("Get ticket error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
const cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }
        if (ticket.status === "Cancelled") {
            return res.status(400).json({
                message: "Ticket is already cancelled"
            });
        }
        if (ticket.status === "Completed") {
            return res.status(400).json({
                message: "Completed tickets cannot be cancelled"
            });
        }
        ticket.status = "Cancelled";
        await ticket.save();
        res.status(200).json({
            message: "Ticket cancelled successfully",
            ticket
        });
    } catch (error) {
        console.error("Cancel ticket error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createTicket,
    getMyTickets,
    getTicketById,
    cancelTicket
};