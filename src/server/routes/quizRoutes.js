const express = require('express');
const Quiz = require('../models/QuizSchema');
const QuizSubmission = require('../models/QuizSubmission');

const router = express.Router();

// route to save a new quiz
router.post('/', async (req, res) => {
    const { title, questions } = req.body;

    try {
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: 'Error creating quiz', error: err });
    }
});

// route to get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quizzes', error: err });
    }
});

// route to submit a quiz
router.post('/:quizId/submissions', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;

        // save quiz submission to database
        const newSubmission = new QuizSubmission({
            quizId,
            answers,
        });

        await newSubmission.save();
        res.status(200).json({ message: 'Quiz submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
});

// get all submissions of quiz
router.get('/:quizId/submissions', async (req, res) => {
    try {
        const { quizId } = req.params;
        const submissions = await QuizSubmission.find({ quizId }); // find submissions for the given quizId

        if (!submissions.length) {
            return res.status(404).json({ message: 'No submissions found for this quiz' });
        }

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error });
    }
});

// get specific submission by submissionId
router.get('/submissions/:submissionId', async (req, res) => {
    try {
        const { submissionId } = req.params;
        const submission = await QuizSubmission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submission', error });
    }
});


module.exports = router;
