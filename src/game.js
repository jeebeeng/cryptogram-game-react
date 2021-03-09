class Game {
  constructor(quote) {
    this.author = quote.author;
    this.quote = quote.content;
    this.map = this.randomize();
  }

  randomize = () => {
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
    const punctuations = ['.', ',', ':', '!', '?', ';', ':', '-'];

    [...this.quote].forEach((char) => {
      set.add(char);
    });

    Array.from(set)
      .filter((char) => {
        return !(punctuations.includes(char) || char === ' ');
      })
      .forEach((char) => {
        const filteredLetters = letters.filter(
          (letter) => !(usedLetters.includes(letter) || letter === char)
        );
        const randomLetter =
          filteredLetters[this.getRandomInt(filteredLetters.length)];
        usedLetters.push(randomLetter);
        map.set(char.toUpperCase(), { assigned: randomLetter, guess: '' });
      });

    return map;
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}

export default Game;
