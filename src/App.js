import { useEffect, useState } from 'react';
import { createQuoteObject, checkGuessedLetters, punctuations } from './game';

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
    <article>
      <>
        <Quote letterMap={letterMap} scrambledQuote={scrambledQuote} />
        <p>{`- ${author}`}</p>
      </>
    </article>
  );
};

const Quote = ({ letterMap, scrambledQuote }) => {
  console.log(letterMap);
  return (
    <div className="quote-list">
      {[...scrambledQuote].map((char) => {
        return !punctuations.includes(char) ? (
          <LetterInput letter={char} />
        ) : (
          <h2>{char}</h2>
        );
      })}
    </div>
  );
};

const LetterInput = ({ letter }) => {
  return <p>{letter}</p>;
};

export default App;
