const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  skills: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  experience: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  education: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  projects: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  certificates: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  extracurricular: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  }
}, { timestamps: true, strict: false, minimize: false });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
