// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Session & Passport middleware
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Routers
const userRouter = require('./routes/user.router');
const designsRouter = require('./routes/designs.router');
const bookingsRouter = require('./routes/bookings.router');
const officeHoursRouter = require('./routes/officeHours.routes');
const uploadRouter = require('./routes/upload.router');
const adminRouter = require('./routes/admin.router');

// Optional: if you implemented category filtering for designs
let categoriesRouter;
try {
  categoriesRouter = require('./routes/categories.router');
} catch (err) {
  console.warn('⚠️ Categories router not found or not implemented.');
}

// CORS setup: Allow requests from your frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build')); // serve front-end from build folder if applicable

// Auth session handling
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/designs', designsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/office-hours', officeHoursRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/admin', adminRouter);

if (categoriesRouter) {
  app.use('/api/categories', categoriesRouter);
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
