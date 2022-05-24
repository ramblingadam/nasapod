











dateInput = document.querySelector('#dateInput')

// // ---- Date Adjustment Buttons ----
monthUp = document.querySelector('#monthUp')
monthDown = document.querySelector('#monthDown')
dayUp = document.querySelector('#dayUp')
dayDown = document.querySelector('#dayDown')
yearUp = document.querySelector('#yearUp')
yearDown = document.querySelector('#yearDown')

submit = document.querySelector('#submit')
description = document.querySelector('#description')

image = document.querySelector('#image')
video = document.querySelector('#video')



submit.addEventListener('click', function() {getApod()})

// getApod()

function getApod() {
    console.log(dateInput.value)
    if(!dateInput.value) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=NkhYWq3XrJ0OKZacsNdXnpIxW1tcWv2i1Wga9eRD`)
        .then(res => res.json())
        .then(data => {
            console.log(data) 
            // description.innerText = data.explanation
            // image.src = data.url
            displayMedia(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    }
    else {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=NkhYWq3XrJ0OKZacsNdXnpIxW1tcWv2i1Wga9eRD&date=${dateInput.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
     
            // description.innerText = data.explanation
            // if(data['media_type'] === 'video') {
            //     console.log('issa video')
            //     image.src = ''
            //     image.style.display = 'none'
            //     video.style.display = 'unset'
            //     video.src = data.url
            // } else {
            //     video.src = ''

            //     video.style.display = 'none'
            //     image.style.display = 'unset'
            //     image.src = data.url
            // }
            displayMedia(data)
    
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    }


}

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
