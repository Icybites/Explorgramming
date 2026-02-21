// ===== CHAPTER 4: CONTROL STRUCTURES — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which of the following are the three fundamental types of control structures in C?",
        options: [
            "Sequence, Selection, Iteration",
            "If, Else, Switch",
            "For, While, Do-While",
            "Break, Continue, Return"
        ],
        correctAnswer: 0,
        explanation: "The three fundamental control structures are: Sequence (statements execute in order), Selection (decision-making with if, if-else, switch), and Iteration (loops with for, while, do-while)."
    },

    // Q2 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The _______ statement immediately exits a loop, transferring control to the first statement after the loop.",
        correctAnswer: "break",
        keywords: ["break"],
        explanation: "The break statement causes immediate termination of the loop. Execution continues with the first statement following the loop. It's also used in switch statements to exit a case."
    },

    // Q3 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of the following code?\n\nint i = 5;\nif (i = 10) {\n    printf(\"Hello\");\n} else {\n    printf(\"World\");\n}",
        options: [
            "World",
            "Hello",
            "HelloWorld",
            "Compilation error"
        ],
        correctAnswer: 1,
        explanation: "This is a common mistake! i = 10 is an assignment, not a comparison. In C, assignment returns the assigned value (10), which is non-zero (true). So the condition is always true, and 'Hello' prints. The correct comparison would be i == 10."
    },

    // Q4 — Short Answer
    {
        type: "short-answer",
        question: "Explain the difference between while and do-while loops.",
        keywords: ["condition", "before", "after", "once", "executes", "checked", "0", "false"],
        minKeywords: 3,
        explanation: "The key difference is when the condition is checked. In a while loop, the condition is checked BEFORE each iteration, so the loop body may execute 0 times if the condition is initially false. In a do-while loop, the condition is checked AFTER each iteration, so the loop body ALWAYS executes at least once, even if the condition is initially false."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which loop is best suited when you know in advance exactly how many times you want to repeat a block of code?",
        options: [
            "while loop",
            "do-while loop",
            "for loop",
            "if-else statement"
        ],
        correctAnswer: 2,
        explanation: "The for loop is ideal for counter-controlled repetition when you know the number of iterations in advance. It conveniently combines initialization, condition checking, and update in one line."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "In a switch statement, the _______ keyword is optional and executes only when no case matches the expression value.",
        correctAnswer: "default",
        keywords: ["default"],
        explanation: "The default case in a switch statement handles any values that don't match any of the specified case labels. It's like the else in an if-else ladder."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of this code?\n\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 2; j++) {\n        printf(\"%d\", i);\n    }\n}",
        options: [
            "123123",
            "111222",
            "112233",
            "123456"
        ],
        correctAnswer: 1,
        explanation: "For each outer loop iteration, the inner loop runs completely. i=1: inner runs twice → '11'; i=2: inner runs twice → '22'; i=3: inner runs twice → '33'. Combined output: '111222'."
    },

    // Q8 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ loop is a loop inside another loop, where the inner loop completes all its iterations for each iteration of the outer loop.",
        correctAnswer: "nested",
        keywords: ["nested"],
        explanation: "A nested loop is a loop within another loop. The inner loop executes completely for every single iteration of the outer loop. If outer runs M times and inner runs N times, total iterations = M × N."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What happens if you forget the break statement in a switch case?",
        options: [
            "The program crashes",
            "Execution 'falls through' to the next case",
            "The switch statement automatically exits",
            "The default case always executes"
        ],
        correctAnswer: 1,
        explanation: "Without a break statement, execution 'falls through' to the next case. This means code in subsequent cases will execute until a break is encountered or the switch ends. Sometimes this is intentional, but often it's a bug."
    },

    // Q10 — Short Answer
    {
        type: "short-answer",
        question: "Describe the three types of repetition structures based on how they control repetition.",
        keywords: ["counter-controlled", "sentinel-controlled", "event-controlled","counter controlled", "sentinel controlled", "event controlled", "fixed", "special value", "condition"],
        minKeywords: 3,
        explanation: "The three types are: (1) Counter-Controlled Repetition: loop repeats a fixed number of times using a counter variable. (2) Sentinel-Controlled Repetition: loop continues until a special value (sentinel) is encountered, like -1 or 'quit'. (3) Event-Controlled Repetition: loop continues until a specific event or condition occurs, like correct password entry or end of file."
    },

    // Q11 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What does the continue statement do in a loop?",
        options: [
            "Exits the loop immediately",
            "Skips the rest of the current iteration and jumps to the next iteration",
            "Restarts the loop from the beginning",
            "Terminates the program"
        ],
        correctAnswer: 1,
        explanation: "The continue statement skips the remaining code in the current iteration and jumps directly to the next iteration of the loop. In a for loop, it jumps to the update expression; in while/do-while, it jumps to the condition check."
    },

    // Q12 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ statement consists of only a semicolon and does nothing, but satisfies syntax requirements when a statement is needed.",
        correctAnswer: "null",
        keywords: ["null", "empty"],
        explanation: "A null statement (or empty statement) is just a semicolon ;. It performs no operation but can be useful in situations where syntax requires a statement but you don't want any action, like waiting loops."
    },

    // Q13 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which type of repetition is being used when a program continues to ask for input until the user enters a specific value like -1?",
        options: [
            "Counter-controlled repetition",
            "Sentinel-controlled repetition",
            "Event-controlled repetition",
            "Infinite repetition"
        ],
        correctAnswer: 1,
        explanation: "This is sentinel-controlled repetition. The sentinel is a special value (like -1, 0, or 'quit') that signals the end of input. The loop continues until this sentinel value is encountered."
    },

    // Q14 — Fill in the Blank
    {
        type: "fill-blank",
        question: "The _______ structure is the default flow of execution where statements are executed one after another in the order they appear.",
        correctAnswer: "sequence",
        keywords: ["sequence"],
        explanation: "The sequence structure is the simplest control structure. Statements execute in linear order, from top to bottom, without any branching or repetition."
    },

    // Q15 — Short Answer
    {
        type: "short-answer",
        question: "What is the purpose of selection statements in C? Name the three types.",
        keywords: ["if", "if-else", "switch", "decision", "condition", "choose", "if else"],
        minKeywords: 3,
        explanation: "Selection statements allow programs to make decisions and choose different execution paths based on conditions. The three types are: (1) if statement: executes code only if condition is true; (2) if-else statement: provides two paths (true and false); (3) switch statement: selects from multiple cases based on an expression's value."
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