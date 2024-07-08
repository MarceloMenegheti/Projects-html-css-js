const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balenceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStoreTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStoreTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorege()
    init()
}

const addTransactionDOM = ({ amount, name, id }) => {
    
    const operator = amount < 0 ? '-' : '+'
    const CSSclass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
    ${name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `
    transactionUl.append(li)
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator,value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator,value) => accumulator + value, 0)
    .toFixed(2)
    
const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)


const updateBalenceValues = () => {

    const transactionsAmounts = transactions.map(({ amount }) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)

    balenceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
        
    }
    
    const init = () => {
        transactionUl.innerHTML = ''
        transactions.forEach(addTransactionDOM)
        updateBalenceValues()
    }
    
    init()

    const updateLocalStorege = () => {
        localStorage.setItem('transactions',JSON.stringify(transactions))
    }
    
    const generateID = () => Math.round(Math.random() * 1000)

    const addTransactionArray = (transactionName, transactionsAmount) => {
        transactions.push({ 
            id: generateID(),
            name: transactionName,
            amount:  Number(transactionsAmount)
        })
    }

    const clearInput = () => {
        inputTransactionName.value = ''
        inputTransactionAmount.value = ''
    }

    const handLeFormSubmit =  event => {
        event.preventDefault()
        
        const transactionName = inputTransactionName.value.trim()
        const transactionsAmount = inputTransactionAmount.value.trim()
        const isSomeInputEmpty = inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === ''

        if(isSomeInputEmpty){
            alert('por favor prencha tanto o nome quanto o valor da transação')
            return
        }
        
        addTransactionArray(transactionName, transactionsAmount)
        init()
        updateLocalStorege()
        clearInput()


    }

    form.addEventListener('submit', handLeFormSubmit)