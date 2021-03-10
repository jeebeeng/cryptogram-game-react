import React, { useEffect, useState, useContext } from 'react';
import { createQuoteObject, checkGuessedLetters, punctuations } from './game';

import './App.css';

const url = 'https://api.quotable.io/random?maxLength=200';
const GameContext = React.createContext();

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

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <GameContext.Provider value={{ game, setGame }}>
          <Display />
        </GameContext.Provider>
      )}
    </>
  );
};

const Display = () => {
  const { game } = useContext(GameContext);
  const { author } = game;
  return (
    <div id="main-display">
      <Quote />
      <p className="author-label">{`- ${author}`}</p>
    </div>
  );
};

const Quote = () => {
  const { game } = useContext(GameContext);
  const { scrambledQuote } = game;
  return (
    <div className="quote-list">
      {scrambledQuote.split(' ').map((word, index) => {
        return <Word key={index} word={word} index={index} />;
      })}
    </div>
  );
};

const Word = ({ word, index }) => {
  return (
    <div className="word">
      {[...word].map((char, letterIndex) => {
        if (punctuations.includes(char)) {
          return (
            <h3 key={`${index}${letterIndex}`} className="punctuation">
              {char}
            </h3>
          );
        } else {
          return <LetterInput key={`${index}${letterIndex}`} letter={char} />;
        }
      })}
      <div className="space" />
    </div>
  );
};

const LetterInput = ({ letter }) => {
  const [guess, setGuess] = useState('');

  const { game, setGame } = useContext(GameContext);
  const { letterMap } = game;

  let letterKey = '';

  const onChangeHandler = (e) => {
    const map = new Map(game.letterMap);
    const letterObject = map.get(letterKey);
    const updatedObject = {
      ...letterObject,
      guess: e.target.value.toUpperCase(),
    };
    map.set(letterKey, updatedObject);
    setGame({ ...game, letterMap: map });
  };

  useEffect(() => {
    [...letterMap.keys()].forEach((key) => {
      if (letterMap.get(key).assigned === letter) {
        setGuess(letterMap.get(key).guess);
        letterKey = key;
      }
    });
  }, [letterMap]);

  return (
    <div className="letter-input-stack">
      <input
        className="letter-input"
        type="text"
        value={guess}
        maxLength="1"
        onChange={(e) => onChangeHandler(e)}
      />
      <p className="letter-label">{letter}</p>
    </div>
  );
};

export default App;
