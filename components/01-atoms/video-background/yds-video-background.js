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

      // set the background video to autoplay if reduceMotion (os-level) is false
      // and if the browser's built-in autoplay is undefined
      if (allowAutoPlay !== undefined && reduceMotion.matches === false) {
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        item.setAttribute('is-playing', true);
      } else {
        video.pause();
        item.setAttribute('is-playing', false);
      }

      // manaully control the video
      pauseVideo.addEventListener('click', () => {
        video.pause();
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', false);
      });

      playVideo.addEventListener('click', () => {
        video.play();
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', true);
      });
    });
  },
};
