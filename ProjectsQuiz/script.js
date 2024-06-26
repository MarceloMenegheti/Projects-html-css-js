const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answer: [
            {  Text: "Tubarão",correct: false},
            {  Text: "Baleia-Azul",correct: true},
            {  Text: "Elefante",correct: false},
            {  Text: "Girafa",correct: false},
        ]
    },
    {
        question: "Qual é o menor continente do mundo?",
        answer: [
            {  Text: "Ásia",correct: false},
            {  Text: "África",correct: false},
            {  Text: "Europa",correct: false},
            {  Text: "Oceania",correct: true},
        ] 
    },
    {
        question: "Qual é o menor país do mundo?",
        answer: [
            {  Text: "Nepal",correct: false},
            {  Text: "Sri Lanka",correct: false},
            {  Text: "Vaticano",correct: true},
            {  Text: "Butão",correct: false},
        ]
    },
    {
        question: "Qual é o maior deserto do mundo?",
        answer: [
            {  Text: "Saara",correct: true},
            {  Text: "Atacama",correct: false},
            {  Text: "Gobi",correct: false},
            {  Text: "Antártida",correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore(){
    resetState();
    questionElement.innerHTML = `Sua pontuação ${score}  de ${questions.length}!`;
    nextButton.innerHTML = "jogar de novo";
    nextButton.style.display = "block";
};

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        starQuiz();
    }
});

starQuiz();