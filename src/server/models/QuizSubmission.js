const mongoose = require('mongoose');

const quizSubmissionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: { type: Map, of: String }, // Map to store question index -> answer
    submittedAt: { type: Date, default: Date.now }
});

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);
module.exports = QuizSubmission;
