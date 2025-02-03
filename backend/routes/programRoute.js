const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {
    handleCreateNewEventProgram,
    getAllEventsProgram,
    getEventProgramById,
    updateProgram,
    deleteProgram,
  } = require("../controllers/programController");
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



  router.get("/:eventId/programs", getAllEventsProgram);
  router.get("/:eventId/programs/:programId", getEventProgramById);
  router.post(
    "/:eventId/new-program",
    checkForAuthenticationCookie("token"),
    authorizeRoles(["ORGANIZER"]),
    upload.single("coverImageURL"),
    handleCreateNewEventProgram
  );
  router.put(
    "/:eventId/programs/:programId",
    checkForAuthenticationCookie("token"),
    authorizeRoles(["ORGANIZER"]),
    updateProgram
  );
  router.delete(
    "/:eventId/programs/:programId",
    checkForAuthenticationCookie("token"),
    authorizeRoles(["ORGANIZER"]),
    deleteProgram
  );



  module.exports = router;