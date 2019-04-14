$(document).ready(function() {
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

    const answerBank = [
        "A lab metric that measures when the main thread is quiet enough to respond to user input.",
        "A field and lab metric that tells when the first pixel was painted on the screen.",
        "A lab measurement of how fast pixels of the page reach their final position.",
        "The time it takes for the browser to receive the first byte from the server, usually HTML.",
        "A lab and field metric of how long it takes for the “hero” element of the page to become visible"
    ];

    const questionBank = [
        {
            question: "What is FCP?",
            correctAnswer: 1
        },
        {
            question: "What is Time to Interactive (TTI)?",
            correctAnswer: 0
        },
        {
            question: "What is Time to First Byte (TTFB)?",
            correctAnswer: 3
        },
        {
            question: "What is First Meaningful Paint (FMP)?",
            correctAnswer: 4
        },
        {
            question: "What is Speed Index?",
            correctAnswer: 2
        }
    ];

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
    function updateGameScoreText() {
        $("#totalRoundsWon").text(roundsWon);
        $("#totalRoundsPlayed").text(totalRounds);
        var percentage = (totalCorrect / totalWrong) * 10;
        $("#totalPercentageCorrect").text(percentage);
    }

    // //Function that starts a round of gameplay.
    // function startGame(){

    // }

    function startTimer() {
        var secondsLeft = 30;

        var interval = setInterval(function() {
            document.getElementById("countdownTimer").innerHTML = --secondsLeft;

            //If time has run out...
            if (secondsLeft === 0) {
                document.getElementById("countdownTimer").innerHTML = "00";
                clearInterval(interval);
                totalRounds++;
                updateGameScoreText;

                //Show alert that time is up, then hide it.
                document.getElementById("timeIsUp").style.display = "block";
                document.getElementById("startRoundButton").disabled = false;
                setTimeout(function() {
                    document.getElementById("timeIsUp").style.display = "none";
                }, 10000);
                return;
            }
        }, 1000);

        var questionsCorrect = 0;
        var questionsWrong = 0;
        var questionIndex = 0;
        populateQuestion(questionIndex);

        function startRound() {
            document.getElementById("startRoundButton").disabled = true;

            //Checking if which option the user clicked is the correct answer or not.
            $("#answerOption1, #answerOption2, #answerOption3, #answerOption4").click(function() {
                var correctAnswerIndex = questionBank[questionIndex].correctAnswer;
                var clickedAnswerIndex = $(this).data("answerIndex");
                if (clickedAnswerIndex === correctAnswerIndex) {
                    document.getElementById("correctAnswerAlert").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("correctAnswerAlert").style.display = "none";
                    }, 5000);
                    totalCorrect++;
                    questionsCorrect++;
                    document.getElementById("questionsCorrect").innerHTML = questionsCorrect;
                    questionIndex++;
                    updateGameScoreText();
                    if (questionIndex < questionBank.length) {
                        populateQuestion(questionIndex);
                    } else {
                        alert("Out of questions!");
                        if (questionsCorrect > questionsWrong) {
                            document.getElementById("wonRoundAlert").style.display = "block";
                            roundsWon++;
                        }
                    }
                } else {
                    document.getElementById("wrongAnswerAlert").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("wrongAnswerAlert").style.display = "none";
                    }, 5000);
                    totalWrong++;
                    questionsWrong++;
                    document.getElementById("questionsWrong").innerHTML = questionsWrong;
                    questionIndex++;
                    if (questionIndex < questionBank.length) {
                        populateQuestion(questionIndex);
                    } else {
                        alert("Out of questions!");
                        if (questionsCorrect < questionsWrong) {
                            roundsLost++;
                        }
                    }
                }
                return false;
            });
        }
        startRound();
    }

    //Function that serves up a new question.
    function populateQuestion(questionIndex) {
        var potentialAnswers = [];
        //Add correct answer to potentialAnswers array.
        potentialAnswers.push(questionBank[questionIndex].correctAnswer);

        //Filling potentialAnswers array with three additional non-correct answers at random.
        while (potentialAnswers.length < 4) {
            var answerCandidate = Math.floor(Math.random() * answerBank.length);
            if (answerCandidate != questionBank[questionIndex].correctAnswer) {
                potentialAnswers.push(answerCandidate);
            }
        }

        shuffleArray(potentialAnswers);

        document.getElementById("questionSpace").style.display = "block";
        $("#questionSpace").text(questionBank[questionIndex].question);
        document.getElementById("multipleChoiceBlock").style.display = `block`;

        //Placing the now randomized answer string into the multipleChoiceBlock, saving correct answer integer into data.
        $("#answerOption1")
            .data("answerIndex", potentialAnswers[0])
            .text(answerBank[potentialAnswers[0]]);
        $("#answerOption2")
            .data("answerIndex", potentialAnswers[1])
            .text(answerBank[potentialAnswers[1]]);
        $("#answerOption3")
            .data("answerIndex", potentialAnswers[2])
            .text(answerBank[potentialAnswers[2]]);
        $("#answerOption4")
            .data("answerIndex", potentialAnswers[3])
            .text(answerBank[potentialAnswers[3]]);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //TEST BENCH
    //======================================

    //Syntax to randomly select an incorrect answer and serve it to an answer option space.
    // var randomIncorrect = questionBank[0].wrongAnswers[Math.floor(Math.random()*10)];
    // $("#answerOption1").text(randomIncorrect);

    //TEST new question, only to be called within start round (DELETE)
    //populateQuestion(0);

    //INITIALIZING GAME
    //======================================
    //startGame();

    $("#startRoundButton").click(function() {
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
