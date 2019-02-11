
if (!localStorage.getItem('travelcon_uid')) window.location.href = './login.html'

document.querySelector('.reserve-button').addEventListener('click', function() {
  window.location.href = './reserve.html'
})

document.querySelector('.lock-button').addEventListener('click', function() {
  fetch('./api/lock?uid=' + localStorage.getItem('travelcon_uid'))
  .then(response => response.json())
  .catch(console.log)
})

document.querySelector('.unlock-button').addEventListener('click', function() {
  fetch('./api/unlock?uid=' + localStorage.getItem('travelcon_uid'))
  .then(response => response.json())
  .catch(console.log)
})

document.querySelector('.check-out-button').addEventListener('click', function() {
  fetch('./api/checkout?uid=' + localStorage.getItem('travelcon_uid'))
  .then(response => response.json())
  .then(data => {
    window.location.href = './dashboard.html'
  })
  .catch(console.log)
})

fetch('./api/user?uid=' + localStorage.getItem('travelcon_uid'))
.then(response => response.json())
.then(data => {
  if (!data.hasPhoto) {
    window.location.href = './setup.html'
  } else {
    document.querySelector(data.checkedIn ? '.checked-in' : '.not-checked-in')
      .classList.remove('hidden')
    document.querySelector(data.reservations.length > 0 ? '.has-reservations' : '.no-reservations')
      .classList.remove('hidden')
    if (data.reservations.length > 0) {
      for (let reservation of data.reservations) {
        let element = document.createElement('span')
        element.textContent = reservation
        element.className = 'button check-in-button'
        element.addEventListener('click', function() {
          window.location.href = './checkin.html'
        })
        document.querySelector('.reservations').appendChild(element)
      }
    }
  }
})