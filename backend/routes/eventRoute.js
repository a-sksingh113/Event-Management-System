const express = require("express");
const router = express.Router();
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {
  handleCreateNewEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventParticipants
} = require("../controllers/eventController");

const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");


// Public Routes - Anyone can view events
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.post(
  "/new-event",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["ORGANIZER"]),
  upload.single("coverImageURL"),
  handleCreateNewEvent
);
router.put(
  "/:eventId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["ORGANIZER"]),
  updateEvent
);
router.delete(
  "/:eventId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["ORGANIZER"]),
  deleteEvent
);
router.get("/:eventId/participants", checkForAuthenticationCookie("token"),
authorizeRoles(["ORGANIZER"]),getEventParticipants)
module.exports = router;
