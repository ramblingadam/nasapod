









// ! ---- GRAB DOM ELEMENTS ----
// dateInput = document.querySelector('#dateInput') //deprecated

// // ---- Audio ----
const audio = document.querySelector('audio')

// // ---- Date Adjustment Buttons ----
const buttons = document.querySelectorAll('.button')
// // ---- Date Adjustment Date String Chunks ----
const month = document.querySelector('#month')
const day = document.querySelector('#day')
const year = document.querySelector('#year')


// // ---- Submit Button ----
submit = document.querySelector('#submit')
description = document.querySelector('#description')


// // ---- Image/Video Display ----
image = document.querySelector('#image')
video = document.querySelector('#video')
videoBox = document.querySelector('#videoBox')
imageMonitor = document.querySelector('.imageMonitor')

// ! ---- CREATE UI SOUNDS ---
const dateClick1 = new Audio('assets/switch7.wav')
const dateClick2 = new Audio('assets/switch7.wav')
const dateClick3 = new Audio('assets/switch7.wav')
const dateClick4 = new Audio('assets/switch7.wav')
const dateClickArray = [dateClick1, dateClick2, dateClick3, dateClick4]
let dateClickI = 0

function playDateClick() {
    dateClickArray[dateClickI].play()
    dateClickI += 1
    if(dateClickI > 3) dateClickI = 0
}

const submitClick1 = new Audio('assets/switch2.wav')
const submitClick2 = new Audio('assets/switch2.wav')
const submitClick3 = new Audio('assets/switch2.wav')
const submitClick4 = new Audio('assets/switch2.wav')
const submitClickArray = [submitClick1, submitClick2, submitClick3, submitClick4]
let submitClickI = 0

function playSubmitClick() {
    submitClickArray[submitClickI].play()
    submitClickI += 1
    if(submitClickI > 3) submitClickI = 0
}



// ! ---- INITIALIZATION ----
// // ---- Set date display to current day ----
const now = new Date()
month.innerText = now.getMonth() + 1
day.innerText = now.getDate()
year.innerText = now.getFullYear()

const daysInMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

// // Start by grabbing current days image.
getApod()

// ! ---- EVENT LISTENERS ----
// // Date adjustment buttons
buttons.forEach(btn => btn.addEventListener('click', e => {
    audio.play()
    playDateClick()
    switch(e.target.id) {
        case 'monthUp':
            +month.innerText < 12 ? month.innerText = +month.innerText + 1 : month.innerText = 1
            if(+day.innerText > daysInMonth[month.innerText]) day.innerText = daysInMonth[month.innerText]
        break 
        case 'monthDown':
            +month.innerText > 1 ? month.innerText= +month.innerText - 1 : month.innerText = 12
            if(+day.innerText > daysInMonth[month.innerText]) day.innerText = daysInMonth[month.innerText]
        break 
        case 'dayUp': +day.innerText < daysInMonth[month.innerText] ? day.innerText = +day.innerText + 1 : day.innerText = 1
        break 
        case 'dayDown': +day.innerText > 1 ? day.innerText = +day.innerText - 1 : day.innerText = daysInMonth[month.innerText]
        break 
        case 'yearUp':
            if(+year.innerText < now.getFullYear()) year.innerText = +year.innerText + 1
            else year.innerText = 1995
            checkLeapYear()
        break 
        case 'yearDown': 
            if(+year.innerText > 1995) year.innerText = +year.innerText - 1
            else year.innerText = now.getFullYear()
            checkLeapYear()
        break 
    }
}))

// // Submit Button
submit.addEventListener('click', function() {getApod()})

// ! ---- FUNCTIONS ----

// // Get Picture/Movie of the Day Function
function getApod() {
    playSubmitClick()
    // audio.play()
    description.innerText = 'Loading...'
    fetch(`https://api.nasa.gov/planetary/apod?api_key=NkhYWq3XrJ0OKZacsNdXnpIxW1tcWv2i1Wga9eRD&date=${year.innerText}-${month.innerText}-${day.innerText}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        // If APOD doesn't exist (error code in response), show error msg.
        if(data.code === 400) {
            description.innerText = data.msg
        } else displayMedia(data) // Otherwise, we're good! Display APOD and message.
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

// // Check If Leap Year and Adjust Valid Dates If So/Not 
function checkLeapYear() {
    let currentYear = +year.innerText
    if((currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 4 === 0 && currentYear % 400 === 0)) {
        daysInMonth['2'] = 29
    } else {
        daysInMonth['2'] = 28
        if(+month.innerText === 2 && +day.innerText > 28) day.innerText = 28
    }
}

// // Display Media Function
function displayMedia(data) {
    description.innerText = data.explanation
    if(data['media_type'] === 'video') {
        image.src = ''
        image.classList.add('hidden')
        imageMonitor.classList.add('imageMonitorWidth100')
        videoBox.classList.remove('hidden')
        video.src = `${data.url}&autoplay=1`
    } else {
        video.src = ''
        videoBox.classList.add('hidden')
        image.classList.remove('hidden')
        imageMonitor.classList.remove('imageMonitorWidth100')
        image.src = data.url
    }
}
