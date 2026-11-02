const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style a webpage?",
        answers: [
            "JavaScript",
            "CSS",
            "HTML",
            "Python"
        ],
        correct: 1
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        answers: [
            "style",
            "design",
            "let",
            "page"
        ],
        correct: 2
    },
    {
        question: "Which symbol is used for multiplication in JavaScript?",
        answers: [
            "+",
            "-",
            "/",
            "*"
        ],
        correct: 3
    },
    {
        question: "Which HTML tag creates a paragraph?",
        answers: [
            "<h1>",
            "<p>",
            "<img>",
            "<button>"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const feedback = document.getElementById("feedback");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
    answered = false;

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionElement.textContent = currentQuestion.question;

    answerButtons.innerHTML = "";
    feedback.textContent = "";
    nextButton.disabled = true;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-button");

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct! Well done.";
        feedback.style.color = "green";
    } else {
        selectedButton.classList.add("wrong");
        buttons[currentQuestion.correct].classList.add("correct");
        feedback.textContent = "Wrong answer. Try the next question!";
        feedback.style.color = "red";
    }

    nextButton.disabled = false;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "See Results";
    }
}

function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        nextButton.textContent = "Next Question";
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");

    nextButton.textContent = "Next Question";

    showQuestion();
});

// Start the quiz
showQuestion();