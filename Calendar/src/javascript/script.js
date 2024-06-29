
const date = document.getElementById("date")
const day = document.getElementById("day")
const month = document.getElementById("month")
const year = document.getElementById("year")

const today = new Date()

console.log(today)

date.innerHTML = today.getDate()
day.innerHTML = today.getDay()
month.innerHTML = today.getMonth()
year.innerHTML = today.getFullYear()
