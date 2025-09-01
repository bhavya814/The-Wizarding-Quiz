const questions= [
    {
        question : "What house at Hogwarts does Harry belong to?",
        answers:[
            { text:"Ravenclaw", correct:false},
            { text:"Hufflepuff", correct:false},
            { text:"Gryffindor", correct:true},
            { text:"Slytherin", correct:false},
        ]
    },
    {
        question : "What position does Harry play on his Quidditch team?",
        answers:[
            { text:"Keeper", correct:false},
            { text:"Chaser", correct:false},
            { text:"Seeker", correct:true},
            { text:"Beater", correct:false},
        ]
    },
    {
        question : "What is the name of Hermione’s cat?",
        answers:[
            { text:"Crookshanks", correct:true},
            { text:"Scabbers", correct:false},
            { text:"Hedwig", correct:false},
            { text:"Fang", correct:false},
        ]
    },
    {
        question : "Who was the Half-Blood Prince?",
        answers:[
            { text:"Harry Potter", correct:false},
            { text:"Severus Snape", correct:true},
            { text:"Tom Riddle", correct:false},
            { text:"Albus Dumbledore", correct:false},
        ]
    },
    {
        question : "What platform at King’s Cross do students use to board the Hogwarts Express?",
        answers:[
            { text:"Platform 9", correct:false},
            { text:"Platform 9 ¾", correct:true},
            { text:"Platform 10", correct:false},
            { text:"Platform 8 ¾", correct:false},
        ]
    },
    {
        question : "What is the name of Hagrid’s giant spider?",
        answers:[
            { text:"Aragog", correct:true},
            { text:"Fluffy", correct:false},
            { text:"Norbert", correct:false},
            { text:"Grawp", correct:false},
        ]
    },
    {
        question : "What type of creature is Dobby?",
        answers:[
            { text:"Goblin", correct:false},
            { text:"House-elf", correct:true},
            { text:"Centaur", correct:false},
            { text:"Troll", correct:false},
        ]
    },
    {
        question : "What form does Harry’s Patronus take?",
        answers:[
            { text:"Stag", correct:true},
            { text:"Otter", correct:false},
            { text:"Phoenix", correct:false},
            { text:"Wolf", correct:false},
        ]
    },
    {
        question : "Who kills Dumbledore?",
        answers:[
            { text:"Voldemort", correct:false},
            { text:"Bellatrix Lestrange", correct:false},
            { text:"Severus Snape", correct:true},
            { text:"Draco Malfoy", correct:false},
        ]
    },
    {
        question : "What object must be caught to end a Quidditch match?",
        answers:[
            { text:"Bludger", correct:false},
            { text:"Quaffle", correct:false},
            { text:"Golden Snitch", correct:true},
            { text:"Broomstick", correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-button");


let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();