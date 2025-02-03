const mongoose = require("mongoose");

const programRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  enrollmentNumber: {
    type: String,
    required: true,
    trim: true,
  },
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    enum: ["IT", "CST", "MME", "CIVIL", "META", "EE", "MM", "AE"],
  },
  course: {
    type: String,
    required: true,
    enum: ["UG", "PG", "PhD"],
  },
  year: {
    type: String,
    required: true,
    enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

const ProgramRegistration = mongoose.model("ProgramRegistration", programRegistrationSchema);
module.exports = ProgramRegistration;
