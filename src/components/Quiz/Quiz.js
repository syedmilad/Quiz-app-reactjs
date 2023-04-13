import Result from "../Result/Result";
import ProgressBar from "@ramonak/react-progress-bar";
import decodeUriComponent from "decode-uri-component";
import React, { useEffect, useState } from 'react';
import arrayShuffle from "array-shuffle";
import data from '../../questions.json';
import './Quiz.css';
import swal from 'sweetalert';
// import Countdown from "./Countdown/Countdown";
import Rating from "@mui/material/Rating";
import '../../App.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestoin] = useState(0); // 1
  const [currectAnswer, setCurrectAnswer] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showCurrectMsg, setShowCurrectMsg] = useState("");
  const [difficulty, setDifficulty] = useState(0); // 2 
  const [disabled, setDisabled] = useState(false); // 6
  const [allOptions, setAllOptions] = useState([]); // 3
  let [questionTime, setQuestionTime] = useState(10);
  let [isAttemted, SetIsAttempted] = useState(false); // 4
  let [stopTimer, setStopTimer] = useState(false);
  let [selectedOption, setSelectedOption] = useState(""); // 5

  let multiply = currectAnswer * 100; 
  let result = multiply / data.length;

  const checkDifficulty = () => { // first wrok
    if(data.length > 0){
      const levels = data[currentQuestion].difficulty;
      levels === "hard" 
      ? setDifficulty(5) 
      : levels === "medium" 
      ? setDifficulty(3) 
      : setDifficulty(1)
    }
  }

  const nextBtnHandler = () => {
    let nextquestion = currentQuestion + 1;
    setStopTimer(false);
    SetIsAttempted(false);
    setShowCurrectMsg("");

    if (nextquestion < data.length) {
      setCurrentQuestoin(nextquestion);
      setDisabled(false);
    } else {
      setShowResult(true);
    }

    if (isAttemted == " ") {
      swal("Please select an option first");
      setCurrentQuestoin(currectAnswer);
    }
  };

  const handlerCountdown = () => {
    if(currentQuestion === data.length - 1){
      setStopTimer(true);
      setShowResult(true);
      SetIsAttempted(true)
    }else{
      setCurrentQuestoin(currentQuestion  + 1 );
      SetIsAttempted(false);
      setDisabled(false)  
    }
  }
  //// 2 work
  const currectAnswerHandler = (ans) => {
      if(isAttemted && ans === data[currentQuestion].correct_answer){
        return "option_btn_true"
      }
      if(isAttemted && selectedOption === ans
        && selectedOption !== data[currentQuestion].correct_answers){
          return "option_btn_false"
      }
    }
       
  const answerHandler = (e) => {
    SetIsAttempted(true);
    setSelectedOption(e.target.value);

    if(e.target.value === data[currentQuestion].correct_answer){
      setShowCurrectMsg("Currect!");
      setCurrectAnswer(currectAnswer + 1  )
      setDisabled(true)
    }else{
      setDisabled(true);
      setShowCurrectMsg("Sorry!")
    }

  }   

 

  // work 3 for functions 
  
  useEffect(() => {
    checkDifficulty();
    let answers = arrayShuffle([
      ...data[currentQuestion].incorrect_answers,
      data[currentQuestion].correct_answer,
    ]);
    setAllOptions(answers);
  }, [currentQuestion]);

  return (
    <div className="main_div">
      {showResult ? (
        <Result result={result} />
      ) : (
        <>
          <div className="sub_div ">
            <div className="header">
              <div>
                <h6>
                  Category: {decodeUriComponent(data[currentQuestion].category)}
                </h6>
                <div className="rating">
                  <Rating
                    name="read-only"
                    value={difficulty}
                    readOnly
                    size="small"
                  />
                </div>
                <h3>
                  Question {currentQuestion + 1} of {data.length}
                </h3>
              </div>
              <div className="counter_div">
                        {/* <Countdown
                          startingSeconds={questionTime}
                          stopTimer={stopTimer}
                          func={handlerCountdown}
                        /> */}
              </div>
            </div>

            <div className="Questions_div">
              <p>{decodeUriComponent(data[currentQuestion].question)}</p>
            </div>

            <div className="options_main">
              <div className="Options">
                {allOptions.map((ans, i) => {
                  return (
                    <>
                      <button
                        className={"option_btn " + currectAnswerHandler(ans)}
                        key={i}
                        disabled={disabled}
                        value={ans}
                        onClick={answerHandler}
                      >
                        {decodeUriComponent(ans)}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="Option_Result_div">
              <h1>{showCurrectMsg}</h1>
            </div>
            <div className="next_btn_div">
              <button onClick={nextBtnHandler} className="Next_btn">
                Next
              </button>
            </div>
            <div className="score_board">
              <h6>Score:{result}%</h6>
              <h6>Max-Score: 100%</h6>
            </div>
            <div>
              <ProgressBar completed={result} maxCompleted={100} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz