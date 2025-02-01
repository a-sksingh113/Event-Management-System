const validateToken = require("../services/authService");
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.error("error validating token ", error.message);
    }
    return next();
  };
}

module.exports = checkForAuthenticationCookie;
