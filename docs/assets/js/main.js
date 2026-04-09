/* =============================================
   أبراج تركي للتجارة - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     NAVBAR SCROLL EFFECT
     ============================ */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ============================
     MOBILE NAV TOGGLE
     ============================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu?.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      const spans = navToggle?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  });

  /* ============================
     HERO SLIDER
     ============================ */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let sliderInterval;

  const goToSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index]?.classList.add('active');
    dots[index]?.classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  if (slides.length > 0) {
    goToSlide(0);
    sliderInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(i);
        sliderInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  /* ============================
     PRODUCT TABS
     ============================ */
  const initTabs = (tabSelector, contentSelector) => {
    const tabs = document.querySelectorAll(tabSelector);
    const contents = document.querySelectorAll(contentSelector);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetEl = document.getElementById(target);
        if (targetEl) {
          targetEl.classList.add('active');
        }
      });
    });
  };

  initTabs('.tab-btn', '.tab-content');
  initTabs('.subtab-btn', '.subtab-content');

  /* ============================
     FILTER TAGS
     ============================ */
  document.querySelectorAll('.filter-tags').forEach(filterGroup => {
    const tags = filterGroup.querySelectorAll('.filter-tag');
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const filter = tag.dataset.filter;
        const grid = filterGroup.closest('.filter-section')?.querySelector('.products-grid');
        if (!grid) return;
        grid.querySelectorAll('.product-card').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });

  /* ============================
     SCROLL ANIMATIONS
     ============================ */
  const fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* ============================
     COUNTER ANIMATION
     ============================ */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('ar-SA');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ============================
     GALLERY LIGHTBOX
     ============================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src || item.dataset.src;
      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ============================
     PRODUCT MODAL
     ============================ */
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalSpecs = document.getElementById('modal-specs');
  const modalWa = document.getElementById('modal-wa');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card || !modal) return;

      const imgSrc = card.querySelector('.product-img img')?.src;
      const name = card.querySelector('.product-name')?.textContent;
      const specs = card.querySelector('.product-specs')?.innerHTML;

      if (modalImg) modalImg.src = imgSrc || '';
      if (modalTitle) modalTitle.textContent = name || '';
      if (modalSpecs) modalSpecs.innerHTML = specs || '';
      if (modalWa) {
        modalWa.href = `https://wa.me/966500886242?text=${encodeURIComponent('أرغب في الاستفسار عن: ' + (name || ''))}`;
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
    }
  });

  /* ============================
     ACTIVE NAV LINK (scroll-spy)
     ============================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
        activeLink?.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ============================
     SMOOTH SCROLL FOR ANCHORS
     ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================
     IMAGE LAZY LOADING FALLBACK
     ============================ */
  document.querySelectorAll('img[data-src]').forEach(img => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = img.dataset.src;
            io.unobserve(img);
          }
        });
      });
      io.observe(img);
    } else {
      img.src = img.dataset.src;
    }
  });

  /* ============================
     WHATSAPP QUICK INQUIRY
     ============================ */
  document.querySelectorAll('[data-wa-product]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.dataset.waProduct;
      const msg = `مرحباً، أرغب في الاستفسار عن: ${product}`;
      window.open(`https://wa.me/966500886242?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

});
