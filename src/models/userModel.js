const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      unique: true,
      trim: true, // Helps remove extra spaces
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      lowercase: true, // Converts emails to lowercase
      match: [/.+@.+\..+/, "Please provide a valid email address"], // Regex validation
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: [6, "Password must be at least 6 characters long"], // Enforce minimum length
      select: false,
    },
  },
  { timestamps: true }
); // Auto-created timestamps

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
