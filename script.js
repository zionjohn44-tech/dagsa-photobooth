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
  junior:      { name: 'Junior FAM',       color: '#e63946' },
  preuni:      { name: 'Pre-Uni FAM',      color: '#f4d03f' },
  collegiate:  { name: 'Collegiate FAM',   color: '#1d4ed8' },
  youngadults: { name: 'Young Adults FAM', color: '#16a34a' },
};

function openFamGallery(famKey) {
  const fam    = famData[famKey];
  const modal  = document.getElementById('fam-modal');
  const title  = document.getElementById('modal-fam-title');
  const gallery = document.getElementById('modal-gallery');

  title.textContent = fam.name + ' Gallery';
  title.style.color = fam.color;

  gallery.innerHTML = `
    <p style="color:rgba(255,255,255,0.55); text-align:center; padding:3rem; font-size:1rem; grid-column:1/-1;">
      📸 Photos for <strong style="color:${fam.color};">${fam.name}</strong> are coming soon!<br>
      <span style="font-size:0.85rem; color:rgba(255,255,255,0.35);">Check back after DAGSA 2026!</span>
    </p>
  `;

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

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeFamModalBtn();
});

// ===== DOWNLOAD PHOTO =====
function downloadPhoto(btn, filename) {
  // Check if the gallery-item has a real image
  const item  = btn.closest('.gallery-item');
  const img   = item ? item.querySelector('img') : null;

  if (img && img.src && !img.src.includes('undefined')) {
    const link    = document.createElement('a');
    link.href     = img.src;
    link.download = filename + '.jpg';
    link.click();
  } else {
    // Show friendly message for placeholder
    const origText = btn.textContent;
    btn.textContent = '⏳ Coming Soon!';
    btn.disabled    = true;
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled    = false;
    }, 2000);
  }
}

// ===== FADE-IN ON SCROLL =====
function observeFadeIns() {
  const elements = document.querySelectorAll(
    '.fam-card, .gallery-item, .gallery-group, .about-card, .socials-card, .key-point, .social-card'
  );
  elements.forEach((el, i) => {
    el.classList.add('fade-in-section');
    el.style.transitionDelay = (i * 0.05) + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
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

  // Initial fade-in observation
  observeFadeIns();
});
