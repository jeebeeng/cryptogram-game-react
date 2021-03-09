export const randomize = (quote) => {
  let map = new Map();
  let set = new Set();
  let usedLetters = [];
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const punctuations = ['.', ',', ':', '!', '?', ';', ':', '-', "'"];

  [...quote.toUpperCase()].forEach((char) => {
    set.add(char);
  });

  [...set]
    .filter((char) => !punctuations.includes(char) && char !== ' ')
    .forEach((char) => {
      char = char.toUpperCase();
      const filteredLetters = letters.filter(
        (letter) => !usedLetters.includes(letter) && letter !== char
      );
      let randomLetter = filteredLetters[getRandomInt(filteredLetters.length)];
      usedLetters.push(randomLetter);
      map.set(char, { assigned: randomLetter, guess: '' });
    });

  return map;
};

export const getScrambledQuote = (quote, letterMap) => {
  const scrambledQuote = quote
    .toUpperCase()
    .split('')
    .map((letter) => {
      if (letterMap.has(letter)) {
        return letterMap.get(letter).assigned;
      }
      return letter;
    })
    .join('');

  return scrambledQuote;
};

/**
 * Check if each of the guesses match the original letter (key)
 * @return whether each of the guesses match the original letter (key)
 */
export const checkGuessedLetters = (letterMap) => {
  [...letterMap.keys()].forEach((key) => {
    if (letterMap.get(key).guess !== key) {
      return false;
    }
    return true;
  });
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
