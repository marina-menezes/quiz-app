let quizContainer = document.getElementById("container")
let nextBtn = document.getElementById("next-button")
let countOfQuestion = document.querySelector(".number-of-question")
let displayContainer = document.getElementById("display-container")
let scoreContainer = document.querySelector(".score-container")
let restart = document.getElementById("restart")
let userScore = document.getElementById("user-score")
let startScreen = document.querySelector(".start-screen")
let startButton = document.getElementById("start-button")
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// Questions and Options

const quizArray = [
    {
        id: "0", question: "Inside which HTML element do we put the JavaScript?", options: ["&lt;javascript&gt;", "&lt;script&gt;",
            "&lt;scripting&gt;", "&lt;js&gt;"], correct: "<script>",
    },
    {
        id: "1", question: "Where is the correct place to insert a JavaScript?", options: ["Both the &lt;head&gt; section and the &lt;body&gt; section are correct", "&lt;head&gt;", "&lt;body&gt",
            "none"], correct: "Both the <head> section and the <body> section are correct",
    },
    {
        id: "2", question: "How to write an IF statement in JavaScript?", options: ["if (i == 5)", "if i == 5 then", "if i = 5", "if i = 5 then"], 
        correct: "if (i == 5)" 
    },
];

//restart
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//next button
nextBtn.addEventListener("click", (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if(questionCount == quizArray.length) {
        //hide question, display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        // user score
        userScore.innerHTML = "Your score is " +
        scoreCount + " out of " + questionCount;
    } else {
        //display questionCount
        countOfQuestion.innerHTML = questionCount + 1 + 
        " of " + quizArray.length + " Question";
        //display quiz
        quizDisplay(questionCount);
        count = 11;
}
}));

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
}


// Quiz Creation

function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        // question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question ";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
    }
}

//checker function
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")
        [questionCount];
    let options = question.querySelectorAll(".option-div");

//if user clicked answer == correct option stored in object
if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
} else {
    userOption.classList.add("incorrect");
    //for marking the correct answer
    options.forEach((element) => {
        if (element.innerText == quizArray[questionCount].correct) {
            element.classList.add("correct");
        }
    });
};}


//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    quizCreator();
    quizDisplay(questionCount);
}

//when user clicks on start button
startButton.addEventListener("click", () =>{
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});