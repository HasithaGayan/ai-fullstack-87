
console.log("----- Day 16: Browser Calculator -----");

// ===================================
// 1. SELECT HTML ELEMENTS
// ===================================

const display = document.querySelector("#display");
const keypad = document.querySelector(".keypad");

// ===================================
// 2. CALCULATOR STATE
// ===================================

let currentInput = "0";
let previousNumber = null;
let operator = null;
let startNewNumber = false;

// ===================================
// 3. UPDATE DISPLAY
// ===================================

function updateDisplay() {
  // Show the full calculation.
  if (operator !== null && previousNumber !== null) {
    const secondNumber = startNewNumber ? "" : currentInput;

    display.textContent =
      `${previousNumber} ${operator} ${secondNumber}`.trim();
  } else {
    display.textContent = currentInput;
  }

  // NEW: Highlight calculation errors in red.
  const isError = currentInput === "Error";

  display.style.color = isError ? "#fb7185" : "#22c55e";

  display.style.backgroundColor = isError
    ? "#450a0a"
    : "#020617";

  display.style.boxShadow = isError
    ? "inset 0 0 0 2px #fb7185"
    : "none";
}

// ===================================
// 4. CLEAR CALCULATOR
// ===================================

function clearCalculator() {
  currentInput = "0";
  previousNumber = null;
  operator = null;
  startNewNumber = false;

  updateDisplay();
}

// ===================================
// 5. ADD NUMBER
// ===================================

function addNumber(number) {
  if (startNewNumber || currentInput === "Error") {
    currentInput = number;
    startNewNumber = false;
  } else if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

// ===================================
// 6. ADD DECIMAL POINT
// ===================================

function addDecimal() {
  if (startNewNumber || currentInput === "Error") {
    currentInput = "0.";
    startNewNumber = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }

  updateDisplay();
}

// ===================================
// 7. DELETE LAST CHARACTER
// ===================================

function deleteNumber() {
  if (currentInput === "Error") {
    clearCalculator();
    return;
  }

  if (operator !== null && startNewNumber) {
    currentInput = String(previousNumber);
    previousNumber = null;
    operator = null;
    startNewNumber = false;
  } else {
    currentInput = currentInput.slice(0, -1);

    if (currentInput === "" || currentInput === "-") {
      currentInput = "0";
    }
  }

  updateDisplay();
}

// ===================================
// 8. CALCULATION LOGIC
// ===================================

function calculate(first, second, operation) {
  let result;

  switch (operation) {
    case "+":
      result = first + second;
      break;

    case "-":
      result = first - second;
      break;

    case "*":
      result = first * second;
      break;

    case "/":
      if (second === 0) {
        return "Error";
      }

      result = first / second;
      break;

    default:
      return "Error";
  }

  if (!Number.isFinite(result)) {
    return "Error";
  }

  return Number(result.toPrecision(12));
}

// ===================================
// 9. CHOOSE OPERATOR
// ===================================

function chooseOperator(selectedOperator) {
  if (currentInput === "Error") {
    return;
  }

  // Finish a pending calculation first.
  if (operator !== null && !startNewNumber) {
    const result = calculate(
      previousNumber,
      Number(currentInput),
      operator
    );

    if (result === "Error") {
      currentInput = "Error";
      previousNumber = null;
      operator = null;
      startNewNumber = true;

      updateDisplay();
      return;
    }

    currentInput = String(result);
  }

  previousNumber = Number(currentInput);
  operator = selectedOperator;
  startNewNumber = true;

  updateDisplay();
}

// ===================================
// 10. SHOW RESULT
// ===================================

function showResult() {
  if (operator === null || startNewNumber) {
    return;
  }

  const result = calculate(
    previousNumber,
    Number(currentInput),
    operator
  );

  currentInput = String(result);
  previousNumber = null;
  operator = null;
  startNewNumber = true;

  updateDisplay();
}

// ===================================
// 11. HANDLE BUTTON CLICKS
// ===================================

keypad.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button || !keypad.contains(button)) {
    return;
  }

  const value = button.dataset.value;
  const action = button.dataset.action;

  // AC button
  if (action === "clear") {
    clearCalculator();
    return;
  }

  // DEL button
  if (action === "delete") {
    deleteNumber();
    return;
  }

  // Equals button
  if (action === "equals") {
    showResult();
    return;
  }

  // Decimal button
  if (value === ".") {
    addDecimal();
    return;
  }

  // Number buttons
  if (value && /^[0-9]$/.test(value)) {
    addNumber(value);
    return;
  }

  // Arithmetic operators
  if (["+", "-", "*", "/"].includes(value)) {
    chooseOperator(value);
  }
});

// ===================================
// 12. INITIAL DISPLAY
// ===================================

updateDisplay();

// ===================================
// 13. KEYBOARD SUPPORT
// ===================================

console.log("----- Keyboard Support Enabled -----");

document.addEventListener("keydown", function(event) {
  const key = event.key;

  // Avoid interfering with Ctrl/Alt/Meta shortcuts.
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  // Let focused calculator buttons handle
  // Enter and Space normally.
  if (
    (key === "Enter" || key === " ") &&
    document.activeElement?.closest(".keypad button")
  ) {
    return;
  }

  // Number keys
  if (/^[0-9]$/.test(key)) {
    addNumber(key);
    return;
  }

  // Decimal point
  if (key === ".") {
    addDecimal();
    return;
  }

  // Arithmetic operators
  if (["+", "-", "*", "/"].includes(key)) {
    event.preventDefault();
    chooseOperator(key);
    return;
  }

  // Enter or = calculates the result.
  if (key === "Enter" || key === "=") {
    event.preventDefault();
    showResult();
    return;
  }

  // Backspace deletes the last character.
  if (key === "Backspace") {
    event.preventDefault();
    deleteNumber();
    return;
  }

  // Escape clears everything.
  if (key === "Escape") {
    clearCalculator();
  }
});

// ===================================
// 14. AUTOMATED CALCULATOR TESTS
// ===================================

console.log("----- Day 16: Automated Calculator Tests -----");

const calculatorTests = [
  [
    "Addition",
    calculate(7, 3, "+") === 10
  ],
  [
    "Subtraction",
    calculate(9, 4, "-") === 5
  ],
  [
    "Multiplication",
    calculate(6, 7, "*") === 42
  ],
  [
    "Division",
    calculate(8, 2, "/") === 4
  ],
  [
    "Division by zero",
    calculate(8, 0, "/") === "Error"
  ],
  [
    "Decimal arithmetic",
    calculate(0.1, 0.2, "+") === 0.3
  ],
  [
    "Invalid operator",
    calculate(5, 3, "?") === "Error"
  ]
];

let passedTests = 0;

calculatorTests.forEach(([name, passed]) => {
  if (passed) {
    console.log(`${name}: PASS ✅`);
    passedTests++;
  } else {
    console.error(`${name}: FAIL ❌`);
  }
});

console.log(
  `Tests passed: ${passedTests} / ${calculatorTests.length}`
);





// ===================================
// 15. DYNAMIC KEYBOARD HELP
// ===================================

// Create a new button using JavaScript.
const helpButton = document.createElement("button");

helpButton.type = "button";
helpButton.textContent = "⌨ Show Keyboard Shortcuts";
helpButton.style.gridColumn = "1 / -1";
helpButton.style.padding = "12px";
helpButton.setAttribute("aria-expanded", "false");

// Add the button to the calculator keypad.
keypad.append(helpButton);

// Show or hide keyboard instructions.
helpButton.addEventListener("click", function() {
  const existingHelp = document.querySelector("#keyboard-help");

  // If help is visible, remove it.
  if (existingHelp) {
    existingHelp.remove();

    helpButton.textContent = "⌨ Show Keyboard Shortcuts";
    helpButton.setAttribute("aria-expanded", "false");

    return;
  }

  // Create the instructions.
  const helpText = document.createElement("p");

  helpText.id = "keyboard-help";

  helpText.textContent =
    "Keys: 0-9 = Numbers | + - * / = Operators | " +
    "Enter = Calculate | Backspace = Delete | Escape = Clear";

  helpText.style.color = "#cbd5e1";
  helpText.style.fontSize = "14px";
  helpText.style.lineHeight = "1.7";
  helpText.style.textAlign = "center";

  // Place instructions below the keypad.
  keypad.after(helpText);

  helpButton.textContent = "⌨ Hide Keyboard Shortcuts";
  helpButton.setAttribute("aria-expanded", "true");
});
