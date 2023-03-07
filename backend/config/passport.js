const { compareSync } = require("bcrypt");
const passport = require("passport");
const User = require("../models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const GitHubStrategy = require("passport-github2").Strategy;
const TwitterStrategy =
  require("@superfaceai/passport-twitter-oauth2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

const express = require("express");
const app = express();

//initialize passport to connect with express
app.use(passport.initialize());

//this middleware will be called when passport.authenticate() runs
//google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/sso/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(accessToken, profile);
      //if no email, fail & redirect to login again//messages not shown tho
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null, false, {
          message: "Failed! Please choose a different way to sign in",
        });
      }

      User.findOne({ email }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email,
            verified: true,
          });

          newUser.save();

          return cb(null, newUser);
        } else if (!user.verified) {
          //user has account bt not verified//registered using form
          return cb(err);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

//fb
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/sso/facebook/callback`,
      profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(accessToken, profile);
      //if no email, fail
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null, false, {
          message: "Failed! Please choose a different way to sign in",
        });
      }

      User.findOne({ email }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email,
            verified: true,
          });

          newUser.save();

          return cb(null, newUser);
        } else if (!user.verified) {
          //user has account bt not verified//registered using form
          return cb(err);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

//twitter//not working//requires session
passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/sso/twitter/callback`,
      clientType: "confidential",
      profileFields: ["id", "displayName", "photos", "email"],

      // includeEmail: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(accessToken, profile);
      //if no email, fail
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null, false, {
          message: "Failed! Please choose a different way to sign in",
        });
      }
      User.findOne({ email }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email,
            verified: true,
          });

          newUser.save();

          return cb(null, newUser);
        } else if (!user.verified) {
          //user has account bt not verified//registered using form
          return cb(err);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

//github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/sso/github/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(accessToken, profile);

      //if no email, fail
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null, false, {
          message: "Failed! Please choose a different way to sign in",
        });
      }
      User.findOne({ email }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email,
            verified: true,
          });

          newUser.save();

          return cb(null, newUser);
        } else if (!user.verified) { //user has account bt not verified//registered using form
          return cb(err);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

//LinkedIn//have to use other port other than 5000//use 4000
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/sso/linkedin/callback`,
      scope: ["r_emailaddress", "r_liteprofile"],
      state: false, //must to not use session
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(accessToken, profile);

      //if no email, fail
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null, false, {
          message: "Failed! Please choose a different way to sign in",
        });
      }
      User.findOne({ email }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email,
            verified: true,
          });

          newUser.save();

          return cb(null, newUser);
        } else if (!user.verified) {
          //user has account bt not verified//registered using form
          return cb(err);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);
