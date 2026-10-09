const questions = [
  { q: "What is 25% of 240?", options: ["40", "50", "60", "80"], answer: 2 },
  { q: "45 is what percent of 90?", options: ["40%", "45%", "50%", "60%"], answer: 2 },
  { q: "A price rises from 400 to 500. What is the percentage increase?", options: ["20%", "25%", "30%", "50%"], answer: 1 },
  { q: "A student scores 72 out of 120. What is the percentage?", options: ["50%", "55%", "60%", "65%"], answer: 2 },
  { q: "A price of 800 is cut by 15%. What is the new price?", options: ["640", "660", "680", "700"], answer: 2 }
];

let current = 0;
let score = 0;
let answered = false;
let finished = false;

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next");

function showQuestion() {
  answered = false;
  resultEl.textContent = "";
  const q = questions[current];
  progressEl.textContent = "Question " + (current + 1) + " of " + questions.length;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  nextBtn.textContent = current === questions.length - 1 ? "Finish" : "Next";

  q.options.forEach(function (text, i) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "option";
    btn.onclick = function () { selectOption(i); };
    optionsEl.appendChild(btn);
  });
}

function selectOption(i) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const buttons = optionsEl.querySelectorAll(".option");
  buttons[q.answer].classList.add("correct");
  if (i === q.answer) {
    score++;
  } else {
    buttons[i].classList.add("wrong");
  }
}

function showResult() {
  finished = true;
  progressEl.textContent = "";
  questionEl.textContent = "Quiz complete!";
  optionsEl.innerHTML = "";
  resultEl.textContent = "You scored " + score + " out of " + questions.length;
  nextBtn.textContent = "Restart";
}

nextBtn.onclick = function () {
  if (finished) {
    current = 0;
    score = 0;
    finished = false;
    showQuestion();
  } else if (!answered) {
    alert("Pick an answer first");
  } else {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
};

showQuestion();