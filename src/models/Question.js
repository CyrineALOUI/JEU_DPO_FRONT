import Quiz from './Quiz';
import Answer from './Answer';

class Question {
    constructor(id, questionText, quiz, answers) {
        this.id = id;
        this.questionText = questionText;
        this.quiz = quiz ;
        this.answers = answers.map(answer => new Answer(answer.id, answer.answerText, answer.isCorrect, this));
    }
}
export default Question;

