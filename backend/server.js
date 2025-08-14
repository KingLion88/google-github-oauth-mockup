const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./auth');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Google Auth
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

// GitHub Auth
app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

// Current User
app.get('/api/me', (req, res) => {
  res.json(req.user || null);
});

// Logout
app.get('/api/auth/logout', (req, res) => {
  req.logout(() => res.sendStatus(200));
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));