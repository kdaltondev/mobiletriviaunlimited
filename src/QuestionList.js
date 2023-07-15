import React, {useState} from 'react'
import {Image, Button, Modal, Jumbotron} from 'react-bootstrap'


export default function QuestionList (props){
    console.log(props.staticData)
const [showAnswers, setShowAnswers] = useState(false)
const [isSelected, setIsSelected]=useState(Array(5).fill(Array(4).fill(false)));
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

      
   const questionListArray = props.staticData.map((question,index)=>{
       const questionIndex=index
       console.log(`The question index is ${index}`)
       
       return(   
       <div className="question">    
       <h1>{question.question}</h1>
        <ul>
        {question.answers.map((answer,index)=>{
             const answerId = `answer${index}${questionIndex}`;
            
            return(
                <li id={answerId} key={index}  onClick={(e)=>selectAnswer(e, {index},{questionIndex})} 
                className={showAnswers && answer === question.correctAnswer ? 'correct-answer' 
                :showAnswers && isSelected[questionIndex][index] ? 'incorrect-selected-answer'
                : 'incorrect-answer'}>{answer}</li>
            )
        })}
         </ul>  
         </div>     
       )
   }) 
    
    return(
        <>
<div id="modal-div">
    <Modal size="lg" show={showModal} onHide={()=>setModal(false)}>
{/*<Modal.Header closeButton>
    <Modal.Title>This is the modal title</Modal.Title>
    </Modal.Header>*/}
<Modal.Body>
            <h1>This is the opening screen</h1>
            </Modal.Body>
            <Button variant="danger" onClick={()=>setModal(false)}>Start Quiz</Button>
</Modal>
</div>
        
        {!showModal && <div className="questions-list">
        {questionListArray}
        <button className="checkAnswers" onClick={checkAnswers}>Check Answers</button>
        {showAnswers && <button onClick={props.resetGame}>Play Again</button>}
        </div>}
        </>
    )
}