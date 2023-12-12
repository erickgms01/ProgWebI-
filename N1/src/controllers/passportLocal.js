import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import user from "../models/userModel.js"

passport.use(new LocalStrategy( { usernameField: 'email', session: false},
    async (email, password, done) => {
        try{
            const foundUser = await user.findOne({ email: email});
            if(!foundUser){ return done(null, false)};
            const isPasswordValid = await foundUser.isValidPassword(password);
            if(!isPasswordValid) { return done(null, false)};
            return done(null, foundUser);
        } catch(err){
            return done(err);
        }
    }
    
));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

export default passport;