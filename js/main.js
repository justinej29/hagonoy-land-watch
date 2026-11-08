

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var menuBtn     = document.getElementById('nav-menu-btn');
  var drawer      = document.getElementById('nav-drawer');
  var drawerOverlay = document.getElementById('nav-drawer-overlay');
  var drawerClose = document.getElementById('nav-drawer-close');
  var drawerLinks = drawer ? drawer.querySelectorAll('.nav-drawer-item') : [];

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.removeAttribute('aria-hidden');
    drawerOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  
    var first = drawer.querySelector('.nav-drawer-item, .nav-drawer-close');
    if (first) { setTimeout(function () { first.focus(); }, 50); }
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.keyCode === 27) && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  if (drawer) {
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var fadeEls = document.querySelectorAll('.fade-in');
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var bttFloat = document.getElementById('back-to-top-float');
  if (bttFloat) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        bttFloat.classList.add('is-visible');
      } else {
        bttFloat.classList.remove('is-visible');
      }
    }, { passive: true });

    bttFloat.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      var skipLink = document.querySelector('.skip-link');
      if (skipLink) { skipLink.focus(); }
    });
  }

  var skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('main-content');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }


  var subNavLinks = document.querySelectorAll('.sub-nav a');
  if (subNavLinks.length > 0 && 'IntersectionObserver' in window) {
    var sectionIds = Array.from(subNavLinks).map(function (link) {
      return link.getAttribute('href').replace('#', '');
    }).filter(Boolean);

    var sectionEls = sectionIds.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    var subNavObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          subNavLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          var link = document.querySelector('.sub-nav a[href="#' + id + '"]');
          if (link) { link.setAttribute('aria-current', 'true'); }
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sectionEls.forEach(function (el) { subNavObserver.observe(el); });
  }

})();
