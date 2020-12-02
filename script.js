const questionImage = document.getElementById("img-question");
const answersImage = document.getElementById("img-answers");
const currentQuestion = document.getElementById("current-question");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const restartButton = document.getElementById("restart");
const finishButton = document.getElementById("finish");

// const scoreElement = document.getElementById("score");
const time = document.querySelector("[data-label]");
const progressBar = document.getElementsByClassName("progress-bar")[0];

const CORRECT_ANSWERS = [
  undefined,
  "4",
  "2",
  "2",
  "0",
  "3",
  "4",
  "1",
  "2",
  "3",
  "1",
  "1",
  "1",
  "0",
  "4",
  "3",
  "0",
  "0",
  "0",
  "1",
  "4",
  "3",
  "4",
  "3",
  "2",
];

let selected_answers = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

let questionNumber = 1;
let score = 0;
let timeLeft = 480;

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
    questionNumber--;
    loadQuestion();
  }
});

function loadQuestion() {
  // scoreElement.innerText = score;

  questionImage.src = `/img/question${questionNumber}.png`;
  answersImage.src = `/img/answers${questionNumber}.png`;
  currentQuestion.innerText =
    questionNumber < 10 ? `0${questionNumber}` : questionNumber;

  submited = selected_answers[questionNumber];
  if (submited != undefined) {
    answers = document.querySelectorAll(".answer");
    answers[submited].checked = true;
  }
}

function checkAnswer(id) {
  if (id == CORRECT_ANSWERS[questionNumber]) {
    console.log("You are correct");
    console.log(`Question: ${questionNumber}`);
    console.log(`Answer: ${id}`);
    // score++;
  } else {
    console.log("You are wrong");
    console.log(`Question: ${questionNumber}`);
    console.log(`Answer: ${id}`);
  }
}

function getAnswer() {
  answers = document.querySelectorAll(".answer");

  answers.forEach((answer) => {
    if (answer.checked) {
      selected_answers[questionNumber] = answer.id
      checkAnswer(answer.id);
    }
  });

  // CAUTION
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
