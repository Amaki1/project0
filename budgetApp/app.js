const transactionsEl = document.querySelector('.transactions');
const balanceNumberEl = document.querySelector('.balance-number');
const numberIncomeEl = document.querySelector('.number--income');
const numberExpensesEl = document.querySelector('.number--expenses');
const formEl = document.querySelector('.form');
const inputDescriptionEl = document.querySelector('.input--description');
const inputAmountEl = document.querySelector('.input--amount');

function submitHandler(event){
    // prevent default behavior
    event.preventDefault();
    
    // get input values
    const description = inputDescriptionEl.value;
    const amount = + inputAmountEl.value;
    
    // create transaction HTML
    const transactionItemHTML = `
    <li class="transaction transaction--${amount > 0 ? 'income': 'expense'}">
        <span class="transaction__text">${description}</span>
        <span class="transaction__amount">${amount > 0 ? '+' : ''}${amount}</span>
        <button class="transaction__btn">X</button>
    </li>
    `;
    
    // insert new HTML
    transactionsEl.insertAdjacentHTML('beforeend', transactionItemHTML);
    
    // clear form input
    inputDescriptionEl.value = '';
    inputAmountEl.value = '';
    
    //unfocus (blur) form inputs
    inputAmountEl.blur();
    inputDescriptionEl.blur();
    
    // update income or expenses
    if (amount > 0){
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome + amount;
        numberIncomeEl.textContent = updatedIncome;
        } else {
            const currentExpenses = +numberExpensesEl.textContent;
            const updatedExpenses = currentExpenses + amount * -1 ;
            numberExpensesEl.textContent = updatedExpenses;
        }
    
    // update the balance
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;
    
    // make red if balance negative
    if ( income - expenses < 0  ){
        balanceNumberEl.style.color = 'red';
    }else{
        balanceNumberEl.style.color = null;
    }

}

function clickHandler(event){
    // remove transaction item visually
    const clickedEl = event.target.parentNode;
    clickedEl.remove();

    // update income or expenses
    const amountEL = clickedEl.querySelector('.transaction__amount');
    const amount = +amountEL.textContent;

    if (amount > 0){
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome - amount;
    numberIncomeEl.textContent = updatedIncome;
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses - amount * -1 ;
        numberExpensesEl.textContent = updatedExpenses;
    }

    // update the balance
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;

    // make red if balance negative
    if ( income - expenses < 0  ){
        balanceNumberEl.style.color = 'red';
    }else{
        balanceNumberEl.style.color = null;
    }
    
}

formEl.addEventListener('submit', submitHandler);
transactionsEl.addEventListener("click", clickHandler);