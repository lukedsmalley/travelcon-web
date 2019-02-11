
if (!localStorage.getItem('travelcon_uid')) window.location.href = './login.html'

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(function(stream) {
    document.querySelector('video').srcObject = stream
    document.querySelector('video').play()
})
.catch(console.log)

document.querySelector('.capture-button').addEventListener('click', function(e) {
  let video = document.querySelector('video')
  let canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  let context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  fetch('./api/upload-photo?uid=' + localStorage.getItem('travelcon_uid'), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({data: canvas.toDataURL('image/jpeg')})
  })
  .then(response => response.json())
  .then(() => window.location.href = './dashboard.html')
  .catch(console.log)
})