import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import User from './models/User';

passport.use(new BasicStrategy(
  (username, password, done) => {
    User.findOne({ _id: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  },
));

export default passport.authenticate('basic', { session: false });
