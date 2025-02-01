const exprees = require('express');
const {handleUserSignin, handleUserSignup} = require("../controllers/userController")
const router = exprees.Router();

router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);


module.exports = router;