const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const addQuestionBtn = document.getElementById('add-question-btn');
const quizSection = document.getElementById('quiz-section');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const resultSection = document.getElementById('result-section');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

quizForm.addEventListener('submit', createQuiz);
addQuestionBtn.addEventListener('click', addQuestion);
nextButton.addEventListener('click', setNextQuestion);
submitButton.addEventListener('click', showResult);
restartButton.addEventListener('click', restartQuiz);

document.getElementById('create-quiz-btn').classList.add('hide');
while (questionContainer.firstChild) {
    questionContainer.removeChild(questionContainer.firstChild);
    
}

function createQuiz(event) {
    event.preventDefault();
    const questions = document.querySelectorAll('.question-block');
    questions.forEach(questionBlock => {
        const questionText = questionBlock.querySelector('.question').value;
        const answers = Array.from(questionBlock.querySelectorAll('.answer')).map(answer => answer.value);
        const correctAnswer = questionBlock.querySelector('.correct-answer').value - 1;
        quizData.push({
            question: questionText,
            answers: answers,
            correctAnswer: correctAnswer
        });
    });
    document.getElementById('admin-section').classList.add('hide');
    quizSection.classList.remove('hide');
    setNextQuestion();
}

function addQuestion() {
    const questionCount = questionContainer.children.length + 1;
    const questionBlock = document.createElement('div');
    questionBlock.classList.add('question-block');
    questionBlock.innerHTML = `
        <label for="question">Question ${questionCount}:</label>
        <input type="text" class="question" placeholder="Enter your question">
        <label for="answers">Options:</label>
        <input type="text" class="answer" placeholder="Option 1">
        <input type="text" class="answer" placeholder="Option 2">
        <input type="text" class="answer" placeholder="Option 3">
        <input type="text" class="answer" placeholder="Option 4">
        <label for="correct-answer">Correct Answer [Select 1-4]:</label>
        <input type="number" class="correct-answer" min="1" max="4">
    `;
    questionContainer.appendChild(questionBlock);

    document.getElementById('create-quiz-btn').classList.remove('hide');
}

function setNextQuestion() {
    resetState();
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answersElement.classList.add('answers');
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn' , 'option-btn');
        button.addEventListener('click', () => selectAnswer(index, question.correctAnswer));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    if (currentQuestionIndex + 1 < quizData.length) {
        currentQuestionIndex++;
        nextButton.classList.remove('hide');
    } else {
        submitButton.classList.remove('hide');
    }
}

function showResult() {
    quizSection.classList.add('hide');
    resultSection.classList.remove('hide');
    scoreElement.innerText = score;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizData = [];
    resultSection.classList.add('hide');
    document.getElementById('admin-section').classList.remove('hide');
    document.getElementById('create-quiz-btn').classList.add('hide');

    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
        
    }
   
}
