import React, { useState, useEffect } from 'react';
import axios from 'axios';
import react from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Play() {

  const navigate = useNavigate();
  const [allQuizzes, setAllQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes');
      setAllQuizzes(response.data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };

  // wrapper for using functions idk
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quiz) => {
    // navigate to /quiz with the selected quiz
    navigate('/Quiz', { state: { quiz } });
  };

  return (
    <div className="quiz-list">
      <div classname="Play">
        <h1>Play Page</h1>
      </div>
      <h2>All Quizzes</h2>
      {allQuizzes.length > 0 ? (
        <ul>
          {allQuizzes.map((quiz, idx) => (
            <li key={idx}>
              <strong
                onClick={() => handleQuizClick(quiz)}  // Call handleQuizClick on click
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {quiz.title}
              </strong>

            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes created yet.</p>
      )}
    </div>
  );
}


