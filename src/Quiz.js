import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Quiz() {
  const location = useLocation();
  const { quiz } = location.state || {};  // get quiz data passed from play component

  // set state to store selected answers
  const [answers, setAnswers] = useState({});

  if (!quiz) {
    return <p>No quiz data available.</p>;  // fallback in case there's no quiz data
  }

  // handle when a radio button is selected
  const handleOptionChange = (questionIdx, selectedOption) => {
    setAnswers({
      ...answers,
      [questionIdx]: selectedOption,  // store selected option for each question
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${quiz._id}/submissions`,
        { answers }
      );

      console.log('Quiz submitted:', response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };


  return (
    <div className="quiz-details">
      <h1>{quiz.title}</h1>

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, qIdx) => (
          <div key={qIdx} className="question-block">
            <h3>{q.question}</h3>

            {q.options.map((opt, optIdx) => (
              <div key={optIdx} className="option">
                <label>
                  <input
                    type="radio"
                    name={`question-${qIdx}`}  // group radio buttons by question
                    value={opt}
                    checked={answers[qIdx] === opt}  // check if this option is selected
                    onChange={() => handleOptionChange(qIdx, opt)}  // handle change
                  />
                  {opt}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" className="new-quiz-btn">Submit Quiz</button>
      </form>
    </div>
  );
}
