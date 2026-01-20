import { useState, useEffect } from 'react';
import { questions } from '../data/questions.js';  // Soruları içe aktar

const Question = ({ question, questionNumber, totalQuestions, onAnswerSelection, onNextQuestion }) => {
    const [showOptions, setShowOptions] = useState(false); // Seçeneklerin gösterilip gösterilmediğini kontrol eder
    const [timer, setTimer] = useState(34);  // Kullanıcının her soru için sahip olduğu süreyi takip eder

    useEffect(() => {   
        setTimer(34); 
        setShowOptions(false); 
        
        const showOptionsTimeout = setTimeout(() => {
            setShowOptions(true); // 4 saniye sonra seçenekleri göster
        }, 4000);

        const countdownInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(countdownInterval); // Sayaç sıfıra ulaştığında durdur
                    onNextQuestion(); // Sonraki soruya geç
                    return 0;
                }
            });
        }, 1000);

        // Temizlik işlemleri: Zamanlayıcı ve sayaç temizlenir
        return () => {
            clearTimeout(showOptionsTimeout);
            clearInterval(countdownInterval);
        };
    }, [questionNumber]);

    const handleOptionClick = (option) => {
        const isCorrect = option === question.answer; // Kullanıcının cevabının doğru olup olmadığını kontrol et
        onAnswerSelection(isCorrect, option); // Kullanıcı cevabını işle
        onNextQuestion(); // Cevap seçildikten sonra bir sonraki soruya geç
    };

    return (
        <div>
            <p>Soru {questionNumber} / {totalQuestions}</p> {/* Soru numarasını göster */}
            <img
                src={`/pictures/${question.media}`} alt="Soru Görseli" 
                className="question-image"/>
            <h2> {question.question}</h2>
            {showOptions && ( 
                <>
                    <p>🕒 {timer} saniye</p> {/* Sayaç, seçenekler gösterildiğinde görünür */}
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
