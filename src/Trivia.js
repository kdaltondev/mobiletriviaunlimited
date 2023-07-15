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

const [dynamicData, setDynamicData] = useState([])
const [playAgain, setPlayAgain]=useState([false])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
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
   }

  
    return (
        <>
        <QuestionList staticData={dynamicData} resetGame={resetGame}/>
        </>
    )
}   
 

