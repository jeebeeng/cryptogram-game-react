import { useEffect, useState } from 'react';
import { createQuoteObject, checkGuessedLetters, punctuations } from './game';

import './App.css';

const url = 'https://api.quotable.io/random?maxLength=200';

const App = () => {
  const [game, setGame] = useState({
    quote: '',
    author: '',
    letterMap: null,
    scrambledQuote: '',
  });
  const [loading, setLoading] = useState(true);

  const getQuote = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(createQuoteObject(data));
    setLoading(false);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return <>{loading ? <h1>Loading...</h1> : <Display {...game} />}</>;
};

const Display = ({ quote, author, letterMap, scrambledQuote }) => {
  return (
    <article id="main-display">
      <Quote letterMap={letterMap} scrambledQuote={scrambledQuote} />
      <p className="author-label">{`- ${author}`}</p>
    </article>
  );
};

const Quote = ({ letterMap, scrambledQuote }) => {
  return (
    <div className="quote-list">
      {[...scrambledQuote].map((char, index) => {
        if (punctuations.includes(char)) {
          return (
            <h3 key={index} className="punctuation">
              {char}
            </h3>
          );
        } else if (char === ' ') {
          return <div key={index} className="space" />;
        } else {
          return <LetterInput key={index} letter={char} />;
        }
      })}
    </div>
  );
};

const LetterInput = ({ letter }) => {
  return (
    <div className="letter-input-stack">
      <input className="letter-input" type="text" maxLength="1" />
      <p className="letter-label">{letter}</p>
    </div>
  );
};

export default App;
