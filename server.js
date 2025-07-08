require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"/public")));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// app.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'contact.html'));
// });
// app.get('/projects', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'projects.html'));
// });
// Serve static frontend files from public folder
app.use(express.static('public'));

// Serve image uploads if you have them
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error(' DB Connection Error:', err));
