var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  password_hash = require('password-hash');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  sails.models.user.find({ id: id } , function (err, user) {
    user = user[0];
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

    sails.models.user.find({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user || user.length == 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }else{
        user = user[0];
      }

      if(password_hash.verify(password, user.password)){
        var returnUser = {
          email: user.email,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      }else{
        return done(null, false, {
          message: 'Invalid Password'
        });
      }

    });
  }
));
