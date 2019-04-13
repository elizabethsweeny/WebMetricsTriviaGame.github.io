$( document ).ready(function() {

//GLOBAL VARIABLES
//======================================
var roundsWon = 0;
var roundsLost = 0;
var totalRounds = 0;
var totalCorrect = 0;
var totalWrong = 0;
//To check whether or not a user has been served a particular question within gameplay - assumes 10 questions total in questionBank.
var questionTracker = [false, false, false, false, false, false, false, false, false, false];

//QUESTION BANK
//======================================

var questionBank = [{
    question: "What is FCP?",
    correctAnswer: "A field and lab metric that tells when the first pixel was painted on the screen.",
    wrongAnswers: [
    "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
    "Dummy answer 1", 
    "Dummy answer 2", 
    "Dummy answer 3", 
    "Dummy answer 4", 
    "Dummy answer 5", 
    "Dummy answer 6"]
},
{
    question: "What is TTI?",
    correctAnswer: "A lab metric that measures when the main thread is quiet enough to respond to user input.",
    wrongAnswers: [
    "A field and lab metric that tells when the first pixel was painted on the screen.", 
    "Dummy answer 1", 
    "Dummy answer 2", 
    "Dummy answer 3", 
    "Dummy answer 4", 
    "Dummy answer 5", 
    "Dummy answer 6"]
},
{
    question: "What is First Input Delay (FID)?",
    correctAnswer: "The time it takes between the user first interacting with the page and the page responding.",
    wrongAnswers: [
    "A field and lab metric that tells when the first pixel was painted on the screen.", 
    "A lab metric that measures when the main thread is quiet enough to respond to user input.",
    "Dummy answer 1", 
    "Dummy answer 2", 
    "Dummy answer 3", 
    "Dummy answer 4", 
    "Dummy answer 5", 
    "Dummy answer 6"]
}];

//FUNCTIONS
//======================================

//If resetGameButton is clicked, all global variables are reset to 0.
$("#resetGameButton").click(function() {
    var roundsWon = 0;
    var roundsLost = 0;
    var totalRounds = 0;
    var totalCorrect = 0;
    var totalWrong = 0;
    var questionTracker = [false, false, false, false, false, false, false, false, false, false];
});

//Function to update high level game statistics with current global variable values.
function updateGameScoreText(){
    $("#totalRoundsWon").text(roundsWon);
    $("#totalRoundsPlayed").text(totalRounds);
    var percentage = (totalCorrect / totalWrong);
    $("#totalPercentageCorrect").text(percentage);
}

//Function that starts a round of gameplay.
function startGame(){

}



$("startRoundButton").click(function startRound(){
    var secondsLeft = 30;
    var interval = setInterval(function () {
        document.getElementById("countdownTimer").innerHTML = --secondsLeft;
        newQuestion(0);
        if (secondsLeft > 0){
            for (i=0; i<10; i++){

            }

            };

            $("#answerOption1").click(function() {
       
            });



        if (secondsLeft <= 0) {
            document.getElementById("countdownTimer").innerHTML = "00";
            clearInterval(interval);
            document.getElementById("timeIsUp").style.display = "block";
        }
    }, 1000);
});



//Function that serves up a new question.
function newQuestion(questionNumber){
    $("#questionSpace").text(questionBank[questionNumber].question);
    document.getElementById("multipleChoiceBlock").style.display = "block";
        var randomIncorrect = questionBank[questionNumber].wrongAnswers[Math.floor(Math.random()*10)];
        $("#answerOption1").text(randomIncorrect);
    };
newQuestion(1);
//TEST BENCH
//======================================

//Syntax to randomly select an incorrect answer and serve it to an answer option space.
// var randomIncorrect = questionBank[0].wrongAnswers[Math.floor(Math.random()*10)];
// $("#answerOption1").text(randomIncorrect);

//Syntax for putting a specific question in the Question Space within the HTML.
//$("#questionSpace").text(questionBank[0].question);

    //Congratulations pop up.
    document.getElementById("wonRoundAlert").style.display = "none";
    //document.getElementById("wonRoundAlert").style.display = "block";

    document.getElementById("correctAnswerAlert").style.display = "none";
    //document.getElementById("correctAnswerAlert").style.display = "block";

    //Wrong Answer Alert Popup
    document.getElementById("wrongAnswerAlert").style.display = "none";
    //document.getElementById("wrongAnswerAlert").style.display = "block";

    //Multiple Choice Block
    document.getElementById("multipleChoiceBlock").style.display = "none";
    //document.getElementById("multipleChoiceBlock").style.display = "block";

    //Time is up alert.
    document.getElementById("timeIsUp").style.display = "none";
    //document.getElementById("timeIsUp").style.display = "block";

//INITIALIZING GAME
startGame();

});