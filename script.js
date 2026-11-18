/*
Project: North Carolina History Quiz
Developer: Joshua Allgood
File: script.js

Description: Provides the interactive functionality for the North Carolina History Quiz applicaiton.

Technologies: JavaScript

File Responsibilities:
- Store North Carolina History questions and answers.
- Display question dynamically.
- Validate user-selected answers.
- Track quiz progress and score.
- Control navigation between questions.
- Display final quiz results.

*/

/* 1. QUIZ QUESTIONS -- Stores the questions, answers and correct responses. */
const questions = [
    {
        question: "What year did North Carolina become a state?",
        answers: ["1776", "1789", "1792", "1801"],
        correctAnswer: 1
    },
    {
        question: "Which city became North Carolina's permanent capital in 1792?",
        answers: ["Raleigh", "New Bern", "Charlotte", "Wilmington"],
        correctAnswer: 0
    },
    {
        question: "What was the name of the English colony that disappeared on Roanoke Island?",
        answers: ["Jamestown", "Plymouth", "The Lost Colony", "New Amsterdam"],
        correctAnswer: 2

    },
    {
        question: "Which famous pirate died near Ocracoke Island in 1718?",
        answers: ["Blackbeard", "Calico Jack", "Anne Bonny", "Bartholomew Roberts"],
        correctAnswer: 0
    },
    {
        question: "What was North Carolina's original capital under its 1776 state constitution?",
        answers: ["Raleigh", "New Bern", "Edenton", "There was no fixed capital"],
        correctAnswer: 3
    },
    {
        question: "Who was the first governor of North Carolina after independence?",
        answers: ["William Tryon", "Richard Caswell", "Zebulon Vance", "Edward Hyde"],
        correctAnswer: 1
    },
    {
        question: "In what year did the Wright brothers make their first powered flight in North Carolina?",
        answers: ["1899", "1901", "1903", "1910"],
        correctAnswer: 2
    },
    {
        question: "Which North Carolina city is known as the Queen City?",
        answers: ["Raleigh", "Greensboro", "Charlotte", "Asheville"],
        correctAnswer: 2
    },
    {
        question: "What year did North Carolina officially secede from the Union?",
        answers: ["1850", "1860", "1861", "1865"],
        correctAnswer: 2
    },
    {
        question: "Which North Carolina town was home to the first state university in the United States?",
        answers: ["Durham", "Chapel Hill", "Boone", "Winston-Salem"],
        correctAnswer: 1
    }
];

/* 2. DOM ELEMENT REFERENCES -- Connects JavaScript to the HTML quiz interface. */

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

/* 3. QUIZ STATE VARIABLES -- Tracks the current question index and user score. */

let currentQuestionIndex = 0;
let score = 0;

/* 4. DISPLAY QUESTION -- Retrives and displays the current question. */

function displayQuestion() {

    // Retrieve the current question from the array.
    const currentQuestion = questions[currentQuestionIndex];

    // Update the question number.
    questionNumber.textContent = currentQuestionIndex + 1;

    // Update the question text.
    questionText.textContent = currentQuestion.question;

    // Update and reset the four answer buttons.
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];

        // Remove feedback from the previous question.
        button.classList.remove("correct", "incorrect");

        // Allow the user to select and answer.
        button.disabled = false;
    });

    // Prevent advancing until an answer is selected.
    nextButton.disabled = true;
}

/* 5. CHECK ANSWER -- Validates the selected answer and updates the score. */

function checkAnswer(selectedIndex) {

    // Retrieve the current question.
    const currentQuestion = questions[currentQuestionIndex];

    // Check whether the selected answer is correct.
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        console.log("Correct Answer!");

          // Highlight the correct answer.
        answerButtons[currentQuestion.correctAnswer].classList.add("correct");

    } else {
        console.log("Incorrect Answer!");

        // Highlight the incorrect answer.
        answerButtons[selectedIndex].classList.add("incorrect");
    

        // Highlight the correct answer.
        answerButtons[currentQuestion.correctAnswer].classList.add("correct");
    }

    // Displays the current score in the console.
    console.log("Current Score:", score);

    // Prevent multiple answers to the same quesiton.
    answerButtons.forEach((button) => {
        button.disabled = true;
    });

    // All the user to advance after answering
    nextButton.disabled = false;
}

/* 6. ANSWER BUTTON EVENT LISTENERS -- Detects when a user selects an answer. */

answerButtons.forEach((button, index) => {

    button.addEventListener("click", () => {
        checkAnswer(index);
    });
});

/* 7. NEXT QUESTION NAVIGATION -- Advances the quiz to the next question. */

nextButton.addEventListener("click", () => {

    // Move to the next quesiton.
    currentQuestionIndex++;

    // Check whether another question exists.
    if(currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
});

/* 8.  DISPLAY RESULTS -- Shows the final score when the quiz is complete. */

function displayResults() {

    // Calculate the percentage of correct answers.
    const percentage = Math.round((score / questions.length) * 100);

    // Hide the quiz and show the results section.
    quizContainer.hidden = true;
    resultsContainer.hidden = false;

    // Display the user's final score.
    finalScore.textContent = `You scored ${score} out of ${questions.length} (${percentage}%).`;

    // Display a message based on the user's performance.
    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! You're a Tar Heel history expert!";
    } else if (percentage >= 70) {
        resultMessage.textContent = "Great job! You know your North Carolina history!";
    } else {
        resultMessage.textContent = "Keep learning! Every question is a chance to discover more about North Carolina";
    }
}

/* 9. RESTART QUIZ -- Resets the quiz to its initial state. */

function restartQuiz() {

    // Reset the current question and score.
    currentQuestionIndex = 0;
    score = 0;

    // Hide the results and display the quiz.
    resultsContainer.hidden = true;
    quizContainer.hidden = false;

    // Display the first question again
    displayQuestion();
}

// Listen for the Restart Quiz button click.
restartButton.addEventListener("click", restartQuiz);

/* 10. INITIALIZE QUIZ -- Displays the first question when the page loads. */

displayQuestion();