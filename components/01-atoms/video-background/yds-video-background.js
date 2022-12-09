Drupal.behaviors.videoBG = {
  attach(context) {
    // Selectors
    const items = context.querySelectorAll('.video-background');
    const videos = context.getElementsByTagName('video')[0];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Classes
    const pauseControl = '.video-background__control--pause';
    const playControl = '.video-background__control--play';

    if (videos && reduceMotion.matches === true) {
      videos.closest('.video-background').setAttribute('is-playing', false);
    } else {
      videos.setAttribute('autoplay', true);
      videos.setAttribute('loop', true);
      videos.closest('.video-background').setAttribute('is-playing', true);
    }

    items.forEach((item) => {
      const pauseVideo = item.querySelector(pauseControl);
      const playVideo = item.querySelector(playControl);

      pauseVideo.addEventListener('click', () => {
        videos.pause();
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', false);
      });

      playVideo.addEventListener('click', () => {
        videos.play();
        pauseVideo
          .closest('.video-background')
          .setAttribute('is-playing', true);
      });
    });
  },
};
