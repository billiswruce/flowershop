const loggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this resource" });
  }
  next();
};
module.exports = { loggedIn };
