function Quiz(questions) {
  this.score = 0; 
  this.questions = questions; 
  this.quizIndex = 0; 
}


Quiz.prototype.currentQuestionFunc = function() { 
  return this.questions[this.quizIndex]
  
}

Quiz.prototype.moveQuizForward = function(answer) {
  if (this.currentQuestionFunc().rightChoiceFunc(answer)) {
    this.score++; 
  }
  this.quizIndex++; 
}

Quiz.prototype.isEnded = function() {
  return this.questions.length == this.quizIndex
}


function Question(questionAsked, options, rightAnswer) {
  this.questionAsked = questionAsked; 
  this.options = options; 
  this.rightAnswer = rightAnswer;
}

Question.prototype.rightChoiceFunc = function(answerChose) {
  return answerChose === this.rightAnswer
}

let questions = [
  new Question(
    "What's another name for the first degree of a scale?", 
    ["dominant", "tonic", "mediant", "submediant"], 
    "tonic"),
  new Question(
    "Which one of these people are NOT jazz musicians?", 
    ["Sonny Rollins", "Mozart", "Coltrane", "Miles Davis"], 
    "Mozart"),
  new Question(
    "Where was Duke Ellington raised?", 
    ["Washington DC", "San Francisco", "New York City", "Birmingham"], 
    "Washington DC")
]

  

function populate() {

  if (quiz.isEnded()) {
    endgame()
  } else {
    let questionNumber = quiz.quizIndex + 1
    let question = quiz.currentQuestionFunc().questionAsked
    let totalNumber = quiz.questions.length
 
    $("#questionTitle").html(`Question #${questionNumber} of ${totalNumber}`)
    $("#question").html(question)
  
 
    let options = quiz.currentQuestionFunc().options
      for (option in options) {
        $(`#ans${option}`).html(`${options[option]}`)
        selection(`op${option}`,`${options[option]}`)
    }
  }
 }

const selection = function(buttonId, answer) {
    let button = document.getElementById(buttonId)
    button.onclick = function() {
      quiz.moveQuizForward(answer)
      populate()
    }
  }

const endgame = function() {
  let finalscore = quiz.score
  let number = quiz.questions.length
  $("#questionTitle").html("It's Over!")
  $("#question").html(`You got ${finalscore} right out of ${number}`)
  $("#q-list").html("")
}

let quiz = new Quiz(questions)

populate()

