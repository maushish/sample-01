const express = require("express");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const { join } = require("path");

const app = express();

const port = process.env.SERVER_PORT || 3000;

// Configure session middleware
app.use(
  session({
    secret: "your-session-secret", // Replace with a secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure the Auth0 Strategy
passport.use(
  new Auth0Strategy(
    {
      domain: "dev-gqizmgyktir5vnuy.jp.auth0.com", // Replace with your Auth0 domain
      clientID: "cIfgf7Q9PP4ov9IlHX5xsDgwMTMl7ys9", // Replace with your Auth0 client ID
      clientSecret: "QEJ6vQcEn_hB_0hLnUk40G_33J0nGO_4ulcwGV6tqMSg3ybdf1dN8V9pnjqdcYET", // Replace with your Auth0 client secret
      callbackURL: "http://localhost:3000/callback", // Update with your callback URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // You can customize how user information is handled here
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ...

// Define your routes and middleware here

// ...

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
