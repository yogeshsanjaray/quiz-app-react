import { useEffect,useState } from "react";

function ResultPage({results,numberOfQuestions,onReset,data}) {
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
            if(result.ans === data[index].answer) {
                correct++;
            }
        });
        setCorrectAnswers(correct);
        // eslint-disable-next-line
    }, []);

    console.log(correctAnswers)
    return(
        <div className="container">
            <div className="card text-center">
            <h2 className="card-header">Your Results</h2>
                <div className="card-body">
                    <h3 className="display-6 fw-normal">You answered correctly at {correctAnswers}/{numberOfQuestions} questions</h3>
                    <p><strong>{Math.floor((correctAnswers / numberOfQuestions) * 100)}% Accuracy</strong></p>
                    <button className="btn btn-success px-4 py-2" onClick={onReset}>Try again</button>
                </div>
            </div>
        </div>
    )
}

export default ResultPage;