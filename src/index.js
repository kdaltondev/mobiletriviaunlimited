import React from 'react';
import ReactDOM from 'react-dom/client';
import Trivia from './Trivia';
import './style.css';

function App() {
  return (
    <>
    <Trivia />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
