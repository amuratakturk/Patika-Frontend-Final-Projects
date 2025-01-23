import { useState, useEffect } from 'react';
import { questions } from '../data/questions.js';  //  Import questions

const Question = ({ question, questionNumber, totalQuestions,onAnswerSelection, onNextQuestion }) => {
    const [showOptions, setShowOptions] = useState(false); // We check whether the options are displayed or not
    const [timer, setTimer] = useState(34);  // It keeps track of the time the user has for each question

    useEffect(() => {   
        setTimer(34); 
        setShowOptions(false); 
        
        const showOptionsTimeout = setTimeout(() => {
            setShowOptions(true); // After 4 seconds, show the options
        }, 4000);

        const countdownInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(countdownInterval);
                    onNextQuestion();
                    return 0;
                }
            });
        }, 1000);

            return () => {
                clearTimeout(showOptionsTimeout);
                clearInterval(countdownInterval);
            };
    }, [questionNumber]);

        const handleOptionClick = (option) => {
            const isCorrect = option === question.answer;
            onAnswerSelection(isCorrect, option);
            onNextQuestion(); // After the option is selected, move on to the next question
        };

    return (
        <div>
            <p>Soru {questionNumber} / {totalQuestions}</p> {/* We show the question number */}
            <img
                src={`/pictures/${question.media}`} alt="Question Media"
                style={{ width: '400px%' , height:'300px', objectFit: 'cover', borderRadius:'8px'}}/>
            <h2> {question.question}</h2>
            {showOptions && ( 
                <>
                    <p>🕒 {timer} saniye</p> {/* Timer appears when options are shown */}
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index} 
                            onClick={() => handleOptionClick(option)} style={{ cursor:'pointer'}} > 
                            {option}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button onClick={onNextQuestion}>
                Sonraki Soru
            </button>
        </div>
    );
};

export default Question;