import React from 'react'
import { useState, useEffect } from 'react';
import he from 'he';
import { useHistory } from 'react-router-dom';
import './Quiz.css';

export default function Questions({ category, difficulty }) {

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        // Decode HTML entities in question text
        const formattedData = data.results.map(question => ({
          ...question,
          question: he.decode(question.question),
          // random answers order
          answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
        }));
        setQuestions(formattedData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [category, difficulty]);

  function handleAnswerClick(questionIndex, answer) {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
    setShowSubmitButton(newSelectedAnswers.length === 5);
  };

  function handleSubmit() {
    console.log('Submitted answers:', selectedAnswers);
    history.push('/quiz-result', { questions, selectedAnswers });
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-div">
          <p>{question.question}</p>
          {question.answers.map((answer, answerIndex) => (
            <button key={answerIndex} className={`btn ${selectedAnswers[questionIndex] === answer ? 'btn-success' : 'btn-outline-success'}`}
              style={{ marginRight: '10px' }} onClick={() => handleAnswerClick(questionIndex, answer)}>{answer}</button>
          ))}
        </div>
      ))}
      {showSubmitButton && <button className="btn btn-secondary" onClick={handleSubmit}>Submit</button>}
    </div>
  );
}