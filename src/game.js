export const createQuoteObject = (data) => {
  const { content, author } = data;
  const letterMap = randomize(content);
  const scrambled = getScrambledQuote(content, letterMap);
  const object = {
    quote: content,
    author: author,
    letterMap: letterMap,
    scrambledQuote: scrambled,
  };
  return object;
};

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
export const punctuations = ['.', ',', ':', '!', '?', ';', ':', '-', "'"];
/**
 * Generates a random letter for each unique letter in the quote and maps them together
 * @param {string} quote
 * @returns {Map} map with keys as each letter in the quote and the value as an object containing the randomly assigned letter and an empty guess
 */
const randomize = (quote) => {
  let map = new Map();
  let set = new Set();
  let usedLetters = [];
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

/**
 * Scrambles the quote using the given letterMap
 * @param {string} quote
 * @param {Map} letterMap
 * @returns {string} quote scrambled using the given letterMap
 */
const getScrambledQuote = (quote, letterMap) => {
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
 * @returns whether each of the guesses match the original letter (key)
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
