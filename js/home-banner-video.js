(function () {
  var path = window.location.pathname;
  var archiveImages = [
    '/guidang/3.png',
    '/guidang/4.png',
    '/guidang/5.png',
    '/guidang/6.png',
    '/guidang/7.png'
  ];

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  var pageMap = {
    '/': {
      mode: 'video',
      bodyClass: 'home-banner-fixed',
      src: '/video/home.mp4'
    },
    '/index.html': {
      mode: 'video',
      bodyClass: 'home-banner-fixed',
      src: '/video/home.mp4'
    },
    '/archives/': {
      mode: 'image',
      bodyClass: 'archive-banner-random',
      images: archiveImages
    },
    '/archives/index.html': {
      mode: 'image',
      bodyClass: 'archive-banner-random',
      images: archiveImages
    },
    '/links/': {
      mode: 'video',
      bodyClass: 'links-banner-video',
      src: '/video/two.mp4'
    },
    '/links/index.html': {
      mode: 'video',
      bodyClass: 'links-banner-video',
      src: '/video/two.mp4'
    }
  };

  var config = pageMap[path];
  if (!config) {
    return;
  }

  var banner = document.getElementById('banner');
  if (!banner) {
    return;
  }

  document.body.classList.add(config.bodyClass);
  banner.setAttribute('parallax', 'false');
  banner.style.transform = 'none';

  if (config.mode === 'image') {
    banner.classList.add('banner-image-enabled');
    banner.style.backgroundImage = 'url(' + pickRandom(config.images) + ')';
    return;
  }

  banner.classList.add('banner-video-enabled');
  banner.style.backgroundImage = 'url(/img/default.png)';

  var wrapper = document.createElement('div');
  wrapper.className = 'banner-video-wrap';

  var video = document.createElement('video');
  video.className = 'banner-video';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('autoplay', 'autoplay');
  video.setAttribute('muted', 'muted');
  video.setAttribute('loop', 'loop');
  video.setAttribute('playsinline', 'playsinline');
  video.setAttribute('webkit-playsinline', 'webkit-playsinline');
  video.playbackRate = 1;
  video.poster = '/img/default.png';

  var source = document.createElement('source');
  source.src = config.src;
  source.type = 'video/mp4';
  video.appendChild(source);
  wrapper.appendChild(video);
  banner.insertBefore(wrapper, banner.firstChild);

  var playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(function () {
      banner.classList.add('banner-video-fallback');
    });
  }
})();
