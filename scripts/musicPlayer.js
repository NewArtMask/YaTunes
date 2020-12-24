import { addZero } from './supScript.js'

export const musicPlayerInit = () => {
	const audio = document.querySelector('.audio')
	const audioImg = document.querySelector('.audio-img')
	const audioHeader = document.querySelector('.audio-header')
	const audioPlayer = document.querySelector('.audio-player')
	const audioNavigation = document.querySelector('.audio-navigation')
	const audioButtonPlay = document.querySelector('.audio-button__play')
	const audioPragress = document.querySelector('.audio-progress')
	const audioPragressTiming = document.querySelector('.audio-progress__timing')
	const audioTimePassed = document.querySelector('.audio-time__passed')
	const audioTimeTotal = document.querySelector('.audio-time__total')

	const playlist = ['hello', 'flow', 'speed']

	let trackIndex = 0

	const loadTrack = () => {
		const isPlayed = audioPlayer.paused
		const track = playlist[trackIndex]

		audioImg.src = `./audio/${track}.jpg`
		audioHeader.textContent = track.toUpperCase()
		audioPlayer.src = `./audio/${track}.mp3`

		if (isPlayed) {
			audioPlayer.pause()
		} else {
			audioPlayer.play()
		}
	}

	const prevTrack = () => {
		if (trackIndex !== 0) trackIndex--
		else {
			trackIndex = playlist.length - 1
		}
		loadTrack()
	}

	const nextTrack = () => {
		if (trackIndex !== playlist.length - 1) trackIndex++
		else trackIndex = 0
		loadTrack()
	}



	audioNavigation.addEventListener('click', e => {
		const target = e.target

		if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play')
			audioButtonPlay.classList.toggle('fa-play')
			audioButtonPlay.classList.toggle('fa-pause')

			if (audioPlayer.paused) {
				audioPlayer.play()
			} else audioPlayer.pause()

			const track = playlist[trackIndex]
			audioHeader.textContent = track.toUpperCase()
		} else if (target.classList.contains('audio-button__prev')) {
			prevTrack()
		} else if (target.classList.contains('audio-button__next')) {
			nextTrack()
		}
	})

	audioPlayer.addEventListener('ended', () => {
		nextTrack()
		audioPlayer.play()
	})

	audioPlayer.addEventListener('timeupdate', () => {
		const duration = audioPlayer.duration
		const currentTime = audioPlayer.currentTime
		const progress = (currentTime / duration) * 100

		audioPragressTiming.style.width = progress + '%'

		const minutesPassed = Math.floor(currentTime / 60) || '0'
		const secondsPassed = Math.floor(currentTime % 60) || '0'
		const minutesTotal = Math.floor(duration / 60) || '0'
		const secondsTotal = Math.floor(duration % 60) || '0'

		audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
		audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
	})

	audioPragress.addEventListener('click', e => {
		const x = e.offsetX
		const allWidth = audioPragress.clientWidth
		const progress = (x / allWidth) * audioPlayer.duration

		audioPlayer.currentTime = progress
	})

	return () => {
		if (!audioPlayer.paused) {
			audioPlayer.pause()
			audio.classList.remove('play')
			audioButtonPlay.classList.add('fa-play')
			audioButtonPlay.classList.remove('fa-pause')
		}
	}
}