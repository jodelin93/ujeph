const isLoggin=  (req, res, next)=> {
  if (req.isAuthenticated()) {
      console.log(req.isAuthenticated());
    res.locals.user = req.session.passport.user;
    return next();
  } else {
    req.flash("danger", "Vous devez connecté (e) pour voir cette page.");
    res.redirect("/");
  }
};

module.exports=isLoggin;