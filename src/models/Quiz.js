import Game from './Game';

class Quiz extends Game {
    constructor(id, level, questions) {
        super(id, level);
        this.questions = questions;
    }
}
export default Quiz;

