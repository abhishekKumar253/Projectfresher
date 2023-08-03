const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");

// make an array of object that stores question, choice of question and answer 
const quiz = [
  {
    question: "Q. HTML stands for - ",
    choices: [
      "HighText Machine Language",
      "HyperText and links Markup Language",
      "HyperText Markup Language",
      "None of these",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Q. The correct sequence of HTML tags for starting a webpage is ",
    choices: [
      "Head, Title, HTML, body",
      "HTML, Body, Title, Head",
      "HTML, Head, Title, Body",
      "HTML, Head, Title, Body",
    ],
    answer: "HTML, Head, Title, Body",
  },
  {
    question:
      "Q. Which of the following tag is used to insert a line-break in HTML?",
    choices: ["<a>", "<br>", "<pre>", "<b>"],
    answer: "<br>",
  },
  {
    question:
      "Q. How to create an unordered list (a list with the list items in bullets) in HTML?",
    choices: ["<ul>", "<ol>", "<li>", "<i>"],
    answer: "<ul>",
  },
  {
    question:
      "Q. Which of the following tag is used to make the underlined text?",
    choices: ["<i>", "<ul>", "<u>", "<pre>"],
    answer: "<u>",
  },
  {
    question:
      "Q. Which of the tag is used to attach css file in html document?",
    choices: ["<link>", "<css>", "<script>", "<html>"],
    answer: "<link>",
  },
  {
    question: "Q. Which tag is used to define an internal style sheet?",
    choices: ["<link>", "<script>", "<html>", "<style>"],
    answer: "<style>",
  },
  {
    question:
      "Q. Which of the following property is used to make the text bold in css?",
    choices: [
      "font-weight:bold;",
      "text-decoration:bold;",
      "text:bold;",
      "font:bold;",
    ],
    answer: "font-weight:bold;",
  },
  {
    question: "Q. Change the style of the text?",
    choices: ["text-style", "font-style", "style", "None of the above"],
    answer: "font-style",
  },
  {
    question:
      "Q.  Which of the following property is used to align the items in table in css?",
    choices: ["align", "text-align", "items-align", "None of the above"],
    answer: "text-align",
  },
  {
    question: "Q. Which type of JavaScript language is ___",
    choices: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    answer: "Object-Based",
  },
  {
    question:
      "Q. Which one of the following also known as Conditional Expression:",
    choices: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if",
    ],
    answer: "immediate if",
  },
  {
    question:
      "Q. When interpreter encounters an empty statements, what it will do:",
    choices: [
      "Shows a warning",
      "Prompts to complete the statement",
      "Throws an error",
      "Ignores the statements",
    ],
    answer: "Ignores the statements",
  },
  {
    question:
      "Q. Which one of the following is the correct way for calling the JavaScript code?",
    choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
    answer: "Function/Method",
  },
  {
    question: "Q. Which of the following type of a variable is volatile?",
    choices: [
      "Mutable variable",
      "Dynamic variable",
      "Volatile variable",
      "Immutable variable",
    ],
    answer: "Mutable variable",
  },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to show Questions
const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add('choice');
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener('click',()=>{
      if(choiceDiv.classList.contains('selected')){
        choiceDiv.classList.remove('selected');
      }
      else{
        choiceDiv.classList.add('selected');
      }
    })
  }

  if(currentQuestionIndex < quiz.length){
    startTimer();
  }
};

//  Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
    displayAlert("Correct Answer");
    score++;
  }
  else{
    displayAlert(`Wrong answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    showScore();
    stopTimer();
  }
}

// Function to show score
const showScore = () =>{
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) =>{
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() =>{
    alert.style.display = "none";
  }, 2000);
}

// Function to start Alert
const startTimer = () => {
  clearInterval(timerID);  // check for any exist timers
  timer.textContent = timeLeft;

  const countDown = ()=>{
    timeLeft--;
    timer.textContent = timeLeft;
    if(timeLeft === 0){
      const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
      if(confirmUser){
        timeLeft = 15;
        startQuiz();
      }else{
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  }
  timerID = setInterval(countDown, 1000);
}

// function to stop timer
const stopTimer = () =>{
  clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
  for(let i=quiz.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
}

// Function to Start Quiz 
const startQuiz = () =>{
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions();
}


// Adding Event listener to start Button
startBtn.addEventListener('click', ()=>{
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});


nextBtn.addEventListener('click', () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if(!selectedChoice && nextBtn.textContent === "Next"){
    // alert("Select your answer");
    displayAlert("Select your answer")
    return;
  }
  if(quizOver){
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  }
  else{
    checkAnswer();
  }
});
