Drupal.behaviors.videoBG = {
  attach(context) {
    // Selectors
    const items = context.querySelectorAll('.video-background');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Classes
    const pauseControl = '.video-background__control--pause';
    const playControl = '.video-background__control--play';

    items.forEach((item) => {
      const video = item.querySelector('video');
      const pauseVideo = item.querySelector(pauseControl);
      const playVideo = item.querySelector(playControl);
      const allowAutoPlay = video.play();

      // editors can set a banner's video to play once and stop; the setting
      // sits on the video background or on the banner that wraps it
      const playbackSetting = item.closest('[data-video-playback]');
      const playOnce =
        playbackSetting !== null &&
        playbackSetting.getAttribute('data-video-playback') === 'once';

      // set the background video to autoplay if reduceMotion (os-level) is false
      // AND if the browser's built-in autoplay is undefined
      if (allowAutoPlay !== undefined && reduceMotion.matches === false) {
        allowAutoPlay
          .then(() => {
            item.setAttribute('is-playing', true);
            video.setAttribute('autoplay', '');
            if (!playOnce) {
              video.setAttribute('loop', '');
            }
          })
          .catch(() => {
            item.setAttribute('is-playing', false);
            video.removeAttribute('autoplay', '');
            video.removeAttribute('loop', '');
          });
      } else {
        item.setAttribute('is-playing', false);
        video.pause();
      }

      // manaully control the video
      // pause/play by adding and removing autoplay/loop attributes
      pauseVideo.addEventListener('click', () => {
        video.pause();
        video.removeAttribute('autoplay', '');
        video.removeAttribute('loop', '');
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', false);
      });

      // play, add playing attributes
      // (play() on a finished video restarts it from the beginning)
      playVideo.addEventListener('click', () => {
        video.play();
        video.setAttribute('autoplay', '');
        if (!playOnce) {
          video.setAttribute('loop', '');
        }
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', true);
      });

      // a play-once video holds on its last frame when it ends; swap the
      // pause button for the play button, keeping keyboard focus on the control
      video.addEventListener('ended', () => {
        const pauseHadFocus = document.activeElement === pauseVideo;
        video.removeAttribute('autoplay');
        item.setAttribute('is-playing', false);
        if (pauseHadFocus) {
          playVideo.focus();
        }
      });
    });
  },
};
