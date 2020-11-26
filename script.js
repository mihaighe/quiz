const questionImage = document.getElementById("img-question");
const answersImage = document.getElementById("img-answers");
const currentQuestion = document.getElementById("current-question");
const button = document.getElementById("capre");

const CORRECT_ANSWERS = [
  undefined,
  "e",
  "c",
  "c",
  "a",
  "d",
  "e",
  "b",
  "c",
  "d",
  "b",
  "b",
  "b",
  "a",
  "e",
  "d",
  "a",
  "a",
  "a",
  "b",
  "e",
  "d",
  "e",
  "d",
  "c",
];
const scoreElement = document.getElementById("score");

let questionNumber = 1;
let score = 0;
loadQuestion();

button.addEventListener("click", function () {
  if (questionNumber < 24) {
    getAnswer();
    questionNumber++;
    loadQuestion();
  }
});

function checkAnswer(id) {
  console.log(questionNumber);
  if (id == CORRECT_ANSWERS[questionNumber]) {
    score++;
  }
}

function getAnswer() {
  answers = document.querySelectorAll(".answer");

  answers.forEach((answer) => {
    if (answer.checked) {
      checkAnswer(answer.id);
    }
  });

  answers.forEach((answer) => {
    answer.checked = false;
  });
}

function loadQuestion() {
  questionImage.src = `/img/question${questionNumber}.png`;
  answersImage.src = `/img/answers${questionNumber}.png`;
  currentQuestion.innerText = questionNumber;
  scoreElement.innerText = score;
}

const progressBar = document.getElementsByClassName("progress-bar")[0];

const goat = setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  progressBar.style.setProperty("--width", width - 0.1);
  console.log(width);
  if (width < 0.1) {
    clearInterval(goat);
  }
}, 5);

