const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");

const {
  handleCreateNewEvent,
  getEventById,
  getAllEvents,
} = require("../controllers/eventController");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, res, cb) {
    const fileName = `${Date.now()} --> ${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Public Routes - Anyone can view events
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);

// Protected Route - Only ORGANIZER can create events
router.post(
  "/new-event",
  checkForAuthenticationCookie("token"),
  authorizeRoles(['ORGANIZER']),
  upload.single("coverImageURL"),
  handleCreateNewEvent
);

module.exports = router;
