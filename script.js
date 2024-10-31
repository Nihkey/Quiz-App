const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Nigeria", correct: false },
    ],
  },
  {
    question: "Who created this Quiz App?",
    answers: [
      { text: "Mark zuckerberg", correct: false },
      { text: "Pavel Durov", correct: false },
      { text: "Okeke Chukwuebuka", correct: true },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
      { text: "Pablo Picasso", correct: false },
    ],
  },
  {
    question: "Who wrote Romeo and Juliet?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
    ],
  },
  {
    question: "In which year did World War II end?",
    answers: [
      { text: "1941", correct: false },
      { text: "1943", correct: false },
      { text: "1945", correct: true },
      { text: "1947", correct: false },
    ],
  },
  {
    question: "Who was the first President of the United States?",
    answers: [
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "Okeke Nicholas", correct: false },
      { text: "Ogochukwu Perpetual", correct: false },
    ],
  },
  {
    question: "Who is the first President Of Nigeria?",
    answers: [
      { text: "Mohammed Buhari", correct: false },
      { text: "Dr. Nnamdi Azikwe", correct: true },
      { text: "Olusegun Obasanjo", correct: false },
      { text: "Bola Ahmed Tinubu", correct: false },
    ],
  },
  {
    question: "At what Year did Nigeria gained Independence?",
    answers: [
      { text: "October 1, 1960", correct: true },
      { text: "October 1, 1860", correct: false },
      { text: "October 1, 1961", correct: false },
      { text: "November 1, 1990", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
