(function() {
  function initLiveCounter(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var count = 3696;
    function update() {
      var delta = Math.floor(Math.random() * 7) - 3;
      count = Math.max(3500, count + delta);
      el.textContent = count.toLocaleString('ru-RU');
    }
    setInterval(update, 300000);
  }
  initLiveCounter('liveCount');
  initLiveCounter('liveCount2');
})();

(function() {
  var wrappers = document.querySelectorAll('.gc-slider-wrapper, .gc2-slider-wrapper');
  wrappers.forEach(function(track) {
    var isDown = false;
    var startX, scrollLeft;
    track.addEventListener('mousedown', function(e) {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', function() {
      isDown = false;
      track.style.cursor = 'grab';
    });
    track.addEventListener('mouseup', function() {
      isDown = false;
      track.style.cursor = 'grab';
    });
    track.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
    track.addEventListener('wheel', function(e) {
      var delta = e.deltaY || e.deltaX;
      track.scrollBy({ left: delta, behavior: 'smooth' });
      e.preventDefault();
    }, { passive: false });
  });
})();

(function() {
  var zoomSvg = '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/><line x1="10.5" y1="7" x2="10.5" y2="14"/><line x1="7" y1="10.5" x2="14" y2="10.5"/></svg>';

  var items = document.querySelectorAll('.gc-slider-item, .gc2-slider-item');
  items.forEach(function(item) {
    if (item.querySelector('.slider-zoom-overlay')) return;
    item.style.position = 'relative';

    var overlay = document.createElement('div');
    overlay.className = 'slider-zoom-overlay';
    overlay.innerHTML = '<div class="slider-zoom-icon">' + zoomSvg + '</div>';
    overlay.addEventListener('click', function(e) {
      e.stopPropagation();
      var img = item.querySelector('img');
      if (!img) return;
      openLightbox(img.src);
    });
    item.appendChild(overlay);
  });

  var lb = null;

  function openLightbox(src) {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'slider-lightbox';
      lb.addEventListener('click', function() { closeLightbox(); });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lb.classList.contains('active')) closeLightbox();
      });
      document.body.appendChild(lb);
    }
    lb.innerHTML = '<img src="' + src.replace(/&/g,'&amp;').replace(/"/g,'&quot;') + '" alt="">';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function() {
      lb.classList.add('active');
    });
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }
})();
