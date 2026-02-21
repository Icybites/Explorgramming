// ===== CHAPTER 3: FUNDAMENTAL OF C — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which of the following is a valid variable name in C?",
        options: [
            "2total",
            "my-age",
            "_counter",
            "int"
        ],
        correctAnswer: 2,
        explanation: "_counter is valid because variable names can start with a letter or underscore. '2total' starts with a digit (invalid), 'my-age' contains a hyphen (invalid), and 'int' is a reserved keyword (invalid)."
    },

    // Q2 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The _______ operator returns the remainder after division, for example, 17 % 5 = 2.",
        correctAnswer: "modulus",
        keywords: ["modulus", "%", "modulo"],
        explanation: "The modulus operator (%) returns the remainder after integer division. 17 divided by 5 is 3 with a remainder of 2."
    },

    // Q3 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the result of the expression: 5 + 3 * 4 - 2?",
        options: [
            "30",
            "15",
            "18",
            "21"
        ],
        correctAnswer: 1,
        explanation: "According to operator precedence, multiplication (*) is evaluated first: 3 * 4 = 12. Then addition and subtraction are evaluated left to right: 5 + 12 = 17, then 17 - 2 = 15."
    },

    // Q4 — Short Answer
    {
        type: "short-answer",
        question: "List three rules for naming variables in C.",
        keywords: ["letter", "underscore", "digit", "case-sensitive", "keyword", "spaces", "underscores", "no spaces", "no reserved keywords"],
        minKeywords: 3,
        explanation: "Key rules: (1) Must start with a letter or underscore, (2) Can contain letters, digits, and underscores after the first character, (3) Cannot start with a digit, (4) Cannot use reserved keywords (like int, if, while), (5) Cannot contain spaces or special characters (except underscore), (6) Variable names are case-sensitive (age, Age, AGE are different)."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the difference between = and == in C?",
        options: [
            "They are the same and can be used interchangeably",
            "= is for comparison, == is for assignment",
            "= is for assignment, == is for comparison",
            "= is for logical operations, == is for arithmetic operations"
        ],
        correctAnswer: 2,
        explanation: "= is the assignment operator (assigns a value to a variable). == is the equality comparison operator (checks if two values are equal). A common mistake is using = when you mean == in conditions."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "In C, the _______ operator (++) increases a variable's value by 1.",
        correctAnswer: "increment",
        keywords: ["increment"],
        explanation: "The increment operator (++) adds 1 to a variable, and the decrement operator (--) subtracts 1 from a variable."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of this code snippet?\n\nint x = 5;\nint y = x++;\nprintf(\"%d %d\", x, y);",
        options: [
            "5 5",
            "6 5",
            "5 6",
            "6 6"
        ],
        correctAnswer: 1,
        explanation: "This is postfix increment (x++). The current value of x (5) is assigned to y first, then x is incremented to 6. So output is '6 5'."
    },

    // Q8 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The escape sequence _______ inserts a horizontal tab.",
        correctAnswer: "\t",
        keywords: ["\\t"],
        altCorrectAnswers: ["\\t"],
        explanation: "\\t is the tab escape sequence that inserts a horizontal tab space."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which logical operator returns true (1) only when both operands are true?",
        options: [
            "|| (OR)",
            "&& (AND)",
            "! (NOT)",
            "== (EQUAL)"
        ],
        correctAnswer: 1,
        explanation: "The logical AND operator (&&) returns true only if both operands are true. For OR (||), it returns true if at least one operand is true. NOT (!) inverts the boolean value."
    },

    // Q10 — Short Answer
    {
        type: "short-answer",
        question: "What is the difference between prefix (++x) and postfix (x++) increment operators?",
        keywords: ["before", "after", "use", "increment", "first", "then", "current", "after", "afterwards", "afterward"],
        minKeywords: 3,
        explanation: "In prefix (++x), the variable is incremented FIRST, then its new value is used in the expression. In postfix (x++), the variable's current value is used in the expression FIRST, then it is incremented afterwards."
    },

    // Q11 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What does the compound assignment operator x += 5 do?",
        options: [
            "Adds 5 to x and assigns the result to x",
            "Checks if x equals 5",
            "Assigns 5 to x",
            "Multiplies x by 5"
        ],
        correctAnswer: 0,
        explanation: "x += 5 is a shorthand for x = x + 5. It adds 5 to the current value of x and assigns the result back to x."
    },

    // Q12 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the result of (float) 7 / 2?",
        options: [
            "3",
            "3.0",
            "3.5",
            "1"
        ],
        correctAnswer: 2,
        explanation: "The explicit cast (float) converts 7 to a float (7.0). Then 7.0 / 2 is performed. Since one operand is float, the integer 2 is implicitly converted to float, resulting in 3.5. Without the cast, 7 / 2 would be 3 (integer division)."
    },

    // Q13 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ is a named storage location in memory that holds a value which can change during program execution.",
        correctAnswer: "variable",
        keywords: ["variable", "variables"],
        altCorrectAnswers: ["variables"],
        explanation: "A variable is a named memory location that stores a value. Unlike constants, the value stored in a variable can be changed while the program runs."
    },

    // Q14 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the purpose of the & (address-of) operator in scanf()?",
        options: [
            "It performs a bitwise AND operation",
            "It tells scanf to expect a string input",
            "It provides the memory address where the input value should be stored",
            "It indicates the end of input"
        ],
        correctAnswer: 2,
        explanation: "In scanf(), the & operator provides the memory address of the variable. This tells scanf where in memory to store the input value. Without it, scanf wouldn't know where to put the data."
    },

    // Q15 — Short Answer
    {
        type: "short-answer",
        question: "List four common escape sequences in C and describe what each does.",
        keywords: ["\\n", "newline", "\\t", "tab", "\\\\", "backslash", "\\\"", "double quote"],
        minKeywords: 4,
        explanation: "Common escape sequences: \\n - newline (moves to next line); \\t - tab (inserts horizontal tab); \\\\ - prints a single backslash; \\\" - prints a double quote; \\' - prints a single quote; \\a - alert (beep); \\r - carriage return; \\b - backspace."
    },

    // Q16 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What does the format specifier %10.2f do?",
        options: [
            "Prints a float with 10 digits total and 2 decimal places, right-aligned",
            "Prints a float with 2 digits total and 10 decimal places",
            "Prints an integer with 10 digits",
            "Prints a string with maximum 10 characters"
        ],
        correctAnswer: 0,
        explanation: "%10.2f specifies: minimum field width of 10 characters, with 2 digits after the decimal point. The number is right-aligned by default within the 10-character field."
    },

    // Q17 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The #include <stdio.h> directive includes the _______ library, which provides functions like printf() and scanf().",
        correctAnswer: "standard input output",
        keywords: ["standard input output", "stdio", "input/output"],
        explanation: "stdio.h stands for Standard Input Output header. It contains declarations for functions like printf() (output) and scanf() (input) that are essential for most C programs."
    },

    // Q18 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of this code?\n\nint a = 5, b = 2;\nfloat result = a / b;\nprintf(\"%.1f\", result);",
        options: [
            "2.5",
            "2.0",
            "2",
            "2.5 (but with a warning)"
        ],
        correctAnswer: 1,
        explanation: "This performs integer division first because both a and b are integers. 5 / 2 = 2 (integer division truncates). The result (2) is then converted to float (2.0) when assigned to the float variable result. The output is 2.0, not 2.5."
    },

    // Q19 — Short Answer
    {
        type: "short-answer",
        question: "What are comments in C and why are they important? Name the two types of comments.",
        keywords: ["//", "single-line", "/* */", "multi-line", "explain", "documentation", "readability", "not read", "ignore", "ignored", "singe line", "multi line"],
        minKeywords: 2,
        explanation: "Comments are notes in the code that are ignored by the compiler. They're important for: explaining complex logic, documenting code for others (or yourself), temporarily disabling code, and improving code readability. The two types are: // for single-line comments and /* */ for multi-line comments."
    },

    // Q20 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which of the following correctly declares and initializes multiple variables in one statement?",
        options: [
            "int a = 5, b = 10, c = 15;",
            "int a, b, c = 5, 10, 15;",
            "int a = 5; b = 10; c = 15;",
            "int a, b, c = 5; =10; =15;"
        ],
        correctAnswer: 0,
        explanation: "The correct syntax is: int a = 5, b = 10, c = 15; This declares three integer variables and initializes each with a value in one line."
    },

    // Q21 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the correct syntax for defining a constant in C?",
        options: [
            "constant int MAX = 100;",
            "#define PI 3.14159",
            "const float PI = 3.14159;",
            "Both B and C are correct"
        ],
        correctAnswer: 3,
        explanation: "Both methods are valid: #define PI 3.14159 (preprocessor directive, no type, no semicolon) and const float PI = 3.14159; (typed constant using const keyword). Both create values that cannot be changed during program execution."
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