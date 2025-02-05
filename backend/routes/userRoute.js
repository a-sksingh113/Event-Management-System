const exprees = require('express');

const {handleUserSignin, handleUserSignup, handleUserlogout,handleVerifyEmail} = require("../controllers/userController");
const upload = require('../config/cloudinaryConfig');
const router = exprees.Router();



router.post("/signup",  upload.single("profileImageURL"), handleUserSignup);
router.post("/verify-email", handleVerifyEmail);
router.post("/signin", handleUserSignin);
router.post("/logout", handleUserlogout);


module.exports = router;