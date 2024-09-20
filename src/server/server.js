// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizArchive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the quiz routes
app.use('/api/quizzes', quizRoutes); // All quiz-related routes start with /api/quizzes

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
