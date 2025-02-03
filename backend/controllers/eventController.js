const Event = require("../models/eventModel");
const Program = require("../models/programModel");

const handleCreateNewEvent = async (req, res) => {
  try {
    const { title, description, date, venue, tags, category, registeredUsers } = req.body;
    const coverImageURL = req.file ? req.file.path : '/uploads/default.png';
    

    if (!title || !description || !coverImageURL || !date || !venue || !category) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      venue,
      tags: tags || [],
      category,
      registeredUsers: registeredUsers || [],
      coverImageURL,
    });
    res.status(201).json({ message: "event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, date, venue, tags, category, registeredUsers } = req.body;
    const coverImageURL = req.file ? req.file.path : undefined;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { title, description, date, venue, tags, category, registeredUsers, ...(coverImageURL && { coverImageURL }) },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};


const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

const handleCreateNewEventProgram = async (req, res) => {
  try {
    const { title, description, date, venue, tags, category, fee, registeredUsers, phone } = req.body;
    const coverImageURL = req.file ? req.file.path : '/uploads/default.png';
    

    if (!title || !description || !coverImageURL || !date || !venue || !category || !phone) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newProgram = await Program.create({
      title,
      description,
      date,
      venue,
      phone,
      tags: tags || [],
      category,
      fee: fee || 0,
      registeredUsers: registeredUsers || [],
      coverImageURL,
    });
    res.status(201).json({ message: "Program created successfully", program: newProgram });
  } catch (error) {
    console.error("Error creating program:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { title, description, date, venue, tags, category, fee, registeredUsers, phone } = req.body;
    const coverImageURL = req.file ? req.file.path : undefined;

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.programId,
      { title, description, date, venue, tags, category, fee, registeredUsers, phone, ...(coverImageURL && { coverImageURL }) },
      { new: true }
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program updated successfully", program: updatedProgram });
  } catch (error) {
    res.status(500).json({ message: "Error updating program", error });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const deletedProgram = await Program.findByIdAndDelete(req.params.programId);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting program", error });
  }
};

const getAllEventsProgram = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error });
  }
};

const getEventProgramById = async(req, res)=>{
  try {
    const program = await Program.findById(req.params.programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Program", error });
  }
} 
module.exports = {
  handleCreateNewEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  handleCreateNewEventProgram,
  updateProgram,
  deleteProgram,
  getEventProgramById,
  getAllEventsProgram,
};
