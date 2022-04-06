const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
  {
  question: "What's the name of Batman's sidekick?",
  choice1: "Batgirl",
  choice2: "Iceman",
  choice3: "Boy Wonder",
  choice4: "The Penguin",
  answer: 3,
  },
  {
  question: "What Planet is Superman from?",
  choice1: "Pluto",
  choice2: "Krypton",
  choice3: "Zelda",
  choice4: "Earth",
  answer: 2,
  },
  {
  question: "What is Spiderman's real name?",
  choice1: "Bill Peters",
  choice2: "Parker Posey",
  choice3: "Michael Spicer",
  choice4: "Peter Parker",
  answer: 4,
  },
  {
  question: "Thor is the Argidian God of ?",
  choice1: "Thunder",
  choice2: "Lightning",
  choice3: "Wind",
  choice4: "Gravity",
  answer: 3,
  }
]

const scorePoints = 200;
const maxQuestions = 4

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = ['...questions'];
  getNewQuestion();
}

getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
  if(!acceptingAnswers) return

  acceptingAnswers = false
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset['number']

  let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
  'incorrect';

  if(classToApply === 'correct') {
    incrementScore(scorePoints);
  }

  selectedChoice.parentElement.classList.add(classToApply);
  
  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000)
})
})

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}

startGame()