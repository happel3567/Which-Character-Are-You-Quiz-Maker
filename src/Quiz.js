import React, { useState, useEffect } from 'react';
import react from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Home.css';

export default function Quiz() {
    const location = useLocation();
    const { quiz } = location.state || {};  // Destructure the passed quiz from state

    if (!quiz) {
        return <p>No quiz data available.</p>;  // Fallback if no quiz data is passed
    }

    return (
        <div className="quiz-details">
            <h1>{quiz.title}</h1>
            <ul>
                {quiz.questions.map((q, qIdx) => (
                    <li key={qIdx}>
                        <strong>{q.question}</strong>
                        <ul>
                            {q.options.map((opt, optIdx) => (
                                <li key={optIdx}>{opt}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}