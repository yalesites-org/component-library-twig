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
      const volumeControlButton = audioPlayer.querySelector(
        '.audio-embed__volume-control-option',
      );
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
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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

        if (document.activeElement === pauseButton) {
          playButton.focus();
        }
      });

      // When playback reaches the end, reset to the paused state so the play
      // icon returns; otherwise the pause icon stays and it looks like it is
      // still playing. The next play() restarts from the beginning.
      audio.addEventListener('ended', () => {
        audioPlayer.setAttribute('is-playing', false);

        // The pause button is now hidden, so move focus off it to stay usable.
        if (document.activeElement === pauseButton) {
          playButton.focus();
        }
      });

      // Check if the device is iOS
      if (isIOS) {
        volumeElement.style.display = 'none';
      } else {
        volumeControl.addEventListener('input', () => {
          audio.volume = volumeControl.value;
        });
      }

      // Set initial volume based on aria-pressed attribute
      const initialPressed =
        volumeControlButton.getAttribute('aria-pressed') === 'true';
      audio.volume = initialPressed ? 0 : 0.5;
      volumeControl.value = initialPressed ? 0 : 0.5;

      // Toggle volume control button - muted and unmuted
      volumeControlButton.addEventListener('click', () => {
        const isPressed =
          volumeControlButton.getAttribute('aria-pressed') === 'true';
        const newVolume = isPressed ? 0.5 : 0;
        volumeControl.value = newVolume;
        audio.volume = newVolume;
        volumeControlButton.setAttribute('aria-pressed', !isPressed);
      });

      // Function to get audio duration from localStorage or set it if not present
      function getAudioDuration(audioElement) {
        return new Promise((resolve) => {
          const audioSrc = audioElement.currentSrc;
          if (audioSrc) {
            const fileId = btoa(audioSrc);
            const { duration } = audio;

            if (duration && duration !== Infinity) {
              localStorage.setItem(`audioDuration_${fileId}`, duration);
              resolve(duration);
            } else {
              const storedDuration = localStorage.getItem(
                `audioDuration_${fileId}`,
              );
              resolve(storedDuration || 0);
            }
          } else {
            resolve(0);
          }
        });
      }

      // Set initial total play time from the audio file
      audio.addEventListener('loadedmetadata', () => {
        getAudioDuration(audio).then((duration) => {
          const totalMinutes = Math.floor(duration / 60);
          const totalSeconds = Math.floor(duration % 60);
          totalTimeDisplay.textContent = `${totalMinutes}:${
            totalSeconds < 10 ? '0' : ''
          }${totalSeconds}`;

          if (audio.currentTime === 0) {
            progressBar.value = 0;
          }
        });
      });

      // Fetch duration from localStorage when the audio element is added to the DOM
      getAudioDuration(audio).then((duration) => {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeDisplay.textContent = `${totalMinutes}:${
          totalSeconds < 10 ? '0' : ''
        }${totalSeconds}`;
      });

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

      // Open or close the speed options. The inactive speeds are shown only
      // while open; the active speed stays visible in both states.
      function toggleSpeedOptions() {
        const isOpen = speedControl.getAttribute('options-open') === 'true';
        [
          speedControlSpeedHalf,
          speedControlSpeedNormal,
          speedControlSpeedDouble,
        ].forEach((control) => {
          const controlElement = control;
          if (!controlElement.classList.contains('active')) {
            controlElement.style.display = isOpen ? 'none' : 'block';
          }
        });
        speedControl.setAttribute('options-open', isOpen ? 'false' : 'true');
        speedControlOptions.setAttribute(
          'aria-expanded',
          isOpen ? 'false' : 'true',
        );
      }

      // Make the whole speed control area a click target: the gauge icon and
      // the visible active label (e.g. "1x") both bubble here, so clicking the
      // label opens the options instead of only the icon working.
      speedControl.addEventListener('click', toggleSpeedOptions);

      // Set speed control event listeners
      // Speed controls are an array of objects with the control element and the playback rate
      const speedControls = [
        { control: speedControlSpeedHalf, rate: 0.5 },
        { control: speedControlSpeedNormal, rate: 1 },
        { control: speedControlSpeedDouble, rate: 2 },
      ];

      // Change playback speed when an option is chosen. Only acts as a selection
      // while the options are open; stopping propagation keeps the click from
      // bubbling to the container toggle, so choosing a speed closes the menu.
      // When closed, the click falls through to toggleSpeedOptions and opens it.
      speedControls.forEach(({ control, rate }) => {
        control.addEventListener('click', (event) => {
          if (speedControl.getAttribute('options-open') !== 'true') {
            return;
          }
          event.stopPropagation();
          audio.playbackRate = rate;
          setActiveSpeedControl(control);
          speedControl.setAttribute('options-open', 'false');
          speedControlOptions.setAttribute('aria-expanded', 'false');
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
