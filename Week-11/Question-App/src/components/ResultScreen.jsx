import React from "react";

const ResultScreen = ({ questions, correctAnswers, userAnswers }) => {
  // Yanlış ve boş cevapların doğru hesaplanması
  const emptyAnswersCount = userAnswers.filter(
    (answer) => answer === "Cevap verilmedi"
  ).length; // "Cevap verilmedi" olanları say
  const wrongAnswersCount =
    questions.length - correctAnswers - emptyAnswersCount; // Toplamdan doğru ve boş olanları çıkar

  return (
    <div>
      <h2>Tebrikler! Şimdi sonuçlarına bakalım...</h2>
      <p>✔️ Doğru Yanıt Sayısı: {correctAnswers}</p>
      <p>❌ Yanlış Yanıt Sayısı: {wrongAnswersCount}</p>
      <p>➖ Boş Yanıt Sayısı: {emptyAnswersCount}</p>

      <ul className="result-ul">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || "Cevap verilmedi"; // Eğer cevap yoksa 'Cevap verilmedi' yaz
          const isCorrect = userAnswer === question.answer;
          const isEmpty = userAnswer === "Cevap verilmedi";

          return (
            <li key={index} className="result-li">
              <h4>{question.question}</h4>
              <p>Doğru Cevap: {question.answer}</p>
              <p>
                Senin Cevabın: {userAnswer}{" "}
                {isCorrect ? "✔️" : isEmpty ? "➖" : "❌"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultScreen;
