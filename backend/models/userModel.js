const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../services/authService");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your fullname"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Already exist , try different email"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["STUDENT", "ORGANIZER"],
      default: "STUDENT",
    },
    profileImageURL: {
      type: String,
      require:true,
    },
    registeredEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProgramRegistration" },
    ],
    verficationToken:String,
    verficationTokenExpiresAt: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000, 
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    try {
      const user = await this.findOne({ email });
      if (!user) throw new Error("User not found");

      const salt = user.salt;
      const hashedPassword = user.password;
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

      if (userProvidedHash !== hashedPassword)
        throw new Error("Invalid password");

      const token = createTokenForUser(user);

      return token;
    } catch (error) {
      throw error;
    }
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
