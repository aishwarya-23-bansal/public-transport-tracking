const express = require("express");
const {
    createTicket,
    getMyTickets,
    getOperatorTickets,
    getTicketById,
    cancelTicket
} = require("../controllers/ticketController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("commuter"), createTicket);

router.get("/my", protect, authorizeRoles("commuter"), getMyTickets);

router.get(
    "/operator",
    protect,
    authorizeRoles("operator"),
    getOperatorTickets
);

router.get("/:id", protect, authorizeRoles("commuter"), getTicketById);

router.put(
    "/:id/cancel",
    protect,
    authorizeRoles("commuter"),
    cancelTicket
);

module.exports = router;