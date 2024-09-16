const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// quiz model schema (object basically)
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [String]
    }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

// route to save a new quiz
app.post('/api/quizzes', async (req, res) => {
    const { title, questions, characters } = req.body;

    try {
        const newQuiz = new Quiz({ title, questions, characters });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: 'Error creating quiz', error: err });
    }
});

// route to get all quizzes
app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quizzes', error: err });
    }
});

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});