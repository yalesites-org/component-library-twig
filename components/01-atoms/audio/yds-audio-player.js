Drupal.behaviors.audioPlayer = {
  attach(context) {
    const audioPlayers = context.querySelectorAll('.audio-embed');

    audioPlayers.forEach((audioPlayer) => {
      const audio = audioPlayer.querySelector('audio');
      const playButton = audioPlayer.querySelector(
        '.audio-embed__control--play',
      );
      const pauseButton = audioPlayer.querySelector(
        '.audio-embed__control--pause',
      );
      const volumeControl = audioPlayer.querySelector('#volume-control');
      const progressBar = audioPlayer.querySelector('#progress-bar');
      const currentTimeDisplay = audioPlayer.querySelector('#time-current');
      const totalTimeDisplay = audioPlayer.querySelector('#time-total');
      const speedControlSpeedHalf = audioPlayer.querySelector(
        '.audio-embed__speed-control--half',
      );
      const speedControlSpeedNormal = audioPlayer.querySelector(
        '.audio-embed__speed-control--normal',
      );
      const speedControlSpeedDouble = audioPlayer.querySelector(
        '.audio-embed__speed-control--double',
      );

      playButton.addEventListener('click', () => {
        audio.play();
        audioPlayer.setAttribute('is-playing', true);
      });

      pauseButton.addEventListener('click', () => {
        audio.pause();
        audioPlayer.setAttribute('is-playing', false);
      });

      volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
      });

      // Set initial volume to 50%
      speedControlSpeedNormal.classList.add('active');

      // Set speed controls
      function setActiveSpeedControl(activeControl) {
        [
          speedControlSpeedHalf,
          speedControlSpeedNormal,
          speedControlSpeedDouble,
        ].forEach((control) => {
          control.classList.remove('active');
        });
        activeControl.classList.add('active');
      }

      // Set speed control to half speed
      speedControlSpeedHalf.addEventListener('click', () => {
        audio.playbackRate = 0.5;
        setActiveSpeedControl(speedControlSpeedHalf);
      });

      // Set speed control to normal speed
      speedControlSpeedNormal.addEventListener('click', () => {
        audio.playbackRate = 1;
        setActiveSpeedControl(speedControlSpeedNormal);
      });

      // Set speed control to double speed
      speedControlSpeedDouble.addEventListener('click', () => {
        audio.playbackRate = 2;
        setActiveSpeedControl(speedControlSpeedDouble);
      });

      // Set initial total play time from the audio file
      audio.addEventListener('loadedmetadata', () => {
        const { duration } = audio;
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);

        totalTimeDisplay.textContent = `${totalMinutes}:${
          totalSeconds < 10 ? '0' : ''
        }${totalSeconds}`;
      });

      // Update current play time and progress bar
      audio.addEventListener('timeupdate', () => {
        const { currentTime } = audio;
        const { duration } = audio;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);

        currentTimeDisplay.textContent = `${currentMinutes}:${
          currentSeconds < 10 ? '0' : ''
        }${currentSeconds}`;

        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
      });
    });
  },
};
