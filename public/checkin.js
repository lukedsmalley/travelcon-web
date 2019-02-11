
document.querySelector('.cancel-button').addEventListener('click', function() {
  window.location.href = './dashboard.html'
})

document.querySelector('.unlock-button').addEventListener('click', function() {
  fetch('./api/checkin?uid=' + localStorage.getItem('travelcon_uid'))
  .then(response => response.json())
  .then(data => {
    window.location.href = './dashboard.html'
  })
  .catch(console.log)
})