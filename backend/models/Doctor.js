// Importing required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining the schema for the Doctor model
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Doctor's name, required field
    email: { type: String, required: true, unique: true }, // Doctor's email, required and must be unique
    password: { type: String, required: true }, // Doctor's password, required field
    specialty: { type: String }, // Doctor's specialty, optional field
});

// Middleware to hash the password before saving the document
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // If password is not modified, proceed to the next middleware
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
    next(); // Proceed to the next middleware
});

// Method to compare candidate password with the stored password
doctorSchema.methods.comparePassword = async function (candidatePassword) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    let password = await bcrypt.hash(candidatePassword, salt); // Hash the candidate password with the generated salt
    return bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the stored hashed password
};

// Exporting the Doctor model based on the defined schema
module.exports = mongoose.model('Doctor', doctorSchema);
