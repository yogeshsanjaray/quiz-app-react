import React from 'react';

const StartPage = ({ onQuizStart }) => {
  return(
      <div className="container" >
        <div className="card text-center">
          <div className="card-body">
            <h1 className="card-title display-3 fw-normal">Start the Quiz</h1>
            <p className="card-text pt-3 pb-1 fs-2 fst-italic">Good luck!</p>
            <button className="btn btn-success mt-3 px-5 py-2 fs-4 fw-normal" onClick={onQuizStart}>Start</button>
          </div> 
        </div>
      </div>
  );
}

export default StartPage;
