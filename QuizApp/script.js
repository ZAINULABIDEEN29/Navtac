document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Which language is primarily used for the logical part of a modern web application?",
            options: ["HTML", "CSS", "JavaScript", "SQL"],
            answer: 2
        },
        {
            question: "What does CSS stand for?",
            options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            answer: 1
        },
        {
            question: "Which HTTP method is typically used to retrieve data from a server?",
            options: ["POST", "PUT", "DELETE", "GET"],
            answer: 3
        },
        {
            question: "In React, what is used to pass data to a child component?",
            options: ["State", "Props", "Hooks", "Context"],
            answer: 1
        },
        {
            question: "Which of the following is a non-relational database?",
            options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
            answer: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const setupScreen = document.getElementById('setup-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionNumberSpan = document.getElementById('question-number');
    const progressFill = document.getElementById('progress-fill');
    const finalScoreSpan = document.getElementById('final-score');
    const feedbackText = document.getElementById('result-feedback');

    const startQuiz = () => {
        currentQuestionIndex = 0;
        score = 0;
        setupScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        loadQuestion();
    };

    const loadQuestion = () => {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        questionNumberSpan.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        optionsContainer.innerHTML = '';
        nextBtn.classList.add('hidden');
        selectedOption = null;

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => handleOptionSelection(index, btn));
            optionsContainer.appendChild(btn);
        });
    };

    const handleOptionSelection = (index, btn) => {
        if (selectedOption !== null) return;
        
        selectedOption = index;
        const correct = questions[currentQuestionIndex].answer;
        const allOptionBtns = optionsContainer.querySelectorAll('.option-btn');

        if (index === correct) {
            score++;
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
            allOptionBtns[correct].classList.add('correct');
        }

        allOptionBtns.forEach(b => b.disabled = true);
        nextBtn.classList.remove('hidden');
    };

    const handleNext = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    };

    const showResults = () => {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        finalScoreSpan.textContent = score;
        
        if (score === questions.length) {
            feedbackText.textContent = "Outstanding Performance! You demonstrate expert-level knowledge.";
        } else if (score >= questions.length * 0.7) {
            feedbackText.textContent = "Very Good. You have a solid grasp of the concepts.";
        } else {
            feedbackText.textContent = "Completed. Continue review to strengthen your expertise.";
        }
    };

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', handleNext);
    restartBtn.addEventListener('click', startQuiz);
});
