const output = document.querySelector("#output");
const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equal");
const deleteBtn = document.querySelector("#del");
const clearBtn = document.querySelector("#clear");
const decimalBtn = document.querySelector("#deci");
const history = document.querySelector("#history");

let arr = [];

//click events
numberBtns.forEach((number) => {
  number.addEventListener("click", () => getNumber(number));
});
operationBtns.forEach((operator) => {
  operator.addEventListener("click", () => getOperation(operator));
});
equalBtn.addEventListener("click", () => solve());
deleteBtn.addEventListener("click", () => del());
clearBtn.addEventListener("click", () => clear());
decimalBtn.addEventListener("click", () => getDecimal());

//keyboard events
document.addEventListener("keydown", (e) => {
  numberBtns.forEach((number) => {
    if (e.key == number.textContent) {
      getNumber(number);
    }
  });
  operationBtns.forEach((operator) => {
    if (e.key == operator.textContent) {
      getOperation(operator);
    }
  });
  if (e.key == "=" || e.key == "Enter") {
    solve();
  }
  if (e.key == "Backspace") {
    del();
  }
  if (e.key == "Delete") {
    clear();
  }
  if (e.key == ".") {
    getDecimal();
  }
});

let solve = () => {
  // requires number input before solving
  if (output.textContent[output.textContent.length - 1] == " ") {
    return;
  }

  // store all numbers and operators in array
  arr = output.textContent.split(" ");

  //--- calculate array based on order of operations ---
  // check operator, calculate number before & after
  // replace all 3 items in arr
  // decrement by 1 to check operator again


  //calculate multiplication and division
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "*") {
      arr.splice(i - 1, 3, parseFloat(arr[i - 1]) * parseFloat(arr[i + 1]));
      i--;
    }
    if (arr[i] === "/") {
      arr.splice(i - 1, 3, parseFloat(arr[i - 1]) / parseFloat(arr[i + 1]));
      i--;
    }
  }

  // calculates addition and subtraction
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "+") {
      arr.splice(i - 1, 3, parseFloat(arr[i - 1]) + parseFloat(arr[i + 1]));
      i--;
    }
    if (arr[i] === "-") {
      arr.splice(i - 1, 3, parseFloat(arr[i - 1]) - parseFloat(arr[i + 1]));
      i--;
    }
  }

  // displays calculation and final result
  history.textContent = output.textContent;
  output.textContent = arr[0];
};

let getOperation = (operator) => {
  // changes current operator
  if (output.textContent[output.textContent.length - 1] == " ") {
    output.textContent = output.textContent.slice(0, -3) + ` ${operator.textContent} `;
    return;
  }
  // adds and operator with space around
  output.textContent += ` ${operator.textContent} `;
};

let getNumber = (number) => {
  // input empty display 0 or input a number
  if (output.textContent.length == 1 && output.textContent[0] == "0") {
    output.textContent = number.textContent;
  } else {
    output.textContent += number.textContent;
  }
};

let del = () => {
  // removes operator with additional spacing or removes single number
  if (output.textContent[output.textContent.length - 1] == " ") {
    output.textContent = output.textContent.slice(0, -3);
  } else {
    output.textContent = output.textContent.slice(0, -1);
  }
  output.textContent == "" ? (output.textContent = 0) : "";
};

let clear = () => {
  // clear all inputs and values
  arr = [];
  output.textContent = 0;
  history.textContent = "";
};

let getDecimal = () => {
  // first number can only have 1 decimal
  if (!output.textContent.includes(" ") && output.textContent.includes(".")) {
    return;
  }
  // Every other number can have only 1 decimal
  if (output.textContent.slice(output.textContent.lastIndexOf(" ")).includes(".")) {
    return;
  }
  output.textContent += ".";
};
