import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function Create() {
  const navigate = useNavigate();
  // keep track of characters and their corresponding names and images
  const [characters, setCharacters] = useState([{ character: '', image: 'https://demofree.sirv.com/nope-not-here.jpg' }]);
  // add character when + button clicked

  const addCharacter = () => {
    setCharacters([...characters, { character: '', image: 'https://demofree.sirv.com/nope-not-here.jpg' }])
  };

  const changeCharacter = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedCharacter = [...characters];
      updatedCharacter[index].image = imageUrl;
      setCharacters(updatedCharacter);
    }
  };

  const changeName = (index, newName) => {
    const updateName = [...characters];
    updateName[index].character = newName;
    setCharacters(updateName)
  }

  // keep track of questions and their corresponding options
  const [questions, setQuestions] = useState([{ question: '', options: [{ option: ''}] }]);
  // state for quiz title
  const [quizTitle, setQuizTitle] = useState('');
  // state to store all quizzes created by users
  const [allQuizzes, setAllQuizzes] = useState([]);

  // add question when + button clicked
  const addQuestion = () => {
    // ...questions is alrdy existing
    setQuestions([...questions, { question: '', options: [{ option: ''}] }]);
  };

  // handle question changes
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // handle option changes
  const handleOptionsChange = (qindex, oindex, value) => {
    console.log('Question Index:', qindex);
    console.log('Option Index:', oindex);
    console.log('New Value:', value);
    const newQuestions = [...questions];
    // change options of respective question
    newQuestions[qindex].options[oindex].option = value;
    console.log('Updated Questions:', newQuestions);
    // set to new state
    setQuestions(newQuestions);
  };

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ option: ''});
    setQuestions(updatedQuestions);
  }

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuiz = {
      title: quizTitle,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.map(opt => opt.option) // Convert array of objects to array of strings
  })),
      characters: characters.map(char => ({
        character: char.character, // Character name
        image: char.image // Character image URL
      })),
    };

    try {
      // post quiz to backend db
      const response = await axios.post('http://localhost:5000/api/quizzes', newQuiz);
      console.log('Quiz saved:', response.data);

      // clear form
      setQuizTitle('');
      setQuestions([{ question: '', options: [{ option: ''}] }]);

      // updated list
      fetchQuizzes();
    } catch (err) {
      console.error('Error saving quiz:', err);
    }
    navigate('/Play');
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
          <label htmlFor={`question-${index}`}>Question {index + 1}*</label>
          <input
            type="text"
            id={`question-${index}`}
            className="input-box"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            required
          />
          <p className="error" id={`questionError-${index}`}></p>
    
          <div className="new-option">
            {q.options.map((opts, optionIndex) => (
              <div key={optionIndex}>
                <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                <input
                  type="text"
                  id={`option-${index}-${optionIndex}`}
                  className="input-option"
                  placeholder="Enter option"
                  value={opts.option}
                  onChange={(e) => handleOptionsChange(index, optionIndex, e.target.value)}
                />
              </div>
            ))}
            {/* Add functionality to add more options if needed */}
            <button type="button" onClick={() => addOption(index)}>Add Option</button>
          </div>
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
            type="file"
            accept="image/*"
            onChange={(e) => changeCharacter(index, e)}
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