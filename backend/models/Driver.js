const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  dateOfBirth: { type: Date },
  championships: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  podiums: { type: Number, default: 0 },
  poles: { type: Number, default: 0 },
  bio: { type: String },
  imageUrl: { type: String },
  teamSince: { type: Number },
  active: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Driver', driverSchema)
