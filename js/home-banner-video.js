(function () {
  var path = window.location.pathname;
  var archiveImages = [
    '/guidang/3.png',
    '/guidang/5.png',
    '/guidang/6.png',
    '/guidang/8.png',
    '/guidang/9.png',
    '/guidang/10.png',
  ];

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function forceDarkMode() {
    try {
      localStorage.setItem('Fluid_Color_Scheme', 'dark');
    } catch (e) {}

    document.documentElement.setAttribute('data-user-color-scheme', 'dark');

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      var color = getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg-color').trim();
      if (color) {
        themeColor.setAttribute('content', color);
      }
    }

    var desktopToggle = document.getElementById('color-toggle-btn');
    if (desktopToggle && desktopToggle.parentNode) {
      desktopToggle.parentNode.removeChild(desktopToggle);
    }

    var mobileToggle = document.getElementById('mobile-color-toggle-btn');
    if (mobileToggle && mobileToggle.parentNode) {
      mobileToggle.parentNode.removeChild(mobileToggle);
    }
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
    '/categories/': {
      mode: 'image',
      bodyClass: 'category-banner-random',
      images: archiveImages
    },
    '/categories/index.html': {
      mode: 'image',
      bodyClass: 'category-banner-random',
      images: archiveImages
    },
    '/tags/': {
      mode: 'image',
      bodyClass: 'tag-banner-random',
      images: archiveImages
    },
    '/tags/index.html': {
      mode: 'image',
      bodyClass: 'tag-banner-random',
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

  forceDarkMode();

  var config = pageMap[path];
  var isPostPage = !config && document.querySelector('meta[property="og:type"][content="article"]');
  if (isPostPage) {
    config = {
      mode: 'image',
      bodyClass: 'post-banner-random',
      images: archiveImages
    };
  }
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