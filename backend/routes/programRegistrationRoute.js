const express = require("express");
const router = express.Router();
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {
  handleRegisterForProgram,getProgramParticipants
} = require("../controllers/programRegistrationController");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.post("/:eventId/programs/:programId/register", checkForAuthenticationCookie("token"),
authorizeRoles(["ORGANIZER","STUDENT"]),handleRegisterForProgram);


router.get("/:eventId/programs/:programId/participants", checkForAuthenticationCookie("token"),
authorizeRoles(["ORGANIZER"]),getProgramParticipants);
module.exports = router;
