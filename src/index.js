import React from 'react';
import ReactDOM from 'react-dom/client';
import Trivia from './Trivia';
import './style.css';

function App() {
  return (
    <>
    <h1>Quizzical</h1>
    <Trivia />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
