import React from 'react';

const ResultScreen = ({ questions, correctAnswers, userAnswers }) => {
    return (
        <div>
            <h2>Tebrikler! Şimdi sonuçlarına bakalım...</h2>
            <p>✔️ Doğru Yanıt Sayısı: {correctAnswers}</p>
            <p>❌ Yanlış Yanıt Sayısı: {questions.length - correctAnswers}</p>

            <ul className="result-ul">
                {questions.map((question, index) => (
                    <li key={index} className="result-li">
                        <h4> {question.question} </h4>
                        <p> Doğru Cevap: {question.answer} </p>
                        <p> Senin Cevabın: {userAnswers[index]} </p>
                    </li>
                )
            )}
            </ul>
        </div>
    );
};

export default ResultScreen;