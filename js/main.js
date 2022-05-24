











dateInput = document.querySelector('#dateInput')

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

console.log(buttons)

// ! ---- INITIALIZATION ----
// // ---- Set date display to current day ----
const now = new Date()
month.innerText = now.getMonth() + 1
day.innerText = now.getDate()
year.innerText = now.getFullYear()




buttons.forEach(btn => btn.addEventListener('click', e => {
    console.log(e)
    console.log(e.target.id)
    switch(e.target.id) {
        case 'monthUp': month.innerText = +month.innerText + 1
        break 
        case 'monthdown': month.innerText = +month.innerText - 1
        break 
        case 'dayUp': day.innerText = +day.innerText + 1
        break 
        case 'dayDown': day.innerText = +day.innerText - 1
        break 
        case 'yearUp': year.innerText = +year.innerText + 1
        break 
        case 'yearDown': year.innerText = +year.innerText - 1
        break 
    }

}))

submit.addEventListener('click', function() {getApod()})

getApod()

// ! ---- Get Picture/Movie of the Day Function ----
function getApod() {
    // console.log(dateInput.value)
    // // Check for future/invalid date:
    console.log(Date.parse(`${year.innerText}-${month.innerText}-${day.innerText}`))
    console.log(Date.parse(now))
    if(Date.parse(`${year.innerText}-${month.innerText}-${day.innerText}` > Date.parse(now))) {
        description.innerText('ERROR: Future Dade Selected')
    }
    // // Good date input:
    else {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=NkhYWq3XrJ0OKZacsNdXnpIxW1tcWv2i1Wga9eRD&date=${year.innerText}-${month.innerText}-${day.innerText}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayMedia(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    }
}

// ! ---- Display Media Function ----
function displayMedia(data) {
    description.innerText = data.explanation
    if(data['media_type'] === 'video') {
        image.src = ''
        image.classList.add('hidden')
        video.classList.remove('hidden')
        video.src = `${data.url}&autoplay=1`
    } else {
        video.src = ''
        video.classList.add('hidden')
        image.classList.remove('hidden')
        image.src = data.url
    }
}
