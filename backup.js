//Namespace
const triviaNight = {};
   

//*SELECTORS

//*user inputs
let $nameEntry = $('.nameEntry');
let $name;

let $categorySelector = $('.category')
let $category;

let $difficultySelector = $('.difficulty');
let $difficulty;


//*UI elements

//buttons
const $start = $('.startQuiz')
const $startOver = $('.startOver')
const $nextQuestion = $('.next')

//page sections
const $landingPage = $('.landing');
const $quiz = $('.quiz');
const $mainScreen = $('.mainScreen')
const $correctMessage = $('.correctAnswer')
const $incorrectMessage = $('.wrongAnswer')
const $timesUp = $('.timesUp')
const $userMessage = $('.userMessage')

//displayed elements 
const $question = $('.question');
let $questionNumber = 0;

const $correctAnswer = $('.correct');
const $incorrectAnswer1 = $('.incorrect1');
const $incorrectAnswer2 = $('.incorrect2');
const $incorrectAnswer3 = $('.incorrect3');

//score/timer/name display
const $scoreDisplay = $('.score');
let $timerDisplay = $('.timer');
let $nameDisplay = $('.name');



//store the score and timer values inside variables
let $score = 0;
let $countdownTimer = 20;


//*Landing Page

//load the initial screen on a timer, only 2 seconds
triviaNight.landing = () => {
    $landingPage.addClass('hidden');
    $mainScreen.removeClass('hidden');  
}

setTimeout(triviaNight.landing, 2000);


//*Event Handlers

//Start the quiz  - API call
$start.on('click', () => {
    //make call to the API to gather question info
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10",
        method: "GET",
        dataType: "json",
        data: {
            //collect user input for category
            category: 11,
            //collect user input for difficulty 
            difficulty: $difficulty,
            type: 'multiple',

        }
    }).then( data => {
        //! Can I store this regex somehow and just append it?
        //!can I map this to a new array to access it? Do I need to?
        //pass this data to a display question function, then use that to update questions - or populate hidden sections and then just hide or unhide by moving through the sections

        

        //Set question text, replace HTML character codes with actual characters
        $question.text(data.results[0].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
        
        
        //Set correct answer button text, replace HTML character codes with actual characters
        $correctAnswer.text(data.results[0].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

        //Set incorrect answers button text,replace HTML character codes with actual characters
        $incorrectAnswer1.text(data.results[0].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

        $incorrectAnswer2.text(data.results[0].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

        $incorrectAnswer3.text(data.results[0].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
    });

    $quiz.removeClass('hidden');
    $mainScreen.addClass('hidden');
    triviaNight.countdown();

})

//User Input - Name 
$nameEntry.on('change', (e) => {
    $name = e.target.value
})

//User Input - Difficulty
$difficultySelector.on('change', (e) => {
    $difficulty = e.target.value
});

//User Input - Category
// $categorySelector.on('change', (e) => {
//     $category = e.target.value
// });

//Next Question
$nextQuestion.on('click', triviaNight.nextQuestion)

//Correct Answer listener and handler
$correctAnswer.on('click', () => {
    $score = $score + 1;
    $scoreDisplay.text($score);
    $quiz.addClass('hidden');
    $correctMessage.removeClass('hidden');
})

//Incorrect Answers - handler 
const handleIncorrect = () => {
    $quiz.addClass('hidden');
    $incorrectMessage.removeClass('hidden');
    
}

//Incorrect Answers - listener
$incorrectAnswer1.on('click', handleIncorrect);
$incorrectAnswer2.on('click', handleIncorrect);
$incorrectAnswer3.on('click', handleIncorrect);

//Start Over 
$startOver.on('click', () => {
    //reset everything, including the timer.
    $quiz.addClass('hidden');
    $mainScreen.removeClass('hidden');
    $scoreDisplay.text('0');
    countdown();
})

//* Methods
//enumerator
triviaNight.whichQuestion = () => {
    $questionNumber++        
}

//time out message
triviaNight.timeout = () => {
    $quiz.addClass('hidden');
    $timesUp.removeClass('hidden');
}

//countdown timer
triviaNight.countdown = () => {
    let counter = setInterval(() => {
        $timerDisplay.text($countdownTimer);
        $countdownTimer--;
        if ($countdownTimer === 0) {
            clearInterval(counter);
            $('.timerDisplay').addClass('hidden');
            triviaNight.timeout();
            // if(triviaNight.showQuestion) {
            //     $countdownTimer = 20;
            //     triviaNight.countdown();
            // }
            return;
        
        }
    }, 1000);
};

//display question function
triviaNight.nextQuestion = () => {
    //update the question number
    triviaNight.whichQuestion();
    
    //hide any messages
    $userMessage.addClass('hidden');
    //show the quiz section
    $quiz.removeClass('hidden');
    //update the timer display
    $timerDisplay.text('20');

    //update question

    //update correct answer

    //update incorrect answers
    
    //reset countdown timer
    triviaNight.countdown();
    
}







//create init function
triviaNight.init = () => {
//call all functions in here
}

//create the document ready function
$(document).ready(() => { 
triviaNight.init()
})