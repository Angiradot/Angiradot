/* ============================================
   SDA Church Kisumu South — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Navigation --- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      nav.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', function () {
      navToggle.classList.remove('active');
      nav.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove('active');
        nav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /* --- Scroll to Top Button --- */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Active Navigation Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href === './' + currentPage)) {
      link.classList.add('active');
    }
  });

  /* --- Intersection Observer for Fade Animations --- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.observe-fade').forEach(function (el) {
    observer.observe(el);
  });

  /* --- Form Handling --- */
  // Prayer Request Form
  const prayerForm = document.getElementById('prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(prayerForm);
      const data = Object.fromEntries(formData);

      // Display confirmation (in production, send to a server)
      showNotification('Your prayer request has been submitted. Our prayer team will lift you up in prayer.');
      prayerForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      showNotification('Thank you for reaching out! We will get back to you soon.');
      contactForm.reset();
    });
  }

  /* --- Notification Toast --- */
  function showNotification(message) {
    // Remove any existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.style.cssText = [
      'position: fixed',
      'bottom: 32px',
      'left: 50%',
      'transform: translateX(-50%) translateY(20px)',
      'background: #2e7d52',
      'color: white',
      'padding: 16px 32px',
      'border-radius: 8px',
      'box-shadow: 0 8px 32px rgba(0,0,0,0.2)',
      'z-index: 10000',
      'font-size: 0.95rem',
      'max-width: 90vw',
      'text-align: center',
      'opacity: 0',
      'transition: all 0.4s ease'
    ].join(';');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Auto-remove after 5 seconds
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(function () { toast.remove(); }, 400);
    }, 5000);
  }

  /* --- Dynamic Bible Verse (rotating) --- */
  const verses = [
    { text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."', ref: '— Jeremiah 29:11 (NIV)' },
    { text: '"Come to me, all you who are weary and burdened, and I will give you rest."', ref: '— Matthew 11:28 (NIV)' },
    { text: '"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."', ref: '— Proverbs 3:5-6 (NIV)' },
    { text: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."', ref: '— Isaiah 40:31 (NIV)' },
    { text: '"The Lord is my shepherd, I lack nothing."', ref: '— Psalm 23:1 (NIV)' }
  ];

  const verseText = document.getElementById('verse-text');
  const verseRef = document.getElementById('verse-ref');

  if (verseText && verseRef) {
    let verseIndex = Math.floor(Math.random() * verses.length);
    verseText.textContent = verses[verseIndex].text;
    verseRef.textContent = verses[verseIndex].ref;
  }

  /* --- Mobile Dropdown Toggle --- */
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.nav-item > a').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      });
    });
  }

});
