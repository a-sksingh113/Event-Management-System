const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    phone:{
      type:Number,
      required:true
    },
    venue: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default:[],
    },
    category: {
      type: String,
      enum: ["tech", "sports", "cultural"],
      required: true,
    },
    fee: { type: Number, default: 0 },

    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }]
      
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
