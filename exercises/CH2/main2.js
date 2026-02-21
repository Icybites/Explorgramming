// ===== CHAPTER 2: ALGORITHMS — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is an algorithm in the context of computer programming?",
        options: [
            "A piece of hardware that executes instructions",
            "A list of step-by-step instructions for a computer to solve a problem",
            "A syntax error in a program",
            "The final output of a program"
        ],
        correctAnswer: 1,
        explanation: "An algorithm is a list of step-by-step instructions that a computer program follows to solve a problem. It's like a recipe for the computer to follow."
    },

    // Q2 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which of the following is NOT one of the three essential properties of a valid algorithm?",
        options: [
            "Well-Ordered",
            "Unambiguous",
            "Effectively Computable",
            "Visually Appealing"
        ],
        correctAnswer: 3,
        explanation: "The three essential properties are: Well-Ordered (steps in a clear sequence), Unambiguous (each step is clear and precise), and Effectively Computable (each step can be done in a finite amount of time). 'Visually Appealing' is not a requirement."
    },

    // Q3 — Fill in the Blank
    {
        type: "fill-blank",
        question: "In a flowchart, a _______ symbol (often a diamond) is used to represent a decision point with a yes/no question.",
        correctAnswer: "decision",
        keywords: ["decision"],
        explanation: "The diamond-shaped symbol in a flowchart is the decision symbol. It represents a point where the algorithm must choose a path based on the answer to a condition (e.g., yes/no or true/false)."
    },

    // Q4 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the primary purpose of using pseudocode before writing actual code?",
        options: [
            "To make the program run faster",
            "To focus on the logic of the algorithm without worrying about specific syntax rules",
            "To check for syntax errors in the program",
            "To directly execute the algorithm on the CPU"
        ],
        correctAnswer: 1,
        explanation: "Pseudocode is a planning tool. It allows you to focus on the logic of the algorithm using plain language, without getting bogged down by the strict syntax rules of a specific programming language like C or Java."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "In a flowchart, what do the arrows (flowlines) represent?",
        options: [
            "The data being processed",
            "The start or end of the program",
            "A calculation or assignment",
            "The direction of flow from one step to the next"
        ],
        correctAnswer: 3,
        explanation: "Arrows, or flowlines, show the sequence and direction of control flow. They connect the different symbols to indicate the order in which steps are executed."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "According to the pseudocode guidelines, you should write only one _______ per line.",
        correctAnswer: "statement",
        keywords: ["statement", "instruction", "statements", "instructions"],
        altCorrectAnswers: ["instruction", "dependency"],
        explanation: "The tips for writing pseudocode state to 'Write Only One Statement Per Line' and to 'Use Indentation to Show Dependency' (which statements belong inside a loop or condition)."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which flowchart symbol is used to represent an Input or Output operation, such as reading a number from the user or displaying a result?",
        options: [
            "Rectangle",
            "Oval",
            "Parallelogram",
            "Diamond"
        ],
        correctAnswer: 2,
        explanation: "The parallelogram is the input/output symbol. It's used for actions like INPUT, OUTPUT, PRINT, or READ, where data enters or leaves the system."
    },

    // Q8 — Short Answer
    {
        type: "short-answer",
        question: "List three benefits or purposes of using pseudocode and flowcharts in programming.",
        keywords: ["visualization", "planning", "communication", "debugging", "documentation", "readability", "clarity", "reading", "reference", "references"],
        minKeywords: 3,
        explanation: "They serve many purposes including: 1) Visualization of Logic, 2) Planning and Design before coding, 3) Communication tool for teams, 4) Ease of Debugging and Testing, and 5) Documentation for future reference."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Look at this algorithm step: 'Add some amount to the number'. Why is this NOT a valid step in a well-defined algorithm?",
        options: [
            "It is not effectively computable",
            "It is ambiguous (unclear meaning)",
            "It is not in the correct order",
            "It uses a keyword that isn't capitalized"
        ],
        correctAnswer: 1,
        explanation: "The step is ambiguous. An algorithm requires each instruction to be clear and precise. 'Some amount' is vague; the instruction must be specific, like 'Add 5 to the number'."
    },

    // Q10 — Fill in the Blank
    {
        type: "short-answer",
        question: "The property of an algorithm that ensures its steps can be completed in a finite amount of time and produce a result is known as being _______.",
        keywords: ["effectively computable", "computable"],
        minKeywords: 1,
        explanation: "Effectively computable means that each step is achievable and the algorithm will eventually terminate and produce a result. An algorithm cannot run forever."
    }
];

// =================================================
// ===== STATE — do not modify below this line =====
// =================================================

const state = {
    currentQuestionIndex: 0,
    userAnswers: [],
    questionChecked: [],
    score: 0
};

document.addEventListener('DOMContentLoaded', () => {
    initNotesScreen();
});

function initNotesScreen() {
    const startBtn = document.getElementById('startExerciseBtn');
    startBtn.addEventListener('click', () => {
        document.getElementById('notesScreen').classList.add('hidden');
        document.getElementById('exerciseScreen').classList.add('active');
        initExercise();
    });
}

function initExercise() {
    state.userAnswers = new Array(exerciseData.length).fill(null);
    state.questionChecked = new Array(exerciseData.length).fill(false);
    state.score = 0;

    document.getElementById('totalQuestions').textContent = exerciseData.length;
    renderQuestions();
    showQuestion(0);
    initNavigation();
}

function splitQuestion(question) {
    const parts = question.split('\n\n');
    return {
        text: parts[0],
        code: parts.length > 1 ? parts.slice(1).join('\n\n') : null
    };
}

function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    exerciseData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        const { text, code } = splitQuestion(q.question);

        // Base structure (HTML only)
        let questionHTML = `
            <div class="question-text">
                ${index + 1}. ${text}
            </div>
        `;

        // Code block placeholder
        if (code) {
            questionHTML += `<pre class="exercise-code-block"></pre>`;
        }

        // Image
        if (q.image) {
            questionHTML += `
                <div class="question-image">
                    <img src="${q.image}" alt="Question image">
                </div>`;
        }

        // Multiple choice
        if (q.type === 'multiple-choice') {
            questionHTML += '<div class="options">';
            q.options.forEach((option, optIndex) => {
                questionHTML += `
                    <div class="option" data-question="${index}" data-option="${optIndex}">
                        <div class="option-label">${String.fromCharCode(65 + optIndex)}</div>
                        <div class="option-text">${option}</div>
                    </div>`;
            });
            questionHTML += '</div>';

            questionHTML += `
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;

        // Fill blank
        } else if (q.type === 'fill-blank') {
            questionHTML += `
                <input type="text" class="text-input" data-question="${index}"
                    placeholder="Type your answer here..." autocomplete="off">
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;

        // Short answer
        } else if (q.type === 'short-answer') {
            questionHTML += `
                <textarea class="short-answer" data-question="${index}"
                    placeholder="Type your answer here..." rows="5"></textarea>
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;
        }

        // Feedback box
        questionHTML += `<div class="feedback-box" id="feedback-${index}"></div>`;

        // Insert HTML structure
        questionDiv.innerHTML = questionHTML;

        // 🔑 Insert code safely (THIS makes \n work)
        if (code) {
            questionDiv.querySelector('.exercise-code-block').textContent = code;
        }

        container.appendChild(questionDiv);
    });

    addAnswerListeners();
}

function addAnswerListeners() {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const questionIndex = parseInt(this.dataset.question);
            if (state.questionChecked[questionIndex]) return;

            document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            state.userAnswers[questionIndex] = parseInt(this.dataset.option);
        });
    });

    document.querySelectorAll('.text-input').forEach(input => {
        input.addEventListener('input', function () {
            state.userAnswers[parseInt(this.dataset.question)] = this.value.trim();
        });
    });

    document.querySelectorAll('.short-answer').forEach(input => {
        input.addEventListener('input', function () {
            state.userAnswers[parseInt(this.dataset.question)] = this.value.trim();
        });
    });

    document.querySelectorAll('.check-answer-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            checkAnswer(parseInt(this.dataset.question));
        });
    });
}

function checkAnswer(questionIndex) {
    const question = exerciseData[questionIndex];
    const userAnswer = state.userAnswers[questionIndex];
    const feedback = document.getElementById(`feedback-${questionIndex}`);
    const checkBtn = document.querySelector(`.check-answer-btn[data-question="${questionIndex}"]`);

    if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
        feedback.className = 'feedback-box incorrect show';
        feedback.innerHTML = `
            <div class="feedback-header">
                <i class="fas fa-exclamation-circle"></i>
                Please provide an answer first.
            </div>`;
        return;
    }

    let isCorrect = false;
    let feedbackHTML = '';

    if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correctAnswer;

        document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach((opt, idx) => {
            opt.classList.add('disabled');
            if (idx === question.correctAnswer) opt.classList.add('correct');
            if (idx === userAnswer && !isCorrect) opt.classList.add('incorrect');
        });

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Correct Answer:</strong> ${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }

    } else if (question.type === 'fill-blank') {
        const normalizedAnswer = userAnswer.toLowerCase().trim();
        const keywords = question.keywords || [question.correctAnswer];
        isCorrect = keywords.some(kw => normalizedAnswer === kw.toLowerCase().trim());

        const input = document.querySelector(`.text-input[data-question="${questionIndex}"]`);
        input.disabled = true;
        input.style.borderColor = isCorrect ? '#10b981' : '#ef4444';

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Correct Answer:</strong> ${question.correctAnswer}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }

    } else if (question.type === 'short-answer') {
        const normalizedAnswer = userAnswer.toLowerCase();
        const foundKeywords = question.keywords.filter(kw =>
            normalizedAnswer.includes(kw.toLowerCase())
        );
        isCorrect = foundKeywords.length >= question.minKeywords;

        const textarea = document.querySelector(`.short-answer[data-question="${questionIndex}"]`);
        textarea.disabled = true;
        textarea.style.borderColor = isCorrect ? '#10b981' : '#ef4444';

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Keywords Found:</strong> ${foundKeywords.join(', ')}
                </div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect or Incomplete</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Expected:</strong> Any ${question.minKeywords} of: ${question.keywords.join(', ')}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }
    }

    feedback.innerHTML = feedbackHTML;
    state.questionChecked[questionIndex] = true;
    checkBtn.disabled = true;
    if (isCorrect) state.score++;
}

function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');

    state.currentQuestionIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;

    const progress = ((index + 1) / exerciseData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    updateNavigationButtons();
}

function initNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) showQuestion(state.currentQuestionIndex - 1);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex < exerciseData.length - 1) showQuestion(state.currentQuestionIndex + 1);
    });
    document.getElementById('submitBtn').addEventListener('click', submitExercise);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = state.currentQuestionIndex === 0;

    if (state.currentQuestionIndex === exerciseData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function submitExercise() {
    document.getElementById('exerciseScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');

    document.getElementById('scoreNumber').textContent = state.score;
    document.getElementById('scoreTotalDisplay').textContent = exerciseData.length;

    const percentage = Math.round((state.score / exerciseData.length) * 100);
    document.getElementById('percentageScore').textContent = `${percentage}%`;

    const statusText = document.getElementById('statusText');
    if (percentage === 100) {
        statusText.textContent = 'Perfect!';
        statusText.style.color = '#10b981';
    } else if (percentage >= 70) {
        statusText.textContent = 'Great Job!';
        statusText.style.color = '#10b981';
    } else if (percentage >= 50) {
        statusText.textContent = 'Keep Practicing!';
        statusText.style.color = '#f59e0b';
    } else {
        statusText.textContent = 'Review Notes';
        statusText.style.color = '#ef4444';
    }
}