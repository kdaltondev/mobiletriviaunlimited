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
  
  
  var questionAmount = 5
  var questionCategory = 21
  var questionDifficulty = "easy"
  var questionType = "multiple"

  const [dynamicData, setDynamicData] = useState([])
const [playAgain, setPlayAgain]=useState([false])
const [showAnswers, setShowAnswers] = useState(false)
const [isSelected, setIsSelected]=useState(Array(questionAmount).fill(Array(4).fill(false)))
const [roundNumber, setRoundNumber]=useState(0)

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${questionAmount}&type=${questionType}&difficulty=${questionDifficulty}`)
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
      })
      .catch(error => console.log(error));
  }, [playAgain]);

  function resetGame(){
    setPlayAgain(!playAgain)
    setIsSelected(Array(5).fill(Array(4).fill(false)))
    setShowAnswers(false)
    const newRoundNumber=roundNumber+1
    setRoundNumber(newRoundNumber)
    console.log(roundNumber)
   }

  
    return (
        <>
        <QuestionList roundNumber={roundNumber} staticData={dynamicData} resetGame={resetGame} isSelected={isSelected} setIsSelected={setIsSelected} showAnswers={showAnswers} setShowAnswers={setShowAnswers}/>
        </>
    )
}   
 

