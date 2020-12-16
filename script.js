const questionImage = document.getElementById("img-question");
const answersImage = document.getElementById("img-answers");
const currentQuestion = document.getElementById("current-question");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const restartButton = document.getElementById("restart");
const finishButton = document.getElementById("finish");
const startButton = document.getElementById("start");
const radio = document.getElementById("radio");
const scoreElement = document.getElementById("score");

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

let unselected_answers = [
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
let timeLeft = 10;
let isDone = false;

loadQuestion();

startButton.addEventListener("click", function () {
  startIntervals();
  document.querySelector(".modal-container").classList.remove("show");
});

restartButton.addEventListener("click", function () {
  restart();
  loadQuestion();
  scoreElement.innerHTML = "";
});

finishButton.addEventListener("click", finish);

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

function finish() {
  getAnswer();

  for (it = 1; it < 25; it++) {
    if (CORRECT_ANSWERS[it] == selected_answers[it]) {
      score++;
    }
  }

  isDone = true;
  loadQuestion();
  radio.classList.add("none");
  finishButton.removeEventListener("click", finish);
  scoreElement.innerText = `You correctly answered ${score} questions`;
}

function restart() {
  score = 0;
  timeLeft = 480;
  questionNumber = 1;
  isDone = false;
  finishButton.addEventListener("click", finish);
  radio.classList.remove("none");

  for (it = 1; it < selected_answers.length; it++) {
    selected_answers[it] = undefined;
  }

  answers = document.querySelectorAll(".answer");
  labels = document.querySelectorAll("#mylabel");

  for (it = 0; it < 5; it++) {
    answers[it].checked = false;
    labels[it].classList.remove("white");
    labels[it].classList.remove("correct");
  }

  time.attributes[2].nodeValue = `07:59`;
  progressBar.style.setProperty("--width", 100);
}

function loadQuestion() {
  questionImage.src = `/img/question${questionNumber}.png`;
  answersImage.src = `/img/answers${questionNumber}.png`;
  currentQuestion.innerText =
    questionNumber < 10 ? `0${questionNumber}` : questionNumber;

  submited = selected_answers[questionNumber];

  if (submited != undefined) {
    answers = document.querySelectorAll(".answer");
    answers[submited].checked = true;
  }

  if (isDone == true) {
    answers = document.querySelectorAll("#mylabel");
    correct = CORRECT_ANSWERS[questionNumber];

    for (it = 0; it < 5; it++) {
      el = answers[it];
      if (it == correct) {
        el.classList.remove("white");
        el.classList.remove("black");
        el.classList.add("correct");
      } else if (it == submited) {
        el.classList.remove("correct");
        el.classList.remove("white");
        el.classList.add("black");
      } else {
        el.classList.remove("correct");
        el.classList.remove("black");
        el.classList.add("white");
      }
    }
  }
}

function getAnswer() {
  answers = document.querySelectorAll(".answer");

  answers.forEach((answer) => {
    if (answer.checked) {
      selected_answers[questionNumber] = answer.id;
    }
  });

  answers.forEach((answer) => {
    answer.checked = false;
  });
}

const computedStyle = getComputedStyle(progressBar);
const width = parseFloat(computedStyle.getPropertyValue("--width"));

function startIntervals() {
  animationInterval = setInterval(() => {
    if (width > 0.1 && isDone == 0) {
      const computedStyle = getComputedStyle(progressBar);
      const width = parseFloat(computedStyle.getPropertyValue("--width"));
      progressBar.style.setProperty("--width", width - 0.1);
    } else if (width == 0.1) {
      finish();
    } else {
      isDone = 1;
    }
  }, 500);

  timeInterval = setInterval(() => {
    if (timeLeft > 0 && isDone == 0) {
      timeLeft = timeLeft - 1;

      minute = Math.floor(timeLeft / 60);
      second = Math.floor(timeLeft % 60);
      if (second < 10) {
        second = `0${second}`;
      }
      time.attributes[2].nodeValue = `0${minute}:${second}`;
    } else if (timeLeft == 0) {
      finish();
    } else {
      isDone = 1;
    }
  }, 1000);
}
