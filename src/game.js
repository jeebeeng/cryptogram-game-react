class Game {
  constructor(quote) {
    this.author = quote.author;
    this.quote = quote.content;
    this.letterMap = this.#randomize();
    this.scrambledQuote = this.#getScrambledQuote();
  }

  #randomize = () => {
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

    [...this.quote.toUpperCase()].forEach((char) => {
      set.add(char);
    });

    [...set]
      .filter((char) => !punctuations.includes(char) && char !== ' ')
      .forEach((char) => {
        char = char.toUpperCase();
        const filteredLetters = letters.filter(
          (letter) => !usedLetters.includes(letter) && letter !== char
        );
        let randomLetter =
          filteredLetters[this.#getRandomInt(filteredLetters.length)];
        usedLetters.push(randomLetter);
        map.set(char, { assigned: randomLetter, guess: '' });
      });

    return map;
  };

  #getScrambledQuote = () => {
    const scrambledQuote = this.quote
      .toUpperCase()
      .split('')
      .map((letter) => {
        if (this.letterMap.has(letter)) {
          return this.letterMap.get(letter).assigned;
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
  checkGuessedLetters = () => {
    [...this.letterMap.keys()].forEach((key) => {
      if (this.letterMap.get(key).guess !== key) {
        return false;
      }
      return true;
    });
  };

  #getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}

export default Game;
