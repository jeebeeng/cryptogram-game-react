import React, { useEffect, useState, useContext, useRef } from 'react';
import { checkGuessedLetters, createQuoteObject, punctuations } from './game';

import './App.css';

const url = 'https://api.quotable.io/random';
const GameContext = React.createContext();

const App = () => {
  const [game, setGame] = useState({
    quote: '',
    author: '',
    letterMap: new Map(),
    scrambledQuote: '',
  });
  const [win, setWin] = useState(false);
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

  useEffect(() => {
    setWin(checkGuessedLetters(game.letterMap));
  }, [game]);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <GameContext.Provider value={{ game, setGame, win }}>
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

  const { game, setGame, win } = useContext(GameContext);
  const { letterMap } = game;
  const keyRef = useRef('');

  const onChangeHandler = (e) => {
    const map = new Map(game.letterMap);
    const letterObject = map.get(keyRef.current);
    const updatedObject = {
      ...letterObject,
      guess: e.target.value.toUpperCase().substring(0, 1),
    };
    map.set(keyRef.current, updatedObject);
    setGame({ ...game, letterMap: map });
  };

  useEffect(() => {
    [...letterMap.keys()].forEach((key) => {
      if (letterMap.get(key).assigned === letter) {
        setGuess(letterMap.get(key).guess);
        keyRef.current = key;
      }
    });
  }, [letterMap, letter]);

  return (
    <div className="letter-input-stack">
      <input
        className="letter-input"
        type="text"
        value={guess}
        maxLength="1"
        onChange={(e) => (win ? null : onChangeHandler(e))}
      />
      <p className="letter-label">{letter}</p>
    </div>
  );
};

export default App;
