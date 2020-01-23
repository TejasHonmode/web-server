console.log('Client-side js file is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Philadelphia').then((response) =>{
//     response.json().then((data) =>{
//         if(data.error){

//         }else{
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log('Error')
            messageOne.textContent = data.error
        }else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData.temp
            console.log(data)
        }
    })
})
    
    console.log('Testing....'+ location)
})