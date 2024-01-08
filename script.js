document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answer');
    const resultContainer = document.getElementById('result');
    const progressContainer = document.getElementById('progress');
    const currentScoreDisplay = document.getElementById('currentScore');
    const highScoreDisplay = document.getElementById('highScore');
    const gameSetupDiv = document.getElementById('game-setup');
    const quizDiv = document.getElementById('quiz');
    const categorySelect = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const difficultySelect = document.getElementById('difficulty');
    const startButton = document.getElementById('start-btn');

    let currentQuestions = [];
    let score = 0;
    let questionIndex = 0;
    let highScore = parseInt(localStorage.getItem('highScoreTrivia') || 0);
    let questionStartTime;
    const baseScorePerQuestion = 1000;
    const penaltyPerSecond = 10;

    highScoreDisplay.innerText = `High Score: ${highScore}`;

    function fetchCategories() {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                data.trivia_categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option)
                    
                });
            })
    };
    
    function startGame() {
        const category = categorySelect.value;
        const amount = amountInput.value;
        const difficulty = difficultySelect.value;

        fetchQuestions(amount, category, difficulty);
        
        gameSetupDiv.style.display = 'noen';
        quizDiv.style.display = 'block';
    }

    function fetchQuestions(amount, category, difficulty) {
        let url = `https://opentdb.com/api.php?amount=${amount}`;

        if (category !== "all") url += `&category=${category}`;
        if (difficulty !== "any") url += `&difficulty=${difficulty}`;
        url += `&type=multiple`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                currentQuestions = data.results;
                questionIndex = 0;
                score = 0;
                displayQuestion();
            })
            .catch(error => alert('Error: ' + error));
    }

    function displayQuestion() {
        if (questionIndex < currentQuestions.length) {
            let currentQuestion = currentQuestions[questionIndex];
            questionContainer.innerHTML = decodeHTML(currentQuestion.question);
            
            displayAnswers(currentQuestion);
            updateProgress();
            questionStartTime = Date.now();
        } else {
            updateHighProgress();
            showResults();
        }
    }

    function displayAnswers(question) {
        answerContainer.innerHTML = '';
        const answers = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(answers);

        answers.forEach(answers => {
            const button = document.createElement('button')
            button.innerHTML = decodeHTML(answer);
            button.className = 'answer-btn';
            button.addEventListener('click', () => selectAnswer(button, question.correct_answer, answers));
            answerContainer.appendChild(button);
        })
    }

    function selectAnswer(selectedButton, correctAnswer, answers) {
        // TODO: complete
    }
})

