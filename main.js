/* ============================================================
   main.js — RecCAR Project Page
============================================================ */

// ─────────────────────────────────────────────────────────────
//  METADATA FOR ALL 14 VIDEO-MOTION SAMPLES
// ─────────────────────────────────────────────────────────────
const motionSamples = [
  {
    id: 1,
    category: "running",
    title: "High-Speed Sprinting",
    caption: "Baseline EchoMotion generates distorted knee joints and trailing feet. RecCAR corrects limb articulation and preserves natural stride geometry.",
    tag: "Athletic & Running"
  },
  {
    id: 2,
    category: "running",
    title: "Track Running & Hurdles",
    caption: "RecCAR eliminates foot floating and aligns hip rotation during high-velocity running strides.",
    tag: "Athletic & Running"
  },
  {
    id: 3,
    category: "yoga",
    title: "Yoga Warrior Pose",
    caption: "Baseline exhibits severe torso twist with legs pointing backwards. RecCAR aligns full-body orientation and joint posture.",
    tag: "Yoga & Gymnastics"
  },
  {
    id: 7,
    category: "dance",
    title: "Gymnastic Backflip",
    caption: "Baseline loses limb structure mid-flip. RecCAR enforces anatomically consistent rotation and landing posture.",
    tag: "Dance & Dynamic"
  },
  {
    id: 5,
    category: "dance",
    title: "Breakdance Inversion",
    caption: "Preserves spine curvature and inverted shoulder posture during complex acro-dance movement.",
    tag: "Dance & Dynamic"
  },
  {
    id: 6,
    category: "dance",
    title: "Rhythmic Jump & Spin",
    caption: "RecCAR stabilizes knee elevation and upper body alignment across 360° rotational jumps.",
    tag: "Dance & Dynamic"
  },
  {
    id: 4,
    category: "yoga",
    title: "Flexibility & Balance Stretch",
    caption: "RecCAR maintains precise arm span and leg extension without phantom joints or unnatural limb stretching.",
    tag: "Yoga & Gymnastics"
  },
  {
    id: 8,
    category: "running",
    title: "Basketball Airborne Jump",
    caption: "Corrects arm elevation and leg flexion during vertical jump and ball release.",
    tag: "Athletic & Running"
  },
  {
    id: 9,
    category: "daily",
    title: "Indoor Walking & Turning",
    caption: "Natural gait cycle with faithful arm-leg cross coordination and smooth directional change.",
    tag: "Indoor & Daily"
  },
  {
    id: 10,
    category: "daily",
    title: "Sitting Down on Chair",
    caption: "Accurate pelvic placement and knee bending angle matching the seating surface.",
    tag: "Indoor & Daily"
  },
  {
    id: 11,
    category: "daily",
    title: "Standing Up & Hand Gesture",
    caption: "Smooth transition from seated posture to upright stance with realistic hand placement.",
    tag: "Indoor & Daily"
  },
  {
    id: 13,
    category: "running",
    title: "Tennis Serve & Forehand Swing",
    caption: "Accurate shoulder rotation and racquet arm trajectory throughout the serve motion.",
    tag: "Athletic & Running"
  },
  {
    id: 14,
    category: "dance",
    title: "Skateboarding Trick & Landing",
    caption: "Balance recovery and foot alignment relative to board motion during dynamic landing.",
    tag: "Dance & Dynamic"
  }
];

// ─────────────────────────────────────────────────────────────
//  METADATA FOR ALL 4 AUDIO-VIDEO SAMPLES
// ─────────────────────────────────────────────────────────────
const audioSamples = [
  {
    id: 1,
    title: "Galloping Horse on Turf",
    caption: "Audio transients are tightly synchronized with visual hoof impacts. Baseline exhibits a 0.8s acoustic lag.",
    tag: "Animal & Nature"
  },
  {
    id: 2,
    title: "Tapping & Percussion Impact",
    caption: "Sharp acoustic strike peaks align frame-by-frame with visible hand and stick contact events.",
    tag: "Musical & Percussion"
  },
  {
    id: 3,
    title: "Dog Barking Action",
    caption: "Acoustic envelope matches mouth opening motion without temporal desynchronization.",
    tag: "Vocal & Action"
  },
  {
    id: 4,
    title: "Water Splash & Stream Flow",
    caption: "Audio intensity profile matches visual fluid surface turbulence and splash impacts.",
    tag: "Environmental Sound"
  }
];

// ─────────────────────────────────────────────────────────────
//  HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

function getMotionVideoPath(id) {
  return `data/Video-Motion/sample_${id}.mp4`;
}

function getAudioVideoPath(id) {
  return `data/Audio-Video/sample_${id}.mp4`;
}

// ─────────────────────────────────────────────────────────────
//  CREATE MOTION VIDEO CARD (2-COLUMN BEFORE/AFTER INSIDE ONE VIDEO)
// ─────────────────────────────────────────────────────────────

function createMotionCard(item) {
  const card = document.createElement("div");
  card.className = "video-card";
  card.dataset.category = item.category;

  const header = document.createElement("div");
  header.className = "card-header";
  header.innerHTML = `
    <div class="header-side left"><span class="badge-dot baseline"></span>Baseline (EchoMotion)</div>
    <div class="header-side right"><span class="badge-dot ours"></span>+ RecCAR (Ours)</div>
  `;

  const videoWrap = document.createElement("div");
  videoWrap.className = "video-wrapper";

  const video = document.createElement("video");
  video.src = getMotionVideoPath(item.id);
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";

  // Overlay controls
  const controlsOverlay = document.createElement("div");
  controlsOverlay.className = "video-controls-overlay";
  controlsOverlay.innerHTML = `
    <button class="ctrl-btn play-btn" title="Play / Pause">▶</button>
    <div class="speed-selector" title="Playback Speed">
      <span class="speed-opt" data-speed="0.5">0.5x</span>
      <span class="speed-opt active" data-speed="1.0">1x</span>
      <span class="speed-opt" data-speed="1.5">1.5x</span>
    </div>
    <button class="ctrl-btn fs-btn" title="Toggle Fullscreen">⛶</button>
  `;

  videoWrap.appendChild(video);
  videoWrap.appendChild(controlsOverlay);

  card.appendChild(header);
  card.appendChild(videoWrap);

  // Video Interaction Handlers
  const playBtn = controlsOverlay.querySelector(".play-btn");
  const speedOpts = controlsOverlay.querySelectorAll(".speed-opt");
  const fsBtn = controlsOverlay.querySelector(".fs-btn");

  function togglePlay() {
    if (video.paused) {
      video.play().catch(() => { });
      playBtn.textContent = "❚❚";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  }

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlay();
  });

  videoWrap.addEventListener("click", (e) => {
    if (e.target.classList.contains("speed-opt") || e.target.classList.contains("fs-btn")) return;
    togglePlay();
  });

  videoWrap.addEventListener("mouseenter", () => {
    video.play().catch(() => { });
    playBtn.textContent = "❚❚";
  });

  videoWrap.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
    playBtn.textContent = "▶";
  });

  speedOpts.forEach(opt => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      speedOpts.forEach(s => s.classList.remove("active"));
      opt.classList.add("active");
      const speed = parseFloat(opt.dataset.speed);
      video.playbackRate = speed;
    });
  });

  fsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  });

  // IntersectionObserver autoplay when visible
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => { });
        playBtn.textContent = "❚❚";
      } else {
        video.pause();
        playBtn.textContent = "▶";
      }
    });
  }, { threshold: 0.3 });
  obs.observe(card);

  return card;
}

// ─────────────────────────────────────────────────────────────
//  CREATE AUDIO VIDEO CARD (3-COLUMN PANELS WITH UNMUTE BUTTON)
// ─────────────────────────────────────────────────────────────

function createAudioCard(item) {
  const card = document.createElement("div");
  card.className = "video-card audio-card";

  const header = document.createElement("div");
  header.className = "card-header";
  header.innerHTML = `
    <div class="header-side left"><span class="badge-dot baseline"></span>Baseline (LTX-2)</div>
    <div class="header-side right"><span class="badge-dot ours"></span>+ RecCAR (Ours)</div>
  `;

  const videoWrap = document.createElement("div");
  videoWrap.className = "video-wrapper";

  const video = document.createElement("video");
  video.src = getAudioVideoPath(item.id);
  video.loop = true;
  video.muted = true; // Muted by default to respect browser policies
  video.playsInline = true;
  video.preload = "metadata";

  // Audio Controls Overlay
  const controlsOverlay = document.createElement("div");
  controlsOverlay.className = "video-controls-overlay audio-controls";
  controlsOverlay.innerHTML = `
    <button class="ctrl-btn unmute-btn" title="Toggle Audio Sound">
      <span class="sound-icon">🔇</span>
      <span class="sound-text">Click to Unmute Audio</span>
    </button>
    <button class="ctrl-btn play-btn" title="Play / Pause">▶</button>
  `;

  videoWrap.appendChild(video);
  videoWrap.appendChild(controlsOverlay);

  card.appendChild(header);
  card.appendChild(videoWrap);

  // Audio Interaction Handlers
  const unmuteBtn = controlsOverlay.querySelector(".unmute-btn");
  const playBtn = controlsOverlay.querySelector(".play-btn");
  const soundIcon = unmuteBtn.querySelector(".sound-icon");
  const soundText = unmuteBtn.querySelector(".sound-text");

  unmuteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    if (!video.muted) {
      soundIcon.textContent = "🔊";
      soundText.textContent = "Audio Enabled";
      unmuteBtn.classList.add("active");
      video.play().catch(() => { });
    } else {
      soundIcon.textContent = "🔇";
      soundText.textContent = "Click to Unmute Audio";
      unmuteBtn.classList.remove("active");
    }
  });

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play().catch(() => { });
      playBtn.textContent = "❚❚";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  });

  videoWrap.addEventListener("click", (e) => {
    if (e.target.closest(".unmute-btn")) return;
    if (video.paused) {
      video.play().catch(() => { });
      playBtn.textContent = "❚❚";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  });

  // IntersectionObserver for visibility
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => { });
        playBtn.textContent = "❚❚";
      } else {
        video.pause();
        playBtn.textContent = "▶";
      }
    });
  }, { threshold: 0.3 });
  obs.observe(card);

  return card;
}

// ─────────────────────────────────────────────────────────────
//  POPULATE GRIDS
// ─────────────────────────────────────────────────────────────

function renderMotionGrid(filter = "all") {
  const grid = document.getElementById("motion-videos-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = filter === "all" ? motionSamples : motionSamples.filter(s => s.category === filter);
  filtered.forEach(item => {
    const card = createMotionCard(item);
    grid.appendChild(card);
  });
}

function renderAudioGrid() {
  const grid = document.getElementById("audio-videos-grid");
  if (!grid) return;
  grid.innerHTML = "";

  audioSamples.forEach(item => {
    const card = createAudioCard(item);
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────────────────────
//  CATEGORY FILTER BAR HANDLER
// ─────────────────────────────────────────────────────────────

function setupFilterBar() {
  const bar = document.getElementById("motion-filter-bar");
  if (!bar) return;

  const buttons = bar.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      renderMotionGrid(cat);
    });
  });
}

// ─────────────────────────────────────────────────────────────
//  COPY BIBTEX HANDLER
// ─────────────────────────────────────────────────────────────

function copyBibtex() {
  const text = document.getElementById("bibtex-text")?.innerText ?? "";
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-bibtex");
    if (!btn) return;
    btn.textContent = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "Copy BibTeX";
      btn.classList.remove("copied");
    }, 2200);
  });
}

// ─────────────────────────────────────────────────────────────
//  SCROLL REVEAL & STICKY NAV LOGIC
// ─────────────────────────────────────────────────────────────

function setupScrollEffects() {
  const topnav = document.getElementById("topnav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      topnav?.classList.add("scrolled");
    } else {
      topnav?.classList.remove("scrolled");
    }
  });

  const targets = document.querySelectorAll(
    ".abstract-card, .idea-card, .equation-block, .video-card, .results-table-wrap, .bibtex-block, .figure-card"
  );

  const style = document.createElement("style");
  style.textContent = `
    .sr-hidden { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .sr-visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  targets.forEach(el => el.classList.add("sr-hidden"));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sr-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

// ─────────────────────────────────────────────────────────────
//  SETUP HERO TEASER CARDS CONTROLS
// ─────────────────────────────────────────────────────────────

function setupTeaserCards() {
  const teaserCards = document.querySelectorAll(".hero-teaser-card");
  teaserCards.forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    const unmuteBtn = card.querySelector(".unmute-btn");
    const playBtn = card.querySelector(".play-btn");
    const speedOpts = card.querySelectorAll(".speed-opt");
    const fsBtn = card.querySelector(".fs-btn");

    if (unmuteBtn) {
      const soundIcon = unmuteBtn.querySelector(".sound-icon");
      const soundText = unmuteBtn.querySelector(".sound-text");

      // Attempt unmuted play by default
      video.muted = false;
      video.play().catch(() => {
        // Fallback if browser blocks unmuted autoplay without prior gesture
        video.muted = true;
        soundIcon.textContent = "🔇";
        soundText.textContent = "Click to Unmute Audio";
        unmuteBtn.classList.remove("active");
        video.play().catch(() => { });
      });

      unmuteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted) {
          soundIcon.textContent = "🔊";
          soundText.textContent = "Audio Enabled";
          unmuteBtn.classList.add("active");
          video.play().catch(() => { });
        } else {
          soundIcon.textContent = "🔇";
          soundText.textContent = "Click to Unmute Audio";
          unmuteBtn.classList.remove("active");
        }
      });
    }

    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().catch(() => { });
          playBtn.textContent = "❚❚";
        } else {
          video.pause();
          playBtn.textContent = "▶";
        }
      });
    }

    speedOpts.forEach(opt => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        speedOpts.forEach(s => s.classList.remove("active"));
        opt.classList.add("active");
        video.playbackRate = parseFloat(opt.dataset.speed);
      });
    });

    if (fsBtn) {
      fsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderMotionGrid("all");
  renderAudioGrid();
  setupFilterBar();
  setupTeaserCards();
  setupScrollEffects();
});

