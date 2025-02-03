const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../services/authService");

const userSchema = new mongoose.Schema( 
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
      default: "/images/default.png",
    },
    registeredEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProgramRegistration" },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if (userProvidedHash !== hashedPassword) throw new Error("Invalid password");

    const token = createTokenForUser(user);
   
    return token;
  } catch (error) {
    throw error;
  }
});

const User = mongoose.model("user", userSchema);  
module.exports = User;
