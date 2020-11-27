const questionImage = document.getElementById("img-question");
const answersImage = document.getElementById("img-answers");
const currentQuestion = document.getElementById("current-question");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");

// const scoreElement = document.getElementById("score");
const time = document.querySelector("[data-label]");
const progressBar = document.getElementsByClassName("progress-bar")[0];

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

let questionNumber = 1;
let score = 0;
timeLeft = 480;

loadQuestion();

nextButton.addEventListener("click", function () {
  if (questionNumber < 24) {
    getAnswer();
    questionNumber++;
    loadQuestion();
  }
});

backButton.addEventListener("click", function () {
  if (questionNumber > 1) {
    getAnswer();
    questionNumber--
    loadQuestion();
  }
});




function loadQuestion() {
  questionImage.src = `/img/question${questionNumber}.png`;
  answersImage.src = `/img/answers${questionNumber}.png`;
  currentQuestion.innerText =
    questionNumber < 10 ? `0${questionNumber}` : questionNumber;
  // scoreElement.innerText = score;
}

function checkAnswer(id) {
  console.log(questionNumber);
  // if (id == CORRECT_ANSWERS[questionNumber]) {
  //   score++;
  // }
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

const myInterval = setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width"));
  progressBar.style.setProperty("--width", width - 0.1);

  if (width < 0.1) {
    clearInterval(myInterval);
  }
}, 500);

const timeInterval = setInterval(() => {
  timeLeft = timeLeft - 1;

  minute = Math.floor(timeLeft / 60);
  second = Math.floor(timeLeft % 60);

  if (second < 10) {
    second = `0${second}`;
  }

  time.attributes[2].nodeValue = `0${minute}:${second}`;

  if (timeLeft < 1) {
    clearInterval(timeInterval);
  }
}, 1000);
