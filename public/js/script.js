// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Gallery modal functionality
  const galleryItems = document.querySelectorAll(".gallery-item")
  const galleryModal = document.getElementById("gallery-modal")
  const modalImage = document.getElementById("modal-image")
  const closeModal = document.getElementById("close-modal")

  if (galleryItems.length > 0 && galleryModal) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const img = this.querySelector("img")
        if (img && modalImage) {
          modalImage.src = img.src
          modalImage.alt = img.alt
          galleryModal.classList.remove("hidden")
        }
      })
    })

    if (closeModal) {
      closeModal.addEventListener("click", () => {
        galleryModal.classList.add("hidden")
      })
    }

    galleryModal.addEventListener("click", (e) => {
      if (e.target === galleryModal) {
        galleryModal.classList.add("hidden")
      }
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  const formMessage = document.getElementById("form-message")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value
      })

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission (replace with actual email service)
      // You can integrate with services like FormSpree, EmailJS, or your own backend
      setTimeout(() => {
        // Show success message
        if (formMessage) {
          formMessage.textContent = "Thank you for your message! We will get back to you within 24 hours."
          formMessage.className = "success-message p-4 rounded-lg"
          formMessage.classList.remove("hidden")
        }

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.textContent = originalBtnText
        submitBtn.disabled = false

        // Hide message after 5 seconds
        setTimeout(() => {
          if (formMessage) {
            formMessage.classList.add("hidden")
          }
        }, 5000)
      }, 1500)

      /* 
            INTEGRATION INSTRUCTIONS:
            
            To connect this form to your email, you have several options:
            
            1. FormSpree (Easiest - No backend required):
               - Sign up at https://formspree.io
               - Replace the setTimeout code above with:
               
               fetch('https://formspree.io/f/YOUR_FORM_ID', {
                   method: 'POST',
                   body: formData,
                   headers: {
                       'Accept': 'application/json'
                   }
               })
               .then(response => {
                   if (response.ok) {
                       formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                       formMessage.className = 'success-message p-4 rounded-lg';
                       formMessage.classList.remove('hidden');
                       contactForm.reset();
                   } else {
                       throw new Error('Form submission failed');
                   }
               })
               .catch(error => {
                   formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                   formMessage.className = 'error-message p-4 rounded-lg';
                   formMessage.classList.remove('hidden');
               })
               .finally(() => {
                   submitBtn.textContent = originalBtnText;
                   submitBtn.disabled = false;
               });
            
            2. EmailJS (Free tier available):
               - Sign up at https://www.emailjs.com
               - Add their SDK: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
               - Use their API to send emails
            
            3. Your own backend:
               - Create a PHP/Node.js/Python backend
               - Use fetch() to POST data to your endpoint
               - Handle email sending on the server side
            
            4. Netlify Forms (if hosting on Netlify):
               - Add data-netlify="true" to the form tag
               - Netlify will handle form submissions automatically
            */
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle")
  const themeToggleMobile = document.getElementById("theme-toggle-mobile")
  const html = document.documentElement

  // Declare lucide variable
  const lucide = window.lucide

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  if (currentTheme === "dark") {
    html.classList.add("dark")
  }

  // Toggle theme function
  const toggleTheme = () => {
    html.classList.toggle("dark")
    const newTheme = html.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", newTheme)

    // Reinitialize Lucide icons after theme change
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  // Add event listeners to both toggle buttons
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme)
  }

  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".card-hover, .testimonial-card, .gallery-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(el)
  })
})
