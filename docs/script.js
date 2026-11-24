/* DevPortfolio V2 — progressive enhancement; no dependencies or analytics. */
(() => {
  'use strict';
  const root = document.documentElement;
  const picker = document.getElementById('theme-picker');
  const themeTrigger = picker?.querySelector('.theme-trigger');
  const themeLabel = document.getElementById('theme-current-label');
  const themeButtons = Array.from(picker?.querySelectorAll('[data-theme-option]') || []);
  const themes = new Set(['system', 'dark', 'light']);
  const storedTheme = themes.has(root.dataset.theme) ? root.dataset.theme : 'system';

  function setTheme(choice, save = true) {
    const selected = themes.has(choice) ? choice : 'system';
    root.dataset.theme = selected;
    if (themeLabel) themeLabel.textContent = selected[0].toUpperCase() + selected.slice(1);
    themeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.themeOption === selected)));
    if (save) {
      try { localStorage.setItem('hg-theme', selected); } catch (_) { /* private browsing */ }
    }
  }
  setTheme(storedTheme, false);
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    setTheme(button.dataset.themeOption);
    picker.open = false;
    themeTrigger?.focus();
  }));
  if (picker) {
    document.addEventListener('pointerdown', (event) => {
      if (picker.open && !picker.contains(event.target)) picker.open = false;
    });
    picker.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && picker.open) {
        picker.open = false;
        themeTrigger?.focus();
        event.preventDefault();
      }
    });
  }

  const year = String(new Date().getFullYear());
  ['year', 'footer-year'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  /* We only show a genuine profile photo after the owner adds the file. */
  const picture = document.getElementById('profile-image');
  const placeholder = document.getElementById('portrait-placeholder');
  const portraitCaption = document.getElementById('portrait-caption');
  if (picture && placeholder) {
    const image = new Image();
    image.onload = () => {
      picture.src = image.src;
      picture.hidden = false;
      placeholder.hidden = true;
      if (portraitCaption) portraitCaption.textContent = 'HASITHA GAYAN / PORTRAIT';
    };
    image.src = './assets/profile.jpg';
  }

  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.project-card[data-category]'));
  const countEl = document.getElementById('filter-results');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let count = 0;
      cards.forEach((card) => {
        const matched = filter === 'all' || (card.dataset.category || '').split(/\s+/).includes(filter);
        card.hidden = !matched;
        if (matched) count += 1;
      });
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      if (countEl) countEl.textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
    });
  });

  /* A single document scrollbar; active item tracks the section in view. */
  const links = Array.from(document.querySelectorAll('.section-navigation .nav-link'));
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    let pending = false;
    function updateNavigation() {
      pending = false;
      const focusLine = Math.max(120, window.innerHeight * 0.38);
      let visibleSection = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= focusLine) visibleSection = section;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        visibleSection = sections[sections.length - 1];
      }
      links.forEach((link) => {
        const active = link.getAttribute('href') === '#' + visibleSection.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function scheduleNavigationUpdate() {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(updateNavigation);
    }
    window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavigationUpdate);
    window.addEventListener('hashchange', scheduleNavigationUpdate);
    scheduleNavigationUpdate();
  }

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const spotlight = document.querySelector('.spotlight');
  if (spotlight && finePointer.matches && !motion.matches) {
    window.addEventListener('pointermove', (event) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    }, { passive: true });
    root.classList.add('spotlight-enabled');
  }

  /* Show the CV download only when a real PDF has been uploaded. */
  const resumeLink = document.getElementById('resume-download');
  const resumePending = document.getElementById('resume-pending');
  const resumeStatus = document.getElementById('resume-status');
  if (resumeLink && window.location.protocol.startsWith('http')) {
    fetch(resumeLink.href, { method: 'HEAD', cache: 'no-store' }).then((response) => {
      if (!response.ok || !response.headers.get('content-type')?.includes('pdf')) return;
      resumeLink.hidden = false;
      if (resumePending) resumePending.hidden = true;
      if (resumeStatus) resumeStatus.textContent = 'PDF ready to download';
    }).catch(() => { /* keep the honest pending state */ });
  }

  /* Native <details> handles keyboard access and disclosure without extra JS. */
})();
