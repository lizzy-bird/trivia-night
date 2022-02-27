//!Notes:

//! I had a couple of issues with the timer function. It gets a bit jumpy after the first question, and the timeout function clashes with the correct/incorrect answer panels, so sometimes there are two panels visible at a time if you sit on the right/wrong panel too long. I'm pretty confident I could figure this out with some more experimenting.

//! I also REALLY want to condense that regex if it's possible. It is a lot to look at. I tried playing around with stashing it inside a method to see if I could apply it that way, but none of the ways I have tried so far have worked.

//Namespace
const triviaNight = {};

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

    const $userMessage = $('.userMessage')

    //displayed elements 
    const $question = $('.question');
    let $questionNumber = 1;
    const $correctAnswer = $('.correct');
    const $incorrectAnswer = $('.incorrect');

    //score display
    const $scoreDisplay = $('.score');

    //store the score and timer values inside variables
    let $score = 0;
    let $countdownTimer = 20;
    let $timerDisplay = $('.timer');
    const $timesUp = $('.timesUp')

//set up event listeners
triviaNight.setupEventListeners = () => {
    //*SELECTORS
    //*user inputs
    let $categorySelector = $('.category')
    let $category;

    let $difficultySelector = $('.difficulty');
    let $difficulty;
    
    //User Input - Difficulty
    $difficultySelector.on('change', (e) => {
        $difficulty = e.target.value
    });

    //User Input - Category
    $categorySelector.on('change', (e) => {
        $category = e.target.value
    });

    //Start the quiz  - API call
    $start.on('click', () => {

        
        
        //make call to the API to gather question info
        $.ajax({
            url: "https://opentdb.com/api.php?amount=10",
            method: "GET",
            dataType: "json",
            data: {
                //collect user input for category
                category: $category,
                //collect user input for difficulty 
                difficulty: $difficulty,
                type: 'multiple',

            }
            //if you know whats good for you, leave this collapsed. So much regex. 😅
        }).then( data => {

            console.log($category)
            
            //* QUESTION 1
            //Set question text, replace HTML character codes with actual characters
            $('.question1').text(data.results[0].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct1').text(data.results[0].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong1').text(data.results[0].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong1').text(data.results[0].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong1').text(data.results[0].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 2
            //Set question text, replace HTML character codes with actual characters
            $('.question2').text(data.results[1].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct2').text(data.results[1].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong2').text(data.results[1].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong2').text(data.results[1].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong2').text(data.results[1].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 3
            //Set question text, replace HTML character codes with actual characters
            $('.question3').text(data.results[2].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct3').text(data.results[2].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong3').text(data.results[2].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong3').text(data.results[2].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong3').text(data.results[2].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 4
            //Set question text, replace HTML character codes with actual characters
            $('.question4').text(data.results[3].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct4').text(data.results[3].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong4').text(data.results[3].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong4').text(data.results[3].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong4').text(data.results[3].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 5
            //Set question text, replace HTML character codes with actual characters
            $('.question5').text(data.results[4].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct5').text(data.results[4].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong5').text(data.results[4].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong5').text(data.results[4].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong5').text(data.results[4].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 6
            //Set question text, replace HTML character codes with actual characters
            $('.question6').text(data.results[5].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct6').text(data.results[5].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong6').text(data.results[5].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong6').text(data.results[5].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong6').text(data.results[5].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 7
            //Set question text, replace HTML character codes with actual characters
            $('.question7').text(data.results[6].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct7').text(data.results[6].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong7').text(data.results[6].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong7').text(data.results[6].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong7').text(data.results[6].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 8
            //Set question text, replace HTML character codes with actual characters
            $('.question8').text(data.results[7].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct8').text(data.results[7].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong8').text(data.results[7].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong8').text(data.results[7].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong8').text(data.results[7].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 9
            //Set question text, replace HTML character codes with actual characters
            $('.question9').text(data.results[8].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct9').text(data.results[8].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong9').text(data.results[8].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong9').text(data.results[8].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong9').text(data.results[8].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //* QUESTION 10
            //Set question text, replace HTML character codes with actual characters
            $('.question10').text(data.results[9].question.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));
            
            //Set correct answer button text, replace HTML character codes with actual characters
            $('.correct10').text(data.results[9].correct_answer.replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            //Set incorrect answers button text,replace HTML character codes with actual characters
            $('.firstwrong10').text(data.results[9].incorrect_answers[0].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.secondwrong10').text(data.results[9].incorrect_answers[1].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));

            $('.thirdwrong10').text(data.results[9].incorrect_answers[2].replace( /&amp;/g, '&').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&#039;/g, `'`).replace(/&hellip;/g, `...`));



        });

        $('.1').removeClass('hidden');
        $mainScreen.addClass('hidden');
        triviaNight.countdown();
        
    })
    
    
    //Next Question
    $nextQuestion.on('click', (e) => {
        //increment the question number;
        $questionNumber++ ;

        //restart the countdown timer and display
        $countdownTimer = 20;
        triviaNight.countdown();
        $timesUp.addClass('hidden');
        $timerDisplay.removeClass('hidden');
        
        //hide any messages
        $userMessage.addClass('hidden');
        
        //show the quiz section
        $(`.${$questionNumber}`).removeClass('hidden');
        if ($questionNumber === 10) {
            $('.results').removeClass('hidden');
            $quiz.addClass('hidden');
        }
    })

    //Correct Answer
    $correctAnswer.on('click', () => {
        $score = $score + 1;
        $scoreDisplay.text($score);
        $quiz.addClass('hidden');
        $correctMessage.removeClass('hidden');
        
    })

    //Incorrect Answers
    $incorrectAnswer.on('click',() => {
        $quiz.addClass('hidden');
        $incorrectMessage.removeClass('hidden');
        $timesUp.addClass('hidden');
        
    });

    //Start Over 
    $startOver.on('click', () => {
        //reset everything, including the timer.
        $score = 0;
        $scoreDisplay.text('0');
        $questionNumber = 1;
        $quiz.addClass('hidden');
        $('.results').addClass('hidden')
        $mainScreen.removeClass('hidden');
        triviaNight.countdown();
        
    })

}

// create init function
triviaNight.init = () => {

    //load the initial screen on a timer, 5 seconds
    triviaNight.landing = () => {
        $landingPage.addClass('hidden');
        $mainScreen.removeClass('hidden');  
        
    }
    setTimeout(triviaNight.landing, 5000);

    
    //countdown timer
    triviaNight.countdown = () => {
        let counter = setInterval(() => {
            $timerDisplay.text($countdownTimer);
            $countdownTimer--;
            if ($countdownTimer === 0) {
                clearInterval(counter);
                $('.timerDisplay').addClass('hidden');
                triviaNight.timeout();
                return;
            } if($questionNumber === 10) {
                $timesUp.addClass('hidden');
                return;
            }
        }, 1000);
    };
    
    //time out message
    triviaNight.timeout = () => {
        $quiz.addClass('hidden');
        $timesUp.removeClass('hidden');
    }

    //load the event listeners
    triviaNight.setupEventListeners();
}

//create the document ready function
$(document).ready(() => { 
    triviaNight.init();
})




