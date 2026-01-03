module.exports = (req, res, next) => {
  const isAuthenticated = req.user || req.session?.user;
  
  if (!isAuthenticated) {
    return res.redirect("/login");
  }

  next();
};
