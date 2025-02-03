const ProgramRegistration = require("../models/programRegistrationModel");
const Program = require("../models/programModel");
const handleRegisterForProgram = async (req, res) => {
  try {
    const { eventId, programId } = req.params; 
    const { fullName, email, phone, enrollmentNumber, collegeName, department, course, year } = req.body;

    if (!fullName || !email || !phone || !enrollmentNumber || !collegeName || !department || !course || !year) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const programExists = await Program.findById(programId);
    if (!programExists) {
      return res.status(404).json({ message: "Program not found" });
    }

    const existingRegistration = await ProgramRegistration.findOne({
        $or: [
          { email: email, programId: programId },
          { enrollmentNumber: enrollmentNumber, programId: programId }
        ]
      });
  
      if (existingRegistration) {
        return res.status(400).json({ message: "You have already registered for this program" });
      }

    // Create a new registration
    const newRegistration = await ProgramRegistration.create({
      fullName,
      email,
      phone,
      enrollmentNumber,
      collegeName,
      department,
      course,
      year,
      eventId,
      programId,
    });

    res.status(201).json({ message: "Registration successful", registration: newRegistration });

  } catch (error) {
    console.error("Error registering for program:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { handleRegisterForProgram };
