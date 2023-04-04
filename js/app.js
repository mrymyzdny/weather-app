let $ = document
const temp = $.querySelector('.temp')
const dateElem = $.querySelector('.date')
const inputElem = $.querySelector('input')
const weather = $.querySelector('.weather')
const locatioInfo = $.querySelector('.location')
const searchBtn = $.querySelector('#search-btn')

// API Data
let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q='  ,
    key: 'f5319f737ce70887e6482bf445653bd8'
}


// Get data from an API
function fetchData  () {
    let inputValue = inputElem.value

    fetch(`${apiData.url}${inputValue}&appid=${apiData.key}`)
    .then(res => 
        res.json()
    )
    .then(data => {
        console.log(data)
        showData(data)
    }
    )
    .catch(err => console.warn(err))
}


// Show data in app
function showData(data) {
    locatioInfo.innerHTML = data.name + ' | ' + data.sys.country
    dateElem.innerHTML = getDate()
    weather.innerHTML = data.weather[0].main
    temp.innerHTML = Math.floor(data.main.temp- 273.15) + '°c'
}


//  Get date
function getDate () {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date()
    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let date = now.getDate()
    let year = now.getFullYear()

    return `${day}  |  ${month}  |  ${date}   |  ${year}`
}


// Events
searchBtn.addEventListener('click' , fetchData)
window.addEventListener('keypress' , (e) => {
    if(e.keyCode === 13) {
        fetchData()
    }
})
