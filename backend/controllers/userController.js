const User = require("../models/userModel");
const {sendVerificationEmail,sendWellcomeEmail} = require('../middleware/emailSendMiddleware')
const handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      throw new Error("Token generation failed");
    }
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("error signin ", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
};


const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const profileImageURL = req.file ? req.file.path : '/uploads/default-1.png';
  try {
    if (!fullName || !email || !password || !profileImageURL) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exits" });
    }
    const verficationToken= Math.floor(100000 + Math.random() * 900000).toString()
    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageURL,
      verficationToken,
      verficationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000
    });
    await sendVerificationEmail(newUser.email,verficationToken)
    return res
      .status(201)
      .json({ message: "User created successfuly", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const handleUserlogout = (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
};
const handleVerifyEmail=async(req,res)=>{
  try {
      const {code}=req.body 
      const user= await User.findOne({
          verficationToken:code,
          verficationTokenExpiresAt:{$gt:Date.now()}
      })
      if (!user) {
          return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
              
          }
        
   user.isVerified=true;
   user.verficationToken=undefined;
   user.verficationTokenExpiresAt=undefined;
   await user.save()
   await sendWellcomeEmail(user.email,user.fullName)
   return res.status(200).json({success:true,message:"Email Verifed Successfully",user})
         
  } catch (error) {
      console.log(error)
      return res.status(400).json({success:false,message:"internal server error"})
  }
}


module.exports = { handleUserSignup, handleUserSignin,handleUserlogout ,handleVerifyEmail};
