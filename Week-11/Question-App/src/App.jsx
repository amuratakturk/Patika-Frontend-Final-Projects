import { useState } from "react";
import "./App.css";
import Question from "./components/Question";
import ResultScreen from "./components/ResultScreen.jsx";
import { questions } from "./data/questions";

function App() {
  const [isTestStarted, setIsTestStarted] = useState(false); // Test başlangıç durumu
  const [isTestFinished, setIsTestFinished] = useState(false); // Test bitiş durumu
  const [userAnswers, setUserAnswers] = useState([]); // Kullanıcı cevapları
  const [correctAnswers, setCorrectAnswers] = useState(0); // Doğru cevap sayısı
  const [currentQuestion, setCurrentQuestion] = useState(0); // Şu anki soru numarası

  // Testi başlatır
  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  // Kullanıcının seçtiği cevabı işler
  const handleAnswerSelection = (isCorrect, selectedOption) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = selectedOption; // Şu anki sorunun cevabını ekler
      return newAnswers;
    });

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    }
  };

  // Bir sonraki soruya geçiş işlemi
  const handleNextQuestion = () => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      if (!newAnswers[currentQuestion]) {
        newAnswers[currentQuestion] = "Cevap verilmedi"; // Eğer kullanıcı cevap vermemişse
      }
      return newAnswers;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  // Testi bitirir ve sonuç ekranına geçiş yapar
  const handleFinishTest = () => {
    setIsTestFinished(true);
  };

  return (
    <div className="app">
      {!isTestStarted ? (
        <div>
          <h1>
            Question-App'e <br /> Hoş Geldiniz!
          </h1>
          <p>
            Sizi 10 soruluk bir test bekliyor. Başlamak için 'Teste Başla'
            butonuna tıklayın.<br></br>Unutmayın, 4 saniye içinde şıklar gelir
            ve her soru için yalnızca 30 saniyeniz var! ⏳
          </p>
          <button id="start" onClick={handleStartTest}>
            Teste Başla
          </button>
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

export default App;
