const express = require("express");
const router = express.Router();
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {
  handleRegisterForProgram,
} = require("../controllers/programRegistrationController");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.post("/:eventId/programs/:programId/register", checkForAuthenticationCookie("token"),
authorizeRoles(["ORGANIZER","STUDENT"]),handleRegisterForProgram);
module.exports = router;
