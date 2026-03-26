// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which car brand’s logo features a prancing horse?",
    answers: [
      { text: "Ford GT", correct: false },
      { text: "Lamborghini", correct: false },
      { text: "Ferrari", correct: true },
      { text: "Toyota", correct: false },
    ],
  },
  {
    question: "What does “ABS” stand for in cars?",
    answers: [
      { text: "Automatic Brake System ", correct: false },
      { text: "Anti-lock Braking System", correct: true },
      { text: "Advanced Balance Suspension", correct: false },
      { text: "Auto Balance Steering", correct: false },
    ],
  },
  {
    question: "Which car is famously known as the “Godzilla” in the automotive world?",
    answers: [
      { text: "Nissan GT-R", correct: true },
      { text: "Toyota Supra", correct: false },
      { text: "Mitsubishi Lancer Evo", correct: false },
      { text: "Mazda RX-7", correct: false },
    ],
  },
  {
    question: "In which country was the first modern automobile invented?",
    answers: [
      { text: "USA", correct: false },
      { text: "Pakistan", correct: false },
      { text: "Germany", correct: true },
      { text: "Italy", correct: false },
    ],
  },
  {
    question: "Which company makes the “Mustang”",
    answers: [
      { text: "Chevrolet", correct: false },
      { text: "Dodge", correct: false },
      { text: "Ford", correct: true },
      { text: "Fiat", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
  resultMessage.textContent = "Full throttle perfection! You’re the Lewis Hamilton of car trivia.";
} else if (percentage >= 80) {
  resultMessage.textContent = "You’re cruising in the fast lane — sharp turns, no stalls!";
} else if (percentage >= 60) {
  resultMessage.textContent = "Solid drive! But you stalled a gear or two — keep tuning your knowledge.";
} else if (percentage >= 40) {
  resultMessage.textContent = "You’re idling in traffic — not bad, but time to rev harder!";
} else {
  resultMessage.textContent = "Engine’s sputtering… better hit the garage and study up!";
}
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}