// ===== QUIZ CONFIGURATION =====

// PASSWORD FOR THIS CHECKPOINT (change for each checkpoint)
const CHECKPOINT_PASSWORD = "ucop";

// QUIZ QUESTIONS (easily customizable)
const quizData = [
    // Question 1: Multiple Choice
    {
        type: "multiple-choice",
        question: "Bilakah Explorgramming mula dibina?",
        options: [
            "Tahun 1990",
            "Tahun 2025",
            "Semalam",
            "Tahun 2026"
        ],
        correctAnswer: 1
    },
    
    // Question 2: Fill in the Blank (Single)
    {
        type: "fill-blank",
        question: "Nama bagi pengasas Explorgramming ialah _______.",
        correctAnswer: "Yusuf",
        keywords: ["Yusuf", "yusuf"]
    },
    
    // Question 3: Multiple Fill in the Blank
    {
        type: "multiple-fill-blank",
        question: "Kucing biasanya tidur antara _____ hingga _____ jam sehari.",
        blanks: [
            {
                correctAnswer: "12",
                keywords: ["12", "dua belas", "twelve"]
            },
            {
                correctAnswer: "16",
                keywords: ["16", "enam belas", "sixteen"]
            }
        ]
    },
    
    // Question 4: Multi-Attempt Code Question (5 marks max)
    {
        type: "multi-attempt",
        question: "Write C statements to declare an integer variable named score with value 10, then print it using printf.\n\n// Fill in the two statements below:",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Statement 1",
                placeholder: "e.g.  int score = 10;",
                // correctAnswer is the canonical answer shown when out of attempts
                correctAnswer: "int score = 10;",
                // tokens: each token must appear in the student's answer (order-aware diff)
                tokens: ["int", "score", "=", "10", ";"]
            },
            {
                label: "Statement 2",
                placeholder: "e.g.  printf(...);",
                correctAnswer: "printf('%d', score);",
                tokens: ["printf", "(", "'%d'", ",", "score", ")", ";"]
            }
        ]
    },
    
    // Question 5: Short Answer
    {
        type: "short-answer",
        question: "Senaraikan DUA fungsi misai pada kucing.",
        keywords: ["ruang", "pergerakan", "getaran", "memburu", "mengukur"],
        minKeywords: 2
    },
    
    // Question 6: Multiple Choice
    {
        type: "multiple-choice",
        question: "Kucing mempunyai _______ kaki, _______ ekor, dan _______ pasang telinga.",
        options: [
            "2, 4, 1",
            "4, 2, 1",
            "4, 1, 2",
            "2, 1, 4"
        ],
        correctAnswer: 2
    },
    
    // Question 7: Another Multi-Attempt Example
    {
        type: "multi-attempt",
        question: "Anak kucing yang baru lahir biasanya _______ dan belum boleh _______ dengan kakinya",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Pancaindra",
                placeholder: "Answer 1",
                keywords: ["buta"]
            },
            {
                label: "Perbuatan",
                placeholder: "Answer 2",
                keywords: ["berjalan"]
            }
        ]
    },

    // Question 8: Multiple Choice
    {
        type: "multiple-choice",
        question: "Apakah deria yang paling kuat pada kucing?",
        options: [
            "Penglihatan",
            "Pendengaran",
            "Sentuhan",
            "Rasa"
        ],
        correctAnswer: 1
    },

    // Question 9: Fill in the Blank (Single)
    {
        type: "fill-blank",
        question: "Kucing tergolong dalam kumpulan haiwan _______.",
        correctAnswer: "Mamalia",
        keywords: ["mamalia", "Mamalia"]
    },

    // Question 10: Multiple Choice
    {
        type: "multiple-choice",
        question: "Apakah baka kucing kesukaan pengasas Explorgramming?",
        options: [
            "Ragdoll",
            "Maine Coon",
            "Bengal",
            "Siamese"
        ],
        correctAnswer: 3
    },
];

// ===== STATE MANAGEMENT =====
const state = {
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    timerInterval: null,
    score: 0,
    questionAttempts: {},  // Track attempt count per question
    questionMarks: {},     // Track current marks per question
    questionSolved: {}     // Track if question is solved
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initPasswordScreen();
});

// ===== PASSWORD SCREEN =====
function initPasswordScreen() {
    const unlockBtn = document.getElementById('unlockBtn');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
    unlockBtn.addEventListener('click', checkPassword);

    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === CHECKPOINT_PASSWORD) {
            document.getElementById('passwordScreen').classList.add('hidden');
            document.getElementById('quizScreen').classList.add('active');
            initQuiz();
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            passwordInput.focus();
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => { passwordInput.style.animation = ''; }, 500);
        }
    }
}

// Shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }

    /* ===== MULTI-ATTEMPT HISTORY STYLES ===== */
    .attempt-history {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
    }

    .attempt-history-item {
        border-radius: 12px;
        padding: 1rem 1.25rem;
        border: 2px solid #e2e8f0;
        background: #f8fafc;
    }

    .attempt-history-item.has-error {
        border-color: #fca5a5;
        background: #fff5f5;
    }

    .attempt-history-label {
        font-size: 0.8125rem;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
    }

    .attempt-history-fields {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .attempt-history-field {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9375rem;
    }

    .attempt-history-field .field-name {
        font-weight: 600;
        color: #475569;
        min-width: 120px;
    }

    .attempt-history-field .field-value {
        font-family: Consolas, monospace;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
        flex: 1;
    }

    .attempt-history-field.correct .field-value {
        background: #dcfce7;
        color: #166534;
        border: 1px solid #86efac;
    }

    .attempt-history-field.incorrect .field-value {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }

    .attempt-history-field .field-icon {
        font-size: 1rem;
        flex-shrink: 0;
    }

    .attempt-history-field.correct .field-icon { color: #16a34a; }
    .attempt-history-field.incorrect .field-icon { color: #dc2626; }

    .attempt-hint {
        margin-top: 0.75rem;
        font-size: 0.875rem;
        color: #64748b;
        font-style: italic;
    }

    /* New attempt section */
    .new-attempt-section {
        border-top: 2px dashed #e2e8f0;
        padding-top: 1.25rem;
        margin-top: 0.5rem;
    }

    .new-attempt-label {
        font-size: 0.875rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Pre-filled correct fields in new attempt */
    .attempt-input.field-correct {
        background: #dcfce7 !important;
        border-color: #86efac !important;
        color: #166534 !important;
        cursor: not-allowed;
    }

    /* Solved state */
    .multi-attempt-container.solved .new-attempt-section {
        display: none;
    }

    .marks-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        font-size: 0.875rem;
        font-weight: 700;
    }

    .marks-badge.marks-full { background: #dcfce7; color: #166534; }
    .marks-badge.marks-high { background: #d1fae5; color: #065f46; }
    .marks-badge.marks-mid  { background: #fef9c3; color: #854d0e; }
    .marks-badge.marks-low  { background: #ffedd5; color: #9a3412; }
    .marks-badge.marks-zero { background: #fee2e2; color: #991b1b; }

    /* ===== PARTIAL FIELD STATE ===== */
    .attempt-history-field.partial .field-value {
        background: #fef9c3;
        color: #854d0e;
        border: 1px solid #fde047;
    }

    .attempt-history-field.partial .field-icon { color: #d97706; }

    .partial-tag {
        font-size: 0.75rem;
        font-weight: 700;
        color: #92400e;
        background: #fef3c7;
        border: 1px solid #fcd34d;
        border-radius: 100px;
        padding: 0.15rem 0.6rem;
        white-space: nowrap;
    }

    .attempt-input.field-partial {
        background: #fffbeb !important;
        border-color: #fcd34d !important;
        color: #92400e !important;
    }


`;
document.head.appendChild(style);

// ===== QUIZ INITIALIZATION =====
function initQuiz() {
    state.userAnswers = new Array(quizData.length).fill(null);
    
    quizData.forEach((q, index) => {
        if (q.type === 'multi-attempt') {
            state.questionAttempts[index] = 0;
            state.questionMarks[index] = q.maxMarks;
            state.questionSolved[index] = false;
        } else {
            state.questionMarks[index] = 1;
        }
    });
    
    document.getElementById('totalQuestions').textContent = quizData.length;
    renderQuestions();
    showQuestion(0);
    startTimer();
    initNavigation();
}

// ===== RENDER QUESTIONS =====
function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        const marksText = q.type === 'multi-attempt'
            ? `(${q.maxMarks} marks)`
            : '(1 mark)';

        // Split question into label text and optional embedded code.
        // If q.question contains \n\n, everything before it is the readable sentence
        // and everything after is treated as a code snippet to render in a <pre> block.
        const doubleNewlineIdx = q.question.indexOf('\n\n');
        const questionLabel = doubleNewlineIdx !== -1
            ? q.question.slice(0, doubleNewlineIdx)
            : q.question;
        const embeddedCode = doubleNewlineIdx !== -1
            ? q.question.slice(doubleNewlineIdx + 2)
            : null;

        let questionHTML = `
            <div class="question-text">
                ${index + 1}. ${questionLabel} <span style="color:#64748b;font-weight:500;">${marksText}</span>
            </div>
        `;

        // Render a code block if the question embeds code (via \n\n separator) or has an explicit q.code property
        if (embeddedCode || q.code) {
            questionHTML += `<pre class="question-code" id="code-${index}"></pre>`;
        }

        if (q.image) {
            questionHTML += `
                <div class="question-image">
                    <img src="${q.image}" alt="Question image">
                </div>
            `;
        }

        if (q.type === 'multiple-choice') {
            questionHTML += '<div class="options">';
            q.options.forEach((option, optIndex) => {
                questionHTML += `
                    <div class="option" data-question="${index}" data-option="${optIndex}">
                        <div class="option-label">${String.fromCharCode(65 + optIndex)}</div>
                        <div class="option-text">${option}</div>
                    </div>
                `;
            });
            questionHTML += '</div>';

        } else if (q.type === 'fill-blank') {
            questionHTML += `
                <input type="text" class="text-input" data-question="${index}"
                    placeholder="Type your answer here..." autocomplete="off">
            `;

        } else if (q.type === 'multiple-fill-blank') {
            questionHTML += '<div class="multiple-blanks">';
            q.blanks.forEach((_, blankIndex) => {
                questionHTML += `
                    <div class="blank-item">
                        <label class="blank-label">Blank ${blankIndex + 1}:</label>
                        <input type="text" class="text-input blank-input"
                            data-question="${index}" data-blank="${blankIndex}"
                            placeholder="Fill in blank ${blankIndex + 1}..." autocomplete="off">
                    </div>
                `;
            });
            questionHTML += '</div>';

        } else if (q.type === 'multi-attempt') {
            // Render the multi-attempt container with:
            // - attempt-history (populated dynamically)
            // - new-attempt-section (the current input fields)
            questionHTML += `
                <div class="multi-attempt-container" id="ma-container-${index}">
                    <div class="attempt-info">
                        <span class="attempts-remaining">
                            <i class="fas fa-redo"></i>
                            Attempts: <strong><span id="attempts-${index}">0</span>/${q.maxAttempts}</strong>
                        </span>
                        <span class="current-marks">
                            <i class="fas fa-star"></i>
                            Current Marks: <strong><span id="marks-${index}">${q.maxMarks}</span>/${q.maxMarks}</strong>
                        </span>
                    </div>

                    <!-- History of past attempts -->
                    <div class="attempt-history" id="history-${index}"></div>

                    <!-- Active input section -->
                    <div class="new-attempt-section" id="new-attempt-${index}">
                        <div class="new-attempt-label">
                            <i class="fas fa-pencil-alt"></i>
                            <span id="attempt-label-text-${index}">Attempt 1</span>
                        </div>
                        <div class="multi-attempt-fields" id="fields-${index}">
            `;

            q.fields.forEach((field, fieldIndex) => {
                questionHTML += `
                    <div class="attempt-field">
                        <label class="field-label">${field.label}:</label>
                        <input type="text" class="text-input attempt-input"
                            data-question="${index}" data-field="${fieldIndex}"
                            placeholder="${field.placeholder || 'Type your answer...'}"
                            autocomplete="off">
                    </div>
                `;
            });

            questionHTML += `
                        </div>
                        <button class="btn btn-check" data-question="${index}" id="check-btn-${index}">
                            <i class="fas fa-check"></i>
                            Check Answer
                        </button>
                        <div class="attempt-feedback" id="feedback-${index}"></div>
                    </div>
                </div>
            `;

        } else if (q.type === 'short-answer') {
            questionHTML += `
                <textarea class="short-answer" data-question="${index}"
                    placeholder="Type your answer here..." rows="5"></textarea>
            `;
        }

        questionDiv.innerHTML = questionHTML;

        // Inject code text safely via textContent (preserves formatting, prevents XSS)
        if (embeddedCode || q.code) {
            const codeBlock = questionDiv.querySelector(`#code-${index}`);
            if (codeBlock) codeBlock.textContent = embeddedCode || q.code;
        }

        container.appendChild(questionDiv);
    });

    addAnswerListeners();
}

// ===== ADD ANSWER LISTENERS =====
function addAnswerListeners() {
    // Multiple choice
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const questionIndex = parseInt(option.dataset.question);
            const optionIndex = parseInt(option.dataset.option);
            
            document.querySelectorAll(`.option[data-question="${questionIndex}"]`)
                .forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            state.userAnswers[questionIndex] = optionIndex;
        });
    });

    // Fill blank
    document.querySelectorAll('.text-input:not(.blank-input):not(.attempt-input)').forEach(input => {
        input.addEventListener('input', () => {
            const questionIndex = parseInt(input.dataset.question);
            state.userAnswers[questionIndex] = input.value;
        });
    });

    // Multiple fill blank
    document.querySelectorAll('.blank-input').forEach(input => {
        input.addEventListener('input', () => {
            const questionIndex = parseInt(input.dataset.question);
            const blankIndex = parseInt(input.dataset.blank);
            
            if (!Array.isArray(state.userAnswers[questionIndex])) {
                state.userAnswers[questionIndex] = new Array(quizData[questionIndex].blanks.length).fill('');
            }
            state.userAnswers[questionIndex][blankIndex] = input.value;
        });
    });

    // Short answer
    document.querySelectorAll('.short-answer').forEach(textarea => {
        textarea.addEventListener('input', () => {
            const questionIndex = parseInt(textarea.dataset.question);
            state.userAnswers[questionIndex] = textarea.value;
        });
    });

    // Multi-attempt check buttons
    document.querySelectorAll('.btn-check').forEach(btn => {
        btn.addEventListener('click', () => {
            const questionIndex = parseInt(btn.dataset.question);
            checkMultiAttemptAnswer(questionIndex);
        });
    });
}

// ===== CHECK MULTI-ATTEMPT ANSWER =====

/**
 * Tokenises a string into meaningful chunks so we can do a
 * character/token-level diff between the student's answer and the
 * expected tokens list.
 *
 * Splits on whitespace but keeps every non-space run as one token,
 * AND individually splits common punctuation so  "printf(...);"
 * becomes ["printf", "(", "...", ")", ";"] etc.
 */
function tokenise(str) {
    const tokens = [];
    // Regex: match single-quoted strings, double-quoted strings, identifiers/numbers, or individual punctuation
    const re = /'[^']*'|"[^"]*"|[A-Za-z0-9_%]+|[^A-Za-z0-9_\s]/g;
    let m;
    while ((m = re.exec(str.trim())) !== null) {
        tokens.push(m[0]);
    }
    return tokens;
}

/**
 * Given the student's raw answer string and the expected tokens array,
 * returns an array of objects:
 *   { token, found: true|false }
 * representing each expected token and whether it appeared (in order)
 * in the student's tokenised answer.
 */
function diffTokens(userAnswer, expectedTokens) {
    const userTokens = tokenise(userAnswer.toLowerCase());
    let userIdx = 0;

    const result = expectedTokens.map(expected => {
        const exp = expected.toLowerCase();
        while (userIdx < userTokens.length) {
            if (userTokens[userIdx] === exp) {
                userIdx++;
                return { token: expected, found: true };
            }
            userIdx++;
        }
        return { token: expected, found: false };
    });

    const foundCount = result.filter(r => r.found).length;
    // isPartial: some tokens matched but not all
    const isPartial = foundCount > 0 && foundCount < expectedTokens.length;
    const isCorrect = foundCount === expectedTokens.length;

    return { tokens: result, isPartial, isCorrect };
}

// renderTokenDiff removed — we no longer show token chips to students.

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function checkMultiAttemptAnswer(questionIndex) {
    const question        = quizData[questionIndex];
    const currentAttemptNum = state.questionAttempts[questionIndex] + 1;

    // Collect current answers from the active (non-disabled) input fields
    const inputs      = document.querySelectorAll(`.attempt-input[data-question="${questionIndex}"]`);
    const userAnswers = [];
    inputs.forEach(input => userAnswers.push(input.value.trim()));

    // ── Determine correctness per field ──────────────────────────────────────
    const fieldResults = question.fields.map((field, idx) => {
        const userAnswer = userAnswers[idx];

        let isCorrect = false;
        let isPartial = false;
        let diff      = null;

        if (field.tokens) {
            diff      = diffTokens(userAnswer, field.tokens);
            isCorrect = diff.isCorrect;
            isPartial = diff.isPartial;
        } else {
            // Legacy keyword check
            const lower = userAnswer.toLowerCase();
            isCorrect   = (field.keywords || []).every(k => lower.includes(k.toLowerCase()));
        }

        return { isCorrect, isPartial, userAnswer, diff };
    });

    const allCorrect = fieldResults.every(r => r.isCorrect);

    // Increment attempt count
    state.questionAttempts[questionIndex] = currentAttemptNum;
    document.getElementById(`attempts-${questionIndex}`).textContent = currentAttemptNum;

    // Deduct marks if wrong
    if (!allCorrect) {
        state.questionMarks[questionIndex] = Math.max(0, question.maxMarks - currentAttemptNum);
        document.getElementById(`marks-${questionIndex}`).textContent = state.questionMarks[questionIndex];
    }

    // Save answer state
    state.userAnswers[questionIndex] = {
        answers : userAnswers,
        correct : allCorrect,
        attempts: currentAttemptNum,
        marks   : allCorrect ? state.questionMarks[questionIndex] : 0
    };

    // ── Build history entry ──────────────────────────────────────────────────
    const historyContainer = document.getElementById(`history-${questionIndex}`);
    const historyItem      = document.createElement('div');
    historyItem.className  = `attempt-history-item${allCorrect ? '' : ' has-error'}`;

    let historyHTML = `<div class="attempt-history-label">Attempt ${currentAttemptNum}</div>`;
    historyHTML    += `<div class="attempt-history-fields">`;

    fieldResults.forEach((result, idx) => {
        const field     = question.fields[idx];
        const statusCls = result.isCorrect ? 'correct' : result.isPartial ? 'partial' : 'incorrect';
        const icon      = result.isCorrect ? 'fa-check-circle' : result.isPartial ? 'fa-circle-half-stroke' : 'fa-times-circle';
        const display   = result.userAnswer || '<em>left blank</em>';

        historyHTML += `<div class="attempt-history-field ${statusCls}">`;
        historyHTML += `<span class="field-name">${field.label}:</span>`;
        historyHTML += `<span class="field-value">${escapeHtml(display)}</span>`;
        if (result.isPartial) {
            historyHTML += `<span class="partial-tag">on track</span>`;
        }
        historyHTML += `<i class="fas ${icon} field-icon"></i>`;
        historyHTML += `</div>`;
    });

    historyHTML += `</div>`;

    if (allCorrect) {
        const marks      = state.questionMarks[questionIndex];
        const badgeClass = marks === question.maxMarks ? 'marks-full'
            : marks >= question.maxMarks * 0.8        ? 'marks-high'
            : marks >= question.maxMarks * 0.5        ? 'marks-mid'
            : marks > 0                               ? 'marks-low'
            :                                           'marks-zero';
        historyHTML += `
            <div style="margin-top:0.75rem;">
                <span class="marks-badge ${badgeClass}">
                    <i class="fas fa-star"></i>
                    ${marks}/${question.maxMarks} marks earned
                </span>
            </div>`;
    }

    historyItem.innerHTML = historyHTML;
    historyContainer.appendChild(historyItem);

    // ── Handle outcomes ──────────────────────────────────────────────────────
    if (allCorrect) {
        state.questionSolved[questionIndex] = true;
        document.getElementById(`new-attempt-${questionIndex}`).style.display = 'none';
        document.getElementById(`ma-container-${questionIndex}`).classList.add('solved');

    } else if (currentAttemptNum >= question.maxAttempts) {
        // Out of attempts — show correct answers
        const correctItem     = document.createElement('div');
        correctItem.className = 'attempt-history-item';
        correctItem.style.cssText = 'border-color:#2563eb;background:#eff6ff;';

        let correctHTML  = `<div class="attempt-history-label" style="color:#2563eb">Correct Answers</div>`;
        correctHTML     += `<div class="attempt-history-fields">`;
        question.fields.forEach(field => {
            const answer = field.correctAnswer || (field.tokens ? field.tokens.join(' ') : (field.keywords || [''])[0]);
            correctHTML += `
                <div class="attempt-history-field correct">
                    <span class="field-name">${field.label}:</span>
                    <span class="field-value">${escapeHtml(answer)}</span>
                    <i class="fas fa-lightbulb field-icon" style="color:#2563eb"></i>
                </div>`;
        });
        correctHTML += `</div>`;
        correctItem.innerHTML = correctHTML;
        historyContainer.appendChild(correctItem);

        state.questionMarks[questionIndex]         = 0;
        state.userAnswers[questionIndex].marks      = 0;
        document.getElementById(`marks-${questionIndex}`).textContent = 0;
        document.getElementById(`new-attempt-${questionIndex}`).style.display = 'none';

    } else {
        // Attempts remaining — keep field values so student can edit, just
        // lock already-correct fields and leave wrong ones editable with their text intact.
        const newAttemptNum = currentAttemptNum + 1;
        document.getElementById(`attempt-label-text-${questionIndex}`).textContent = `Attempt ${newAttemptNum}`;

        inputs.forEach((input, idx) => {
            const result = fieldResults[idx];
            if (result.isCorrect) {
                input.disabled = true;
                input.classList.add('field-correct');
            } else if (result.isPartial) {
                // Partial — keep editable, style amber so student knows they're on the right track
                input.classList.add('field-partial');
                input.style.borderColor = '#f59e0b';
                input.focus();
                setTimeout(() => { input.style.borderColor = ''; }, 800);
            } else {
                // Fully wrong — keep editable, style red
                input.style.borderColor = '#ef4444';
                input.focus();
                setTimeout(() => { input.style.borderColor = ''; }, 800);
            }
        });

        const feedback = document.getElementById(`feedback-${questionIndex}`);
        if (feedback) feedback.style.display = 'none';
    }
}

// ===== SHOW QUESTION =====
function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');
    
    state.currentQuestionIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;
    
    const progress = ((index + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    updateNavigationButtons();
    restoreSavedAnswer(index);
}

// ===== RESTORE SAVED ANSWER =====
function restoreSavedAnswer(index) {
    const savedAnswer = state.userAnswers[index];
    const question = quizData[index];
    
    if (savedAnswer !== null && savedAnswer !== undefined) {
        if (question.type === 'multiple-choice') {
            const option = document.querySelector(`.option[data-question="${index}"][data-option="${savedAnswer}"]`);
            if (option) option.classList.add('selected');
            
        } else if (question.type === 'fill-blank') {
            const input = document.querySelector(`.text-input[data-question="${index}"]`);
            if (input) input.value = savedAnswer;
            
        } else if (question.type === 'multiple-fill-blank') {
            if (Array.isArray(savedAnswer)) {
                savedAnswer.forEach((answer, blankIndex) => {
                    const input = document.querySelector(`.blank-input[data-question="${index}"][data-blank="${blankIndex}"]`);
                    if (input && answer) input.value = answer;
                });
            }
            
        } else if (question.type === 'short-answer') {
            const input = document.querySelector(`.short-answer[data-question="${index}"]`);
            if (input) input.value = savedAnswer;
        }
        // multi-attempt state is preserved in DOM (history + locked fields), no restore needed
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) {
            showQuestion(state.currentQuestionIndex - 1);
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex < quizData.length - 1) {
            showQuestion(state.currentQuestionIndex + 1);
        }
    });
    
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = state.currentQuestionIndex === 0;
    
    if (state.currentQuestionIndex === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// ===== TIMER =====
function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(() => {
        const elapsed = Date.now() - state.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('timerDisplay').textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
}

// ===== SUBMIT QUIZ =====
function submitQuiz() {
    stopTimer();
    calculateScore();
    
    const elapsed = Date.now() - state.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    // Total possible marks
    const totalMarks = quizData.reduce((sum, q) => sum + (q.type === 'multi-attempt' ? q.maxMarks : 1), 0);
    
    document.getElementById('scoreNumber').textContent = state.score;
    document.getElementById('scoreTotalDisplay').textContent = totalMarks;
    document.getElementById('timeTaken').textContent = timeString;
    
    const percentage = totalMarks > 0 ? Math.round((state.score / totalMarks) * 100) : 0;
    document.getElementById('percentageScore').textContent = `${percentage}%`;
}

// ===== CALCULATE SCORE =====
function calculateScore() {
    state.score = 0;
    
    quizData.forEach((question, index) => {
        const userAnswer = state.userAnswers[index];
        
        if (question.type === 'multiple-choice') {
            if (userAnswer === question.correctAnswer) state.score += 1;
            
        } else if (question.type === 'fill-blank') {
            if (userAnswer) {
                const normalizedAnswer = userAnswer.toLowerCase().trim();
                const keywords = question.keywords || [question.correctAnswer];
                if (keywords.some(k => normalizedAnswer === k.toLowerCase())) state.score += 1;
            }
            
        } else if (question.type === 'multiple-fill-blank') {
            if (Array.isArray(userAnswer)) {
                let allCorrect = true;
                question.blanks.forEach((blank, blankIndex) => {
                    const answer = userAnswer[blankIndex];
                    if (!answer) { allCorrect = false; return; }
                    const normalizedAnswer = answer.toLowerCase().trim();
                    const keywords = blank.keywords || [blank.correctAnswer];
                    if (!keywords.some(k => normalizedAnswer === k.toLowerCase())) allCorrect = false;
                });
                if (allCorrect) state.score += 1;
            }
            
        } else if (question.type === 'multi-attempt') {
            if (userAnswer && userAnswer.correct) {
                state.score += userAnswer.marks;
            }
            
        } else if (question.type === 'short-answer') {
            if (userAnswer) {
                const normalizedAnswer = userAnswer.toLowerCase();
                const foundKeywords = question.keywords.filter(k =>
                    normalizedAnswer.includes(k.toLowerCase())
                );
                if (foundKeywords.length >= question.minKeywords) state.score += 1;
            }
        }
    });
}