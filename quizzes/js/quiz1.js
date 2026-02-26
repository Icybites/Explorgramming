// =============================================
// quiz1.js
// =============================================

// ============================================================
// CONFIGURATION — change password here before distributing QR
// ============================================================
const QUIZ_PASSWORD = "ucop";

// ===================================================================
// QUIZ DATA — 10 Questions covering all supported types
// Supported types:
//   "multiple-choice"     — options[], correctAnswer (0-based index)
//   "fill-blank"          — correctAnswer, keywords[]
//   "multiple-fill-blank" — blanks[{ correctAnswer, keywords[] }]
//   "short-answer"        — keywords[], minKeywords
//   "multi-attempt"       — fields[], maxAttempts, maxMarks
//   "syntax-table"        — headers[], rows[], maxAttempts
// ===================================================================

const quizData = [

    // ── Q1: Multiple Choice ──────────────────────────────────
    {
        type: "multiple-choice",
        question: "What does a compiler do in C programming?",
        options: [
            "Executes code line by line",
            "Translates high-level code into machine code",
            "Manages memory allocation at runtime",
            "Debugs logical errors automatically"
        ],
        correctAnswer: 1
    },

    // ── Q2: Multiple Choice ──────────────────────────────────
    {
        type: "multiple-choice",
        question: "Which of the following is a runtime error?",
        options: [
            "Missing semicolon",
            "Using an undeclared variable",
            "Division by zero during execution",
            "Incorrect loop syntax"
        ],
        correctAnswer: 2
    },

    // ── Q3: Fill Blank ───────────────────────────────────────
    {
        type: "fill-blank",
        question: "The standard function used to print formatted output to the console in C is _______.",
        correctAnswer: "printf",
        keywords: ["printf"]
    },

    // ── Q4: Multiple Fill Blank ──────────────────────────────
    {
        type: "multiple-fill-blank",
        question: "Complete the blanks:\nThe _______ directive is used to include header files, and the _______ header is required for printf() and scanf().",
        blanks: [
            { correctAnswer: "#include", keywords: ["#include", "include"] },
            { correctAnswer: "stdio.h",  keywords: ["stdio.h", "stdio"]   }
        ]
    },

    // ── Q5: Multiple Choice ──────────────────────────────────
    {
        type: "multiple-choice",
        question: "What type of error occurs when a program compiles but produces wrong results?",
        options: [
            "Syntax error",
            "Logical error",
            "Runtime error",
            "Linker error"
        ],
        correctAnswer: 1
    },

    // ── Q6: Short Answer ─────────────────────────────────────
    {
        type: "short-answer",
        question: "Name at least TWO steps in the C Program Development Environment. List as many as you know.",
        keywords: ["edit", "preprocess", "compile", "link", "load", "execute"],
        minKeywords: 2
    },

    // ── Q7: Multi-Attempt (code) ─────────────────────────────
    {
        type: "multi-attempt",
        question: "Write the correct C statement to declare an integer variable named count and initialise it to zero.",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Answer",
                placeholder: "e.g.  Assign SUM = num",
                correctAnswer: "int count = 0;",
                tokens: ["int", "count", "=", "0", ";"],
                altTokenSets: [
                    ["int", "count", "=", "0;"],
                    ["int", "count=", "0", ";"],
                    ["int", "count=", "0;"],
                    ["int", "count=0", ";"]
                ]
            }
        ]
    },

    // ── Q8: Multi-Attempt (sequence) ────────────────────────
    {
        type: "multi-attempt",
        question: "State the correct sequence of the Program Development Life Cycle (PDLC).\n\n_____ > _____ > _____ > _____ > _____.",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Answer with spaces",
                placeholder: "e.g.  Step1, Step2, Step3, Step4, Step5",
                correctAnswer: "Analysis, Design, Implementation, Testing, Maintenance",
                tokens: ["Analysis", "Design", "Implementation", "Testing", "Maintenance"],
                altTokenSets: [
                    ["Analysis", "Design", "Implementation", "Debugging","Maintenance"],
                    ["Analysis", "Design", "Coding", "Testing", "Maintenance"],
                    ["Analysis", "Design", "Coding", "Debugging", "Maintenace"]
                ]
            }
        ]
    },

    // ── Q9: Syntax Table ─────────────────────────────────────
    {
        type: "syntax-table",
        question: "Write the correct syntax keyword or component for each control structure.\n(Just a knock-off version)",
        maxAttempts: 3,
        headers: ["Keyword / Start", "Blank 1", "Blank 2"],
        rows: [
            {
                label: "if statement",
                placeholders: ["keyword", "Your answer", "Your answer"],
                cells: [
                    { keywords: ["if"], placeholder: "keyword"},
                    { keywords: ["condition"], placeholder: "(condition)"},
                    { keywords: ["statement"], placeholder: "statement"}
                ]
            },
            {
                label: "while loop",
                placeholders: ["keyword", "Your answer", "Your answer"],
                cells: [
                    { keywords: ["while"], placeholder: "keyword"},
                    { keywords: ["condition"], placeholder: "(condition)"},
                    { keywords: ["statement"], placeholder: "statement"}
                ]
            },
            {
                label: "for loop",
                placeholders: ["keyword", "Your answer", "Your answer"],
                cells: [
                    { keywords: ["for"], placeholder: "keyword"},
                    { keywords: ["initialization", "condition", "increment"], placeholder: "init; condition; inc"},
                    { keywords: ["statement"], placeholder: "statement"}
                ]
            },
            {
                label: "do-while loop",
                placeholders: ["keyword", "Your answer", "Your answer"],
                cells: [
                    { keywords: ["do"], placeholder: "keyword"},
                    { keywords: ["statement"], placeholder: "statement"},
                    { keywords: ["while"], placeholder: "while(cond);"}
                ]
            }
        ]
    },

    // ── Q10: Multiple Choice ─────────────────────────────────
    {
        type: "multiple-choice",
        question: "Which statement about #include <stdio.h> is FALSE?",
        options: [
            "It is a preprocessor directive.",
            "It includes the standard input/output header file.",
            "It must end with a semicolon (;).",
            "It is processed before compilation starts."
        ],
        correctAnswer: 2
    }

]; // The end, abes



// ============================================================
// STATE - SILA ABAIKAN =======================================
// ============================================================
const state = {
    currentIndex: 0,
    userAnswers: [],
    score: 0,
    questionAttempts: {},
    questionMarks: {},
    questionSolved: {},
    timerSeconds: 0,
    timerInterval: null,
    finalTime: "00:00"
};

// ============================================================
// HELPERS — tokeniser, diff, escape, formatTime
// ============================================================
function tokenise(str) {
    const tokens = [];
    const re = /'[^']*'|"[^"]*"|[A-Za-z0-9_%#]+|[^A-Za-z0-9_\s]/g;
    let m;
    while ((m = re.exec(str.trim())) !== null) tokens.push(m[0]);
    return tokens;
}

function diffTokens(userAnswer, expectedTokens) {
    const userTokens = tokenise(userAnswer.toLowerCase());
    let ui = 0;
    const result = expectedTokens.map(expected => {
        const exp = expected.toLowerCase();
        while (ui < userTokens.length) {
            if (userTokens[ui] === exp) { ui++; return { token: expected, found: true }; }
            ui++;
        }
        return { token: expected, found: false };
    });
    const found = result.filter(r => r.found).length;
    return {
        tokens: result,
        isPartial: found > 0 && found < expectedTokens.length,
        isCorrect: found === expectedTokens.length
    };
}

function checkFieldTokens(ua, field) {
    const allSets = [field.tokens];
    if (field.altTokenSets) field.altTokenSets.forEach(s => allSets.push(s));
    let best = null;
    for (const tokenSet of allSets) {
        const result = diffTokens(ua, tokenSet);
        if (!best
            || result.isCorrect
            || (!best.isCorrect && result.isPartial && !best.isPartial)
            || (!best.isCorrect && !best.isPartial
                && result.tokens.filter(t => t.found).length > best.tokens.filter(t => t.found).length))
            best = result;
        if (best.isCorrect) break;
    }
    return best;
}

// TRANSLATOR FOR HTML
function escapeHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
}

// ============================================================
// PASSWORD - COPY PASTE FROM PREVIOUS PROTOTYPE
// ============================================================
document.getElementById('unlockBtn').addEventListener('click', tryUnlock);
document.getElementById('passwordInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') tryUnlock();
});

function tryUnlock() {
    const val = document.getElementById('passwordInput').value.trim();
    if (val === QUIZ_PASSWORD) {
        document.getElementById('passwordScreen').classList.add('hidden');
        document.getElementById('quizScreen').classList.add('active');
        initQuiz();
        startTimer();
    } else {
        const err = document.getElementById('errorMessage');
        err.textContent = 'Incorrect password. Please try again.';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
        setTimeout(() => (err.textContent = ''), 3000);
    }
}

// ============================================================
// TIMER - SAME
// ============================================================
function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timerSeconds++;
        document.getElementById('timerDisplay').textContent = formatTime(state.timerSeconds);
        // Turn red after 15 minutes
        if (state.timerSeconds >= 900)
            document.getElementById('timerBox').classList.add('timer-warning');
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timerInterval);
    state.finalTime = formatTime(state.timerSeconds);
}

// ============================================================
// INIT - FROM PER CHAPTER QUIZ
// ============================================================
function initQuiz() {
    state.userAnswers = new Array(quizData.length).fill(null);

    quizData.forEach((q, i) => {
        if (q.type === 'multi-attempt') {
            state.questionAttempts[i] = 0;
            state.questionMarks[i]    = q.maxMarks;
            state.questionSolved[i]   = false;
        } else if (q.type === 'syntax-table') {
            state.questionAttempts[i] = 0;
            state.questionMarks[i]    = q.rows.length;
        } else {
            state.questionMarks[i] = 1;
        }
    });

    document.getElementById('totalQuestions').textContent = quizData.length;
    renderQuestions();
    showQuestion(0);
    initNavigation();
}

// ============================================================
// RENDER ALL QUESTIONS
// ============================================================
function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    quizData.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.id = `question-${index}`;

        // Better understanding
        const marksText    = q.type === 'multi-attempt'  ? `(${q.maxMarks} marks)`
                           : q.type === 'syntax-table'   ? `(${q.rows.length} marks)`
                           : '(1 mark)';
        const doubleNL     = q.question.indexOf('\n\n');
        const label        = doubleNL !== -1 ? q.question.slice(0, doubleNL) : q.question;
        const embeddedCode = doubleNL !== -1 ? q.question.slice(doubleNL + 2) : null;

        // Unanswered warning banner
        let html = `<div class="unanswered-alert" id="alert-${index}">
            <i class="fas fa-exclamation-triangle"></i>
            Please answer this question before moving on.
        </div>`;

        html += `<div class="question-text">${index + 1}. ${label} <span style="color:#64748b;font-weight:500;">${marksText}</span></div>`;

        if (embeddedCode || q.code) html += `<pre class="question-code" id="code-${index}"></pre>`;

        // ── Multiple Choice ──────────────────────────────────
        if (q.type === 'multiple-choice') {
            html += '<div class="options">';
            q.options.forEach((opt, oi) => {
                html += `<div class="option" data-question="${index}" data-option="${oi}">
                    <div class="option-label">${String.fromCharCode(65 + oi)}</div>
                    <div class="option-text">${opt}</div>
                </div>`;
            });
            html += '</div>';

        // ── Fill Blank ───────────────────────────────────────
        } else if (q.type === 'fill-blank') {
            html += `<input type="text" class="text-input" data-question="${index}"
                placeholder="Type your answer here..." autocomplete="off">`;

        // ── Multiple Fill Blank ──────────────────────────────
        } else if (q.type === 'multiple-fill-blank') {
            html += '<div class="multiple-blanks">';
            q.blanks.forEach((_, bi) => {
                html += `<div class="blank-item">
                    <label class="blank-label">Blank ${bi + 1}:</label>
                    <input type="text" class="text-input blank-input"
                        data-question="${index}" data-blank="${bi}"
                        placeholder="Fill in blank ${bi + 1}..." autocomplete="off">
                </div>`;
            });
            html += '</div>';

        // ── Short Answer ─────────────────────────────────────
        } else if (q.type === 'short-answer') {
            html += `<textarea class="short-answer" data-question="${index}"
                placeholder="Type your answer here..." rows="5"></textarea>`;

        // ── Multi-Attempt ────────────────────────────────────
        } else if (q.type === 'multi-attempt') {
            html += `<div class="multi-attempt-container" id="ma-container-${index}">
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
                <div class="attempt-history" id="history-${index}"></div>
                <div class="new-attempt-section" id="new-attempt-${index}">
                    <div class="new-attempt-label">
                        <i class="fas fa-pencil-alt"></i>
                        <span id="attempt-label-text-${index}">Attempt 1</span>
                    </div>
                    <div class="multi-attempt-fields" id="fields-${index}">`;

            q.fields.forEach((field, fi) => {
                html += `<div class="attempt-field">
                    <label class="field-label">${field.label}:</label>
                    <input type="text" class="text-input attempt-input"
                        data-question="${index}" data-field="${fi}"
                        placeholder="${field.placeholder || 'Type your answer...'}" autocomplete="off">
                </div>`;
            });

            html += `</div>
                    <button class="btn btn-check" data-question="${index}" id="check-btn-${index}">
                        <i class="fas fa-check"></i> Check Answer
                    </button>
                    <div class="attempt-feedback" id="feedback-${index}"></div>
                </div>
            </div>`;

        // ── Syntax Table ─────────────────────────────────────
        } else if (q.type === 'syntax-table') {
            const headers = q.headers || ['Part 1', 'Part 2', 'Part 3'];
            const maxAtt  = q.maxAttempts || 3;

            html += `<div class="attempt-info" style="margin-bottom:1rem;">
                <span class="attempts-remaining">
                    <i class="fas fa-redo"></i>
                    Attempts: <strong><span id="syntax-attempts-${index}">0</span>/${maxAtt}</strong>
                </span>
                <span class="current-marks">
                    <i class="fas fa-star"></i>
                    Marks: <strong><span id="syntax-rows-${index}">0</span>/${q.rows.length}</strong>
                </span>
            </div>
            <div class="syntax-table" id="syntax-table-${index}">
                <div class="syntax-table-head" style="grid-template-columns:repeat(${headers.length},1fr);">
                    ${headers.map(h => `<div class="syntax-col-head">${h}</div>`).join('')}
                </div>
                <div class="syntax-table-body">`;

            q.rows.forEach((row, ri) => {
                html += `<div class="syntax-row" id="syntax-row-${index}-${ri}">
                    <div class="syntax-row-label">${row.label}</div>
                    <div class="syntax-row-cells">`;
                row.cells.forEach((_, ci) => {
                    html += `<input type="text" class="syntax-cell-input"
                        data-question="${index}" data-row="${ri}" data-cell="${ci}"
                        placeholder="${row.placeholders ? row.placeholders[ci] || '' : ''}"
                        autocomplete="off">`;
                });
                html += `</div></div>`;
            });

            html += `</div></div>
            <button class="btn btn-check syntax-check-btn" data-question="${index}" id="syntax-btn-${index}">
                <i class="fas fa-check"></i> Check All
            </button>
            <div class="syntax-feedback" id="syntax-feedback-${index}"></div>`;
        }

        div.innerHTML = html;

        // Inject embedded code block text safely
        if (embeddedCode || q.code) {
            const cb = div.querySelector(`#code-${index}`);
            if (cb) cb.textContent = embeddedCode || q.code;
        }

        container.appendChild(div);
    });

    addListeners();
}

// ============================================================
// ANSWER LISTENERS
// ============================================================
function addListeners() {

    // Multiple choice
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => {
            const qi = parseInt(opt.dataset.question);
            document.querySelectorAll(`.option[data-question="${qi}"]`).forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            state.userAnswers[qi] = parseInt(opt.dataset.option);
            hideAlert(qi);
        });
    });

    // Fill blank / text inputs (not blanks or attempt inputs)
    document.querySelectorAll('.text-input:not(.blank-input):not(.attempt-input)').forEach(inp => {
        inp.addEventListener('input', () => {
            const qi = parseInt(inp.dataset.question);
            state.userAnswers[qi] = inp.value;
            if (inp.value.trim()) hideAlert(qi);
        });
    });

    // Multiple fill blank
    document.querySelectorAll('.blank-input').forEach(inp => {
        inp.addEventListener('input', () => {
            const qi = parseInt(inp.dataset.question);
            const bi = parseInt(inp.dataset.blank);
            if (!Array.isArray(state.userAnswers[qi]))
                state.userAnswers[qi] = new Array(quizData[qi].blanks.length).fill('');
            state.userAnswers[qi][bi] = inp.value;
            if (state.userAnswers[qi].every(v => v && v.trim())) hideAlert(qi);
        });
    });

    // Short answer textarea
    document.querySelectorAll('.short-answer').forEach(ta => {
        ta.addEventListener('input', () => {
            const qi = parseInt(ta.dataset.question);
            state.userAnswers[qi] = ta.value;
            if (ta.value.trim()) hideAlert(qi);
        });
    });

    // Multi-attempt check buttons
    document.querySelectorAll('.btn-check:not(.syntax-check-btn)').forEach(btn => {
        btn.addEventListener('click', () => checkMultiAttempt(parseInt(btn.dataset.question)));
    });

    // Syntax table check buttons
    document.querySelectorAll('.syntax-check-btn').forEach(btn => {
        btn.addEventListener('click', () => checkSyntaxTable(parseInt(btn.dataset.question)));
    });

    // Syntax cell inputs
    document.querySelectorAll('.syntax-cell-input').forEach(inp => {
        inp.addEventListener('input', () => {
            const qi = parseInt(inp.dataset.question);
            const ri = parseInt(inp.dataset.row);
            const ci = parseInt(inp.dataset.cell);
            if (!state.userAnswers[qi]) state.userAnswers[qi] = [];
            if (!state.userAnswers[qi][ri]) state.userAnswers[qi][ri] = [];
            state.userAnswers[qi][ri][ci] = inp.value;
        });
    });
}

// ============================================================
// ALERT HELPERS
// ============================================================
function showAlert(qi) {
    const el = document.getElementById(`alert-${qi}`);
    if (el) {
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 2500);
    }
}

function hideAlert(qi) {
    const el = document.getElementById(`alert-${qi}`);
    if (el) el.classList.remove('show');
}

// ============================================================
// IS ANSWERED — gate before Next / Submit
// ============================================================
function isAnswered(index) {
    const q = quizData[index];
    const ua = state.userAnswers[index];

    if (q.type === 'multiple-choice') return ua !== null && ua !== undefined;
    if (q.type === 'fill-blank') return ua && ua.trim() !== '';
    if (q.type === 'multiple-fill-blank') return Array.isArray(ua) && ua.every(v => v && v.trim() !== '');
    if (q.type === 'short-answer') return ua && ua.trim() !== '';
    if (q.type === 'multi-attempt') return state.questionSolved[index] || state.questionAttempts[index] >= q.maxAttempts;
    if (q.type === 'syntax-table') {
        if (state.questionAttempts[index] >= (q.maxAttempts || 3)) return true;
        return q.rows.every((row, ri) =>
            row.cells.every((_, ci) => {
                const inp = document.querySelector(`.syntax-cell-input[data-question="${index}"][data-row="${ri}"][data-cell="${ci}"]`);
                return inp && inp.disabled && inp.classList.contains('syntax-correct');
            })
        );
    }
    return false;
}

// ============================================================
// SHOW QUESTION
// ============================================================
function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');
    state.currentIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('progressFill').style.width = `${((index + 1) / quizData.length) * 100}%`;
    updateNav();
    restoreAnswer(index);
}

function restoreAnswer(index) {
    const saved = state.userAnswers[index];
    const q = quizData[index];
    if (!saved) return;

    if (q.type === 'multiple-choice') {
        const opt = document.querySelector(`.option[data-question="${index}"][data-option="${saved}"]`);
        if (opt) opt.classList.add('selected');
    } else if (q.type === 'fill-blank') {
        const inp = document.querySelector(`.text-input[data-question="${index}"]`);
        if (inp) inp.value = saved;
    } else if (q.type === 'multiple-fill-blank' && Array.isArray(saved)) {
        saved.forEach((val, bi) => {
            const inp = document.querySelector(`.blank-input[data-question="${index}"][data-blank="${bi}"]`);
            if (inp && val) inp.value = val;
        });
    } else if (q.type === 'short-answer') {
        const ta = document.querySelector(`.short-answer[data-question="${index}"]`);
        if (ta) ta.value = saved;
    }
}

// ============================================================
// NAVIGATION
// ============================================================
function initNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.currentIndex > 0) showQuestion(state.currentIndex - 1);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (!isAnswered(state.currentIndex)) { showAlert(state.currentIndex); return; }
        if (state.currentIndex < quizData.length - 1) showQuestion(state.currentIndex + 1);
    });

    document.getElementById('submitBtn').addEventListener('click', () => {
        if (!isAnswered(state.currentIndex)) { showAlert(state.currentIndex); return; }
        submitQuiz();
    });

}

function updateNav() {
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    const submit = document.getElementById('submitBtn');

    prev.disabled = state.currentIndex === 0;

    if (state.currentIndex === quizData.length - 1) {
        next.style.display = 'none';
        submit.style.display = 'inline-flex';
    } else {
        next.style.display = 'inline-flex';
        submit.style.display = 'none';
    }
}

// ============================================================
// SUBMIT + SCORE
// ============================================================
function submitQuiz() {
    stopTimer();
    calculateScore();
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');

    const totalMarks = quizData.reduce((s, q) => {
        if (q.type === 'multi-attempt') return s + q.maxMarks;
        if (q.type === 'syntax-table')  return s + q.rows.length;
        return s + 1;
    }, 0);

    document.getElementById('scoreNumber').textContent = state.score;
    document.getElementById('scoreTotalDisplay').textContent = totalMarks;
    document.getElementById('timeTaken').textContent = state.finalTime;

    const pct = totalMarks > 0 ? Math.round((state.score / totalMarks) * 100) : 0;
    document.getElementById('percentageScore').textContent = `${pct}%`;
}

function calculateScore() {
    state.score = 0;
    quizData.forEach((q, i) => {
        const ua = state.userAnswers[i];

        if (q.type === 'multiple-choice') {
            if (ua === q.correctAnswer) state.score++;

        } else if (q.type === 'fill-blank') {
            if (ua) {
                const norm = ua.toLowerCase().trim();
                const kws = q.keywords || [q.correctAnswer];
                if (kws.some(k => norm === k.toLowerCase())) state.score++;
            }

        } else if (q.type === 'multiple-fill-blank') {
            if (Array.isArray(ua)) {
                let ok = true;
                q.blanks.forEach((blank, bi) => {
                    const a = ua[bi];
                    if (!a) { ok = false; return; }
                    const kws = blank.keywords || [blank.correctAnswer];
                    if (!kws.some(k => a.toLowerCase().trim().includes(k.toLowerCase()))) ok = false;
                });
                if (ok) state.score++;
            }

        } else if (q.type === 'multi-attempt') {
            if (ua && ua.correct) state.score += ua.marks;

        } else if (q.type === 'short-answer') {
            if (ua) {
                const norm = ua.toLowerCase();
                const found = q.keywords.filter(k => norm.includes(k.toLowerCase()));
                if (found.length >= q.minKeywords) state.score++;
            }

        } else if (q.type === 'syntax-table') {
            if (ua) {
                q.rows.forEach((row, ri) => {
                    const allCorrectlyLocked = row.cells.every((_, ci) => {
                        const inp = document.querySelector(`.syntax-cell-input[data-question="${i}"][data-row="${ri}"][data-cell="${ci}"]`);
                        return inp && inp.disabled && inp.classList.contains('syntax-correct');
                    });
                    if (allCorrectlyLocked) state.score++;
                });
            }
        }
    });
}

// ============================================================
// CHECK MULTI-ATTEMPT
// ============================================================
function checkMultiAttempt(questionIndex) {
    const question = quizData[questionIndex];
    const currentAttempt = state.questionAttempts[questionIndex] + 1;
    const inputs = document.querySelectorAll(`.attempt-input[data-question="${questionIndex}"]`);
    const userAnswers = [];
    inputs.forEach(inp => userAnswers.push(inp.value.trim()));

    const fieldResults = question.fields.map((field, idx) => {
        const ua = userAnswers[idx];
        let isCorrect = false, isPartial = false, diff = null;

        if (field.tokens) {
            diff = checkFieldTokens(ua, field);
            isCorrect = diff.isCorrect;
            isPartial = diff.isPartial;
        } else {
            const lower = ua.toLowerCase();
            isCorrect = (field.keywords || []).every(k => lower.includes(k.toLowerCase()));
        }
        return { isCorrect, isPartial, userAnswer: ua, diff };
    });

    const allCorrect = fieldResults.every(r => r.isCorrect);

    state.questionAttempts[questionIndex] = currentAttempt;
    document.getElementById(`attempts-${questionIndex}`).textContent = currentAttempt;

    if (!allCorrect)
        state.questionMarks[questionIndex] = Math.max(0, question.maxMarks - currentAttempt);
    document.getElementById(`marks-${questionIndex}`).textContent = state.questionMarks[questionIndex];

    state.userAnswers[questionIndex] = {
        answers: userAnswers,
        correct: allCorrect,
        attempts: currentAttempt,
        marks: allCorrect ? state.questionMarks[questionIndex] : 0
    };

    // Build history entry
    const historyContainer = document.getElementById(`history-${questionIndex}`);
    const item = document.createElement('div');
    item.className = `attempt-history-item${allCorrect ? '' : ' has-error'}`;

    let h = `<div class="attempt-history-label">Attempt ${currentAttempt}</div><div class="attempt-history-fields">`;
    fieldResults.forEach((result, idx) => {
        const field = question.fields[idx];
        const cls = result.isCorrect ? 'correct' : result.isPartial ? 'partial' : 'incorrect';
        const icon = result.isCorrect ? 'fa-check-circle' : result.isPartial ? 'fa-circle-half-stroke' : 'fa-times-circle';
        const display = result.userAnswer || '<em>left blank</em>';
        h += `<div class="attempt-history-field ${cls}">
            <span class="field-name">${field.label}:</span>
            <span class="field-value">${escapeHtml(display)}</span>
            ${result.isPartial ? '<span class="partial-tag">on track</span>' : ''}
            <i class="fas ${icon} field-icon"></i>
        </div>`;
    });
    h += '</div>';

    if (allCorrect) {
        const marks = state.questionMarks[questionIndex];
        const bc = marks === question.maxMarks ? 'marks-full'
            : marks >= question.maxMarks * 0.8  ? 'marks-high'
            : marks >= question.maxMarks * 0.5  ? 'marks-mid'
            : marks > 0                         ? 'marks-low'
            :                                     'marks-zero';
        h += `<div style="margin-top:.75rem;">
            <span class="marks-badge ${bc}"><i class="fas fa-star"></i> ${marks}/${question.maxMarks} marks earned</span>
        </div>`;
    }

    item.innerHTML = h;
    historyContainer.appendChild(item);

    if (allCorrect) {
        state.questionSolved[questionIndex] = true;
        document.getElementById(`new-attempt-${questionIndex}`).style.display = 'none';
        document.getElementById(`ma-container-${questionIndex}`).classList.add('solved');
        hideAlert(questionIndex);

    } else if (currentAttempt >= question.maxAttempts) {
        // Show correct answers
        const ci = document.createElement('div');
        ci.className     = 'attempt-history-item';
        ci.style.cssText = 'border-color:#2563eb;background:#eff6ff;';
        let ch = `<div class="attempt-history-label" style="color:#2563eb">Correct Answers</div><div class="attempt-history-fields">`;
        question.fields.forEach(field => {
            const ans = field.correctAnswer
                || (field.tokens ? field.tokens.join(' ') : (field.keywords || [''])[0]);
            ch += `<div class="attempt-history-field correct">
                <span class="field-name">${field.label}:</span>
                <span class="field-value">${escapeHtml(ans)}</span>
                <i class="fas fa-lightbulb field-icon" style="color:#2563eb"></i>
            </div>`;
        });
        ch += '</div>';
        ci.innerHTML = ch;
        historyContainer.appendChild(ci);

        state.questionMarks[questionIndex] = 0;
        state.userAnswers[questionIndex].marks = 0;
        document.getElementById(`marks-${questionIndex}`).textContent = 0;
        document.getElementById(`new-attempt-${questionIndex}`).style.display = 'none';
        hideAlert(questionIndex);

    } else {
        // Still has attempts — lock correct fields, highlight wrong ones
        const next = currentAttempt + 1;
        document.getElementById(`attempt-label-text-${questionIndex}`).textContent = `Attempt ${next}`;
        inputs.forEach((inp, idx) => {
            const r = fieldResults[idx];
            if (r.isCorrect) {
                inp.disabled = true;
                inp.classList.add('field-correct');
            } else if (r.isPartial) {
                inp.classList.add('field-partial');
                inp.style.borderColor = '#f59e0b';
                setTimeout(() => { inp.style.borderColor = ''; }, 800);
            } else {
                inp.style.borderColor = '#ef4444';
                inp.focus();
                setTimeout(() => { inp.style.borderColor = ''; }, 800);
            }
        });
    }
}

// ============================================================
// CHECK SYNTAX TABLE
// ============================================================
function checkSyntaxTable(questionIndex) {
    const question = quizData[questionIndex];
    const maxAttempts = question.maxAttempts || 3;
    const feedback = document.getElementById(`syntax-feedback-${questionIndex}`);
    const btn = document.getElementById(`syntax-btn-${questionIndex}`);

    state.questionAttempts[questionIndex]++;
    const attempt = state.questionAttempts[questionIndex];
    document.getElementById(`syntax-attempts-${questionIndex}`).textContent = attempt;

    // Collect current values
    const inputs = document.querySelectorAll(`.syntax-cell-input[data-question="${questionIndex}"]`);
    const rowValues = {};
    inputs.forEach(inp => {
        const ri = parseInt(inp.dataset.row);
        const ci = parseInt(inp.dataset.cell);
        if (!rowValues[ri]) rowValues[ri] = [];
        rowValues[ri][ci] = inp.value.trim();
    });

    // Check each cell
    question.rows.forEach((row, ri) => {
        row.cells.forEach((cell, ci) => {
            const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
            if (inp.disabled) return;

            const ua = (rowValues[ri] && rowValues[ri][ci]) || '';
            let cellOk = false;

            if (cell.tokens) {
                const result = checkFieldTokens(ua, cell);
                cellOk = result.isCorrect;
                if (!cellOk) {
                    inp.style.borderColor = result.isPartial ? '#f59e0b' : '#ef4444';
                    setTimeout(() => { inp.style.borderColor = ''; }, 1200);
                }
            } else if (cell.keywords) {
                const lower = ua.toLowerCase();
                const primaryOk = cell.keywords.every(k => lower.includes(k.toLowerCase()));
                const altOk = (cell.altKeywords || []).some(alt =>
                    alt.every(k => lower.includes(k.toLowerCase()))
                );
                cellOk = primaryOk || altOk;
                if (!cellOk) {
                    inp.style.borderColor = '#ef4444';
                    setTimeout(() => { inp.style.borderColor = ''; }, 1200);
                }
            }

            if (cellOk) {
                inp.disabled = true;
                inp.classList.add('syntax-correct');
            }
        });
    });

    // Count correct rows
    let correctRows = 0;
    question.rows.forEach((row, ri) => {
        const allCorrect = row.cells.every((_, ci) => {
            const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
            return inp && inp.disabled && inp.classList.contains('syntax-correct');
        });
        if (allCorrect) correctRows++;
    });

    const allCorrect = correctRows === question.rows.length;
    document.getElementById(`syntax-rows-${questionIndex}`).textContent = correctRows;
    state.userAnswers[questionIndex] = rowValues;

    if (allCorrect) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        if (feedback) feedback.innerHTML = `<span class="syntax-result correct">
            <i class="fas fa-check-circle"></i> All correct! ${correctRows}/${question.rows.length} marks earned.
        </span>`;
        hideAlert(questionIndex);

    } else if (attempt >= maxAttempts) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        // Reveal correct answers in blue
        question.rows.forEach((row, ri) => {
            row.cells.forEach((cell, ci) => {
                const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
                if (!inp || inp.disabled) return;
                const correct = cell.correctAnswer
                    || (cell.tokens  ? cell.tokens.join(' ') : '')
                    || (cell.keywords ? cell.keywords[0] : '');
                inp.value    = correct;
                inp.disabled = true;
                inp.classList.add('syntax-revealed');
            });
        });
        if (feedback) feedback.innerHTML = `<span class="syntax-result revealed">
            <i class="fas fa-lightbulb"></i>
            Out of attempts - ${correctRows}/${question.rows.length} marks earned. Correct answers shown in blue.
        </span>`;
        hideAlert(questionIndex);

    } else {
        const remaining = maxAttempts - attempt;
        if (feedback) feedback.innerHTML = `<span class="syntax-result partial">
            <i class="fas fa-pencil-alt"></i>
            ${correctRows}/${question.rows.length} marks - ${remaining} attempt${remaining > 1 ? 's' : ''} remaining
        </span>`;
    }
}
