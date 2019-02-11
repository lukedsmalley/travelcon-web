
for (let button of document.querySelectorAll('.booking-button')) {
  button.addEventListener('click', function() {
    fetch('./api/reserve?uid=' + localStorage.getItem('travelcon_uid'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: button.textContent})
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = './dashboard.html'
    })
    .catch(console.log)
  })
}

document.querySelector('.cancel-button').addEventListener('click', function() {
  window.location.href = './dashboard.html'
})