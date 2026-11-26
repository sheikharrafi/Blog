// ---------- Particle network canvas ----------
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
    init();
  }

  function init() {
    const count = Math.min(90, Math.floor((w * h) / 14000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.8
    }));
  }

  function accent() {
    return document.body.classList.contains('light')
      ? '8, 145, 178'
      : '0, 229, 255';
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const c = accent();
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + c + ', 0.8)';
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(' + c + ', ' + (0.25 * (1 - d / 120)) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// ---------- Typewriter ----------
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = ['Programming.', 'App Development.'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);
    let delay = deleting ? 50 : 110;
    if (!deleting && ci === word.length) {
      delay = 1600; deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false; wi = (wi + 1) % words.length; delay = 400;
    } else {
      ci += deleting ? -1 : 1;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

// ---------- Dark / light toggle ----------
(function () {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('skrafi-theme');
  if (saved === 'light') document.body.classList.add('light');
  updateIcon();
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('skrafi-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateIcon();
  });
  function updateIcon() {
    btn.textContent = document.body.classList.contains('light') ? '\u2600' : '\u263D';
  }
})();

// ---------- Mobile menu ----------
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
})();

// ---------- Skill bars animate on scroll ----------
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => obs.observe(f));
})();

// ---------- Back to top ----------
(function () {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ---------- Toast ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ---------- Download CV (placeholder — no CV file available) ----------
document.getElementById('cvBtn').addEventListener('click', () => {
  showToast('CV is not available yet. Please contact Sheikh Arrafi for the latest CV.');
});

// ---------- Contact form (demo only) ----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Thank you! This form is for demonstration purposes only.');
  e.target.reset();
});
