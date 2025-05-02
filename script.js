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

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

restartButton.addEventListener("click", () => {
  startScreen.style.display = "block";
  resultContainer.style.display = "none";
  greeting.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  scoreElement.innerText = score;
});

/**
 * Fetch questions from Open Trivia API.
 */
function fetchQuestions(topic) {
  const categoryMap = {
    computer: 18,
    general: 9,
    math: 19,
    science: 17,
    history: 23
  };
  const categoryID = categoryMap[topic.toLowerCase()] || 18;

  fetch(`https://opentdb.com/api.php?amount=5&category=${categoryID}&type=multiple`)
    .then((response) => response.json())
    .then((data) => {
      questions = data.results.map((item) => {
        const answers = [...item.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        answers.splice(randomIndex, 0, item.correct_answer);

        return {
          question: decodeHTML(item.question),
          answers: answers.map(decodeHTML),
          correct: decodeHTML(item.correct_answer),
        };
      });

      totalQuestionsElement.innerText = questions.length;
      startScreen.style.display = "none";
      quizContainer.style.display = "block";
      showQuestion();
    })
    .catch((error) => {
      console.error("Failed to fetch questions:", error);
      alert("Failed to load questions. Please try again.");
    });
}

function showQuestion() {
  clearAnswers();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestionElement.innerText = currentQuestionIndex + 1;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct));
    answerButtons.appendChild(button);
  });

  updateProgressBar();
}

function selectAnswer(selectedBtn, correctAnswer) {
  const isCorrect = selectedBtn.innerText === correctAnswer;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreElement.innerText = score;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "inline-block";
}

function clearAnswers() {
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";
}

function endQuiz() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalScoreElement.innerText = `Your final score is ${score} out of ${questions.length}`;
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Developer signature
console.log("Quiz App created by Muhammad-Muzammil");
console.log("Contact: muzammil.thedeveloper@gmail.com");
