import React, { Fragment } from 'react';
import {useState, useEffect, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';

const MainQuiz = (props) =>{
    const {data, setAnswers, numberOfQuestions, currentQuestion, setCurrentQuestion, setStep,step} = props;

    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();
    const [time, setTime] = useState ({});

    useEffect(() => {
        let interval = null;
        const countDownTime = Date.now() + 120000;
        interval = setInterval(()=>{
            const now = new Date();
            const total = countDownTime - now;

            const minutes = Math.floor((total % (1000 *60 *60))/(1000*60));
            const seconds = Math.floor((total % (1000 * 60)) / 1000);

            if(total < 0 && step === 2){
                clearInterval(interval);
                setTime({minutes: 0, seconds: 0})
                alert("Time's up !! The quiz has ended")
                setStep(3)
            } else if (step === 1 || step === 3 ){
                clearInterval(interval);
                setTime({minutes: 0, seconds: 0})
            }
            else{
                setTime({
                    minutes,
                    seconds
                })
            }   
        })
        
    },[])


    useEffect(()=>{
        const checkedInput = radiosWrapper.current.querySelector('input:checked');
        // console.log(checkedInput)
        if(checkedInput){
            checkedInput.checked = false;
        } 
    },[data])
    
    const changeHandler = (e) =>{
        setSelected(e.target.value);
        if(error){
            setError('');
        }
    }
    const nextQuiz = (e)=>{
        if(selected === ''){
            return setError('Please select one option');
        }
        setAnswers(prevState => [...prevState, { que: data.question, ans: selected }]);
        setSelected('')
        setCurrentQuestion(currentQuestion+1)
    }
    

    function submitQuiz() {
        setStep(3);
        setAnswers(prevState => [...prevState, { que: data.question, ans: selected }]);
    }
    return(
        <Fragment >
            <div className="container">
                <div className="card text-left border-info ">
                    <h4 className="card-header">Que {currentQuestion+1}. {data.question}</h4>
                    <div className="card-body">
                        <span className="right">Time left: {time.minutes}:{(time.seconds)>=10?(time.seconds):"0"+(time.seconds)}</span>
                        <div className="form-check" ref={radiosWrapper}>
                            {data.choices.map((choice, i) => (
                                <div key={i}>
                                    <label className="form-check-label fst-italic fw-bold">
                                        <input className="form-check-input p-2 me-3" type="radio" name="answer" value={choice} onChange={changeHandler} />
                                        {choice} 
                                    </label>
                                </div>
                            ))}
                        </div>

                        {error && <span className="text-danger">{error}</span>} <br/>
                        
                        
                        {currentQuestion < numberOfQuestions - 1 && 
                            <button className="btn btn-success px-4 py-2" style={{width:"45%"}} onClick={nextQuiz} >Next</button>
                        }
                        {currentQuestion == numberOfQuestions -1 &&
                            <button className="btn btn-success px-4 py-2" style={{width:"45%"}} onClick={submitQuiz}>Submit</button>
                        }
                       
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MainQuiz;