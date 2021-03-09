import { useEffect, useState } from 'react';
import { createQuoteObject, checkGuessedLetters } from './game';

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
        <p>{quote}</p>
        <p>{`- ${author}`}</p>
      </>
    </article>
  );
};

export default App;
