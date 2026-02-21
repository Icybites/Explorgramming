// ===== CHAPTER 6: ARRAYS (1D & 2D) — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is an array in C?",
        options: [
            "A single variable that can store only one value at a time",
            "A collection of elements of the same data type stored in contiguous memory locations",
            "A special function that generates multiple values",
            "A data type that can store different types of values together"
        ],
        correctAnswer: 1,
        explanation: "An array is a collection of elements of the same data type stored in contiguous memory locations. All elements must be the same type, they are stored sequentially in memory, and you access them using an index."
    },

    // Q2 — Fill in the Blank
    {
        type: "fill-blank",
        question: "Arrays in C use _______ -based indexing, meaning the first element is at index 0 and the last element is at index size-1.",
        correctAnswer: "zero",
        keywords: ["zero"],
        explanation: "C uses zero-based indexing. The first element of an array is at index 0, the second at index 1, and so on. The last element is at index size - 1. Accessing an index outside this range causes undefined behavior."
    },

    // Q3 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of the following code?\n\nint numbers[] = {10, 20, 30, 40, 50};\nprintf(\"%d\", numbers[3]);",
        options: [
            "30",
            "40",
            "50",
            "Compiler error"
        ],
        correctAnswer: 1,
        explanation: "Arrays use zero-based indexing: index 0 = 10, index 1 = 20, index 2 = 30, index 3 = 40, index 4 = 50. So numbers[3] accesses the fourth element, which is 40."
    },

    // Q4 — Short Answer
    {
        type: "short-answer",
        question: "Why is it good practice to use #define for array sizes? Give two reasons.",
        keywords: ["readability", "maintainability", "understand", "change", "one place"],
        minKeywords: 1,
        explanation: "Using #define for array sizes improves: (1) Readability - a symbolic name like MAX_STUDENTS is clearer than a raw number like 50; (2) Maintainability - if you need to change the size, you only modify it in one place instead of searching through the entire code."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What happens if you access an array index that is out of bounds (e.g., numbers[5] for an array of size 5)?",
        options: [
            "The program automatically resizes the array",
            "It returns 0 safely",
            "It causes undefined behavior and may crash the program",
            "The compiler catches it and shows an error"
        ],
        correctAnswer: 2,
        explanation: "Accessing an array index outside the valid range (0 to size-1) causes undefined behavior. The program may crash, produce wrong results, or appear to work - it's unpredictable and dangerous."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "Unlike regular variables, arrays are passed to functions by _______ meaning the function receives the memory address, not a copy of the data.",
        correctAnswer: "reference",
        keywords: ["reference"],
        explanation: "Arrays are passed by reference (the memory address), not by value. This means the function can modify the original array elements. Regular variables are passed by value (a copy)."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What does the sizeof operator return when used on an array?",
        options: [
            "The number of elements in the array",
            "The total size of the array in bytes",
            "The size of the first element only",
            "The memory address of the array"
        ],
        correctAnswer: 1,
        explanation: "sizeof(array) returns the total memory occupied by the array in bytes. To get the number of elements, you divide this by sizeof(array[0]), which gives the size of one element."
    },

    // Q8 — Short Answer
    {
        type: "short-answer",
        question: "How do you calculate the number of elements in an array using the sizeof operator?",
        keywords: ["sizeof(array)", "divide", "sizeof(array[0])", "bytes", "elements"],
        minKeywords: 1,
        explanation: "To calculate the number of elements in an array: int length = sizeof(array) / sizeof(array[0]); sizeof(array) gives total bytes, sizeof(array[0]) gives bytes per element. Dividing them gives the number of elements."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the correct way to declare a 2D array with 3 rows and 4 columns?",
        options: [
            "int array[3,4];",
            "int array[3][4];",
            "int array(3)(4);",
            "int[3][4] array;"
        ],
        correctAnswer: 1,
        explanation: "The correct syntax for a 2D array is: data_type array_name[rows][columns]; So int array[3][4]; creates a 3-row, 4-column array (12 elements total)."
    },

    // Q10 — Fill in the Blank
    {
        type: "fill-blank",
        question: "In a 2D array declaration int matrix[3][4] the second number [4] represents the number of a _______.",
        correctAnswer: "rows",
        keywords: ["rows"],
        altCorrectAnswers: ["columns"],
        explanation: "In int matrix[rows][columns], the first dimension specifies the number of rows, and the second dimension specifies the number of columns. So matrix[3][4] has 3 rows and 4 columns."
    },

    // Q11 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the output of this code?\n\nint matrix[2][3] = {{1,2,3}, {4,5,6}};\nprintf(\"%d\", matrix[1][2]);",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        correctAnswer: 3,
        explanation: "matrix[1][2] accesses row index 1 (the second row: {4,5,6}) and column index 2 (the third element of that row, which is 6). So output is 6."
    },

    // Q12 — Fill in the Blank
    {
        type: "fill-blank",
        question: "To process all elements in a 2D array, you typically use _______ loops: the outer loop iterates through rows and the inner loop iterates through columns.",
        correctAnswer: "nested",
        keywords: ["nested"],
        explanation: "Nested loops are used to process 2D arrays. The outer loop iterates through each row, and for each row, the inner loop iterates through each column, allowing you to access every element in the array."
    },

    // Q13 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What happens with partial initialization like int numbers[5] = {10, 20};?",
        options: [
            "Compiler error - must initialize all elements",
            "First two elements are 10 and 20, remaining contain garbage values",
            "First two elements are 10 and 20, remaining are automatically initialized to 0",
            "Only the first element is initialized to 10"
        ],
        correctAnswer: 2,
        explanation: "With partial initialization in C, the specified elements are initialized as given, and all remaining elements are automatically initialized to 0. So numbers[0]=10, numbers[1]=20, numbers[2]=0, numbers[3]=0, numbers[4]=0."
    },

    // Q14 — Short Answer
    {
        type: "short-answer",
        question: "What are the key characteristics of arrays in C? List at least three.",
        keywords: ["same data type", "contiguous memory", "fixed size", "zero-based index", "elements", "same", "same data", "same datatype,", "adjacent", "size is fixed", "cannot be resized", "cannot be resize", "cannot resize", "cannot resized", "zero indexing", "zero based indexing", "index starting from 0", "one-dimensional", "two-dimensional", "multi-dimensional", "one dimensional", "two dimensional", "multi dimensional"],
        minKeywords: 3,
        explanation: "Key characteristics: (1) All elements must be of the same data type; (2) Elements are stored in contiguous (adjacent) memory locations; (3) Array size is fixed once declared (cannot be resized); (4) Elements are accessed using an index starting from 0; (5) Arrays can be one-dimensional, two-dimensional, or multi-dimensional."
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