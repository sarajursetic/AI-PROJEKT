// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function() {
          // Header scroll effect
          const header = document.querySelector('header');
          const scrollThreshold = 50;
          
          function handleHeaderScroll() {
              if (window.scrollY > scrollThreshold) {
                  header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                  header.style.background = 'rgba(255, 255, 255, 0.98)';
              } else {
                  header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                  header.style.background = 'rgba(255, 255, 255, 0.95)';
              }
          }
          
          // Initial header state
          handleHeaderScroll();
          
          // Apply header scroll effect
          window.addEventListener('scroll', handleHeaderScroll);
          
          // Mobile menu toggle
          const menuToggle = document.querySelector('.menu-toggle');
          const nav = document.querySelector('nav');
          
          if (menuToggle) {
              menuToggle.addEventListener('click', function() {
                  nav.classList.toggle('active');
                  // Toggle icon between hamburger and close
                  const icon = menuToggle.querySelector('i');
                  if (icon.classList.contains('fa-bars')) {
                      icon.classList.remove('fa-bars');
                      icon.classList.add('fa-times');
                  } else {
                      icon.classList.remove('fa-times');
                      icon.classList.add('fa-bars');
                  }
              });
              
              // Close mobile menu when clicking outside
              document.addEventListener('click', function(event) {
                  if (!menuToggle.contains(event.target) && !nav.contains(event.target) && nav.classList.contains('active')) {
                      nav.classList.remove('active');
                      const icon = menuToggle.querySelector('i');
                      icon.classList.remove('fa-times');
                      icon.classList.add('fa-bars');
                  }
              });
          }
          
          // Smooth scrolling for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  
                  const target = document.querySelector(this.getAttribute('href'));
                  if (target) {
                      // Close mobile menu if open
                      if (nav && nav.classList.contains('active')) {
                          nav.classList.remove('active');
                          if (menuToggle) {
                              const icon = menuToggle.querySelector('i');
                              icon.classList.remove('fa-times');
                              icon.classList.add('fa-bars');
                          }
                      }
                      
                      window.scrollTo({
                          top: target.offsetTop - 80, // Offset for fixed header
                          behavior: 'smooth'
                      });
                  }
              });
          });
          
          // Animation for features cards
          const featureCards = document.querySelectorAll('.feature-card');
          
          if (featureCards.length > 0) {
              // Simple animation on scroll
              function animateOnScroll() {
                  featureCards.forEach(card => {
                      const cardTop = card.getBoundingClientRect().top;
                      const windowHeight = window.innerHeight;
                      
                      if (cardTop < windowHeight - 100) {
                          card.style.opacity = '1';
                          card.style.transform = 'translateY(0)';
                      }
                  });
              }
              
              // Set initial state for animation
              featureCards.forEach(card => {
                  card.style.opacity = '0';
                  card.style.transform = 'translateY(30px)';
                  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              });
              
              // Run animation on scroll
              window.addEventListener('scroll', animateOnScroll);
              // Initial check
              animateOnScroll();
          }
          
          // Contact form validation
          const contactForm = document.querySelector('form');
          if (contactForm) {
              contactForm.addEventListener('submit', function(e) {
                  e.preventDefault();
                  
                  // Simple validation
                  let valid = true;
                  const inputs = contactForm.querySelectorAll('input, textarea');
                  
                  inputs.forEach(input => {
                      if (input.hasAttribute('required') && !input.value.trim()) {
                          valid = false;
                          input.classList.add('error');
                      } else if (input.type === 'email' && input.value.trim()) {
                          // Simple email validation
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (!emailRegex.test(input.value.trim())) {
                              valid = false;
                              input.classList.add('error');
                          } else {
                              input.classList.remove('error');
                          }
                      } else {
                          input.classList.remove('error');
                      }
                  });
                  
                  if (valid) {
                      // For demonstration, we'll just show a success message
                      // In a real scenario, you would send the data to a server
                      const submitBtn = contactForm.querySelector('button[type="submit"]');
                      const originalText = submitBtn.textContent;
                      
                      submitBtn.disabled = true;
                      submitBtn.textContent = 'Sending...';
                      
                      // Simulate form submission
                      setTimeout(function() {
                          // Reset form
                          contactForm.reset();
                          
                          // Show success message
                          const successMsg = document.createElement('div');
                          successMsg.className = 'success-message';
                          successMsg.textContent = 'Your message has been sent successfully!';
                          contactForm.appendChild(successMsg);
                          
                          // Reset button
                          submitBtn.disabled = false;
                          submitBtn.textContent = originalText;
                          
                          // Remove success message after 5 seconds
                          setTimeout(function() {
                              successMsg.remove();
                          }, 5000);
                      }, 1500);
                  }
              });
              
              // Remove error class on input
              const inputs = contactForm.querySelectorAll('input, textarea');
              inputs.forEach(input => {
                  input.addEventListener('input', function() {
                      this.classList.remove('error');
                  });
              });
          }
      });