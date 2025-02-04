const exprees = require('express');
const {handleUserSignin, handleUserSignup, handleUserlogout,handleVerifyEmail} = require("../controllers/userController")
const router = exprees.Router();

router.post("/signup", handleUserSignup);
router.post("/verify-email", handleVerifyEmail);
router.post("/signin", handleUserSignin);
router.post("/logout", handleUserlogout);


module.exports = router;