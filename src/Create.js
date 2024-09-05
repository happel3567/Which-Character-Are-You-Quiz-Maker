import React, { useState, useEffect } from 'react';
import './Create.css';

// need to make a + button that when clicked, renders another question and options box
// for now, options can be entered per question separated by enter key -> need to add this logic
// maybe parse each entry in the options array when rendering

export default function Create() {

  // keep track of questions and their corresponding options
  const [questions, setQuestions] = useState([{ question: '', options: '' }]);

  // add question when + button clicked
  const addQuestion = () => {
    // ...questions is alrdy existing
    setQuestions([...questions, { question: '', options: '' }]);
  };

  // handle question changes
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // handle option changes
  const handleOptionsChange = (index, value) => {
    const newQuestions = [...questions];
    // change options of respective question
    newQuestions[index].options = value;
    // set to new state
    setQuestions(newQuestions);
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Data:', questions);
    // didnt do yet. need db i think
  };

  return (
    <form className="new-quiz-form" id="newQuizForm">
      <h1>Create Page</h1>

      <div className="new-quiz-title">
        <label htmlFor="title">Quiz Title*</label>
        <p className="hint">Limit title to 100 characters or less</p>
        <input type="text" className="input-box" placeholder="Enter quiz title (max 100 characters)" />
        <p className="error" id="titleError"></p>
      </div>

      {/* render questions and options dynamically */}
      {questions.map((q, index) => (
        <div key={index} className="new-question-block">
          <div className="new-question">
            <label htmlFor="question">Question {index + 1}*</label>
            <p></p>
            <input
              type="text"
              className="input-box"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <p className="error" id="questionError"></p>
          </div>

          <div className="new-options">
            <label htmlFor="options">Options*</label>
            <p className="hint">Enter options, separated by the Enter key</p>
            <textarea
              className="input-box"
              placeholder="Enter options (separate by Enter key)"
              value={q.options}
              onChange={(e) => handleOptionsChange(index, e.target.value)}
            />
            <p className="error" id="optionsError"></p>
          </div>
        </div>
      ))}

      <div className="add-question-btn">
        <button type="button" className="new-quiz-btn" onClick={addQuestion}>
          + Add Question
        </button>
      </div>

      <div className="new-quiz-submit">
        <button type="submit" className="new-quiz-btn">Post Quiz</button>
        <p className="req">* indicates mandatory fields</p>
      </div>

    </form>
  );
}



