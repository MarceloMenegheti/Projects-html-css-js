const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balenceDisplay = document.querySelector('#balance')

const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'Salario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: 150 },
]

const addTransactionDOM = transaction => {
    
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `
transactionUl.append(li)
}

const updateBalenceValues = () => {
    const transactionsAmounts = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2)
    const expense = transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2)
    balenceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    dummyTransactions.forEach(addTransactionDOM)
    updateBalenceValues()
}

init()