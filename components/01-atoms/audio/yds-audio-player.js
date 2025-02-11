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

      const volumeElement = audioPlayer.querySelector('.audio-embed__volume');
      const volumeControl = audioPlayer.querySelector('#volume-control');
      const progressBar = audioPlayer.querySelector('#progress-bar');
      const currentTimeDisplay = audioPlayer.querySelector('#time-current');
      const totalTimeDisplay = audioPlayer.querySelector('#time-total');
      const speedControl = audioPlayer.querySelector('.audio-embed__speed');
      const speedControlOptions = audioPlayer.querySelector(
        '.audio-embed__speed-options-control',
      );
      const speedControlSpeedHalf = audioPlayer.querySelector(
        '.audio-embed__speed-control--half',
      );
      const speedControlSpeedNormal = audioPlayer.querySelector(
        '.audio-embed__speed-control--normal',
      );
      const speedControlSpeedDouble = audioPlayer.querySelector(
        '.audio-embed__speed-control--double',
      );

      // Event listeners
      playButton.addEventListener('click', () => {
        audio.play();
        audioPlayer.setAttribute('is-playing', true);

        // Check if the user is using keyboard navigation
        // If play button is pressed using keyboard navigation, focus the pause button
        if (document.activeElement === playButton) {
          pauseButton.focus();
        }
      });

      pauseButton.addEventListener('click', () => {
        audio.pause();
        audioPlayer.setAttribute('is-playing', false);
      });

      // Check if the device is iOS
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        volumeElement.style.display = 'none';
      } else {
        volumeControl.addEventListener('input', () => {
          audio.volume = volumeControl.value;
        });
      }

      // Set initial total play time from the audio file
      audio.addEventListener('loadedmetadata', () => {
        const audioSrc = audio.currentSrc;

        if (audioSrc) {
          const fileId = btoa(audioSrc); // Use base64 encoding of audioSrc as unique ID

          let { duration } = audio;

          if (duration && duration !== Infinity) {
            localStorage.setItem(`audioDuration_${fileId}`, duration);
          } else {
            duration = localStorage.getItem(`audioDuration_${fileId}`) || 0;
          }

          const totalMinutes = Math.floor(duration / 60);
          const totalSeconds = Math.floor(duration % 60);
          totalTimeDisplay.textContent = `${totalMinutes}:${
            totalSeconds < 10 ? '0' : ''
          }${totalSeconds}`;

          if (audio.currentTime === 0) {
            progressBar.value = 0;
          }
        }
      });

      // Fetch duration from localStorage when the audio element is added to the DOM
      const audioSrc = audio.currentSrc;
      if (audioSrc) {
        const fileId = btoa(audioSrc);
        const storedDuration = localStorage.getItem(`audioDuration_${fileId}`);
        if (storedDuration) {
          const totalMinutes = Math.floor(storedDuration / 60);
          const totalSeconds = Math.floor(storedDuration % 60);
          totalTimeDisplay.textContent = `${totalMinutes}:${
            totalSeconds < 10 ? '0' : ''
          }${totalSeconds}`;
        }
      }

      progressBar.addEventListener('input', () => {
        const { value } = progressBar;
        const { duration } = audio;

        const progress = (value / 100) * duration;
        audio.currentTime = progress;
      });

      // Set initial volume to 50%
      speedControlSpeedNormal.classList.add('active');

      // Hide the other speed controls initially
      [speedControlSpeedHalf, speedControlSpeedDouble].forEach((control) => {
        const controlElement = control;
        controlElement.style.display = 'none';
      });

      // Set speed active speed control
      function setActiveSpeedControl(activeControl) {
        const activeElement = activeControl;
        [
          speedControlSpeedHalf,
          speedControlSpeedNormal,
          speedControlSpeedDouble,
        ].forEach((control) => {
          const controlElement = control;
          controlElement.classList.remove('active');
          controlElement.style.display = 'none';
        });
        activeElement.classList.add('active');
        activeElement.style.display = 'block';
      }

      // Toggle visibility of speed control buttons
      // when the speed control options button is clicked
      speedControlOptions.addEventListener('click', () => {
        const isOpen = speedControl.getAttribute('options-open') === 'true';
        [
          speedControlSpeedHalf,
          speedControlSpeedNormal,
          speedControlSpeedDouble,
        ].forEach((control) => {
          const controlElement = control;
          // only one speed can be active at a time
          // if the control is not active, toggle its visibility
          if (!controlElement.classList.contains('active')) {
            controlElement.style.display =
              controlElement.style.display === 'none' ? 'block' : 'none';
          }
        });
        speedControl.setAttribute('options-open', isOpen ? 'false' : 'true');
        speedControlOptions.setAttribute(
          'aria-expanded',
          isOpen ? 'false' : 'true',
        );
      });

      // Set speed control event listeners
      // Speed controls are an array of objects with the control element and the playback rate
      const speedControls = [
        { control: speedControlSpeedHalf, rate: 0.5 },
        { control: speedControlSpeedNormal, rate: 1 },
        { control: speedControlSpeedDouble, rate: 2 },
      ];

      // Change playback speed when a speed control is clicked
      speedControls.forEach(({ control, rate }) => {
        control.addEventListener('click', () => {
          audio.playbackRate = rate;
          setActiveSpeedControl(control);
          [
            speedControlSpeedHalf,
            speedControlSpeedNormal,
            speedControlSpeedDouble,
          ].forEach((otherControl) => {
            const controlElement = otherControl;
            if (controlElement !== control)
              controlElement.style.display = 'none';

            // Close the speed control options if only one speed control is visible
            const visibleControls = [
              speedControlSpeedHalf,
              speedControlSpeedNormal,
              speedControlSpeedDouble,
            ].filter((elem) => elem.style.display !== 'none');
            if (visibleControls.length === 1) {
              speedControl.setAttribute('options-open', 'false');
              speedControlOptions.setAttribute('aria-expanded', 'false');
            }
          });
        });
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
        progressBar.value = progress;
      });
    });
  },
};
