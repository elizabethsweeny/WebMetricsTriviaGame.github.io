$( document ).ready(function() {

//GLOBAL VARIABLES
//======================================
var roundsWon = 0;
var roundsLost = 0;
var totalRounds = 0;
var totalCorrect = 0;
var totalWrong = 0;
//To check whether or not a user has been served a particular question within gameplay - assumes 10 questions total in questionBank.
//var questionTracker = [false, false, false, false, false, false, false, false, false, false];

//QUESTION BANK
//======================================

const questionBank = [{
    question: "What is FCP?",
    answers: {
        a: "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
        b: "A field and lab metric that tells when the first pixel was painted on the screen.", 
        c: "A lab measurement of how fast pixels of the page reach their final position.", 
        d: "The time it takes for the browser to receive the first byte from the server, usually HTML.", 
    },
    correctAnswer: "b" 
},
{
    question: "What is Time to Interactive (TTI)?",
    answers: {
        a: "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
        b: "A field and lab metric that tells when the first pixel was painted on the screen.", 
        c: "A lab measurement of how fast pixels of the page reach their final position.", 
        d: "The time it takes for the browser to receive the first byte from the server, usually HTML.", 
    },
    correctAnswer: "a"  
},
{
    question: "What is Time to First Byte (TTFB)?",
    answers: {
        a: "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
        b: "A field and lab metric that tells when the first pixel was painted on the screen.", 
        c: "A lab measurement of how fast pixels of the page reach their final position.", 
        d: "The time it takes for the browser to receive the first byte from the server, usually HTML.", 
    },
    correctAnswer: "d"  
},
{
    question: "What is First Meaningful Paint (FMP)?",
    answers: {
        a: "A lab measurement of how fast pixels of the page reach their final position.", 
        b: "A lab and field metric of how long it takes for the “hero” element of the page to become visible", 
        c: "A field and lab metric that tells when the first pixel was painted on the screen.", 
        d: "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
    },
    correctAnswer: "b"  
},
{
    question: "What is Speed Index?",
    answers: {
        a: "A lab metric that measures when the main thread is quiet enough to respond to user input.", 
        b: "A field and lab metric that tells when the first pixel was painted on the screen.", 
        c: "A lab measurement of how fast pixels of the page reach their final position.", 
        d: "The time it takes for the browser to receive the first byte from the server, usually HTML.", 
    },
    correctAnswer: "c" 
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



function startTimer() {
    var secondsLeft = 30;
    var interval = setInterval(function () {
        document.getElementById("countdownTimer").innerHTML = --secondsLeft;

        //If time has run out...
        if (secondsLeft === 0) {
            document.getElementById("countdownTimer").innerHTML = "00";
            clearInterval(interval);
            //Show alert that time is up, then hide it.
            document.getElementById("timeIsUp").style.display = "block";
            document.getElementById("startRoundButton").disabled = false;
            setTimeout(function () {
                document.getElementById("timeIsUp").style.display = "none";
            }, 10000);
            return;
        }
        }, 1000);

        if (secondsLeft != 0){
            function startRound(){
                document.getElementById("startRoundButton").disabled = true;
                //does this need to be one level up in terms of object? i.e. should it exist outside of the startRound function so that I can increment it?
                var i = 0;
                newQuestion(i);
                var correctAnswer = (questionBank[i].correctAnswer);
                console.log("Correct answer of given question by index " + correctAnswer);

                //Finding which answerOptionSpace corresponds to the correct answer.
                var correctAnswerSpace = "";
                if (document.getElementById("answerOption1").getAttribute("value") === correctAnswer) {
                    correctAnswerSpace = "answerOption1";
                }
                if (document.getElementById("answerOption2").getAttribute("value") === correctAnswer) {
                    correctAnswerSpace = "answerOption2";
                }
                if (document.getElementById("answerOption3").getAttribute("value") === correctAnswer) {
                    correctAnswerSpace = "answerOption3";
                }
                if (document.getElementById("answerOption4").getAttribute("value") === correctAnswer) {
                    correctAnswerSpace = "answerOption4";
                }
                console.log("Correct Answer Space Variable " + correctAnswerSpace);

                //Checking if which option the user clicked is the correct answer or not.
                $("#answerOption1, #answerOption2, #answerOption3, #answerOption4").click(function () {
                    if (this.id == correctAnswerSpace) {
                        document.getElementById("correctAnswerAlert").style.display = "block";
                        setTimeout(function () {
                            document.getElementById("correctAnswerAlert").style.display = "none";;
                        }, 5000);
                        totalCorrect++;
                        i++;
                        startRound();
                    }
                    else if (this.id != correctAnswerSpace) {
                        document.getElementById("wrongAnswerAlert").style.display = "block";
                        setTimeout(function () {
                            document.getElementById("wrongAnswerAlert").style.display = "none";;
                        }, 5000);
                        i++;
                    }
            })
        }
    }
    startRound();
}

// function startRound(){
//     document.getElementById("startRoundButton").disabled = true;
//     var i=0;
//     newQuestion(i);
//     var correctAnswer = (questionBank[i].correctAnswer);
//     console.log("Correct answer of given question by index " + correctAnswer);

//     //Finding which answerOptionSpace corresponds to the correct answer.
//         var correctAnswerSpace = "";
//         if (document.getElementById("answerOption1").getAttribute("value") === correctAnswer){
//             correctAnswerSpace = "answerOption1";
//         }
//         if (document.getElementById("answerOption2").getAttribute("value") === correctAnswer){
//             correctAnswerSpace = "answerOption2";
//         }
//         if (document.getElementById("answerOption3").getAttribute("value") === correctAnswer){
//             correctAnswerSpace = "answerOption3";
//         }
//         if (document.getElementById("answerOption4").getAttribute("value") === correctAnswer){
//             correctAnswerSpace = "answerOption4";
//         }
//         console.log("Correct Answer Space Variable "+ correctAnswerSpace);
    
//     startTimer();
//     if (document.getElementById("countdownTimer").innerHTML === "0"){
//         document.getElementById("startRoundButton").disabled = false;
//         return 0;
//     }    
//     if ((document.getElementById("countdownTimer").innerHTML) > "0"){
//         console.log ("countdownTimer value =" + document.getElementById("countdownTimer").innerHTML);

//     //Checking if which option the user clicked is the correct answer or not.
//     $("#answerOption1, #answerOption2, #answerOption3, #answerOption4").click(function () {
//         if (this.id == correctAnswerSpace) {
//             document.getElementById("correctAnswerAlert").style.display = "block";
//             setTimeout(function() {
//                 document.getElementById("correctAnswerAlert").style.display = "none";;
//             }, 5000);
//             totalCorrect++;
//             i++;
//             console.log ("countdownTimer value =" + document.getElementById("countdownTimer").innerHTML);
//         }
//         else if (this.id != correctAnswerSpace) {
//             document.getElementById("wrongAnswerAlert").style.display = "block";
//             setTimeout(function() {
//                 document.getElementById("wrongAnswerAlert").style.display = "none";;
//             }, 5000);
//             i++;
//         }
        
//     })
// }
// };

//Function that serves up a new question.
function newQuestion(questionNumber){
    $("#questionSpace").text(questionBank[questionNumber].question);
    
    document.getElementById("multipleChoiceBlock").style.display = "block";
    $("#answerOption1").text(questionBank[questionNumber].answers.a);
    $("#answerOption2").text(questionBank[questionNumber].answers.b);
    $("#answerOption3").text(questionBank[questionNumber].answers.c);
    $("#answerOption4").text(questionBank[questionNumber].answers.d);
};



//TEST BENCH
//======================================

//Syntax to randomly select an incorrect answer and serve it to an answer option space.
// var randomIncorrect = questionBank[0].wrongAnswers[Math.floor(Math.random()*10)];
// $("#answerOption1").text(randomIncorrect);

//TEST new question, only to be called within start round (DELETE)
newQuestion(0);


//INITIALIZING GAME
//======================================
startGame();

$("#startRoundButton").click(function(){
    startTimer();
});

//SYNTAX REMINDERS
//======================================

//Syntax for putting a specific question in the Question Space within the HTML.
//$("#questionSpace").text(questionBank[0].question);

//Congratulations pop up.
//document.getElementById("wonRoundAlert").style.display = "none";
//document.getElementById("wonRoundAlert").style.display = "block";

//document.getElementById("correctAnswerAlert").style.display = "none";
//document.getElementById("correctAnswerAlert").style.display = "block";

//Wrong Answer Alert Popup
//document.getElementById("wrongAnswerAlert").style.display = "none";
//document.getElementById("wrongAnswerAlert").style.display = "block";

//Multiple Choice Block
//document.getElementById("multipleChoiceBlock").style.display = "none";
//document.getElementById("multipleChoiceBlock").style.display = "block";

//Time is up alert.
//document.getElementById("timeIsUp").style.display = "none";
//document.getElementById("timeIsUp").style.display = "block";



//OUT OF SCOPE FOR CURRENT IMPEMENTATION
//======================================

// Function to show the questions and the correct answers after each round is completed.
// function showQuestions(){ }

});