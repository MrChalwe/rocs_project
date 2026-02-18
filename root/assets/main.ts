// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle') as HTMLButtonElement;
const navLinks = document.querySelector('.nav-links') as HTMLElement;

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
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
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
  link.addEventListener('click', function(this: HTMLElement) {
    for (const l of navLinksArray) {
      l.classList.remove('active');
    }
    this.classList.add('active');
  });
}
