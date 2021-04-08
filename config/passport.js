var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");


var bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ where: { username: username } })
          .then(function (user) {
            //comparer les mots de passes
            bcrypt.compare(password, user.password, function (
              errBcryt,
              resBcrypt
            ) {
              // si le mot de passe existe
              if (resBcrypt) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Mot de passe incorrect",
                });
              }
            });
          })
          .catch(function (err) {
            // si l'email n'existe pas
            return done(null, false, { message: "Cet email n'existe pas" });
          });
      }
    )
  );
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {


  done(null, { user: user });
});


