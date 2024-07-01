import Question from "./Question";

class Quiz {
    constructor(id, questions) {
        this.id = id;
        this.questions = questions.map(question => new Question(question.id, question.questionText, question.answers));
    }
}

export default Quiz;

