// =============================================
// quiz6.js
// =============================================

// ============================================================
// CONFIGURATION — change password here before distributing QR
// ============================================================
const QUIZ_PASSWORD = "callFunction";

// ===================================================================
// QUIZ DATA
// ===================================================================

const quizData = [

    // 1 - Multiple Choice ------------------------------
    {
        type: "multiple-choice",
        question: "Choose the correct answer based on the code snippet below:\n\n#include _______\n\nint main() {\n\tchar userName[20];\n\tprintf(\"Please enter your name: \");\n\tscanf_s(\"%s\", userName, 20);\n\n\treturn 0;\n}",
        options: [
            "&ltstdlib&gt",
            "&ltstdio&gt",
            "&lttime.h&gt",
            "&ltstdio.h&gt"
        ],
        correctAnswer: 3
    },

    // 2 - Multiple Choice ------------------------------
    {
        type: "multiple-choice",
        question: "Choose the correct answer based on the code snippet below:\n\n#include <stdio.h>\n#include ______\n\nint main() {\n\n\tint ran;\n\tint gen = 1;\n\n\tsrand(time(NULL));\n\n\twhile (gen <= 10) {\n\t\tran = rand() % 100;\n\t\tprintf(\"%d\\n\", ran);\n\t\tgen = gen + 1;\n\t}\n\treturn 0;\n}",
        options: [
            "&ltmath.h&gt",
            "&lttime.h&gt",
            "&ltstdlib.h&gt",
            "&ltstring.h&gt"
        ],
        correctAnswer: 2
    },

    // 3 - Fill Blank ------------------------------
    {
        type: "fill-blank",
        question: "Fill in the blank:\n\n#include <stdio.h>\n#include <math.h>\n\nint main() {\n\tfloat pi = 3.142;\n\tfloat radius = 5;\n\tfloat height = 10;\n\tfloat area = pi * pow(radius, 2);\n\tfloat volume = area * height;\n\tprintf(\"Result: %f\", ____);\n\n\treturn 0;\n}",
        correctAnswer: "volume",
        keywords: ["volume"]
    },

    // 4 - Short Answer ------------------------------
    {
        type: "short-answer",
        question: "Fill in the blank:\n\n#include <stdio.h>\n#include <time.h>\n\nint main() {\n\t____ current = time(NULL);\n\tprintf(\"The time is %s\", ctime(&current));\n\n\treturn 0;\n}",
        keywords: ["time_t"],
        minKeywords: 1
    },

    // 5 - Fill Blank ------------------------------
    {
        type: "fill-blank",
        question: "Fill in the blank:\n\n#include <stdio.h>\n#include <math.h>\n\nvoid calculation();\n\nint main() {\n\tcalculation();\n\treturn 0;\n}\n\n_____ calculation(){\n\tint x = 3;\n\tint volume = pow(x, 3);\n\tprintf(\"Result: %d\", volume);\n}",
        correctAnswer: "void",
        keywords: ["void"]
    }

];




// ============================================================
// STATE - SILA ABAIKAN SEMUA YANG DIBAWAH ====================
// ============================================================
const TIMER_LIMIT = 600; // 10 minutes in seconds
 
const state = {
    currentIndex: 0,
    userAnswers: [],
    score: 0,
    questionAttempts: {},
    questionMarks: {},
    questionSolved: {},
    timerSeconds: TIMER_LIMIT,  // counts DOWN from 600
    timerInterval: null,
    finalTime: "10:00",         // default if somehow not set
    timeLimitHit: false         // true if student ran out of time
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
 
// Normalise a token for comparison.
// Quoted strings: lowercase the content so "Hello" == "hello".
// Everything else: lowercase + strip whitespace.
function normaliseToken(t) {
    t = t.trim();
    if ((t.startsWith('"') && t.endsWith('"')) ||
        (t.startsWith("'") && t.endsWith("'"))) {
        return t[0] + t.slice(1, -1).toLowerCase() + t[t.length - 1];
    }
    return t.toLowerCase().replace(/\s+/g, '');
}
 
function diffTokens(userAnswer, expectedTokens) {
    // Tokenise raw user input, normalise each token
    const userTokens = tokenise(userAnswer).map(normaliseToken);
 
    let ui = 0;
    const result = expectedTokens.map(expected => {
        // Normalise the expected token the same way.
        // Some expected tokens bundle multiple symbols e.g. "[]" or '"Hello";'
        // so we also try matching them as a joined run of consecutive user tokens.
        const expNorm = normaliseToken(expected);
        // Also tokenise the expected value and normalise each piece,
        // then join — so '"Hello";' becomes '"hello"' + ';' joined = '"hello";'
        const expPieces = tokenise(expected).map(normaliseToken);
        const expJoined = expPieces.join('');
 
        const savedUi = ui;
        // Try single-token match first
        if (ui < userTokens.length &&
            (userTokens[ui] === expNorm || userTokens[ui] === expJoined)) {
            ui++;
            return { token: expected, found: true };
        }
        // Try multi-token run match (user tokens joined == expected joined)
        for (let len = 1; len <= expPieces.length + 1 && ui + len <= userTokens.length; len++) {
            const run = userTokens.slice(ui, ui + len).join('');
            if (run === expJoined) {
                ui += len;
                return { token: expected, found: true };
            }
        }
        ui = savedUi; // no match — don't advance
        ui++;         // skip one user token and try remaining expected tokens
        return { token: expected, found: false };
    });
 
    const found = result.filter(r => r.found).length;
    return {
        tokens:    result,
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
// PASSWORD
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
// TIMER — 10-minute countdown
// ============================================================
function startTimer() {
    // Show initial time
    document.getElementById('timerDisplay').textContent = formatTime(state.timerSeconds);
 
    state.timerInterval = setInterval(() => {
        state.timerSeconds--;
 
        document.getElementById('timerDisplay').textContent = formatTime(state.timerSeconds);
 
        // Turn red in the last 60 seconds
        if (state.timerSeconds <= 60)
            document.getElementById('timerBox').classList.add('timer-warning');
 
        // Time is up — auto-submit
        if (state.timerSeconds <= 0) {
            state.timeLimitHit = true;
            stopTimer();
            submitQuiz();
        }
    }, 1000);
}
 
function stopTimer() {
    clearInterval(state.timerInterval);
    // Time taken = how much of the 10 minutes was used
    const secondsUsed = TIMER_LIMIT - state.timerSeconds;
    state.finalTime = formatTime(secondsUsed);
}
 
// ============================================================
// INIT
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
 
        const marksText    = q.type === 'multi-attempt'  ? `(${q.maxMarks} marks)`
                           : q.type === 'syntax-table'   ? `(${q.rows.length} marks)`
                           : '(1 mark)';
        const doubleNL     = q.question.indexOf('\n\n');
        const label        = doubleNL !== -1 ? q.question.slice(0, doubleNL) : q.question;
        const embeddedCode = doubleNL !== -1 ? q.question.slice(doubleNL + 2) : null;
 
        let html = `<div class="unanswered-alert" id="alert-${index}">
            <i class="fas fa-exclamation-triangle"></i>
            Please answer this question before moving on.
        </div>`;
 
        html += `<div class="question-text">${index + 1}. ${label} <span style="color:#64748b;font-weight:500;">${marksText}</span></div>`;
 
        if (embeddedCode || q.code) html += `<pre class="question-code" id="code-${index}"></pre>`;
 
        if (q.type === 'multiple-choice') {
            html += '<div class="options">';
            q.options.forEach((opt, oi) => {
                html += `<div class="option" data-question="${index}" data-option="${oi}">
                    <div class="option-label">${String.fromCharCode(65 + oi)}</div>
                    <div class="option-text">${opt}</div>
                </div>`;
            });
            html += '</div>';
 
        } else if (q.type === 'fill-blank') {
            html += `<input type="text" class="text-input" data-question="${index}"
                placeholder="Type your answer here..." autocomplete="off">`;
 
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
 
        } else if (q.type === 'short-answer') {
            html += `<textarea class="short-answer" data-question="${index}"
                placeholder="Type your answer here..." rows="5"></textarea>`;
 
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
 
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => {
            const qi = parseInt(opt.dataset.question);
            document.querySelectorAll(`.option[data-question="${qi}"]`).forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            state.userAnswers[qi] = parseInt(opt.dataset.option);
            hideAlert(qi);
        });
    });
 
    document.querySelectorAll('.text-input:not(.blank-input):not(.attempt-input)').forEach(inp => {
        inp.addEventListener('input', () => {
            const qi = parseInt(inp.dataset.question);
            state.userAnswers[qi] = inp.value;
            if (inp.value.trim()) hideAlert(qi);
        });
    });
 
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
 
    document.querySelectorAll('.short-answer').forEach(ta => {
        ta.addEventListener('input', () => {
            const qi = parseInt(ta.dataset.question);
            state.userAnswers[qi] = ta.value;
            if (ta.value.trim()) hideAlert(qi);
        });
    });
 
    document.querySelectorAll('.btn-check:not(.syntax-check-btn)').forEach(btn => {
        btn.addEventListener('click', () => checkMultiAttempt(parseInt(btn.dataset.question)));
    });
 
    document.querySelectorAll('.syntax-check-btn').forEach(btn => {
        btn.addEventListener('click', () => checkSyntaxTable(parseInt(btn.dataset.question)));
    });
 
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
// IS ANSWERED
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
    const prev   = document.getElementById('prevBtn');
    const next   = document.getElementById('nextBtn');
    const submit = document.getElementById('submitBtn');
 
    prev.disabled = state.currentIndex === 0;
 
    if (state.currentIndex === quizData.length - 1) {
        next.style.display   = 'none';
        submit.style.display = 'inline-flex';
    } else {
        next.style.display   = 'inline-flex';
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
 
    document.getElementById('scoreNumber').textContent      = state.score;
    document.getElementById('scoreTotalDisplay').textContent = totalMarks;
    document.getElementById('timeTaken').textContent         = state.timeLimitHit
        ? '10:00 (Time\'s up!)'
        : state.finalTime;
 
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
 
    const historyContainer = document.getElementById(`history-${questionIndex}`);
    const item = document.createElement('div');
    item.className = `attempt-history-item${allCorrect ? '' : ' has-error'}`;
 
    let h = `<div class="attempt-history-label">Attempt ${currentAttempt}</div><div class="attempt-history-fields">`;
    fieldResults.forEach((result, idx) => {
        const field = question.fields[idx];
        const cls  = result.isCorrect ? 'correct' : result.isPartial ? 'partial' : 'incorrect';
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
    const question    = quizData[questionIndex];
    const maxAttempts = question.maxAttempts || 3;
    const feedback    = document.getElementById(`syntax-feedback-${questionIndex}`);
    const btn         = document.getElementById(`syntax-btn-${questionIndex}`);
 
    state.questionAttempts[questionIndex]++;
    const attempt = state.questionAttempts[questionIndex];
    document.getElementById(`syntax-attempts-${questionIndex}`).textContent = attempt;
 
    const inputs = document.querySelectorAll(`.syntax-cell-input[data-question="${questionIndex}"]`);
    const rowValues = {};
    inputs.forEach(inp => {
        const ri = parseInt(inp.dataset.row);
        const ci = parseInt(inp.dataset.cell);
        if (!rowValues[ri]) rowValues[ri] = [];
        rowValues[ri][ci] = inp.value.trim();
    });
 
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
                const altOk     = (cell.altKeywords || []).some(alt =>
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
        question.rows.forEach((row, ri) => {
            row.cells.forEach((cell, ci) => {
                const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
                if (!inp || inp.disabled) return;
                const correct = cell.correctAnswer
                    || (cell.tokens   ? cell.tokens.join(' ')   : '')
                    || (cell.keywords ? cell.keywords[0]        : '');
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
