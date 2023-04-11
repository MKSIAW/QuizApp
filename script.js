const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");

let shuffledQuestions, currentQuestionIndex;
let timeLeft = 30; 
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;

//startButton.addEventListener('click', startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Fill the boxes to continue'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks

new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#228B22", "#F8F8FF"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}

function startQuiz() {

  nameField.disabled=true
  idField.textContent =`Id:${idField.value}`
  idField.disabled=true
    startButton.textContent = "Next";
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
    startTimer(timeLeft, timerElement);
  
    
  }
  
function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    shuffledQuestions.splice(currentQuestionIndex, 1);
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    if (correct) {
      marks = marks + 1;
      score.textContent = marks;
      finalMarks = totalMarks - marks;
      console.log(finalMarks);
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
 
  
  const questions = [  
    {    question: 'Where is GIMPA main campus located?',   
     answers: [      
      { text: 'Accra', correct: true },     
      { text: 'Sunyani', correct: false },
      { text: 'Takoradi', correct: false},
      { text: 'Kumasi', correct: false}    
    ]
    },
    {
      question: 'What is the full meaning of SOT?',
      answers: [
        { text: 'School of Tough', correct: false },
        { text: 'School of Technicians', correct: false },
        { text: 'School of Teletabies', correct: false },
        { text: 'School of Technology', correct: true }
      ]
    },
    {
      question: 'Who is the first lady of Ghana?',
      answers: [
        { text: 'Lordina Mahama', correct: false },
        { text: 'Rebecca Akuffo-Addo', correct: true },
        { text: 'Akua Donkor', correct: false },
        { text: 'Michelle Siaw', correct: false }
      ]
    },
    {
      question: 'What is the name of the HCI lecturer in SOT?',
      answers: [
        { text: 'Dr Isaac Obiri', correct: true },
        { text: 'Dr Emmanuel Djaba', correct: false },
        { text: 'Dr Michelle Siaw', correct: false },
        { text: 'Dr Isaac Adzraku', correct: false }
      ]
    },
    {
      question: 'Who wrote the memoir SPARE?',
      answers: [
        { text: 'Princess Charlotte', correct: false },
        { text: 'Prince Charles', correct: false },
        { text: 'Prince Harry', correct: true },
        { text: 'Queen Elizabeth', correct: false }
      ]
    },
    {
      question: 'Which side of africa is Ghana located?',
      answers: [
        { text: 'East Africa', correct: false },
        { text: 'South Africa', correct: false },
        { text: 'North Africa', correct: false },
        { text: 'West Africa', correct: true }
      ]
    },
    {
      question: 'Which year did Ghana gain independence?',
      answers: [
        { text: '1998', correct: false },
        { text: '1857', correct: false },
        { text: '1703', correct: false },
        { text: '1957', correct: true }
      ]
    },
    {
      question: 'How was Ghana formaly known?',
      answers: [
        { text: 'Gold Land', correct: false },
        { text: 'Gold Meth', correct: false },
        { text: 'Goldwana', correct: false },
        { text: 'Gold Coast', correct: true }
      ]
    },
    {
      question: 'Who is Ghanas first president?',
      answers: [
        { text: 'J.J Rawlings', correct: false },
        { text: 'Kwame Nkrumah', correct: true },
        { text: 'Atta Mills', correct: false },
        { text: 'akuffo Addo', correct: false }
      ]
    },
    {
      question: 'Which of the following is true?',
      answers: [
        { text: 'Capital town of Ghana is Accra', correct: true },
        { text: 'Gimpa has a library', correct: true },
        { text: 'The bible contains both the new testament and the old testament', correct: true },
        { text: 'Ghana is known for their rich minerals', correct: true }
      ]
    }
  ];

  