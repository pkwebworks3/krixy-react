var quizQuestions = [
  {
    question: "What is Naruto's last name?",
    options: ["Uzumaki", "Uchiha", "Hyuga", "Namikaze"],
    correctAnswer: "Uzumaki"
  },
  {
    question: "What is Boruto's father's name?",
    options: ["Minato", "Itachi", "Sasuke", "Naruto"],
    correctAnswer: "Naruto"
  },
  {
    question: "What is the name of Naruto's teacher?",
    options: ["Kakashi", "Jiraiya", "Orochimaru", "Tsunade"],
    correctAnswer: "Jiraiya"
  },
  {
    question: "What is the name of the village where Naruto was born?",
    options: ["Sunagakure", "Kirigakure", "Konohagakure", "Iwagakure"],
    correctAnswer: "Konohagakure"
  },
  {
    question: "What is the name of the group that Sasuke joins?",
    options: ["Akatsuki", "Sound Four", "Taka", "Seven Ninja Swordsmen"],
    correctAnswer: "Taka"
  }
];

// get the quiz section element
var quizSection = document.getElementById("quiz");

// create a function to display the quiz
function showQuiz() {
  // create an array to store the HTML for each question
  var questionHTML = [];

  // loop through each question and create the HTML
  for (var i = 0; i < quizQuestions.length; i++) {
    // create the HTML for the question
    var question = quizQuestions[i].question;
    var options = quizQuestions[i].options;
    var questionNumber = i + 1;
    var questionText = questionNumber + ". " + question;
    var optionsHTML = "";

    // loop through each option and create the HTML
    for (var j = 0; j < options.length; j++) {
      var optionNumber = j + 1;
      var optionText = options[j];
      optionsHTML += "<label><input type='radio' name='question" + questionNumber + "' value='" + optionText + "'>" + optionText + "</label>";
    }

    // combine the HTML for the question and options
    var questionFullHTML = "<div class='question'>" + questionText + "</div><div class='options'>" + optionsHTML + "</div>";

    // add the HTML to the question array
    questionHTML.push(questionFullHTML);
  }

  // combine the HTML for all the questions
  var quizHTML = questionHTML.join("");

  // add the quiz HTML to the quiz section
  quizSection.innerHTML = quizHTML;

  // display the quiz section
  quizSection.style.display = "block";
}

// create a function to show the results
function showResults() {
  // get the user's answers
  var answers = document.querySelectorAll("#quiz input[type='radio']:checked");
  
  // check the answers and keep track of the score
  var score = 0;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].value === quizQuestions[i].correctAnswer) {
      score++;
    } else {
      answers[i].parentElement.classList.add("incorrect");
    }
  }
  
  // hide the quiz and show the results
  var resultsSection = document.getElementById("results");
  quizSection.style.display = "none";}