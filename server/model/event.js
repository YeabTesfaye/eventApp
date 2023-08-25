import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    rquired: true,
  },
  description: {
    type: String,
    rquired: true,
  },
  price: {
    type: Number,
    rquired: true,
  },
  date: {
    type: Date,
    rquired: true,
  },
});


export const Event = mongoose.model('Event', eventSchema)