const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true}, // User's name, required field
    email: { type: String, required: true, unique: true }, // User's email, required and must be unique
    password: { type: String, required: true } // User's password, required field
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // If password is not modified, proceed to the next middleware
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
    next(); // Proceed to the next middleware
});

// Method to compare entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function(enteredPassword) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    let password = await bcrypt.hash(enteredPassword, salt); // Hash the entered password with the generated salt
    return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the stored hashed password
};

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
