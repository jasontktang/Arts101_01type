document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. Dynamic Logo Overlay Inset Adjustment on Scroll
    // --------------------------------------------------------------------------
    const overlayText = document.querySelector('.brand-logo .overlay-text');
    
    window.addEventListener('scroll', () => {
      // Subtle shift effect for overlay text while scrolling
      const scrollPercentage = Math.min(window.scrollY / 500, 1);
      const clipVal = 35 + (scrollPercentage * 15);
      if (overlayText) {
        overlayText.style.clipPath = `inset(0 0 0 ${clipVal}%)`;
      }
    });
  
    // --------------------------------------------------------------------------
    // 2. Smooth Scroll Animation Observer for Split Sections & Galleries
    // --------------------------------------------------------------------------
    const observerOptions = {
      threshold: 0.15
    };
  
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Apply scroll reveal styling to section cards and hero texts
    const elementsToAnimate = document.querySelectorAll('.hero-text, .team-card, .event-card, .artist-section');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      revealObserver.observe(el);
    });
  
    // --------------------------------------------------------------------------
    // 3. Simple Image Lightbox Effect for Artwork Galleries
    // --------------------------------------------------------------------------
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    if (galleryImages.length > 0) {
      // Create Lightbox Container
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
      `;
      
      const lightboxImg = document.createElement('img');
      lightboxImg.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px; box-shadow: 0 0 20px rgba(255,255,255,0.2);';
      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
  
      galleryImages.forEach(img => {
        img.addEventListener('click', () => {
          lightboxImg.src = img.src;
          lightbox.style.display = 'flex';
        });
      });
  
      lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }
  
  });