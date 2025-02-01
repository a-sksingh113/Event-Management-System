const JWT = require("jsonwebtoken");

function createTokenForUser(user) {
  try {
    const payload = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      profileImageURL: user.profileImageURL,
      role: user.role,
    };
    return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.error("error creating token", error.message);
    return null;
  }
}

function validateToken(token){
    try {
       return JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("error validating token", error.message);
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken
}