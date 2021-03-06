import { addZero } from './supScript.js'

export const videoPlayerInit = () => {
	const videoPlayer = document.querySelector('.video-player')
	const videoButtonPlay = document.querySelector('.video-button__play')
	const videoButtonStop = document.querySelector('.video-button__stop')
	const videoProgress = document.querySelector('.video-progress')
	const videoTimePassed = document.querySelector('.video-time__passed')
	const videoTimeTotal = document.querySelector('.video-time__total')
	const videoVolume = document.querySelector('.video-volume')
    const videoFullscreen = document.querySelector('.video-fullscreen')
    const volumeUpMax = document.querySelector('.fa-volume-up')
    const volumeDownMin = document.querySelector('.fa-volume-down')

	const toggleIcon = () => {
		if (videoPlayer.paused) {
			videoButtonPlay.classList.remove('fa-pause')
			videoButtonPlay.classList.add('fa-play')
		} else {
			videoButtonPlay.classList.remove('fa-play')
			videoButtonPlay.classList.add('fa-pause')
		}
	}

	const togglePlay = e => {
		if (videoPlayer.paused) {
			videoPlayer.play()
		} else {
	 		videoPlayer.pause()
		}
		e.preventDefault()
	}

	const stopPlay = () => {
		videoPlayer.pause()
		videoPlayer.currentTime = 0
		toggleIcon()
	}

	const changeValue = () => {
		const valueVolume = videoVolume.value
		videoPlayer.volume = valueVolume / 100
	}

	const videoVolumeChangeToggle = saveVol => volume => {
		if (volume !== videoPlayer.volume) {
			[saveVol, videoPlayer.volume] = [videoPlayer.volume, volume]
		} else videoPlayer.volume = saveVol
	}

	let videoVolumeChange = videoVolumeChangeToggle()

	videoPlayer.addEventListener('click', togglePlay)
	videoButtonPlay.addEventListener('click', togglePlay)

	videoPlayer.addEventListener('play', toggleIcon)
	videoPlayer.addEventListener('pause', toggleIcon)

	videoButtonStop.addEventListener('click', stopPlay)

	videoPlayer.addEventListener('timeupdate', () => {
		const currentTime = videoPlayer.currentTime
		const duration = videoPlayer.duration

		videoProgress.value = (currentTime / duration) * 100

		let minutePassed = Math.floor(currentTime / 60)
		let secondsPassed = Math.floor(currentTime % 60)

		let minuteTotal = Math.floor(duration / 60)
		let secondsTotal = Math.floor(duration % 60)

		videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
		videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
	})

	videoProgress.addEventListener('change', () => {
		const duration = videoPlayer.duration
		const value = videoProgress.value

		videoPlayer.currentTime = (value * duration) / 100
	})

	videoFullscreen.addEventListener('click', () => {
		videoPlayer.requestFullscreen()
		videoPlayer.controls = true
	})

	/*document.addEventListener('keyup', e => {
  		if (e.code === 'Space') {
    		togglePlay()
  		}
	})*/

	videoPlayer.addEventListener('volumechange', () => {
		videoVolume.value = Math.round(videoPlayer.volume * 100)
	})

	videoPlayer.addEventListener('fullscreenchange', () => {
		if (document.fullscreen) {
			videoPlayer.controls = true
		} else {
			videoPlayer.controls = false
		}
	})

	volumeUpMax.addEventListener('click', () => { videoVolumeChange(1) })
	volumeDownMin.addEventListener('click', () => { videoVolumeChange(0) })

	changeValue()

	videoVolume.addEventListener('input', changeValue)

	return () => {
		videoPlayer.pause()
		toggleIcon()
	}
}