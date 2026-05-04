/* =============================================
   STYLE AURA - Premium Fashion Website
   JavaScript - Interactivity & Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  });

  // ---------- Floating Particles ----------
  const particlesContainer = document.querySelector('.particles');
  const colors = ['#f2c4ce', '#d5c8e6', '#f5e6d3', '#c9809e', '#d4a574'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 14 + 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    particlesContainer.appendChild(p);
  }

  // ---------- Sticky Navbar ----------
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // ---------- Mobile Menu ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // trigger on load

  // ---------- Featured Products Slider ----------
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  });

  // Auto-play slider
  let autoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);

  // Pause on hover
  const sliderWrapper = document.querySelector('.slider-wrapper');
  sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
  sliderWrapper.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 5000);
  });

  // ---------- Button Ripple Effect ----------
  document.querySelectorAll('.btn, .add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---------- Add to Cart Animation ----------
  const cartCount = document.querySelector('.cart-count');
  const cartToast = document.querySelector('.cart-toast');
  const toastName = document.querySelector('.toast-product-name');
  let count = 0;

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      // Button animation
      this.classList.add('added');
      const originalText = this.textContent;
      this.textContent = '✓ Added!';
      setTimeout(() => {
        this.classList.remove('added');
        this.textContent = originalText;
      }, 1500);

      // Update cart count
      count++;
      cartCount.textContent = count;
      cartCount.style.transform = 'scale(1.4)';
      setTimeout(() => cartCount.style.transform = 'scale(1)', 300);

      // Show toast
      const productName = this.closest('.arrival-card').querySelector('h3').textContent;
      toastName.textContent = productName;
      cartToast.classList.add('show');
      setTimeout(() => cartToast.classList.remove('show'), 2500);
    });
  });

  // ---------- Back to Top ----------
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #a85e7a, #c9809e)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 2500);
    });
  }

  // ---------- Navbar Active Link Highlight ----------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--accent-dark)';
        } else {
          link.style.color = '';
        }
      }
    });
  });

  // ---------- Chatbot Popup Toggle ----------
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotPopup = document.getElementById('chatbotPopup');
  const chatbotClose = document.getElementById('chatbotClose');

  chatbotToggle.addEventListener('click', () => {
    chatbotPopup.classList.toggle('open');
  });
  chatbotClose.addEventListener('click', () => {
    chatbotPopup.classList.remove('open');
  });

});
