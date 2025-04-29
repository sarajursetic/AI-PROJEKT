// script.js
// Simple animation for fading in hero text

document.addEventListener('DOMContentLoaded', () => {
          const heroText = document.querySelector('.hero');
          heroText.style.opacity = 0;
          heroText.style.transform = 'translateY(30px)';
          setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroText.style.opacity = 1;
            heroText.style.transform = 'translateY(0)';
          }, 100);
        });
        