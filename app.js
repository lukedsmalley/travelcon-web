
const AWS = require('aws-sdk')
const fs = require('fs-extra')
const express = require('express')
const expressWs = require('express-ws')

const s3 = new AWS.S3()

function putObjectS3(config) {
  return new Promise(function(resolve, reject) {
    s3.putObject(config, function(err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const app = express()
expressWs(app)

app.use(express.static('public'))
app.use(express.json({limit: '50mb'}))

let lockSocket = null
let lockCallback = null

app.ws('/socket', function(socket, request) {
  lockSocket = socket
  socket.on('close', (code, reason) => console.log(`Socket closed: ${code} ${reason}`))
  socket.on('message', data => {
    console.log('Socket: ' + data)
    if (lockCallback) lockCallback(data)
  })
})

const users = {}

function mkuser(uid) {
  if (!users[uid]) {
    users[uid] = {
      hasPhoto: false,
      checkedIn: false,
      reservations: []
    }
  }
}

app.get('/api/user', function(request, response) {
  console.log(`User request: ${request.query.uid}`)
  mkuser(request.query.uid)
  response.send(users[request.query.uid])
})

app.post('/api/upload-photo', function(request, response) {
  console.log(`User photo upload: ${request.query.uid}`)
  fs.writeFile(`./photos/${request.query.uid}.dat`, request.body.data)
  mkuser(request.query.uid)
  users[request.query.uid].hasPhoto = true
  response.send({succeeded: true})
})

app.post('/api/reserve', function(request, response) {
  console.log(`Create reservation: ${request.query.uid} -> ${request.body.name}`)
  mkuser(request.query.uid)
  users[request.query.uid].reservations.push(request.body.name)
  response.send({succeeded: true})
})

app.get('/api/checkin', function(request, response) {
  console.log(`Checkin: ${request.query.uid}`)
  lockCallback = function(data) {
    putObjectS3({
      Body: data,
      Bucket: 'UGAHack2019',
      Key: 'paste'
    }).then(() => {
      lockSocket.send('unlock')
      mkuser(request.query.uid)
      users[request.query.uid].reservations = []
      users[request.query.uid].checkedIn = true
      response.send({succeeded: true})
    }).catch(err => {
      response.sendStatus(404)
    })
  }
  if (lockSocket) lockSocket.send('capture')
  else response.sendStatus(404)
})

app.get('/api/checkout', function(request, response) {
  console.log(`Checkout: ${request.query.uid}`)
  mkuser(request.query.uid)
  users[request.query.uid].checkedIn = false
  response.send({succeeded: true})
})

app.get('/api/lock', function(request, response) {
  if (lockSocket) lockSocket.send('lock')
  response.sendStatus(200)
})

app.get('/api/unlock', function(request, response) {
  if (lockSocket) lockSocket.send('unlock')
  response.sendStatus(200)
})

app.all('/', (request, response) => response.redirect('./login.html'))

app.listen(8080, () => console.log('Started'))