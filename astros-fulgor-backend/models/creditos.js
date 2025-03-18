const mongoose = require('mongoose');

const creditoSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creadoEn: { type: Date, default: Date.now },
    venceEn: { type: Date, default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }, // 15 días después
    usado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Credito', creditoSchema);
