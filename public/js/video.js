(function () {
  const btn = document.querySelector('#play-video-btn');
  const video = document.querySelector('#vision-video');
  let isPlaying = false;
  btn.addEventListener('click', () => {
    if (isPlaying) {
      video.pause();
      btn.textContent = 'Watch video';
      isPlaying = false;
    } else {
      video.play();
      btn.textContent = 'Pause video';
      isPlaying = true;
    }
  });
})();
