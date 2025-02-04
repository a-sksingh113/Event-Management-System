const mongoose = require("mongoose")
const ProgramRegistration = require("../models/programRegistrationModel");
const Event = require("../models/eventModel")
const Program = require("../models/programModel");
const handleRegisterForProgram = async (req, res) => {
  try {
    const { eventId, programId } = req.params; 
    const { fullName, studentEmail, phone, enrollmentNumber, collegeName, department, course, year } = req.body;

    if (!fullName || !studentEmail || !phone || !enrollmentNumber || !collegeName || !department || !course || !year) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const programExists = await Program.findById(programId);
    if (!programExists) {
      return res.status(404).json({ message: "Program not found" });
    }

    const existingRegistration = await ProgramRegistration.findOne({
        $or: [
          { studentEmail: studentEmail, programId: programId },
          { enrollmentNumber: enrollmentNumber, programId: programId }
        ]
      });
  
      if (existingRegistration) {
        return res.status(400).json({ message: "You have already registered for this program" });
      }

    // Create a new registration
    const newRegistration = await ProgramRegistration.create({
      fullName,
      studentEmail,
      phone,
      enrollmentNumber,
      collegeName,
      department,
      course,
      year,
      eventId,
      programId,
    });

    await Program.findByIdAndUpdate(programId, {
      $push: { registeredUsers: new mongoose.Types.ObjectId(newRegistration._id) }
    });

    await Event.findByIdAndUpdate(eventId, {  
      $push: { registeredUsers: new mongoose.Types.ObjectId(newRegistration._id) }
    });

    res.status(201).json({ message: "Registration successful", registration: newRegistration });

  } catch (error) {
    console.error("Error registering for program:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const getProgramParticipants = async (req, res) => {
  try {
    const { programId } = req.params;
    
    const program = await Program.findById(programId).populate("registeredUsers");
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({
      programName: program.title,
      participants: program.registeredUsers
    });

  } catch (error) {
    console.error("Error fetching program participants:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { handleRegisterForProgram,getProgramParticipants};
