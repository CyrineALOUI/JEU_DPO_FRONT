import Answer from "./Answer";

class Question {
    constructor(id, questionText, answers) {
        this.id = id;
        this.questionText = questionText;
        this.answers = answers.map(answer => new Answer(answer.id, answer.answerText, answer.isCorrect));
    }
}

export default Question;

