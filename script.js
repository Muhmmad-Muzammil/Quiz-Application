// ========== DOM ELEMENTS ==========
const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const topicInput = document.getElementById("topic-select");
const usernameInput = document.getElementById("username-input");
const quizContainer = document.getElementById("quiz-container");
const greeting = document.getElementById("greeting");
const startScreen = document.getElementById("start-screen");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

// ========== QUIZ VARIABLES ==========
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// ========== EVENT LISTENERS ==========

// Start button logic
startButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const topic = topicInput.value.trim();

  if (!username) {
    alert("Please enter your name to start the quiz.");
    return;
  }

  greeting.innerText = `Welcome, ${username}! 👋 Let's test your knowledge.`;
  greeting.style.display = "block";

  fetchQuestions(topic);
});

// Next button logic
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

// Restart button logic
restartButton.addEventListener("click", () => {
  startScreen.style.display = "block";
  resultContainer.style.display = "none";
  greeting.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  scoreElement.innerText = score;
});

// ========== FUNCTION DEFINITIONS ==========

/**
 * Fetches questions based on a given topic.
 */
function fetchQuestions(topic) {
  // Dummy data (replace with API in future)
  questions = [
    {
      question: `What is the capital of France?`,
      answers: ["Paris", "London", "Rome", "Berlin"],
      correct: "Paris"
    },
    {
      question: `Which language is used for web apps?`,
      answers: ["Python", "Java", "JavaScript", "C++"],
      correct: "JavaScript"
    },
    {
      question: `HTML stands for?`,
      answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None"],
      correct: "Hyper Text Markup Language"
    },
    {
      question: `Who is the founder of Microsoft?`,
      answers: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"],
      correct: "Bill Gates"
    },
    {
      question: `Which symbol is used for comments in JavaScript?`,
      answers: ["//", "/*", "#", "<!--"],
      correct: "//"
    }
  ];

  totalQuestionsElement.innerText = questions.length;
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

/**
 * Displays the current question and answer choices.
 */
function showQuestion() {
  clearAnswers();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestionElement.innerText = currentQuestionIndex + 1;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct));
    answerButtons.appendChild(button);
  });

  updateProgressBar();
}

/**
 * Handles answer selection logic.
 */
function selectAnswer(selectedBtn, correctAnswer) {
  const isCorrect = selectedBtn.innerText === correctAnswer;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreElement.innerText = score;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "inline-block";
}

/**
 * Clears previous answers and hides next button.
 */
function clearAnswers() {
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";
}

/**
 * Ends the quiz and shows result screen.
 */
function endQuiz() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalScoreElement.innerText = `Your final score is ${score} out of ${questions.length}`;
}

/**
 * Updates progress bar as quiz progresses.
 */
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Developer signature
console.log("Quiz App created by Muhammad-Muzammil");
console.log("Contact: muzammil.thedeveloper@gmail.com");