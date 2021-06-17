import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React ,{ useState } from 'react';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom"

import quizData from "./component/quizData.json"
import StartPage from './component/StartPage';
import MainQuiz from "./component/MainQuiz"
import ResultPage from "./component/ResultPage"

function App() {
  const [step, setStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);  

  const onStartClick = () => {
    setStep(2);
  }
  console.log(answers)

  const onReset = () =>{
    setCurrentQuestion(0);
    setAnswers([]);
    setStep(2);
  }

  return (
    <div>
      {step === 1 && <StartPage onQuizStart={onStartClick} />}
      {step === 2 && <MainQuiz 
                      data={quizData.data[currentQuestion]}
                      setAnswers={setAnswers}
                      numberOfQuestions={quizData.data.length}
                      currentQuestion={currentQuestion}
                      setCurrentQuestion={setCurrentQuestion} 
                      setStep={setStep} 
                      step = {step}
                     />}
      {step === 3 && <ResultPage 
                      data={quizData.data}
                      numberOfQuestions={quizData.data.length}
                      results={answers}
                      onReset={onReset}
                      currentQuestion={currentQuestion} 
                    />}
      
    </div>
  );
}
export default App;