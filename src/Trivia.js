import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import QuestionList from './QuestionList'

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default function Trivia() {
  
  const [numberQuestions, setNumberQuestions]=useState(1)
  /*const [questionDifficulty, setQuestionDifficulty]=useState(undefined)*/
 
  var questionCategory = 21
  var questionType = "multiple"
  /*var questionDifficulty="easy"*/
  const [questionDifficulty, setQuestionDifficulty]=useState("")
  const [questionNumber, setQuestionNumber]=useState(0)
const [dynamicData, setDynamicData] = useState([])
const [playAgain, setPlayAgain]=useState([false])
const [showAnswers, setShowAnswers] = useState(false)
const [isSelected, setIsSelected]=useState(Array(questionNumber).fill(Array(4).fill(false)))
const [roundNumber, setRoundNumber]=useState(0)
const [showModal, setModal]=useState(true) 





  useEffect(() => {
  if(questionNumber>0 && questionDifficulty!=""){
    console.log(`I am fetching ${questionNumber} questions`)
    fetch(`https://opentdb.com/api.php?amount=${questionNumber}&type=${questionType}&difficulty=${questionDifficulty}`)
      .then(response => response.json())
      .then(data => {
        // Map the fetched data to the desired format and randomize the answers
        const formattedData = data.results.map((item, index) => ({
          id: index + 1,
          question: item.question,
          answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer
        }));
        setDynamicData(formattedData);
        console.log(showModal)
        console.log(`I fetched ${questionDifficulty} questions`)
      })
      .catch(error => console.log(error));
}else{
  console.log("Waiting for question number")
}}, [questionNumber, questionDifficulty, playAgain]);

  function resetGame(){
    setPlayAgain(!playAgain)
    setIsSelected(Array(5).fill(Array(4).fill(false)))
    setShowAnswers(false)
    var newRoundNumber=roundNumber+1
    setRoundNumber(newRoundNumber)
    console.log(roundNumber)
    if(showModal){
      setModal(false)
    }
    console.log(showModal);
   }

   function chooseDifficulty(e){
   var newQuestionDifficulty=e.target.value
   console.log(`You want ${newQuestionDifficulty} questions`)
   setQuestionDifficulty(newQuestionDifficulty)
  
    console.log(`The question difficulty is ${questionDifficulty}`)
   }

   function chooseNumberQuestions(e){
var newQuestionNumber=Number(e.target.value)
console.log(`You want ${newQuestionNumber} questions`)
setQuestionNumber(newQuestionNumber)
  
   }

  
    return (
        <>
        <QuestionList chooseNumberQuestions={chooseNumberQuestions} showModal={showModal} chooseDifficulty={chooseDifficulty} roundNumber={roundNumber} staticData={dynamicData} resetGame={resetGame} isSelected={isSelected} setIsSelected={setIsSelected} showAnswers={showAnswers} setShowAnswers={setShowAnswers}/>
        </>
    )
}   
 

