document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question')
    const answerContainer = document.getElementById('answer')
    const resultContainer = document.getElementById('result')
    const progressContainer = document.getElementById('progress')
    const currentScoreDisplay = document.getElementById('currentScore')
    const highScoreDisplay = document.getElementById('highScore')
    const gameSetupDiv = document.getElementById('game-setup')
    const quizDiv = document.getElementById('quiz')
    const categorySelect = document.getElementById('category')
    const amountInput = document.getElementById('amount')
    const difficultySelect = document.getElementById('difficulty')
    const startButton = document.getElementById('start-btn')

    let currentQuestions = []
    let score = 0
    let questionIndex = 0
    let highScore = parseInt(localStorage.getItem('highScoreTrivia') || 0)
    let questionStartTime
    const baseScorePerQuestion = 1000
    const penaltyPerSecond = 10

    highScoreDisplay.innerText = `High Score:  ${highScore}`
})