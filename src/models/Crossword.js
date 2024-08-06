import Game from './Game';
import Word from './Word';

class Crossword extends Game {
    constructor(id, level, gridSize, words) {
        super(id, level);
        this.gridSize = gridSize;
        this.words = words.map(word => new Word(word.id, word.word, word.clue, word.startX, word.startY, word.isHorizontal, word.isVertical, this));
    }
}
export default Crossword;
