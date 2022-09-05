const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    secure: true,
  host: 'peerjshgs.herokuapp.com',
  port: '443'

})
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true;
const peers = {}


navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
    myVideoStream = stream;
  addVideoStream(myVideo, stream,"Me")

  myPeer.on('call', call => {
    console.log("found a new call")
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        console.log("got a stream")
      addVideoStream(video, userVideoStream)
    })
  })


  socket.on('user-connected', userId => {
    console.log("user-connect:" + userId)
    connectToNewUser(userId, stream)


  })



socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
})
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  
  const call = myPeer.call(userId, stream)
  console.log("Trying to call")
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream,userId)
  })
  call.on('close', () => {
    video.remove()
  })
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const exit = () =>{
myPeer.dis
}


const playStop = () => {
  console.log('object')
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>

  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class=" fas fa-microphone-slash"></i>

  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class=" fas fa-video-slash"></i>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

let btnclose = document.getElementById("leave_btn");
let myTab;
btnclose.addEventListener('click',()=>{
    If(myTab) .close();
})