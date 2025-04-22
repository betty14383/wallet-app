// !  INPUTS
const dateInput = document.getElementById("date");
const expenseInput = document.getElementById("expenditure");
const expenseTypeInput = document.getElementById("expence-type");
const incomeInput = document.getElementById("income-input");
// ! BUTTONS
const saveBtn = document.getElementById("expance-btn");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
// ! OUTPUTS
const totalIncome = document.getElementById("totalIncome");
const totalIExpence = document.getElementById("totalExpense");
const balance = document.getElementById("balance");
// ! TABLES
const expenceTable = document.getElementById("expence-table");
const resultTable = document.getElementById("result-table");
// ! FORMS
const expenceForm = document.getElementById("expenditure-form");
const incomeForm = document.getElementById("income-form");
//!=========    VARIABLES  ===========
let totalExpenceAmount = 0;
let totalIncomeAmount = 0;
let balanceAmount = 0;
totalIncome.textContent = totalIncomeAmount;
totalIExpence.textContent = totalExpenceAmount;
balance.textContent = balanceAmount;
//!=========    EVENTS  ===========

//*** SAVE BUTTON ***/
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const expence = parseFloat(expenseInput.value);
  const date = dateInput.value;
  const expenceType = expenseTypeInput.value;
  if (isNaN(expence) || expence <= 0) {
    alert("Please enter a valid value");
    return;
  }
  totalExpenceAmount += expence;
  totalIExpence.textContent = totalExpenceAmount.toFixed(2);
  const newRow = expenceTable.insertRow();
  const dateCell = newRow.insertCell();
  dateCell.textContent = date;
  const expenceTypeCell = newRow.insertCell();
  expenceTypeCell.textContent = expenceType;
  const expenceAmountCell = newRow.insertCell();
  expenceAmountCell.textContent = expence.toFixed(2);
  const processCell = newRow.insertCell();
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash", "text-danger");
  processCell.appendChild(deleteIcon);
  deleteIcon.addEventListener("click", function () {
    totalExpenceAmount -= expence;
    balanceAmount = totalIncomeAmount - totalExpenceAmount;
    totalIExpence.textContent = totalExpenceAmount.toFixed(2);
    balance.textContent = balanceAmount.toFixed(2);
    balanceAmount < 0
      ? (balance.className = "bg-danger")
      : (balance.className = "bg-success");
    expenceTable.deleteRow(newRow.rowIndex);
  });
  balanceAmount = totalIncomeAmount - totalExpenceAmount;
  balance.textContent = balanceAmount.toFixed(2);
  balanceAmount < 0
    ? (balance.className = "bg-danger")
    : (balance.className = "bg-success");
  expenseInput.value = "";
  expenseTypeInput.value = "";
  dateInput.value = "";
});

//*** ADD BUTTON ***/
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const income = parseFloat(incomeInput.value);
  if (isNaN(income) || income <= 0) {
    alert("Please enter a valid value");
    return;
  }
  totalIncomeAmount += income;
  totalIncome.textContent = totalIncomeAmount.toFixed(2);
  balanceAmount = totalIncomeAmount - totalExpenceAmount;
  balance.textContent = balanceAmount.toFixed(2);
  balanceAmount < 0
    ? (balance.className = "bg-danger")
    : (balance.className = "bg-success");
  incomeInput.value = "";
});

//*** CLEAR BUTTON ***/
clearBtn.addEventListener("click", function (e) {
  const clearResult = confirm("Are you sure delete information");
  if (clearResult) {
    e.preventDefault();
    for (let i = expenceTable.rows.length - 1; i > 0; i--) {
      expenceTable.deleteRow(i);
    }
    totalExpenceAmount = 0;
    totalIncomeAmount = 0;
    balanceAmount = 0;
    totalIncome.textContent = totalIncomeAmount;
    totalIExpence.textContent = totalExpenceAmount;
    balance.textContent = balanceAmount;
    balance.removeAttribute("class");
  }
});
