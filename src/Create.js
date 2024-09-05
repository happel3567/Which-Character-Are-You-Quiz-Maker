import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

export default function Create() {

  // keep track of characters and their corresponding names and images
  const [characters, setCharacters] = useState([{ character: '', image: 'https://demofree.sirv.com/nope-not-here.jpg' }]);
  // add character when + button clicked

  const addCharacter = () => {
    setCharacters([...characters, { character: '', image: 'https://demofree.sirv.com/nope-not-here.jpg' }])
  };

  const changeCharacter = (index, newImage) => {
    const updateCharacter = [...characters];
    updateCharacter[index].image = newImage;
    setCharacters(updateCharacter);
  }

  const changeName = (index, newName) => {
    const updateName = [...characters];
    updateName[index].character = newName;
    setCharacters(updateName)
  }

  // keep track of questions and their corresponding options
  const [questions, setQuestions] = useState([{ question: '', options: '' }]);
  // state for quiz title
  const [quizTitle, setQuizTitle] = useState('');
  // state to store all quizzes created by users
  const [allQuizzes, setAllQuizzes] = useState([]);

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

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuiz = {
      title: quizTitle,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.split('\n') // Split options by new line
          .map(option => option.trim()) // Trim each option to remove leading/trailing spaces
          .filter(option => option !== '') // Filter out any empty options
      })),
    };

    try {
      // post quiz to backend db
      const response = await axios.post('http://localhost:5000/api/quizzes', newQuiz);
      console.log('Quiz saved:', response.data);

      // clear form
      setQuizTitle('');
      setQuestions([{ question: '', options: '' }]);

      // updated list
      fetchQuizzes();
    } catch (err) {
      console.error('Error saving quiz:', err);
    }
  };

  // get quizzes for display (debug)
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes');
      setAllQuizzes(response.data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };


  return (
    <form className="new-quiz-form" id="newQuizForm" onSubmit={handleSubmit}>
      <h1>Create Page</h1>

      <div className="new-quiz-title">
        <label htmlFor="title">Quiz Title*</label>
        <p className="hint">Limit title to 100 characters or less</p>
        <input type="text" className="input-box" placeholder="Enter quiz title (max 100 characters)"
          value={quizTitle} onChange={handleTitleChange} required />
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
              required
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
              required
            />
            <p className="error" id="optionsError"></p>
          </div>
        </div>
      ))}

      {characters.map((char, index) => (
        <div key={index}>
          <label htmlFor="character">Character {index + 1}*</label>
          <input
            type="text"
            value={char.character}
            placeholder="Character Name"
            onChange={(e) => changeName(index, e.target.value)}
          />
          <input
            type="text"
            value={char.image}
            placeholder="URL GOES HERE"
            onChange={(e) => changeCharacter(index, e.target.value)}
          />
          <img src={char.image} alt={char.character} width="100" />
        </div>
      ))}

      <div className="add-character-btn">
        <button type="button" className="new-character-btn" onClick={addCharacter}>
          + Add Character
        </button>
      </div>

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







