import React, { useState } from "react";
import { Image, Button, Modal, Jumbotron } from "react-bootstrap";
import background from "./img/quiz-app-bckgrnd.svg";

export default function QuestionList({

    questionCategory,
  questionDifficulty,
  chooseCategory,
  chooseNumberQuestions,
  showModal,
  chooseDifficulty,
  roundNumber,
  resetGame,
  staticData,
  isSelected,
  setIsSelected,
  showAnswers,
  setShowAnswers,
}) {
  console.log(staticData);
  {
    /*const [showAnswers, setShowAnswers] = useState(false)
const [isSelected, setIsSelected]=useState(Array(5).fill(Array(4).fill(false)));*/
  }

  function selectAnswer(e, i, questionIndex) {
    console.log(i);
    console.log(questionIndex);
    const question = questionIndex.questionIndex;
    const option = i.index;
    document.getElementById(`answer0${question}`).classList.remove("selected");
    document.getElementById(`answer1${question}`).classList.remove("selected");
    document.getElementById(`answer2${question}`).classList.remove("selected");
    document.getElementById(`answer3${question}`).classList.remove("selected");

    setIsSelected((prevIsSelected) => {
      const newIsSelected = [...prevIsSelected];
      newIsSelected[question] = newIsSelected[question].map((answer, index) => {
        return index === option ? true : false;
      });
      return newIsSelected;
    });

    const selectedAnswer = document.getElementById(
      `answer${option}${question}`
    );
    selectedAnswer.classList.add("selected");
    console.log(`This is the isSelected array ${isSelected}`);
  }

  function checkAnswers() {
    const prevShowAnswers = showAnswers;
    setShowAnswers(!prevShowAnswers);
  
        document.getElementById("checkAnswers").disabled = true;
    
    console.log(isSelected);
  }

  function resetCheckAnswers(){
 
        document.getElementById("checkAnswers").disabled = false;
   
  }



  const questionListArray = staticData.map((question, index) => {
    const questionIndex = index;
    console.log(`The question index is ${index}`);
    var parse = require("html-react-parser");
    return (
      <div className="question">
        <h1>{parse(`${question.question}`)}</h1>
        <ul>
          {question.answers.map((answer, index) => {
            const answerId = `answer${index}${questionIndex}`;

            return (
              <li
                id={answerId}
                key={index}
                onClick={(e) => selectAnswer(e, { index }, { questionIndex })}
                className={
                  showAnswers && answer === question.correctAnswer
                    ? "correct-answer"
                    : showAnswers && isSelected[questionIndex][index]
                    ? "incorrect-selected-answer"
                    : showAnswers
                    ? "incorrect-answer"
                    : ""
                }
              >
                {parse(`${answer}`)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });


  return (
    <>
      <Modal show={showModal} /*onHide={()=>setModal(false)}*/>
        <Modal.Header>
          <Modal.Title>
            <h1 as="modal-heading">Mobile Trivia Unlimited</h1>
          </Modal.Title>
        </Modal.Header>
        <div className="modal-all-options">
          <div className="modal-option-choices">
            <label for="category">Choose category:  </label>

            <select
              onChange={(e) => chooseCategory(e)}
              name="category"
              id="category"
            >
              <option value="" selected disabled hidden>
                Select
              </option>
              <option value="">Any</option>
              <option value="9">General Knowledge</option>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="14">Television</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
            </select>
          </div>

          <div className="modal-option-choices">
            <label for="difficulty">Choose difficulty level:  </label>

            <select
              onChange={(e) => chooseDifficulty(e)}
              name="difficulty"
              id="difficulty"
            >
              <option value="none" selected disabled hidden>
                Select
              </option>
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="modal-option-choices">
            <label for="numberQuestions">Choose number of questions:  </label>
            <select
              onChange={(e) => chooseNumberQuestions(e)}
              name="numberQuestions"
              id="numberQuestions"
            >
              <option value="none" selected disabled hidden>
                Select
              </option>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        <div className="modal-btn-div">
          <Button className="modal-btn" variant="danger" onClick={resetGame}>
            Start
          </Button>
        </div>
      </Modal>

      {!showModal && (
        <div className="questions-list">
            <h1 className="gameTitle">Mobile Trivia Unlimited</h1>
            <h2>Round {roundNumber}</h2>
            <div className="quiz-title">
            <h2>
              Category:{" "}
              {questionCategory === 11
                ? "Film"
                : questionCategory === 12
                ? "Music"
                : questionCategory === 14
                ? "Television"
                : questionCategory === 21
                ? "Sports"
                : questionCategory === 23
                ? "History"
                : "General Knowledge"}
            </h2>
            <h2>Difficulty: {questionDifficulty}</h2>
          </div>

          {questionListArray}

          <div className="bottom-btns">
            <button className="checkAnswers" id="checkAnswers" onClick={checkAnswers}>
              Check Answers
            </button>
            {showAnswers && (
              <button className="playAgain" onClick={event => {
                resetCheckAnswers();
              resetGame();}}>
                Play Again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
