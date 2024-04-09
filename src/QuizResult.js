import { Link, useLocation } from 'react-router-dom';
import './Quiz.css';

export default function QuizResult() {
  let correctCount = 0;
  const location = useLocation();
  const { questions, selectedAnswers } = location.state;

  return (
    <div>
      <h4>RESULTS</h4>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-div">
          <p>{question.question}</p>
          {question.answers.map((answer, answerIndex) => {
            const isCorrect = selectedAnswers.includes(answer) && answer === question.correct_answer;
            const isSelected = selectedAnswers.includes(answer);

            // Check if the answer is the actual correct answer
            const isActualCorrectAnswer = answer === question.correct_answer;

            if (isCorrect) {
              correctCount++;
            }

            return (
              <button key={answerIndex} style={{ marginRight: '10px' }} 
              className={isSelected ? (isCorrect ? 'btn btn-success' : 'btn btn-danger') : (isActualCorrectAnswer ? 'btn btn-success' : 'btn btn-outline-success')}>
                {answer}
              </button>
            );
          })}
        </div>
      ))}

      <div className="score-container">
        <p style={{ backgroundColor: scoreColor(correctCount), padding: '10px', borderRadius: '5px', color: 'black' }}>
          Final Score: {correctCount} out of {questions.length}
        </p>
      </div>

      <Link to="/" className="btn btn-secondary">
        Create New Quiz
      </Link>
    </div>
  );
}

function scoreColor(correctCount) {
  if (correctCount <= 1) {
    return 'red';
  } else if (correctCount <= 3) {
    return 'yellow';
  } else {
    return 'green';
  }
}
