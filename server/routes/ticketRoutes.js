const express = require("express");

const {
    createTicket,
    getMyTickets,
    getTicketById,
    cancelTicket
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTicket);

router.get("/", protect, getMyTickets);

router.get("/:id", protect, getTicketById);

router.put("/:id/cancel", protect, cancelTicket);

module.exports = router;