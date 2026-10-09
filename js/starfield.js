/* Starfield backdrop with a hyperspace streak when the tab changes */
(function () {
  const c = document.getElementById('starfield'); if (!c) return;
  const ctx = c.getContext('2d'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, stars = [], boost = 0;
  function size() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    stars = Array.from({ length: 160 }, () => ({ x: (Math.random() - .5) * w, y: (Math.random() - .5) * h, z: Math.random() * w }));
  }
  size(); addEventListener('resize', size);
  window.hyperjump = () => { if (!reduce) boost = 38; };
  (function frame() {
    ctx.fillStyle = 'rgba(0,0,0,' + (boost > 1 ? .25 : .6) + ')'; ctx.fillRect(0, 0, w, h);
    const sp = (reduce ? 0 : .6) + boost; boost *= .93;
    stars.forEach(s => {
      const px = s.x / s.z * w + w / 2, py = s.y / s.z * h + h / 2; s.z -= sp;
      if (s.z < 1) { s.x = (Math.random() - .5) * w; s.y = (Math.random() - .5) * h; s.z = w; return; }
      const nx = s.x / s.z * w + w / 2, ny = s.y / s.z * h + h / 2, a = 1 - s.z / w;
      ctx.strokeStyle = `rgba(190,215,255,${a})`; ctx.lineWidth = 1 + a;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx, ny); ctx.stroke();
    });
    requestAnimationFrame(frame);
  })();
})();
