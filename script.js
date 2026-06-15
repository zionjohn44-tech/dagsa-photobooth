/* =========================================
   DAGSA 2026 — JavaScript
   Tab switching, navbar, FAM modal, gallery
   ========================================= */

// ===== TAB SWITCHING =====
function switchTab(tabId, linkEl) {
  // Hide all sections
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  // Remove active from all nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Show target section
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Set active nav link
  if (linkEl) {
    linkEl.classList.add('active');
  } else {
    // Find by data-tab if no element passed
    const navLink = document.querySelector(`[data-tab="${tabId}"]`);
    if (navLink) navLink.classList.add('active');
  }

  // Close mobile menu
  document.getElementById('nav-links').classList.remove('open');

  // Re-run intersection observer for new section
  observeFadeIns();
}

// ===== HAMBURGER MENU =====
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== FAM GALLERY MODAL =====
const famData = {
  junior:      {
    name: 'Junior FAM',
    color: '#e63946',
    folder: 'ASSETS/FAMs/JUNIOR',
    photos: [
      'photo_1_2026-06-15_23-05-47.jpg',
      'photo_2_2026-06-15_23-05-47.jpg',
      'photo_3_2026-06-15_23-05-47.jpg',
      'photo_4_2026-06-15_23-05-47.jpg',
    ]
  },
  preuni:      {
    name: 'Pre-Uni FAM',
    color: '#f4d03f',
    folder: 'ASSETS/FAMs/PRE-UNI',
    photos: [
      'photo_13_2026-06-15_23-06-17.jpg',
      'photo_14_2026-06-15_23-06-17.jpg',
      'photo_15_2026-06-15_23-06-17.jpg',
      'photo_16_2026-06-15_23-06-17.jpg',
      'photo_17_2026-06-15_23-06-17.jpg',
      'photo_18_2026-06-15_23-06-17.jpg',
    ]
  },
  collegiate:  {
    name: 'Collegiate FAM',
    color: '#1d4ed8',
    folder: 'ASSETS/FAMs/COLLEGIATE',
    photos: [
      'photo_1_2026-06-15_23-06-17.jpg',
      'photo_2_2026-06-15_23-06-17.jpg',
      'photo_3_2026-06-15_23-06-17.jpg',
      'photo_4_2026-06-15_23-06-17.jpg',
      'photo_5_2026-06-15_23-06-17.jpg',
      'photo_6_2026-06-15_23-06-17.jpg',
    ]
  },
  youngadults: {
    name: 'Young Adults FAM',
    color: '#16a34a',
    folder: 'ASSETS/FAMs/YOUNG ADULTS',
    photos: [
      'photo_7_2026-06-15_23-06-17.jpg',
      'photo_8_2026-06-15_23-06-17.jpg',
      'photo_9_2026-06-15_23-06-17.jpg',
      'photo_10_2026-06-15_23-06-17.jpg',
      'photo_11_2026-06-15_23-06-17.jpg',
      'photo_12_2026-06-15_23-06-17.jpg',
    ]
  },
};

function openFamGallery(famKey) {
  const fam    = famData[famKey];
  const modal  = document.getElementById('fam-modal');
  const title  = document.getElementById('modal-fam-title');
  const gallery = document.getElementById('modal-gallery');

  title.textContent = fam.name + ' Gallery';
  title.style.color = fam.color;

  if (fam.photos && fam.photos.length > 0) {
    gallery.innerHTML = fam.photos.map(filename => {
      const src = `${fam.folder}/${filename}`;
      return `
        <div class="modal-gallery-item" onclick="openLightbox('${src}', '${filename}')">
          <img src="${src}" alt="${fam.name} photo" loading="lazy" />
          <div class="modal-gallery-overlay">
            <span>🔍 View</span>
          </div>
        </div>
      `;
    }).join('');
  } else {
    gallery.innerHTML = `
      <p style="color:rgba(255,255,255,0.55); text-align:center; padding:3rem; font-size:1rem; grid-column:1/-1;">
        📸 Photos for <strong style="color:${fam.color};">${fam.name}</strong> are coming soon!<br>
        <span style="font-size:0.85rem; color:rgba(255,255,255,0.35);">Check back after DAGSA 2026!</span>
      </p>
    `;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFamModal(event) {
  if (event.target === document.getElementById('fam-modal')) {
    closeFamModalBtn();
  }
}

function closeFamModalBtn() {
  document.getElementById('fam-modal').classList.remove('open');
  document.body.style.overflow = '';
}


// ===== PHOTOSTRIP GALLERY =====
const photostripFiles = [
  'DAGSA2026_Photostrip_20260614_143750.png',
  'DAGSA2026_Photostrip_20260614_143851.png',
  'DAGSA2026_Photostrip_20260614_144007.png',
  'DAGSA2026_Photostrip_20260614_144159.png',
  'DAGSA2026_Photostrip_20260614_153209.png',
  'DAGSA2026_Photostrip_20260614_153640.png',
  'DAGSA2026_Photostrip_20260614_153725.png',
  'DAGSA2026_Photostrip_20260614_153921.png',
  'DAGSA2026_Photostrip_20260614_153952.png',
  'DAGSA2026_Photostrip_20260614_154030.png',
  'DAGSA2026_Photostrip_20260614_154111.png',
  'DAGSA2026_Photostrip_20260614_154145.png',
  'DAGSA2026_Photostrip_20260614_154213.png',
  'DAGSA2026_Photostrip_20260614_154251.png',
  'DAGSA2026_Photostrip_20260614_154320.png',
  'DAGSA2026_Photostrip_20260614_154351.png',
  'DAGSA2026_Photostrip_20260614_154422.png',
  'DAGSA2026_Photostrip_20260614_154507.png',
  'DAGSA2026_Photostrip_20260614_154536.png',
  'DAGSA2026_Photostrip_20260614_154609.png',
  'DAGSA2026_Photostrip_20260614_154631.png',
  'DAGSA2026_Photostrip_20260614_154657.png',
  'DAGSA2026_Photostrip_20260614_154721.png',
  'DAGSA2026_Photostrip_20260614_154755.png',
  'DAGSA2026_Photostrip_20260614_154818.png',
  'DAGSA2026_Photostrip_20260614_154916.png',
  'DAGSA2026_Photostrip_20260614_154941.png',
  'DAGSA2026_Photostrip_20260614_155017.png',
  'DAGSA2026_Photostrip_20260614_155108.png',
  'DAGSA2026_Photostrip_20260614_155134.png',
  'DAGSA2026_Photostrip_20260614_180721.png',
  'DAGSA2026_Photostrip_20260614_180750.png',
  'DAGSA2026_Photostrip_20260614_180819.png',
  'DAGSA2026_Photostrip_20260614_180918.png',
  'DAGSA2026_Photostrip_20260614_180954.png',
  'DAGSA2026_Photostrip_20260614_181023.png',
  'DAGSA2026_Photostrip_20260614_181100.png',
  'DAGSA2026_Photostrip_20260614_181127.png',
  'DAGSA2026_Photostrip_20260614_181151.png',
  'DAGSA2026_Photostrip_20260614_181215.png',
  'DAGSA2026_Photostrip_20260614_181244.png',
  'DAGSA2026_Photostrip_20260614_181309.png',
  'DAGSA2026_Photostrip_20260614_181331.png',
  'DAGSA2026_Photostrip_20260614_181353.png',
  'DAGSA2026_Photostrip_20260614_181414.png',
  'DAGSA2026_Photostrip_20260614_181436.png',
  'DAGSA2026_Photostrip_20260614_181458.png',
  'DAGSA2026_Photostrip_20260614_181525.png',
  'DAGSA2026_Photostrip_20260614_181548.png',
  'DAGSA2026_Photostrip_20260614_181611.png',
  'DAGSA2026_Photostrip_20260614_181632.png',
  'DAGSA2026_Photostrip_20260614_181657.png',
  'DAGSA2026_Photostrip_20260614_181720.png',
  'DAGSA2026_Photostrip_20260614_181744.png',
  'DAGSA2026_Photostrip_20260614_181820.png',
  'DAGSA2026_Photostrip_20260614_181853.png',
  'DAGSA2026_Photostrip_20260614_181923.png',
  'DAGSA2026_Photostrip_20260614_181946.png',
  'DAGSA2026_Photostrip_20260614_182018.png',
  'DAGSA2026_Photostrip_20260614_182042.png',
  'DAGSA2026_Photostrip_20260614_182106.png',
  'DAGSA2026_Photostrip_20260614_182128.png',
  'DAGSA2026_Photostrip_20260614_182150.png',
  'DAGSA2026_Photostrip_20260614_182212.png',
  'DAGSA2026_Photostrip_20260614_182233.png',
  'DAGSA2026_Photostrip_20260614_182303.png',
  'DAGSA2026_Photostrip_20260614_182326.png',
  'DAGSA2026_Photostrip_20260614_182349.png',
  'DAGSA2026_Photostrip_20260614_182415.png',
  'DAGSA2026_Photostrip_20260614_182631.png',
  'DAGSA2026_Photostrip_20260614_182704.png',
  'DAGSA2026_Photostrip_20260614_182750.png',
  'DAGSA2026_Photostrip_20260614_182849.png',
  'DAGSA2026_Photostrip_20260614_182920.png',
  'DAGSA2026_Photostrip_20260614_183047.png',
  'DAGSA2026_Photostrip_20260614_183153.png',
  'DAGSA2026_Photostrip_20260614_183237.png',
  'DAGSA2026_Photostrip_20260614_183324.png',
  'DAGSA2026_Photostrip_20260614_183405.png',
];

const STRIPS_PER_PAGE = 9;
let stripsLoaded = 0;

function buildStripGrid() {
  const grid = document.getElementById('strip-grid');
  if (!grid) return;
  grid.innerHTML = '';
  stripsLoaded = 0;
  renderMoreStrips();
}

function renderMoreStrips() {
  const grid = document.getElementById('strip-grid');
  if (!grid) return;

  const next  = Math.min(stripsLoaded + STRIPS_PER_PAGE, photostripFiles.length);
  const batch = photostripFiles.slice(stripsLoaded, next);

  batch.forEach((filename, batchIdx) => {
    const i   = stripsLoaded + batchIdx;
    const src = `FOR PHOTOSHOOT/PHOTOSHOOT PICS/${filename}`;
    const num = String(i + 1).padStart(2, '0');

    const slot = document.createElement('div');
    slot.className = 'strip-slot load-more-reveal';
    slot.id        = `strip-slot-${i + 1}`;
    slot.setAttribute('aria-label', `Photostrip ${num} — click to preview`);

    slot.innerHTML = `
      <span class="strip-number">${num}</span>
      <div class="strip-fan" onclick="openLightbox('${src}', '${filename}')">
        <img src="${src}" alt="Photostrip ${num} back" class="strip-back" loading="lazy" />
        <img src="${src}" alt="Photostrip ${num}" class="strip-front" loading="lazy" />
      </div>
      <button class="strip-dl-btn" id="btn-strip-dl-${i+1}" onclick="downloadStrip('${src}', '${filename}')">
        ⬇ Download
      </button>
    `;

    grid.appendChild(slot);

    // Stagger the fade-in animation
    requestAnimationFrame(() => {
      setTimeout(() => slot.classList.add('visible'), batchIdx * 60);
    });
  });

  stripsLoaded = next;
  updateLoadMoreBtn();
  observeFadeIns();
}

function updateLoadMoreBtn() {
  const btn     = document.getElementById('btn-load-more');
  const counter = document.getElementById('load-more-counter');
  const total   = photostripFiles.length;

  if (!btn || !counter) return;

  counter.textContent = `Showing ${stripsLoaded} of ${total} strips`;

  if (stripsLoaded >= total) {
    btn.style.display = 'none';
    counter.textContent = `All ${total} strips loaded! 🎉`;
  } else {
    btn.style.display = 'inline-flex';
    btn.textContent = `Load More (${total - stripsLoaded} remaining)`;
  }
}

// ===== LIGHTBOX =====
function openLightbox(src, filename) {
  const lb  = document.getElementById('strip-lightbox');
  const img = document.getElementById('lightbox-img');
  const dl  = document.getElementById('lightbox-dl');
  img.src       = src;
  img.alt       = filename;
  dl.href       = src;
  dl.download   = filename;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event.target === document.getElementById('strip-lightbox')) {
    closeLightboxBtn();
  }
}

function closeLightboxBtn() {
  document.getElementById('strip-lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== DOWNLOAD STRIP =====
function downloadStrip(src, filename) {
  const link    = document.createElement('a');
  link.href     = src;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ===== FADE-IN ON SCROLL =====
function observeFadeIns() {
  const elements = document.querySelectorAll(
    '.fam-card, .gallery-item, .gallery-group, .about-card, .socials-card, .key-point, .social-card, .strip-slot'
  );
  elements.forEach((el, i) => {
    el.classList.add('fade-in-section');
    el.style.transitionDelay = (i * 0.04) + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Build the photostrip gallery
  buildStripGrid();

  // Intercept all nav link clicks for smooth tab switching
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId, this);
    });
  });

  // Hero button click
  document.querySelector('.btn-primary')?.addEventListener('click', function(e) {
    e.preventDefault();
    switchTab('fam', document.querySelector('[data-tab="fam"]'));
  });

  // Escape key closes lightbox or fam modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightboxBtn();
      closeFamModalBtn();
    }
  });

  // Initial fade-in observation
  observeFadeIns();
});

