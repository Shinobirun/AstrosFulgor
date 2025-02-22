const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Profesor', 'Avanzado', 'Intermedio', 'Principiante'], required: true },
  creditos: { type: Number, default: 5 },
  turnosTomados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turno' }],
  activo: { type: Boolean, default: true },
});

// Comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    return false;
  }
};

// Middleware antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
