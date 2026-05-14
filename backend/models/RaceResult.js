const mongoose = require('mongoose')

const raceResultSchema = new mongoose.Schema({
  round: { type: Number, required: true },
  season: { type: Number, required: true },
  raceName: { type: String, required: true },
  circuit: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, required: true },
  results: [{
    position: Number,
    driver: String,
    team: String,
    time: String,
    points: Number,
    fastestLap: Boolean,
  }],
  ferrariResult: {
    position: Number,
    driver: String,
    points: Number,
  },
}, { timestamps: true })

module.exports = mongoose.model('RaceResult', raceResultSchema)
