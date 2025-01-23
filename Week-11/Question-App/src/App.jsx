import { useState } from 'react';
import './App.css';
import Question from './components/Question';
import ResultScreen from './components/ResultScreen.jsx';
import { questions } from './data/questions';


function App() {
  const [isTestStarted, setIsTestStarted] = useState(false); //Since the initial value is false, when the page first loads the user sees the login screen to start the test.
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStartTest = () => {
    setIsTestStarted(true); // Starts the test when the button is pressed
  };

  const handleAnswerSelection = (isCorrect, selectedOption) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
    if (isCorrect) {
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    }
};

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length -1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handleFinishTest = () => {
    setIsTestFinished(true);
};

  return (
    <div className='app'>
      {!isTestStarted ? (
        <div>
          <h1>Question-App'e <br />Hoş Geldiniz!</h1>
          <p>Sizi 10 soruluk bir test bekliyor. Başlamak için 'Teste Başla' butonuna tıklayın.<br></br>Unutmayın, 4 saniye içinde şıklar gelir ve her soru için yalnızca 30 saniyeniz var! ⏳</p>
          <button id="start" onClick={handleStartTest}>Teste Başla</button>
        </div>
      ) : isTestFinished ? (
        <ResultScreen
          questions={questions}
          correctAnswers={correctAnswers}
          userAnswers={userAnswers}
          />
      ) : (
        <Question
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          question={questions[currentQuestion]}
          onAnswerSelection={handleAnswerSelection}
          onNextQuestion={handleNextQuestion} 
          onFinishTest={handleFinishTest} 
          />
      )}
    </div>
  );
}

export default App