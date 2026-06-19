(function() {
  initLiveCounter('liveCount');
  initLiveCounter('liveCount2');

  function initLiveCounter(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var count = 3696;
    setInterval(function() {
      var delta = Math.floor(Math.random() * 7) - 3;
      count = Math.max(3500, count + delta);
      el.textContent = count.toLocaleString('ru-RU');
    }, 300000);
  }

  var wrappers = document.querySelectorAll('.gc-slider-wrapper, .gc2-slider-wrapper');
  wrappers.forEach(function(track) {
    var isDown = false, startX, scrollLeft;
    function endDrag() { isDown = false; track.style.cursor = 'grab'; }
    track.addEventListener('mousedown', function(e) {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5;
    });
    track.addEventListener('wheel', function(e) {
      track.scrollBy({ left: e.deltaY || e.deltaX, behavior: 'smooth' });
      e.preventDefault();
    }, { passive: false });
  });

  var zoomSvg = '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/><line x1="10.5" y1="7" x2="10.5" y2="14"/><line x1="7" y1="10.5" x2="14" y2="10.5"/></svg>';

  document.querySelectorAll('.gc-slider-item, .gc2-slider-item').forEach(function(item) {
    if (item.querySelector('.slider-zoom-overlay')) return;
    item.style.position = 'relative';
    var overlay = document.createElement('div');
    overlay.className = 'slider-zoom-overlay';
    overlay.innerHTML = '<div class="slider-zoom-icon">' + zoomSvg + '</div>';
    overlay.addEventListener('click', function() {
      var img = item.querySelector('img');
      if (img) openLightbox(img.src);
    });
    item.appendChild(overlay);
  });

  var lb = null;

  function openLightbox(src) {
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'slider-lightbox';
      lb.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lb.classList.contains('active')) closeLightbox();
      });
      document.body.appendChild(lb);
    }
    lb.innerHTML = '<img src="' + src.replace(/&/g,'&amp;').replace(/"/g,'&quot;') + '" alt="">';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function() { lb.classList.add('active'); });
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }
})();
