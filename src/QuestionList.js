import React, {useState} from 'react'
import {Image, Button, Modal, Jumbotron} from 'react-bootstrap'
import background from './img/quiz-app-bckgrnd.svg'


export default function QuestionList ({roundNumber, resetGame, staticData, isSelected, setIsSelected, showAnswers, setShowAnswers}){
    console.log(staticData)
{/*const [showAnswers, setShowAnswers] = useState(false)
const [isSelected, setIsSelected]=useState(Array(5).fill(Array(4).fill(false)));*/}
const [showModal, setModal]=useState(true)  








function selectAnswer(e, i,questionIndex){
      console.log(i)
      console.log(questionIndex)
      const question = questionIndex.questionIndex
      const option =i.index
       document.getElementById(`answer0${question}`).classList.remove('selected')
       document.getElementById(`answer1${question}`).classList.remove('selected')
       document.getElementById(`answer2${question}`).classList.remove('selected')
       document.getElementById(`answer3${question}`).classList.remove('selected')
      
      
    
      
      setIsSelected((prevIsSelected) => {
        const newIsSelected = [...prevIsSelected];
        newIsSelected[question] = newIsSelected[question].map((answer, index) => {
          return index === option ? true : false;
        });
        return newIsSelected;
      });
      

      const selectedAnswer = document.getElementById(`answer${option}${question}`)
       selectedAnswer.classList.add('selected')
       console.log(`This is the isSelected array ${isSelected}`)
     
   }
   
   function checkAnswers (){
       const prevShowAnswers= showAnswers
       setShowAnswers(!prevShowAnswers)
       console.log(isSelected)
   }     

      
   const questionListArray = staticData.map((question,index)=>{
       const questionIndex=index
       console.log(`The question index is ${index}`)
       var parse = require('html-react-parser');
       return(   
       <div className="question">    
       <h1>{parse(`${question.question}`)}</h1>
        <ul>
        {question.answers.map((answer,index)=>{
             const answerId = `answer${index}${questionIndex}`;
            
            return(
                <li id={answerId} key={index}  onClick={(e)=>selectAnswer(e, {index},{questionIndex})} 
                className={showAnswers && answer === question.correctAnswer ? 'correct-answer' 
                :showAnswers && isSelected[questionIndex][index] ? 'incorrect-selected-answer'
                : showAnswers ? 'incorrect-answer'
            :""}>{parse(`${answer}`)}</li>
            )
        })}
         </ul>  
         </div>     
       )
   }) 
    
    return(
        <>
    <Modal size="lg" show={showModal} onHide={()=>setModal(false)}>
        
<Modal.Header>
    <Modal.Title>
        <h1 className="modal-heading">Travel Trivia Unlimited</h1>
    </Modal.Title>
    </Modal.Header>

            <div className="modal-btn-div">
              <Button className="modal-btn" variant="danger" onClick={()=>setModal(false)}>Start Quiz</Button>
</div>

</Modal>

        
        {!showModal && <div className="questions-list">
            <h1 className="gameTitle">Mobile Trivia Unlimited</h1>
            <h2>Round {roundNumber+1}</h2>
        {questionListArray}
        <div className="bottom-btns">
        <button className="checkAnswers" onClick={checkAnswers}>Check Answers</button>
        {showAnswers && <button className="playAgain" onClick={resetGame}>Play Again</button>}
        </div>
        </div>}
        
        </>
    )
}