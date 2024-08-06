import Crossword from './Crossword';

class Word {
    constructor(id, word, clue, startX, startY, isHorizontal, isVertical, crossword) {
        this.id = id;
        this.word = word;
        this.clue = clue;
        this.startX = startX;
        this.startY = startY;
        this.isHorizontal = isHorizontal;
        this.isVertical = isVertical;
        this.crossword = crossword;
    }
}
export default Word;
