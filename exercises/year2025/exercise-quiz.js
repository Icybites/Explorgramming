// =============================================
// exercise-quiz.js — Exercise Quiz Page
// =============================================

// ============================================================
// ALL 80 QUESTIONS — 8 sets of 10
// Supported types:
//   "multiple-choice"    — options[], correctAnswer (0-based index)
//   "fill-blank"         — correctAnswer, keywords[]
//   "multiple-fill-blank"— blanks[{ correctAnswer, keywords[] }]
//   "short-answer"       — keywords[], minKeywords
//   "multi-attempt"      — fields[], maxAttempts, maxMarks
//     field.tokens       — primary token sequence for code checking
//     field.altTokenSets — array of alternative token sequences (any one = correct)
//     field.keywords     — word-level matching (alternative to tokens)
// ============================================================

// // DUMMY QUESTIONS //

// {
//     type: "multiple-choice",
//     question: "Which symbol is used to end a statement in C?",
//     options: [".", ":", ";", "!"],
//     correctAnswer: 2
// },
// {
//     type: "fill-blank",
//     question: "The function used to print output in C is _______.",
//     correctAnswer: "printf",
//     keywords: ["printf"]
// },
// {
//     type: "short-answer",
//     question: "Name TWO integer data types in C.",
//     keywords: ["int", "short", "long", "char"],
//     minKeywords: 2
// },
// {
//     type: "multiple-choice",
//     question: "Which is NOT a valid loop in C?",
//     options: ["for", "while", "do-while", "repeat-until"],
//     correctAnswer: 3
// },
// // ── MULTI-ATTEMPT EXAMPLE (keyword-based, no code) ──
// // Use this format when the answer is a word or short phrase.
// // keywords[] = the word(s) that must appear in the student's answer.
// // Each field is checked independently — correct ones lock, wrong ones stay editable.
// {
//     type: "multi-attempt",
//     question: "Complete the C statement that declares an integer variable and prints it.",

//     // Fill in both blanks:",
//     maxAttempts: 5,
//     maxMarks: 5,
//     fields: [
//         {
//             label: "Declaration",
//             placeholder: "e.g.  int num = 5;",
//             correctAnswer: "int num = 5;",
//             // tokens[]: every token must appear in the student's answer (in order)
//             // Use this for code answers — green/amber/red per token
//             tokens: ["int", "num", "=", "5", ";"]
//         },
//         {
//             label: "Print statement",
//             placeholder: "e.g.  printf('%d', num);",
//             correctAnswer: "printf('%d', num);",
//             tokens: ["printf", "(", "'%d'", ",", "num", ")", ";"]
//         }
//     ]
// },

// // ── MULTI-ATTEMPT EXAMPLE (keyword-based, no code) ──
// // Use this format when the answer is a word or short phrase.
// // keywords[] = the word(s) that must appear in the student's answer.
// // {
// //     type: "multi-attempt",
// //     question: "A loop that runs at least once is called a _______ loop.",
// //     maxAttempts: 3,
// //     maxMarks: 3,
// //     fields: [
// //         {
// //             label: "Loop type",
// //             placeholder: "Type the loop name...",
// //             correctAnswer: "do-while",
// //             keywords: ["do-while", "do while"]
// //         }
// //     ]
// // },

const allSets = [

    // ── SET 1 ──────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "Define the compile stage process",
            options: [
                "The object code is linked with code for functions in other files",
                "The C program in translated into machine language code",
                "The program is executed one instruction at a time",
                "The program is placed in memory"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Identify the error that appears after compile and run the code",
            options: [
                "Syntax",
                "Logical",
                "Run-time",
                "Compile"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "There are three types of programming languages except",
            options: [
                "Machine Language",
                "Assembly",
                "Robot Language",
                "High-Level language"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "The code program is referred to as_______",
            options: [
                "Compiler Code",
                "Pseudocode",
                "Source Code",
                "Basic Code"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is the purpose of a compiler in programming?",
            options: [
                "To execute code line by line",
                "To translate high-level code into machine code",
                "To debug runtime errors",
                "To manage memory allocation"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which of the following is NOT a step in the compilation process?",
            options: [
                "Preprocessing",
                "Linking",
                "Interpretation",
                "Assembly"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What type of error occurs when a program compiles successfully but produces incorrect results?",
            options: [
                "Syntax error",
                "Logical error",
                "Runtime error",
                "Linker error"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What happens if you forget a semicolon at the end of a statement in C?",
            options: [
                "The program runs but gives incorrect output",
                "A syntax error occurs during compilation",
                "The program executes but skips that line",
                "Nothing happens"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is an example of a runtime error?",
            options: [
                "Missing semicolon",
                "Using an undeclared variable",
                "Dividing a number by zero",
                "Incorrect loop syntax"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is the purpose of the return statement in a function?",
            options: [
                "To declare the function's return type",
                "To exit the program",
                "To return a value from the function",
                "To define the function"
            ],
            correctAnswer: 2
        },
        {
            type: "multi-attempt",
            question: "Sequence of C program Development Environment and explanation.\n\n_____ > _____ > _____ > _____ >_____ > _____.",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Separate the answer with a space",
                    placeholder: "e.g.  step1, step2, step3, step4, step5, step6",
                    correctAnswer: "Edit, Preprocess, Compile, Link, Load, Execute",
                    tokens: ["Edit", "Preprocess", "Compile", "Link", "Load", "Execute"]
                }
            ]
        },
    ],

    // ── SET 2 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "What does an arrow in a flowchart indicate?",
            options: [
                "Input/Output",
                "Decision",
                "Connector",
                "Flow of control or direction"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "In pseudocode, what is commonly used to represent the beginning and end of a process?",
            options: [
                "Start/End",
                "Process",
                "Input/Output",
                "Decision"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which statement is true about Algorithm?",
            options: [
                "Algorithm is produced after coding a Code in C",
                "Algorithm is one of the Implementation phases in PDLC",
                "Algorithm is needed before produce flowcart",
                "Algorithm is a visual flow of C code"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "Which statement is false about Flowchart?",
            options: [
                "Visualization of logic",
                "Structured design and documentation",
                "Standardization",
                "Difficult to understand"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "Which of the following correctly represents a pseudocode for a basic if-else statement in C?",
            options: [
                "IF (condition) THEN\nstatements\nELSE\nstatements\nEND IF",
                "IF condition DO\nstatements\nELSE DO\nstatements\nEND",
                "WHEN condition THEN\nstatements\nOTHERWISE\nstatements\nEND WHEN",
                "CHECK condition\nstatements\nELSE\nstatements\nEND CHECK"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which of the following correctly represents a function header in pseudocode that takes two integers and returns their sum?",
            options: [
                "FUNCTION Sum(a, b) RETURNS INTEGER",
                "INTEGER Sum(a, b)",
                "void Sum(int a, int b)",
                "Sum(a, b) → INTEGER"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "In pseudocode, how would you write a loop that executes exactly 10 times?",
            options: [
                "WHILE counter < 10 DO",
                "FOR counter FROM 1 TO 10 DO",
                "REPEAT UNTIL counter = 10",
                "DO WHILE counter <= 10"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which pseudocode statement correctly represents an if-else statement in C?",
            options: [
                "IF condition THEN action1 ELSE action2",
                "IF (condition) BEGIN action1 END ELSE BEGIN action2 END",
                "WHEN condition DO action1 OTHERWISE action2",
                "CHECK condition THEN action1 OR action2"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "How would you represent array initialization in pseudocode?",
            options: [
                "DECLARE array[5] = {1, 2, 3, 4, 5}",
                "SET array TO [1, 2, 3, 4, 5]",
                "ARRAY array[5] := [1, 2, 3, 4, 5]",
                "INITIALIZE array(5) WITH 1, 2, 3, 4, 5"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which pseudocode correctly represents reading a value from user input?",
            options: [
                "INPUT value",
                "READ value",
                "SCAN value",
                "GET value"
            ],
            correctAnswer: 0
        },
        {
            type: "multi-attempt",
            question: "Construct a pseudocode statement to assign the sum of variables <code>x, y, z</code> to variable <code>e</code>.",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Pseudocode Statement:",
                    placeholder: "e.g.  Assign sum = values",
                    correctAnswer: "SET e = x + y + z",

                    // PRIMARY — canonical answer
                    tokens: ["SET", "e", "=", "x", "+", "y", "+", "z"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["ASSIGN", "e", "=",  "x", "+", "y", "+", "z"],  // ASSIGN e = x + y + z
                        ["LET",    "e", "=",  "x", "+", "y", "+", "z"],  // LET e = x + y + z
                        ["STORE",  "x", "+",  "y", "+", "z", "IN", "e"], // STORE x + y + z IN e
                        ["e", "=", "x", "+", "y", "+", "z"],            // e = x + y + z
                    ]
                }
            ]
        },
    ],

    // ── SET 3 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "Predict the correct output? Assume a = 15, b = 4, c = 7.",
            options: [
                "printf(\"b=\"); Answer: 4=",
                "printf(\"%d\", a % c + b ); Answer: 5",
                "printf(\"%d = a + b\", a + b ); Answer: a + b = 19",
                "printf(\"%d\", a % b ); Answer: 2"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which of these is not a relational or logical operator?",
            options: [
                "=",
                "||",
                "==",
                "!="
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "How to print \\n on the screen?",
            options: [
                "printf(\"\\n\");",
                "printf \\\\n;",
                "printf('\\n');",
                "printf(\"\\\\n\");"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "Predict what will happen after compiling and running following code?\n\nmain()\n{\n    printf(\"%p\", main);\n}",
            options: [
                "Error",
                "Will make an infinite loop",
                "Some address will be printed",
                "None of these"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "Predict what is the output for program below?\n\nmain()\n{\n    int i=5;\n    printf(\"%d\", i++);\n    printf(\"%d\", i--);\n    printf(\"%d\", ++i);\n    printf(\"%d\", --i);\n    printf(\"%d\", i);\n}",
            options: [
                "67766",
                "67676",
                "56665",
                "56655"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "The statement of y = x + 2 is called _______",
            options: [
                "Variables",
                "Expressions",
                "Operator",
                "Datatype"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is a function prototype in C?",
            options: [
                "A definition of the function",
                "A declaration of the function before its use",
                "A function that returns a pointer",
                "A function with no return type"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is the correct way to declare a function that returns an integer and takes two integers as arguments?",
            options: [
                "int function(int, int);",
                "function int(int, int);",
                "int function();",
                "int function(int, char);"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which of the following is not a valid function return type in C?",
            options: [
                "void",
                "int",
                "struct",
                "function"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "Which of the following statements about #include <stdio.h> is FALSE?",
            options: [
                "It is a preprocessor directive.",
                "It includes the standard input/output header file.",
                "It must end with a semicolon (;).",
                "It is processed before compilation starts"
            ],
            correctAnswer: 2
        },
        {
            type: "multi-attempt",
            question: "What is the output of this code snippet?",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Answer:",
                    placeholder: "State your answer",
                    correctAnswer: "Compile-time error",

                    // PRIMARY — canonical answer
                    tokens: ["compile", "time", "error"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["compile", "-", "time", "error"],
                        ["3"]
                    ]
                }
            ]
        },
        {
            type: "multi-attempt",
            question: "Sequence of Program Development Life Cycle (PDLC).\n\n_____ > _____ > _____ > _____ > _____.",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Answer:",
                    placeholder: "e.g. Step1, Step2, Step3, Step4, Step5",
                    correctAnswer: "Analysis, Design, Implementation, Testing, Maintenance",

                    // PRIMARY — canonical answer
                    tokens: ["Analysis", "Design", "Implementation", "Testing", "Maintenace"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["Analysis", "Design", "Implementation", "Debugging", "Maintenace"],
                        ["Analysis", "Design", "Coding", "Testing", "Maintenace"],
                        ["Analysis", "Design", "Coding", "Debugging", "Maintenace"]
                    ]
                }
            ]
        }
    ],

    // ── SET 4 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "The control structure visually can be shown on the _________.",
            options: [
                "Flowchart",
                "Algorithm",
                "Pseudocode",
                "C code"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What are the forms of control structure?",
            options: [
                "Sequence structure",
                "Selection structure",
                "Iteration structure",
                "All of the above"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "These statements perform tasks repeatedly except.",
            options: [
                "switch",
                "while",
                "for",
                "do.....while"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Why indention is highly recommend even if it is optional?",
            options: [
                "To avoid syntax error",
                "To emphasize the inherent structure",
                "To avoid logical error",
                "To represent a flow in algorithm"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which statement suits a sentinel-controlled structure?",
            options: [
                "keep processing data for a specified number of times",
                "keep processing data until a special value indicates the process should stop",
                "keep processing data until a special value input by the user to indicates the process should stop",
                "None of the above"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "If statement also be called __________.",
            options: [
                "single-selection statement",
                "multiple-selection statement",
                "single-expression statement",
                "normal-selection statement"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which statement executed in a loop, skips the remaining statements in that control statement's body and perform the next iteration of the loop?",
            options: [
                "do...while iteration statement",
                "break statement",
                "while iteration statement",
                "continue statement"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "If the increment expression in a for statement is a negative value, the loop will count ________.",
            options: [
                "stop",
                "upward",
                "downward",
                "reset"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "Describe what occur when the loop-continuation condition never becomes false.",
            options: [
                "Out of control loops",
                "Infinite loops",
                "Error loops",
                "Sentinel loops"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "When do you use null statement?",
            options: [
                "whenever, wherever the programmer want for aesthetic purposes",
                "a statement that consists of just a semicolon (;)",
                "in situations where the syntax demands a statement but not require any actual operation",
                "when the conditional expression's value if the condition is true"
            ],
            correctAnswer: 2
        },
        // ── SYNTAX TABLE EXAMPLE ──
        // Use this type for "write the correct syntax" fill-in-the-blanks table questions.
        // headers[]: column headings (3 columns)
        // rows[]: each row has a label + 3 cells
        //   cell.tokens[]     — token sequence the cell must match (supports altTokenSets too)
        //   cell.keywords[]   — simpler word-match alternative
        //   cell.placeholder  — hint text shown in the input box
        {
            type: "syntax-table",
            question: "Write the correct syntax for each control structure.",
            maxAttempts: 3,
            headers: ["Blank 1", "Blank 2", "Blank 3"],
            rows: [
                {
                    label: "if statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3"],
                    cells: [
                        { keywords: ["if"], placeholder: "keyword" },
                        { keywords: ["condition"], placeholder: "(condition)" },
                        { keywords: ["statement"], placeholder: "(statement)" }
                    ]
                },
                {
                    label: "if-else statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
                    cells: [
                        { keywords: ["if"], placeholder: "keyword" },
                        { keywords: ["condition"], placeholder: "(condition)" },
                        { keywords: ["statement"], placeholder: "(statement)" },
                        { keywords: ["else"], placeholder: "else" },
                        { keywords: ["statement"], placeholder: "(statement)" }
                    ]
                },
                {
                    label: "else-if statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5", "Answer 6"],
                    cells: [
                        { keywords: ["if"], placeholder: "keyword" },
                        { keywords: ["condition"], placeholder: "(condition)" },
                        { keywords: ["statement"], placeholder: "(statement)" },
                        { keywords: ["else if"], placeholder: "else-if" },
                        { keywords: ["condition"], placeholder: "(condition)" },
                        { keywords: ["statement"], placeholder: "(statement)" }
                    ]
                },
                {
                    label: "while statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3"],
                    cells: [
                        { keywords: ["while"], placeholder: "keyword" },
                        { keywords: ["condition"], placeholder: "(condition)" },
                        { keywords: ["statement"], placeholder: "(statement)" }
                    ]
                },
                {
                    label: "do-while statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    cells: [
                        { keywords: ["do"], placeholder: "keyword" },
                        { keywords: ["statement"], placeholder: "(statement)" },
                        { keywords: ["while"], placeholder: "while" },
                        { keywords: ["condition"], placeholder: "(condition)" }
                    ]
                },
                {
                    label: "for statement",
                    placeholders: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
                    cells: [
                        { keywords: ["for"], placeholder: "keyword" },
                        { keywords: ["initialization"], placeholder: "initialization;" },
                        { keywords: ["condition"], placeholder: "condition;" },
                        { keywords: ["increment"], placeholder: "increment" },
                        { keywords: ["statement"], placeholder: "(statement)" }
                    ]
                }
            ]
        }
    ],

    // ── SET 5 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "Describe the process when a called function completes its task.",
            options: [
                "Terminates program execution normally",
                "Aborts program execution",
                "Logs its result",
                "Returns to the calling function"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "What is the result of the function sqrt(16) in C? Assuming proper inclusion of the math library.",
            options: [
                "4",
                "8",
                "2",
                "Error"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What is the difference between function arguments and parameters?",
            options: [
                "Function parameters declaration are the function before its actual definition. Whereas, function arguments are any statements after return statement will not execute",
                "Function parameters are any statements after return statement will not execute. Whereas, function arguments are the function before its actual definition.",
                "Function parameters are the values declared in a function declaration. Whereas, function arguments are the values that are passed in the function during the function call.",
                "Function parameters are the values that are passed in the function during the function call. Whereas, function arguments are the values declared in a function declaration."
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "The function scanf( ) returns ________.",
            options: [
                "The actual values read for each argument",
                "1",
                "The number of successful read input values",
                "ASCII value of the input read"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What does the return statement do in a C function?",
            options: [
                "Ends the program",
                "Returns a value from the function",
                "Prints output",
                "Declares a variable"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is the proper function prototype for: double mySqrt(int x );",
            options: [
                "Defines a function called mySqrt which takes an integer argument and returns a double",
                "Defines a function called double which calculates square roots",
                "Defines a function called mySqrt which takes an argument of type x and returns and double"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What is the primary purpose of using functions in C?",
            options: [
                "To declare variables",
                "To organize code into manageable units",
                "To print output",
                "To define constants"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What does a function prototype in C include?",
            options: [
                "Function body",
                "Function name",
                "Function parameters",
                "All of the above"
            ],
            correctAnswer: 3
        },
        {
            type: "syntax-table",
            question: "Please identify function call, function header and function protoype.\n\n#include <stdio.h>\nvoid first();\nint main()\n{\n\tprintf('From main\\n');\n\tfirst();\n\n\treturn 0;\n}\nvoid first()\n{\n\tprintf('I go to first function\\n');\n}",
            maxAttempts: 3,
            headers: ["Function Call", "Function Header", "Function Prototype"],
            rows: [
                {
                    label: "State your answer properly:",
                    placeholders: ["Your answer", "Your answer", "Your answer"],
                    cells: [
                        { keywords: ["first();"], correctAnswer: "first();", placeholder: "" },
                        { keywords: ["int main()"], altKeywords: [["void first()"]], correctAnswer: "int main() or void first()", placeholder: "" },
                        { keywords: ["void first();"], correctAnswer: "void first();", placeholder: "" }
                    ]
                }
            ]
        }
    ],

    // ── SET 6 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "Define the location at position number of second element in Arrays.",
            options: [
                "0",
                "1",
                "2",
                "3"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Symbolic constant SIZE with the value 10 can be initialised by the syntax of _______.",
            options: [
                "#include SIZE 10",
                "#define SIZE 10",
                "#declare SIZE 10",
                "#default SIZE 10"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Define one of the Array attributes.",
            options: [
                "Size can be changed in runtime",
                "Must be the same data type",
                "Cannot store a character string",
                "Limited to 20 element"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What will produce if the bracket [] missing in the declaration of Array?",
            options: [
                "logic error",
                "syntax error",
                "runtime error",
                "machine error"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "In an array, three rows and four columns will produce _______",
            options: [
                "4-by-3 array",
                "3-by-4 array",
                "4-in-3 array",
                "3-in-4 array"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is the total number of elements stored in matrix[3][4]?",
            options: [
                "7",
                "10",
                "12",
                "14"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is the correct way to declare an integer array of size 10 in C?",
            options: [
                "int array[10]",
                "array int[10]",
                "int[10] array",
                "array[10] int"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "In C, array indexing starts from which number?",
            options: [
                "0",
                "1",
                "-1",
                "any number"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What does a[i][j] represent for?",
            options: [
                "i = row, j = column",
                "i = array1, j = array2",
                "i = column, j = row",
                "i = rows, j = cols"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "Which of the following in not a valid way to declare an array.",
            options: [
                "int arr[10]",
                "int arr[] = {1,2,3}",
                "int arr[0]",
                "int arr[5] = {1,2,3}"
            ],
            correctAnswer: 2
        },
        {
            type: "multi-attempt",
            question: "Write the snippet code to declare an integer array of size 5 that contains garbage values.",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Write your code:",
                    placeholder: "Your answer",
                    correctAnswer: "int arr[5];",

                    // PRIMARY — canonical answer
                    tokens: ["int", "arr[5];"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["int", "arr", "[", "5", "]", ";"],
                        ["int", "arr", "[5]", ";"],
                        ["int", "arr", "[5];"]
                    ]
                }
            ]
        },
        {
            type: "multi-attempt",
            question: "Define the index and the value of the code snippet below:\n\nnumber[5] = {1,2,3,4,5};",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Index:",
                    placeholder: "e.g. number 1, number 2, number 3...",
                    correctAnswer: "0 1 2 3 4",

                    // PRIMARY — canonical answer
                    tokens: ["0", "1", "2", "3", "4"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["0", " 1", " 2", " 3", " 4"],
                        ["01234"]
                    ]
                },
                {
                    label: "Value:",
                    placeholder: "e.g. number 1, number 2, number 3...",
                    correctAnswer: "1 2 3 4 5",

                    // PRIMARY — canonical answer
                    tokens: ["1", "2", "3", "4", "5"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["1", " 2", " 3", " 4", " 5"],
                        ["12345"]
                    ]
                }
            ]
        }
    ],

    // ── SET 7 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "What is the purpose of the strcmp() function?",
            options: [
                "Compare the first n characters of the object",
                "Compares the string",
                "Undefined function",
                "Copies the string"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "In a string, backslash n (\\n) is_______",
            options: [
                "a special character",
                "a line comment",
                "an instruction to new line",
                "a block comment"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is a string in C programming?",
            options: [
                "A collection of characters",
                "A data type",
                "A numeric variable",
                "A mathematical operation"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "The toupper() function converts a/an _______ to the corresponding _______.",
            options: [
                "uppercase; lowercase",
                "lowercase; uppercase",
                "binary; decimal",
                "decimal; binary"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "How can you check if the two strings are equal in C?",
            options: [
                "Use the == operator",
                "Use the strcmp function",
                "Use the equals function",
                "Use the = operator"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "How are strings represented in C?",
            options: [
                "As arrays of integers",
                "As arrays of characters",
                "As single characters",
                "As floating-point numbers"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What is the null terminator in a string?",
            options: [
                "'\\n'",
                "'\\t'",
                "'\\0'",
                "'\\v'"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is the correct way to compare two strings in C?",
            options: [
                "str1 == str2",
                "compare(str1, str2)",
                "strcmp(str1, str2)",
                "str1 > str2"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "How do you concatenate two strings in C?",
            options: [
                "strcat(str1, str2);",
                "concat(str1, str2);",
                "str1 + str2;",
                "str1.concat(str2);"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What will happen if you use strncpy() without adding a null terminator (\\0) manually?",
            options: [
                "The extracted string may contain extra characters from memory",
                "The extracted string will always be properly terminated",
                "Compilation error will occur",
                "It will only copy the characters specified without affecting termination"
            ],
            correctAnswer: 0
        }
    ],

    // ── SET 8 ─────────────────────────────────────────
    [
        {
            type: "multiple-choice",
            question: "What is the correct syntax to declare a pointer to an integer in C?",
            options: [
                "int ptr;",
                "int *ptr;",
                "pointer int ptr;",
                "int &ptr;"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What will be the value of x after the following operation? x = 10 / 4;",
            options: [
                "2.5",
                "2",
                "3",
                "4"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "What will be the output of printf(\"%d\", sizeof(int)) on a 32-bit system?",
            options: [
                "2",
                "4",
                "8",
                "16"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which loop executes at least once, regardless of the condition?",
            options: [
                "for loop",
                "while loop",
                "do-while loop",
                "None of the above"
            ],
            correctAnswer: 2
        },
        {
            type: "multiple-choice",
            question: "What is the purpose of the malloc() function in C?",
            options: [
                "Allocates memory and initializes to zero",
                "Allocates memory dynamically",
                "Deallocates memory",
                "Copies memory"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which of the following correctly declares an array of 10 integers in C?",
            options: [
                "int arr[10];",
                "array arr[10];",
                "int arr = 10;",
                "arr[10] int;"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What will be the output of the following code?\n\nint x = 5;\nif (x > 3)\n    printf(\"Yes\");\nelse\n    printf(\"No\");",
            options: [
                "No",
                "Yes",
                "Compilation error",
                "Undefined"
            ],
            correctAnswer: 1
        },
        {
            type: "multiple-choice",
            question: "Which of the following functions is used to read a string in C?",
            options: [
                "scanf()",
                "gets()",
                "fgets()",
                "Both B and C"
            ],
            correctAnswer: 3
        },
        {
            type: "multiple-choice",
            question: "Which header file is required for using the printf() function in C?",
            options: [
                "stdio.h",
                "conio.h",
                "string.h",
                "math.h"
            ],
            correctAnswer: 0
        },
        {
            type: "multiple-choice",
            question: "What is the default return type of the main() function in C?",
            options: [
                "void",
                "int",
                "float",
                "char"
            ],
            correctAnswer: 1
        },
        {
            type: "multi-attempt",
            question: "Construct a statement to declare and initialise the string 'Hello' as an array in C program.",
            maxAttempts: 5,
            maxMarks: 5,
            fields: [
                {
                    label: "Statement:",
                    placeholder: "Your answer",
                    correctAnswer: "char str[] = 'Hello';",

                    // PRIMARY — canonical answer
                    tokens: ["char", "str[]", "=", "'Hello'", ";"],

                    // ALTERNATIVES — any one of these also counts as fully correct.
                    // The engine picks whichever best matches what the student typed.
                    altTokenSets: [
                        ["char", "str[]", "=", "'Hello'", ";"],
                        ["char", "str", "[]", "=", "'Hello'", ";"],
                        ["char", "str", "[", "]", "=", "'Hello'", ";"],
                        ["char", "str[]", "=", "'Hello';"],
                        ["char", "str", "[", "]", "=", "'Hello';"],
                        ["char", "str", "[]", "=", "'Hello';"],

                        ["char", "str[]", "=", "\"Hello\"", ";"],
                        ["char", "str", "[]", "=", "\"Hello\"", ";"],
                        ["char", "str", "[", "]", "=", "\"Hello\"", ";"],
                        ["char", "str[]", "=", "\"Hello\";"],
                        ["char", "str", "[", "]", "=", "\"Hello\";"],
                        ["char", "str", "[]", "=", "\"Hello\";"],
                    ]
                }
            ]
        }
    ]

]; // end allSets

// ============================================================
// STATE
// ============================================================
const state = {
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    questionAttempts: {},
    questionMarks: {},
    questionSolved: {},
    setIndex: 0
};


// ============================================================
// BOOT — read ?set=N from URL, then init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const params  = new URLSearchParams(window.location.search);
    const setNum  = parseInt(params.get('set')) || 1;
    const clamped = Math.max(1, Math.min(8, setNum));
    state.setIndex = clamped - 1;

    document.getElementById('setBadgeText').textContent   = `Set ${clamped}`;
    document.getElementById('quizTitle').textContent      = `Exercise - Set ${clamped}`;
    document.getElementById('resultSetLabel').textContent = `Set ${clamped}`;
    document.title = `Set ${clamped} | Exercise | Explorgramming`;

    document.getElementById('retryBtn').addEventListener('click', () => {
        window.location.href = `exercise-quiz.html?set=${clamped}`;
    });

    initQuiz();
});


// ============================================================
// INIT
// ============================================================
function initQuiz() {
    const quizData = allSets[state.setIndex];

    state.userAnswers = new Array(quizData.length).fill(null);
    quizData.forEach((q, i) => {
        if (q.type === 'multi-attempt') {
            state.questionAttempts[i] = 0;
            state.questionMarks[i]    = q.maxMarks;
            state.questionSolved[i]   = false;
        } else if (q.type === 'syntax-table') {
            state.questionAttempts[i] = 0;
            state.questionMarks[i]    = q.rows.length; // 1 mark per row
        } else {
            state.questionMarks[i] = 1;
        }
    });

    document.getElementById('totalQuestions').textContent = quizData.length;
    renderQuestions(quizData);
    showQuestion(0, quizData);
    initNavigation(quizData);
}


// ============================================================
// RENDER ALL QUESTIONS
// ============================================================
function renderQuestions(quizData) {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        const marksText    = q.type === 'multi-attempt' ? `(${q.maxMarks} marks)` : '(1 mark)';
        const doubleNL     = q.question.indexOf('\n\n');
        const label        = doubleNL !== -1 ? q.question.slice(0, doubleNL) : q.question;
        const embeddedCode = doubleNL !== -1 ? q.question.slice(doubleNL + 2) : null;

        let html = `<div class="question-text">${index + 1}. ${label} <span style="color:#64748b;font-weight:500;">${marksText}</span></div>`;

        if (embeddedCode || q.code) html += `<pre class="question-code" id="code-${index}"></pre>`;
        if (q.image) html += `<div class="question-image"><img src="${q.image}" alt="Question image"></div>`;

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
                        placeholder="${field.placeholder || 'Type your answer...'}"
                        autocomplete="off">
                </div>`;
            });

            html += `</div>
                    <button class="btn btn-check" data-question="${index}" id="check-btn-${index}">
                        <i class="fas fa-check"></i> Check Answer
                    </button>
                    <div class="attempt-feedback" id="feedback-${index}"></div>
                </div>
            </div>`;

        } else if (q.type === 'short-answer') {
            html += `<textarea class="short-answer" data-question="${index}"
                placeholder="Type your answer here..." rows="5"></textarea>`;

        } else if (q.type === 'syntax-table') {
            const headers   = q.headers || ['Part 1', 'Part 2', 'Part 3'];
            const maxAtt    = q.maxAttempts || 3;
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
                <div class="syntax-table-head">
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

        questionDiv.innerHTML = html;

        if (embeddedCode || q.code) {
            const cb = questionDiv.querySelector(`#code-${index}`);
            if (cb) cb.textContent = embeddedCode || q.code;
        }

        container.appendChild(questionDiv);
    });

    addAnswerListeners(quizData);
}


// ============================================================
// ANSWER LISTENERS
// ============================================================
function addAnswerListeners(quizData) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => {
            const qi = parseInt(opt.dataset.question);
            document.querySelectorAll(`.option[data-question="${qi}"]`).forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            state.userAnswers[qi] = parseInt(opt.dataset.option);
        });
    });

    document.querySelectorAll('.text-input:not(.blank-input):not(.attempt-input)').forEach(inp => {
        inp.addEventListener('input', () => {
            state.userAnswers[parseInt(inp.dataset.question)] = inp.value;
        });
    });

    document.querySelectorAll('.blank-input').forEach(inp => {
        inp.addEventListener('input', () => {
            const qi = parseInt(inp.dataset.question);
            const bi = parseInt(inp.dataset.blank);
            if (!Array.isArray(state.userAnswers[qi]))
                state.userAnswers[qi] = new Array(quizData[qi].blanks.length).fill('');
            state.userAnswers[qi][bi] = inp.value;
        });
    });

    document.querySelectorAll('.short-answer').forEach(ta => {
        ta.addEventListener('input', () => {
            state.userAnswers[parseInt(ta.dataset.question)] = ta.value;
        });
    });

    document.querySelectorAll('.btn-check:not(.syntax-check-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            checkMultiAttemptAnswer(parseInt(btn.dataset.question), quizData);
        });
    });

    document.querySelectorAll('.syntax-check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            checkSyntaxTable(parseInt(btn.dataset.question), quizData);
        });
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
// TOKENISE + DIFF
// ============================================================
function tokenise(str) {
    const tokens = [];
    const re = /'[^']*'|"[^"]*"|[A-Za-z0-9_%]+|[^A-Za-z0-9_\s]/g;
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
        tokens:    result,
        isPartial: found > 0 && found < expectedTokens.length,
        isCorrect: found === expectedTokens.length
    };
}

// ============================================================
// CHECK FIELD WITH ALTERNATIVES
// Tries field.tokens (primary) and every set in field.altTokenSets.
// Returns the best result — correct > partial > most tokens matched.
// ============================================================
function checkFieldTokens(ua, field) {
    const allSets = [field.tokens];
    if (field.altTokenSets && Array.isArray(field.altTokenSets)) {
        field.altTokenSets.forEach(s => allSets.push(s));
    }

    let best = null;
    for (const tokenSet of allSets) {
        const result = diffTokens(ua, tokenSet);
        if (!best
            || result.isCorrect
            || (!best.isCorrect && result.isPartial && !best.isPartial)
            || (!best.isCorrect && !best.isPartial
                && result.tokens.filter(t => t.found).length
                   > best.tokens.filter(t => t.found).length)) {
            best = result;
        }
        if (best.isCorrect) break;
    }
    return best;
}

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// ============================================================
// CHECK SYNTAX TABLE
// Each row has 3 cells. Each cell is token-checked independently.
// A row is correct when all its cells pass.
// Correct cells lock green; wrong cells flash red but stay editable.
// Score = number of fully correct rows (each row = 1 mark).
// ============================================================
function checkSyntaxTable(questionIndex, quizData) {
    const question    = quizData[questionIndex];
    const maxAttempts = question.maxAttempts || 3;
    const feedback    = document.getElementById(`syntax-feedback-${questionIndex}`);
    const btn         = document.getElementById(`syntax-btn-${questionIndex}`);

    // Increment attempt counter
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
            if (inp.disabled) return; // already locked correct

            const ua = (rowValues[ri] && rowValues[ri][ci]) || '';
            let cellOk = false;

            if (cell.tokens) {
                const result = checkFieldTokens(ua, cell);
                cellOk = result.isCorrect;
                if (!cellOk) {
                    if (result.isPartial) {
                        inp.style.borderColor = '#f59e0b';
                        setTimeout(() => { inp.style.borderColor = ''; }, 1200);
                    } else {
                        inp.style.borderColor = '#ef4444';
                        setTimeout(() => { inp.style.borderColor = ''; }, 1200);
                    }
                }
            } else if (cell.keywords) {
                const lower = ua.toLowerCase();
                // Primary keywords must all match, OR any one altKeywords set must all match
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

    // Count correct rows — only rows where ALL cells are green (syntax-correct), not revealed
    let correctRows = 0;
    question.rows.forEach((row, ri) => {
        const allCorrect = row.cells.every((_, ci) => {
            const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
            return inp && inp.disabled && inp.classList.contains('syntax-correct');
        });
        if (allCorrect) correctRows++;
    });

    const allCorrect = correctRows === question.rows.length;

    // Update marks counter (= correct rows earned)
    document.getElementById(`syntax-rows-${questionIndex}`).textContent = correctRows;

    // Save state
    state.userAnswers[questionIndex] = rowValues;

    if (allCorrect) {
        // All done — lock button, show success
        btn.disabled = true;
        btn.style.opacity = '0.5';
        if (feedback) {
            feedback.innerHTML = `<span class="syntax-result correct">
                <i class="fas fa-check-circle"></i> All correct! ${correctRows}/${question.rows.length} marks earned.
            </span>`;
        }

    } else if (attempt >= maxAttempts) {
        // Out of attempts — lock everything and reveal correct answers
        btn.disabled = true;
        btn.style.opacity = '0.5';

        question.rows.forEach((row, ri) => {
            row.cells.forEach((cell, ci) => {
                const inp = document.querySelector(`.syntax-cell-input[data-question="${questionIndex}"][data-row="${ri}"][data-cell="${ci}"]`);
                if (!inp) return;
                if (!inp.disabled) {
                    // Show the correct answer in blue
                    const correct = cell.correctAnswer
                        || (cell.tokens ? cell.tokens.join(' ') : (cell.keywords ? cell.keywords[0] : ''));
                    inp.value    = correct;
                    inp.disabled = true;
                    inp.classList.add('syntax-revealed');
                }
            });
        });

        if (feedback) {
            feedback.innerHTML = `<span class="syntax-result revealed">
                <i class="fas fa-lightbulb"></i>
                Out of attempts — ${correctRows}/${question.rows.length} marks earned. Correct answers shown in blue.
            </span>`;
        }

    } else {
        // Still attempts left
        const remaining = maxAttempts - attempt;
        if (feedback) {
            feedback.innerHTML = `<span class="syntax-result partial">
                <i class="fas fa-pencil-alt"></i>
                ${correctRows}/${question.rows.length} marks earned -
                ${remaining} attempt${remaining > 1 ? 's' : ''} remaining
            </span>`;
        }
    }
}


// ============================================================
// CHECK MULTI-ATTEMPT ANSWER
// ============================================================
function checkMultiAttemptAnswer(questionIndex, quizData) {
    const question       = quizData[questionIndex];
    const currentAttempt = state.questionAttempts[questionIndex] + 1;
    const inputs         = document.querySelectorAll(`.attempt-input[data-question="${questionIndex}"]`);
    const userAnswers    = [];
    inputs.forEach(inp => userAnswers.push(inp.value.trim()));

    const fieldResults = question.fields.map((field, idx) => {
        const ua = userAnswers[idx];
        let isCorrect = false, isPartial = false, diff = null;

        if (field.tokens) {
            // Use checkFieldTokens so altTokenSets are also tried
            diff      = checkFieldTokens(ua, field);
            isCorrect = diff.isCorrect;
            isPartial = diff.isPartial;
        } else {
            const lower = ua.toLowerCase();
            isCorrect   = (field.keywords || []).every(k => lower.includes(k.toLowerCase()));
        }

        return { isCorrect, isPartial, userAnswer: ua, diff };
    });

    const allCorrect = fieldResults.every(r => r.isCorrect);

    state.questionAttempts[questionIndex] = currentAttempt;
    document.getElementById(`attempts-${questionIndex}`).textContent = currentAttempt;

    if (!allCorrect) {
        state.questionMarks[questionIndex] = Math.max(0, question.maxMarks - currentAttempt);
        document.getElementById(`marks-${questionIndex}`).textContent = state.questionMarks[questionIndex];
    }

    state.userAnswers[questionIndex] = {
        answers:  userAnswers,
        correct:  allCorrect,
        attempts: currentAttempt,
        marks:    allCorrect ? state.questionMarks[questionIndex] : 0
    };

    // Build history entry
    const historyContainer = document.getElementById(`history-${questionIndex}`);
    const item = document.createElement('div');
    item.className = `attempt-history-item${allCorrect ? '' : ' has-error'}`;

    let h = `<div class="attempt-history-label">Attempt ${currentAttempt}</div><div class="attempt-history-fields">`;
    fieldResults.forEach((result, idx) => {
        const field   = question.fields[idx];
        const cls     = result.isCorrect ? 'correct' : result.isPartial ? 'partial' : 'incorrect';
        const icon    = result.isCorrect ? 'fa-check-circle' : result.isPartial ? 'fa-circle-half-stroke' : 'fa-times-circle';
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

    } else if (currentAttempt >= question.maxAttempts) {
        const ci = document.createElement('div');
        ci.className = 'attempt-history-item';
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

        state.questionMarks[questionIndex]     = 0;
        state.userAnswers[questionIndex].marks = 0;
        document.getElementById(`marks-${questionIndex}`).textContent = 0;
        document.getElementById(`new-attempt-${questionIndex}`).style.display = 'none';

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
        const fb = document.getElementById(`feedback-${questionIndex}`);
        if (fb) fb.style.display = 'none';
    }
}


// ============================================================
// SHOW QUESTION
// ============================================================
function showQuestion(index, quizData) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');
    state.currentQuestionIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('progressFill').style.width =
        `${((index + 1) / quizData.length) * 100}%`;
    updateNav(quizData);
    restoreAnswer(index, quizData);
}

function restoreAnswer(index, quizData) {
    const saved = state.userAnswers[index];
    const q     = quizData[index];
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
function initNavigation(quizData) {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex > 0)
            showQuestion(state.currentQuestionIndex - 1, quizData);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex < quizData.length - 1)
            showQuestion(state.currentQuestionIndex + 1, quizData);
    });
    document.getElementById('submitBtn').addEventListener('click', () => submitQuiz(quizData));
}

function updateNav(quizData) {
    const prev   = document.getElementById('prevBtn');
    const next   = document.getElementById('nextBtn');
    const submit = document.getElementById('submitBtn');
    prev.disabled = state.currentQuestionIndex === 0;
    if (state.currentQuestionIndex === quizData.length - 1) {
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
function submitQuiz(quizData) {
    calculateScore(quizData);
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    const totalMarks = quizData.reduce((s, q) => {
        if (q.type === 'multi-attempt') return s + q.maxMarks;
        if (q.type === 'syntax-table')  return s + q.rows.length;
        return s + 1;
    }, 0);
    document.getElementById('scoreNumber').textContent       = state.score;
    document.getElementById('scoreTotalDisplay').textContent = totalMarks;
    const pct = totalMarks > 0 ? Math.round((state.score / totalMarks) * 100) : 0;
    document.getElementById('percentageScore').textContent = `${pct}%`;
}

function calculateScore(quizData) {
    state.score = 0;
    quizData.forEach((q, i) => {
        const ua = state.userAnswers[i];
        if (q.type === 'multiple-choice') {
            if (ua === q.correctAnswer) state.score++;
        } else if (q.type === 'fill-blank') {
            if (ua) {
                const norm = ua.toLowerCase().trim();
                const kws  = q.keywords || [q.correctAnswer];
                if (kws.some(k => norm === k.toLowerCase())) state.score++;
            }
        } else if (q.type === 'multiple-fill-blank') {
            if (Array.isArray(ua)) {
                let ok = true;
                q.blanks.forEach((blank, bi) => {
                    const a = ua[bi];
                    if (!a) { ok = false; return; }
                    const kws = blank.keywords || [blank.correctAnswer];
                    if (!kws.some(k => a.toLowerCase().trim() === k.toLowerCase())) ok = false;
                });
                if (ok) state.score++;
            }
        } else if (q.type === 'multi-attempt') {
            if (ua && ua.correct) state.score += ua.marks;
        } else if (q.type === 'short-answer') {
            if (ua) {
                const norm  = ua.toLowerCase();
                const found = q.keywords.filter(k => norm.includes(k.toLowerCase()));
                if (found.length >= q.minKeywords) state.score++;
            }
        } else if (q.type === 'syntax-table') {
            // 1 mark per fully correct row (revealed-in-blue rows don't count)
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
