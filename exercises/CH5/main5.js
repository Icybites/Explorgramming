// ===== CHAPTER 5: MODULARITY USING FUNCTIONS — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is modular programming?",
        options: [
            "A programming style where all code is written in one long function",
            "A technique that separates a program into independent, interchangeable modules or functions",
            "A method of writing programs without using any functions",
            "A way to make programs run faster by combining all code together"
        ],
        correctAnswer: 1,
        explanation: "Modular programming is a software design technique that separates a program into independent, interchangeable modules or functions. Each module performs a specific task and can be developed, tested, and debugged independently."
    },

    // Q2 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The _______ statement serves two purposes: sending a value back to the caller and immediately exiting the function.",
        correctAnswer: "return",
        keywords: ["return"],
        explanation: "The return statement both sends a value back to the function caller and exits the function immediately. Any code after a return statement will never execute."
    },

    // Q3 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which header file would you include to use the sqrt() function?",
        options: [
            "#include &lt;stdio.h&gt",
            "#include &lt;stdlib.h&gt",
            "#include &lt;math.h&gt",
            "#include &lt;time.h&gt"
        ],
        correctAnswer: 2,
        explanation: "The sqrt() function for calculating square roots is part of the math library, so you need to include <math.h>. Other math functions include pow(), ceil(), floor(), sin(), cos(), and tan()."
    },

    // Q4 — Short Answer
    {
        type: "short-answer",
        question: "List three benefits of modular programming.",
        keywords: ["reusability", "readability", "debugging", "maintenance", "collaboration", "reading", "reusable", "maintain", "collab", "isolat", "isolated"],
        minKeywords: 3,
        explanation: "Key benefits include: (1) Code Reusability - write once, use multiple times; (2) Improved Readability - smaller functions are easier to understand; (3) Easier Debugging - isolate errors in specific functions; (4) Team Collaboration - different team members can work on different functions; (5) Easy Maintenance - update individual functions without rewriting entire program."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the difference between a function definition and a function call?",
        options: [
            "They are the same thing",
            "Definition is where you write the code; call is where you execute it",
            "Definition is where you execute; call is where you write the code",
            "Definition is for built-in functions; call is for user-defined functions"
        ],
        correctAnswer: 1,
        explanation: "The function definition is where you write the actual code that performs the task. The function call is where you execute/invoke that function to perform its task. Definition happens once; calls can happen many times."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "In C, arguments are passed by _______ meaning the function receives a copy of the data, not the original.",
        correctAnswer: "value",
        keywords: ["value", "values"],
        explanation: "C uses pass by value. When you pass arguments to a function, the function receives copies of the values. Changes made to parameters inside the function do NOT affect the original variables in the calling code."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of the following code?\n\nvoid modify(int x) {\n    x = x + 5;\n}\n\nint main() {\n    int num = 10;\n    modify(num);\n    printf(\"%d\", num);\n    return 0;\n}",
        options: [
            "15",
            "10",
            "5",
            "Compiler error"
        ],
        correctAnswer: 1,
        explanation: "Because C uses pass by value, modify() receives a copy of num (10). It modifies the copy to 15, but the original num in main remains 10. The output is 10."
    },

    // Q8 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ function is a function that does not return a value, indicated by the return type keyword _______.",
        correctAnswer: "void",
        keywords: ["void"],
        explanation: "A void function performs an action but does not return a value. It uses the void keyword as the return type and doesn't need a return statement (or can use 'return;' without a value)."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is a function prototype?",
        options: [
            "The actual implementation of the function with its body",
            "A declaration that tells the compiler about a function's existence before it's defined",
            "A special function that creates other functions",
            "The first function called in a program"
        ],
        correctAnswer: 1,
        explanation: "A function prototype (or declaration) tells the compiler about a function's name, return type, and parameter types before the function is actually defined. This allows functions to be defined in any order and called from anywhere."
    },

    // Q10 — Short Answer
    {
        type: "short-answer",
        question: "Explain the difference between local variables and global variables.",
        keywords: ["inside", "outside", "function", "accessible", "scope", "destroyed"],
        minKeywords: 3,
        explanation: "Local variables are declared inside a function and are only accessible within that function. They are created when the function is called and destroyed when it exits. Global variables are declared outside all functions and can be accessed from any function in the program. They exist throughout the entire program lifetime and are automatically initialized to 0 if not explicitly initialized."
    },

    // Q11 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which of the following correctly identifies the parts of a function header?",
        options: [
            "function-name(parameter-list) { return-value-type }",
            "return-value-type function-name(parameter-list)",
            "parameter-list return-value-type function-name",
            "function-name return-value-type(parameter-list)"
        ],
        correctAnswer: 1,
        explanation: "The function header (signature) follows this format: return-value-type function-name(parameter-list). For example: int add(int a, int b). The body follows in curly braces {}."
    },

    // Q12 — Fill in the Blank
    {
        type: "fill-blank",
        question: "Variables listed in the function definition that receive values are called _______.",
        correctAnswer: "parameters",
        keywords: ["parameters", "parameter"],
        altCorrectAnswers: ["arguments"],
        explanation: "This question has two blanks but the fill-in-blank format requires one answer. Parameters (formal parameters) are the variables listed in the function definition. Arguments (actual parameters) are the values passed when the function is called."
    },

    // Q13 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of this program?\n\nint global = 5;\n\nvoid change() {\n    int local = 10;\n    global = global + local;\n}\n\nint main() {\n    change();\n    printf(\"%d\", global);\n    return 0;\n}",
        options: [
            "5",
            "10",
            "15",
            "Compiler error"
        ],
        correctAnswer: 2,
        explanation: "global is a global variable accessible from change(). The function adds local (10) to global (5), making global = 15. The change is permanent because global is modified directly, not passed by value. Output: 15."
    },

    // Q14 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The _______ header file provides functions for general utilities including malloc(), rand(), and exit().",
        correctAnswer: "stdlib.h",
        keywords: ["stdlib.h", "stdlib"],
        explanation: "stdlib.h (Standard Library) provides utility functions like malloc() for memory allocation, rand() for random numbers, atoi() for string conversion, and exit() for program termination."
    },

    // Q15 — Short Answer
    {
        type: "short-answer",
        question: "What is the 'divide and conquer' approach in modular programming?",
        keywords: ["break", "complex", "smaller", "sub-problems", "functions", "combine", "large", "manageable", "sub problem", "sub-problems", "separate", "independent", "independently", "separates", "combined", "organized"],
        minKeywords: 3,
        explanation: "The divide and conquer approach breaks a large, complex problem into smaller, manageable sub-problems. Each sub-problem is solved independently by separate functions. Finally, all solutions are combined (integrated) to solve the original problem. This makes development easier and more organized."
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