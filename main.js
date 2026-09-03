/* ═══════════════════════════════════════════════════════════════
   ARYAN KUMAR  |  main.js  |  v2
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── PROJECT DATA ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    number: '01', title: 'Goody Gifteez',
    subtitle: 'Omni-search gifts across the entire web at once',
    description: 'A universal gift-search aggregator that queries multiple platforms simultaneously, surfacing results through a clean, filterable interface with real-time suggestions and sorting.',
    tech: ['React', 'Node.js', 'REST APIs', 'TailwindCSS'],
    features: [
      'Simultaneous multi-platform gift search aggregation',
      'Real-time suggestions and intelligent filtering',
      'Price & relevance sorting across all sources',
      'Clean, responsive filterable results interface',
      'Fast query engine built on REST API integrations',
    ],
  },
  {
    number: '02', title: 'Dá Crsp',
    subtitle: 'Crispy campus food delivered to your door',
    description: 'A campus-focused food delivery web application featuring dynamic menu filtering, cart management, streamlined checkout, and real-time order tracking.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    features: [
      'Dynamic menu with real-time category filtering',
      'Persistent cart management and checkout flow',
      'Real-time order status tracking',
      'Supabase backend for data and auth',
      'Fully responsive campus-first design',
    ],
  },
  {
    number: '03', title: 'AI Music Detector',
    subtitle: 'AI-powered music recognition & genre detection',
    description: 'An AI-powered browser application that identifies songs from audio input, classifies genres, displays song metadata, and maintains a listening history.',
    tech: ['React', 'Python', 'AI/ML', 'Web Audio API'],
    features: [
      'Browser-based audio capture via Web Audio API',
      'AI/ML-powered song identification and matching',
      'Genre classification with confidence scores',
      'Song metadata display (title, artist, album)',
      'Persistent listening history across sessions',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  generateGrain();
  initIntro();
  initCursor();
  initMouseLight();
  initScrollProgress();
  initNavbar();
  initOrbitalCanvas();
  initMagnetic();
  initReveal();
  initCountUp();
  initProjectRows();
  initProjectOverlay();
  initEducationTimeline();
});

/* ═══════════════════════════════════════════════════════════════
   GRAIN — generate noise texture via canvas
   ═══════════════════════════════════════════════════════════════ */
function generateGrain() {
  const el = document.getElementById('grain');
  if (!el) return;

  const size = 256;
  const c    = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const id  = ctx.createImageData(size, size);

  for (let i = 0; i < id.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    id.data[i]     = v;
    id.data[i + 1] = v;
    id.data[i + 2] = v;
    id.data[i + 3] = (Math.random() * 120 + 60) | 0;
  }

  ctx.putImageData(id, 0, 0);
  el.style.backgroundImage  = `url(${c.toDataURL()})`;
  el.style.backgroundRepeat = 'repeat';
  el.style.backgroundSize   = `${size}px ${size}px`;
}

/* ═══════════════════════════════════════════════════════════════
   INTRO — cinematic ARYAN reveal
   ═══════════════════════════════════════════════════════════════ */
function initIntro() {
  const intro   = document.getElementById('intro');
  const letters = document.querySelectorAll('.intro-letter');
  const word    = document.querySelector('.intro-word');
  if (!intro || !letters.length) { launchHero(); return; }

  // Disable scroll during intro
  document.body.style.overflow = 'hidden';

  // Step 1 — reveal letters one by one
  letters.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 300 + i * 120);
  });

  // Step 2 — after all letters settled, hold then light-sweep
  const holdAt = 300 + letters.length * 120 + 650;
  setTimeout(() => {
    word.classList.add('sweep');
  }, holdAt);

  // Step 3 — dissolve letters
  const dissolveAt = holdAt + 560;
  setTimeout(() => {
    letters.forEach((el) => {
      el.classList.remove('in');
      el.classList.add('out');
    });
  }, dissolveAt);

  // Step 4 — fade out intro, show hero
  const exitAt = dissolveAt + 380;
  setTimeout(() => {
    intro.classList.add('exit');
    document.body.style.overflow = '';
    launchHero();
  }, exitAt);

  // Step 5 — remove intro from DOM
  setTimeout(() => intro.classList.add('gone'), exitAt + 800);
}

function launchHero() {
  setTimeout(() => document.body.classList.add('hero-ready'), 100);
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR — dot + ring + context label
   ═══════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!dot || !ring) return;

  let mx = -300, my = -300;
  let rx = -300, ry = -300;

  // Dot follows cursor directly
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (label) {
      label.style.left = mx + 'px';
      label.style.top  = my + 'px';
    }
  });

  // Ring follows with spring-like lag
  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover states
  const hovers = document.querySelectorAll('a, button, .skill-item, .beyond-item');
  hovers.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });

  // Context-label cursor: project rows → VIEW, photo → EXPLORE, contact links → OPEN ↗
  function addLabelCursor(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (label) label.textContent = text;
        document.body.classList.remove('c-hover');
        document.body.classList.add('c-label');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('c-label');
      });
    });
  }

  addLabelCursor('.project-row', 'VIEW');
  addLabelCursor('[data-cursor-label="EXPLORE"]', 'EXPLORE');
  addLabelCursor('[data-cursor-label="OPEN ↗"], .contact-link', 'OPEN ↗');

  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('c-hover', 'c-label');
  });
}

/* ═══════════════════════════════════════════════════════════════
   MOUSE LIGHT — barely-there pointer illumination
   ═══════════════════════════════════════════════════════════════ */
function initMouseLight() {
  const light = document.getElementById('mouse-light');
  if (!light) return;

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let lx = tx, ly = ty;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  (function animateLight() {
    lx += (tx - lx) * 0.065;
    ly += (ty - ly) * 0.065;
    light.style.left = lx + 'px';
    light.style.top  = ly + 'px';
    requestAnimationFrame(animateLight);
  })();
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const dh  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (dh > 0 ? window.scrollY / dh * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav    = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');
  if (!nav) return;

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Active section
  const updateActive = () => {
    const mid = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(sec => {
      if (mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[data-section="${sec.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   ORBITAL CANVAS — sophisticated 3D wireframe orrery
   ═══════════════════════════════════════════════════════════════ */
function initOrbitalCanvas() {
  const canvas = document.getElementById('orbital-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Mouse influence on rotation
  let mouseInfluence = { x: 0, y: 0 };
  let targetInfluence = { x: 0, y: 0 };
  let rotY = 0; // slow auto-rotation

  document.addEventListener('mousemove', (e) => {
    targetInfluence.x = ((e.clientY / window.innerHeight) - 0.5) * 0.18;
    targetInfluence.y = ((e.clientX / window.innerWidth)  - 0.5) * 0.22;
  });

  // Orbits: [semi-major a, semi-minor b, inclination, rotation-offset, dot-speed, dot-count]
  const orbits = [
    { a: 200, b: 68,  inc: 0.32,  off: 0,    speed: 0.006, dots: 1, alpha: 0.22, dAlpha: 0.7 },
    { a: 290, b: 95,  inc: -0.48, off: 1.2,  speed: 0.004, dots: 1, alpha: 0.15, dAlpha: 0.6 },
    { a: 155, b: 55,  inc: 1.15,  off: 0.6,  speed: 0.010, dots: 2, alpha: 0.12, dAlpha: 0.5 },
    { a: 360, b: 110, inc: 0.12,  off: 2.5,  speed: 0.003, dots: 1, alpha: 0.09, dAlpha: 0.4 },
    { a: 120, b: 40,  inc: -0.9,  off: 1.8,  speed: 0.014, dots: 1, alpha: 0.10, dAlpha: 0.5 },
  ];

  let t = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // Project 3D → 2D with perspective
  function project3D(x3, y3, z3, rx, ry) {
    // Rotate around X
    let y1 = y3 * Math.cos(rx) - z3 * Math.sin(rx);
    let z1 = y3 * Math.sin(rx) + z3 * Math.cos(rx);
    // Rotate around Y
    let x2 = x3 * Math.cos(ry) + z1 * Math.sin(ry);
    let z2 = -x3 * Math.sin(ry) + z1 * Math.cos(ry);

    const fov = 900;
    const scale = fov / (fov + z2 + 200);
    return { sx: x2 * scale, sy: y1 * scale, sz: z2, scale };
  }

  // Get 3D point on tilted ellipse at angle theta
  function ellipsePoint(o, theta) {
    const x = o.a * Math.cos(theta);
    const yFlat = o.b * Math.sin(theta);
    return {
      x,
      y: yFlat * Math.cos(o.inc),
      z: yFlat * Math.sin(o.inc),
    };
  }

  function drawOrbit(o, rx, ry, cx, cy) {
    const segs = 100;
    ctx.beginPath();
    let first = true;

    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI * 2 + o.off;
      const p3 = ellipsePoint(o, theta);
      const p2 = project3D(p3.x, p3.y, p3.z, rx, ry);

      // Fade back half of orbit slightly
      const depth = (p2.sz + 400) / 800;
      const depthAlpha = 0.4 + 0.6 * Math.max(0, Math.min(1, depth));

      if (first) {
        ctx.beginPath();
        ctx.moveTo(cx + p2.sx, cy + p2.sy);
        first = false;
      } else {
        ctx.lineTo(cx + p2.sx, cy + p2.sy);
      }
    }

    ctx.closePath();
    ctx.strokeStyle = `rgba(255,255,255,${o.alpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Dots (planets) on orbit
    for (let d = 0; d < o.dots; d++) {
      const dotTheta = (t * o.speed + (d / o.dots) * Math.PI * 2 + o.off) % (Math.PI * 2);
      const p3 = ellipsePoint(o, dotTheta);
      const p2 = project3D(p3.x, p3.y, p3.z, rx, ry);

      const r = Math.max(1, 2.2 * p2.scale);
      const grd = ctx.createRadialGradient(
        cx + p2.sx, cy + p2.sy, 0,
        cx + p2.sx, cy + p2.sy, r * 2.5
      );
      grd.addColorStop(0, `rgba(255,255,255,${o.dAlpha})`);
      grd.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.beginPath();
      ctx.arc(cx + p2.sx, cy + p2.sy, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  // Draw a thin central cross-wire for depth
  function drawCenterPoint(rx, ry, cx, cy) {
    const p2 = project3D(0, 0, 0, rx, ry);
    ctx.beginPath();
    ctx.arc(cx + p2.sx, cy + p2.sy, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
  }

  function frame() {
    // Smooth mouse influence
    mouseInfluence.x += (targetInfluence.x - mouseInfluence.x) * 0.04;
    mouseInfluence.y += (targetInfluence.y - mouseInfluence.y) * 0.04;

    rotY += 0.0018; // slow auto-rotation

    const rx = 0.38 + mouseInfluence.x;
    const ry = rotY  + mouseInfluence.y;
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort by apparent depth so further orbits paint first
    const sorted = [...orbits].sort((a, b) => {
      const pa = project3D(0, 0, a.b * Math.sin(a.inc), rx, ry);
      const pb = project3D(0, 0, b.b * Math.sin(b.inc), rx, ry);
      return pa.sz - pb.sz;
    });

    sorted.forEach(o => drawOrbit(o, rx, ry, cx, cy));
    drawCenterPoint(rx, ry, cx, cy);

    t++;
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Hero photo subtle parallax
  const photoFrame = document.getElementById('hero-photo-frame');
  if (photoFrame) {
    document.addEventListener('mousemove', (e) => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * -8;
      const dy = (e.clientY / window.innerHeight - 0.5) * -6;
      photoFrame.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  frame();
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTONS
   ═══════════════════════════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.3;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.3;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-fade');
  const io  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   COUNT UP — stat numbers
   ═══════════════════════════════════════════════════════════════ */
function initCountUp() {
  const stats = document.querySelectorAll('.stat-num[data-target]');
  const io    = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el      = e.target;
      const target  = parseFloat(el.dataset.target);
      const decimal = parseInt(el.dataset.decimal || '0');
      const dur     = 1800;
      const start   = performance.now();

      const tick = (now) => {
        const prog = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 4);
        el.textContent = decimal > 0
          ? (ease * target).toFixed(decimal)
          : Math.floor(ease * target);
        if (prog < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  stats.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT ROWS — click → detail overlay
   ═══════════════════════════════════════════════════════════════ */
function initProjectRows() {
  document.querySelectorAll('.project-row').forEach(row => {
    row.addEventListener('click', () => openOverlay(parseInt(row.dataset.project, 10)));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openOverlay(parseInt(row.dataset.project, 10));
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL OVERLAY
   ═══════════════════════════════════════════════════════════════ */
function initProjectOverlay() {
  const overlay = document.getElementById('project-overlay');
  const closeBtn = document.getElementById('po-close');
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOverlay();
  });
}

function openOverlay(idx) {
  const p = PROJECTS[idx];
  const overlay = document.getElementById('project-overlay');
  if (!p || !overlay) return;

  document.getElementById('po-idx').textContent      = `PROJECT ${p.number}`;
  document.getElementById('po-title').textContent    = p.title;
  document.getElementById('po-subtitle').textContent = p.subtitle;
  document.getElementById('po-desc').textContent     = p.description;

  document.getElementById('po-tech').innerHTML = p.tech
    .map(t => `<span class="po-tech-tag">${t}</span>`).join('');

  document.getElementById('po-features').innerHTML = p.features
    .map(f => `<li>${f}</li>`).join('');

  overlay.setAttribute('aria-hidden', 'false');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  setTimeout(() => document.getElementById('po-close').focus(), 80);
}

function closeOverlay() {
  const overlay = document.getElementById('project-overlay');
  if (!overlay) return;
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════
   EDUCATION TIMELINE — line illumination on scroll
   ═══════════════════════════════════════════════════════════════ */
function initEducationTimeline() {
  const lines = document.querySelectorAll('.edu-line');
  const dots  = document.querySelectorAll('.edu-dot:not(.edu-dot--active)');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('lit');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  lines.forEach(l => io.observe(l));
  dots.forEach(d  => io.observe(d));
}
