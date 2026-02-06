// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileToggle.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('.nav-link');
  for (const link of links) {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!navLinks.contains(target) && !mobileToggle.contains(target)) {
      navLinks.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Active link highlighting based on scroll (if sections are added)
const navLinksArray = document.querySelectorAll('.nav-link');
for (const link of navLinksArray) {
  link.addEventListener('click', function() {
    for (const l of navLinksArray) {
      l.classList.remove('active');
    }
    this.classList.add('active');
  });
}


// ========================================
// Hero Carousel
// ========================================
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');

let currentSlide = 0;
const totalSlides = slides.length;
let autoSlideInterval;
const AUTO_SLIDE_DELAY = 6000;

// Update slide position
function updateCarousel() {
  if (carouselSlides) {
    carouselSlides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
  }

  // Update dots
  for (const dot of dots) {
    dot.classList.remove('active');
  }
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add('active');
  }
}

// Go to specific slide
function goToSlide(index) {
  currentSlide = index;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateCarousel();
}

// Next slide
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Event Listeners
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
}

// Dot navigation
for (const dot of dots) {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide, 10);
    goToSlide(slideIndex);
    resetAutoSlide();
  });
}

// Pause on hover
const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
  heroCarousel.addEventListener('mouseenter', stopAutoSlide);
  heroCarousel.addEventListener('mouseleave', startAutoSlide);
}

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

if (heroCarousel) {
  heroCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetAutoSlide();
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    resetAutoSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
    resetAutoSlide();
  }
});

// Initialize
if (slides.length > 0) {
  updateCarousel();
  startAutoSlide();
}


// ========================================
// Impact Numbers Counter Animation
// ========================================
const impactNumbers = document.querySelectorAll('.impact-number[data-target]');
let hasAnimated = false;

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return num.toLocaleString();
  }
  return num.toString();
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10);
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    element.textContent = formatNumber(current);

    if (step >= steps) {
      clearInterval(timer);
      element.textContent = formatNumber(target);
    }
  }, duration / steps);
}

function handleImpactAnimation() {
  if (hasAnimated) return;

  const impactSection = document.querySelector('.impact-section');
  if (!impactSection) return;

  const rect = impactSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;

  if (isVisible) {
    hasAnimated = true;
    for (const num of impactNumbers) {
      animateCounter(num);
    }
  }
}

// Check on scroll and load
window.addEventListener('scroll', handleImpactAnimation, { passive: true });
window.addEventListener('load', handleImpactAnimation);
