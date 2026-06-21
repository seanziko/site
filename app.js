document.addEventListener("DOMContentLoaded", () => {
  // --- MOBILE MENU TOGGLE ---
  const menuButton = document.querySelector('header button[aria-label="Toggle navigation"]');
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when a link is clicked
    const links = mobileMenu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- DISCOUNT COUNTDOWN TIMER ---
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    function getEndTime() {
      const key = "sli_discount_end";
      const existing = localStorage.getItem(key);
      if (existing) {
        const t = Number(existing);
        if (!isNaN(t) && t > Date.now()) return t;
      }
      const end = Date.now() + 24 * 3600 * 1000;
      localStorage.setItem(key, String(end));
      return end;
    }

    let endTime = getEndTime();

    function updateCountdown() {
      const now = Date.now();
      if (now >= endTime) {
        endTime = Date.now() + 24 * 3600 * 1000;
        localStorage.setItem("sli_discount_end", String(endTime));
      }
      const remaining = Math.max(0, endTime - now);
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);

      const pad = (n) => String(n).padStart(2, "0");
      countdownEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // --- SCROLL CTA POPUP ---
  const scrollCtaPopup = document.getElementById("scroll-cta-popup");
  const closeScrollCta = document.getElementById("close-scroll-cta");
  if (scrollCtaPopup && closeScrollCta) {
    let dismissed = false;
    closeScrollCta.addEventListener("click", () => {
      dismissed = true;
      scrollCtaPopup.classList.add("pointer-events-none", "opacity-0", "translate-y-4");
      scrollCtaPopup.classList.remove("opacity-100", "translate-y-0");
    });

    window.addEventListener("scroll", () => {
      if (dismissed) return;
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      if (scrolled > 0.25) {
        scrollCtaPopup.classList.add("opacity-100", "translate-y-0");
        scrollCtaPopup.classList.remove("pointer-events-none", "opacity-0", "translate-y-4");
      } else {
        scrollCtaPopup.classList.add("pointer-events-none", "opacity-0", "translate-y-4");
        scrollCtaPopup.classList.remove("opacity-100", "translate-y-0");
      }
    }, { passive: true });
  }

  // --- FLOATING ACTIONS (BACK TO TOP) ---
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("opacity-100", "translate-y-0");
        backToTopBtn.classList.remove("pointer-events-none", "opacity-0", "translate-y-2");
      } else {
        backToTopBtn.classList.add("pointer-events-none", "opacity-0", "translate-y-2");
        backToTopBtn.classList.remove("opacity-100", "translate-y-0");
      }
    }, { passive: true });
  }

  // --- VIDEO TESTIMONIAL CAROUSEL ---
  const videoScroller = document.querySelector("#video-proof .overflow-x-auto");
  if (videoScroller) {
    const videos = Array.from(videoScroller.querySelectorAll("video"));
    const prevBtn = document.querySelector('button[aria-label="Previous video"]');
    const nextBtn = document.querySelector('button[aria-label="Next video"]');
    const dots = Array.from(document.querySelectorAll('#video-proof button[aria-label^="Go to video"]'));
    
    let activeIndex = 0;
    let hasInteracted = false;

    function updateActiveSlide() {
      const center = videoScroller.scrollLeft + videoScroller.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      const children = Array.from(videoScroller.children);
      children.forEach((child, i) => {
        const c = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      if (best !== activeIndex) {
        activeIndex = best;
        updateDots();
        controlPlayback();
      }
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.className = "h-2 rounded-full transition-all w-6 bg-accent";
        } else {
          dot.className = "h-2 rounded-full transition-all w-2 bg-foreground/30";
        }
      });

      // Update active video slide opacity
      const children = Array.from(videoScroller.children);
      children.forEach((child, i) => {
        const container = child.querySelector(".mx-auto");
        if (i === activeIndex) {
          container.classList.add("opacity-100");
          container.classList.remove("opacity-70");
        } else {
          container.classList.add("opacity-70");
          container.classList.remove("opacity-100");
        }
      });
    }

    function controlPlayback() {
      videos.forEach((video, i) => {
        if (i === activeIndex) {
          video.muted = !hasInteracted;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }

    function scrollToIndex(i) {
      hasInteracted = true;
      const child = videoScroller.children[i];
      if (!child) return;
      const target = child.offsetLeft - (videoScroller.clientWidth - child.offsetWidth) / 2;
      videoScroller.scrollTo({ left: target, behavior: "smooth" });
    }

    videoScroller.addEventListener("scroll", updateActiveSlide, { passive: true });

    if (prevBtn) prevBtn.addEventListener("click", () => {
      scrollToIndex(Math.max(0, activeIndex - 1));
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
      scrollToIndex(Math.min(videos.length - 1, activeIndex + 1));
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => scrollToIndex(i));
    });

    videos.forEach((video, i) => {
      video.addEventListener("click", () => {
        hasInteracted = true;
        if (i !== activeIndex) {
          scrollToIndex(i);
        } else {
          if (video.paused) video.play();
          video.muted = false; // Unmute on click
        }
      });
    });

    // Intersection observer for video section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          controlPlayback();
        } else {
          videos.forEach(v => v.pause());
        }
      });
    }, { threshold: [0, 0.3, 0.6, 1] });

    observer.observe(document.getElementById("video-proof"));
  }

  // --- IMAGE TESTIMONIAL CAROUSEL + LIGHTBOX ---
  const testimonialData = [
    {
      quote: "We used to range 250–300k in monthly sales before then. I just did account and realised we did 606k in sales this July.",
      name: "Ope Bello",
      outcome: "Business owner who crossed a major monthly revenue goal"
    },
    {
      quote: "Truly grateful for your help in my financial growth and development over the years.",
      name: "OluwaPelumi Bamijoko",
      outcome: "Long-term mentee sharing gratitude"
    },
    {
      quote: "What I initially thought will be a simple 30 page guide has turned into a 173 pages detailed guide. Thank you for helping me think big.",
      name: "Onose",
      outcome: "Author who grew a small idea into a fully published book"
    },
    {
      quote: "Special thanks to Ifemade Kunat for coaching me at the beginning stages of my book project.",
      name: "Onose",
      outcome: "Published author acknowledgement"
    },
    {
      quote: "I've been following all the budgeting principles you taught and I'm now debt free finally! I had $13,000 debt from schooling — now it's paid off!",
      name: "Fenose Osedeme",
      outcome: "Cleared $13,000 of school debt"
    },
    {
      quote: "In this quarter, I bought 2 lands, started my mutual funds & another investment. Thank you, Ife.",
      name: "Sandra GLA",
      outcome: "Bought 2 lands and started investing"
    },
    {
      quote: "The clarity I got from your teachings completely changed how I see and handle money.",
      name: "Verified reader",
      outcome: "Renewed money mindset and clarity"
    },
    {
      quote: "Practical, encouraging, and easy to apply. I started seeing results almost immediately.",
      name: "Verified reader",
      outcome: "Immediate, practical money wins"
    }
  ];

  const imgScroller = document.querySelector("#testimonials .overflow-x-auto");
  if (imgScroller) {
    const prevBtn = document.querySelector('button[aria-label="Previous testimonial"]');
    const nextBtn = document.querySelector('button[aria-label="Next testimonial"]');
    const dots = Array.from(document.querySelectorAll('#testimonials button[aria-label^="Go to testimonial"]'));
    const quoteEl = document.querySelector("#testimonials .mx-auto.mt-6.max-w-2xl");
    
    let activeIndex = 0;
    let paused = false;

    function updateActiveSlide() {
      const center = imgScroller.scrollLeft + imgScroller.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      const children = Array.from(imgScroller.children);
      children.forEach((child, i) => {
        const c = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      if (best !== activeIndex) {
        activeIndex = best;
        updateUI();
      }
    }

    function updateUI() {
      // Update dots
      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.className = "h-2 rounded-full transition-all w-6 bg-accent";
        } else {
          dot.className = "h-2 rounded-full transition-all w-2 bg-foreground/30";
        }
      });

      // Update Quote text
      if (quoteEl && testimonialData[activeIndex]) {
        const item = testimonialData[activeIndex];
        quoteEl.innerHTML = `
          <p class="text-base font-medium leading-7 text-foreground sm:text-lg">“${item.quote}”</p>
          <p class="mt-3 text-sm font-semibold text-foreground">${item.name}</p>
          <p class="text-xs text-muted-foreground">${item.outcome}</p>
        `;
      }
    }

    function scrollToIndex(i) {
      const child = imgScroller.children[i];
      if (!child) return;
      const target = child.offsetLeft - (imgScroller.clientWidth - child.offsetWidth) / 2;
      imgScroller.scrollTo({ left: target, behavior: "smooth" });
    }

    imgScroller.addEventListener("scroll", updateActiveSlide, { passive: true });

    if (prevBtn) prevBtn.addEventListener("click", () => {
      scrollToIndex((activeIndex - 1 + testimonialData.length) % testimonialData.length);
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
      scrollToIndex((activeIndex + 1) % testimonialData.length);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => scrollToIndex(i));
    });

    // Autoplay
    let autoplayInterval = setInterval(() => {
      if (!paused) {
        const next = (activeIndex + 1) % testimonialData.length;
        scrollToIndex(next);
      }
    }, 8000);

    imgScroller.addEventListener("mouseenter", () => paused = true);
    imgScroller.addEventListener("mouseleave", () => paused = false);
    imgScroller.addEventListener("touchstart", () => paused = true);

    // Lightbox Modal
    const images = Array.from(imgScroller.querySelectorAll("img"));
    
    // Inject Lightbox element dynamically
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "fixed inset-0 z-[100] hidden flex-col bg-black/95 backdrop-blur-sm";
    lightbox.innerHTML = `
      <div class="flex items-center justify-between px-4 py-3 text-white">
        <span id="lightbox-counter" class="text-sm font-semibold">1 / 8</span>
        <button id="lightbox-close" type="button" aria-label="Close" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div id="lightbox-scroller" class="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        ${images.map((img, i) => `
          <div class="flex h-full w-full shrink-0 snap-center items-center justify-center p-4">
            <img src="${img.src}" alt="${img.alt}" class="max-h-full max-w-full object-contain" />
          </div>
        `).join("")}
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxScroller = document.getElementById("lightbox-scroller");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxClose = document.getElementById("lightbox-close");

    let lightboxIndex = 0;

    function openLightbox(index) {
      paused = true;
      lightboxIndex = index;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      document.body.style.overflow = "hidden";
      updateLightboxUI();
    }

    function closeLightbox() {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      document.body.style.overflow = "";
      paused = false;
    }

    function updateLightboxUI() {
      if (lightboxScroller) {
        lightboxScroller.scrollTo({ left: lightboxIndex * lightboxScroller.clientWidth, behavior: "instant" });
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${testimonialData.length}`;
      }
    }

    images.forEach((img, i) => {
      img.closest("button").addEventListener("click", () => openLightbox(i));
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    if (lightboxScroller) {
      lightboxScroller.addEventListener("scroll", () => {
        const i = Math.round(lightboxScroller.scrollLeft / lightboxScroller.clientWidth);
        if (i !== lightboxIndex) {
          lightboxIndex = i;
          if (lightboxCounter) {
            lightboxCounter.textContent = `${lightboxIndex + 1} / ${testimonialData.length}`;
          }
        }
      }, { passive: true });
    }

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        lightboxIndex = (lightboxIndex + 1) % testimonialData.length;
        updateLightboxUI();
      }
      if (e.key === "ArrowLeft") {
        lightboxIndex = (lightboxIndex - 1 + testimonialData.length) % testimonialData.length;
        updateLightboxUI();
      }
    });
  }

  // --- STAT COUNTERS ("By the Numbers" section) ---
  // Each .stat-counter counts up from 0 → data-target, then resets every 3 s
  const statCounters = document.querySelectorAll(".stat-counter");
  if (statCounters.length) {
    const LOOP_INTERVAL = 3000; // ms between each restart
    const ANIM_DURATION = 1800; // ms for the count-up animation

    function runCounter(el) {
      const target    = parseFloat(el.dataset.target);
      const suffix    = el.dataset.suffix || "";
      const isDecimal = el.dataset.decimal === "true";
      const start     = performance.now();

      function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / ANIM_DURATION, 1);
        // Ease-out cubic for a satisfying deceleration
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = isDecimal
          ? (eased * target).toFixed(1)
          : Math.floor(eased * target);

        el.textContent = value + suffix;

        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    // Use IntersectionObserver so the counters only animate when visible
    const sectionEl = document.getElementById("by-the-numbers");
    let loopTimers = [];

    function startAllCounters() {
      statCounters.forEach(el => {
        // Kick off immediately, then loop every LOOP_INTERVAL ms
        runCounter(el);
        const timer = setInterval(() => runCounter(el), LOOP_INTERVAL);
        loopTimers.push(timer);
      });
    }

    function stopAllCounters() {
      loopTimers.forEach(t => clearInterval(t));
      loopTimers = [];
    }

    if (sectionEl) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAllCounters();
          } else {
            stopAllCounters();
          }
        });
      }, { threshold: 0.25 });

      counterObserver.observe(sectionEl);
    } else {
      // Fallback: start immediately if no section found
      startAllCounters();
    }
  }

  // --- PROBLEM SECTION CAROUSEL ---
  const problemScroller = document.getElementById("problem-scroller");
  if (problemScroller) {
    const slides    = Array.from(problemScroller.children);
    const dots      = Array.from(document.querySelectorAll("#problem-dots button"));
    const prevBtn   = document.getElementById("problem-prev");
    const nextBtn   = document.getElementById("problem-next");
    let current     = 0;
    let paused      = false;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const slide = slides[current];
      const targetX = slide.offsetLeft - (problemScroller.clientWidth - slide.offsetWidth) / 2;
      problemScroller.scrollTo({ left: targetX, behavior: "smooth" });
      dots.forEach((d, i) => {
        d.className = i === current
          ? "h-2 rounded-full w-6 bg-accent transition-all"
          : "h-2 rounded-full w-2 bg-foreground/30 transition-all";
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { paused = true; goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", () => { paused = true; goTo(current + 1); });
    dots.forEach((d, i) => d.addEventListener("click", () => { paused = true; goTo(i); }));

    // Update active dot on manual scroll
    problemScroller.addEventListener("scroll", () => {
      const center = problemScroller.scrollLeft + problemScroller.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      if (best !== current) {
        current = best;
        dots.forEach((d, i) => {
          d.className = i === current
            ? "h-2 rounded-full w-6 bg-accent transition-all"
            : "h-2 rounded-full w-2 bg-foreground/30 transition-all";
        });
      }
    }, { passive: true });

    // Auto-advance every 5 s
    setInterval(() => { if (!paused) goTo(current + 1); }, 5000);
    problemScroller.addEventListener("mouseenter", () => paused = true);
    problemScroller.addEventListener("mouseleave", () => paused = false);
    problemScroller.addEventListener("touchstart",  () => paused = true, { passive: true });
    problemScroller.addEventListener("touchend",    () => setTimeout(() => paused = false, 3000), { passive: true });
  }

  // --- 3D BOOK VIEWER MODULE ---
  class Book3DViewer {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.autoRotate = options.autoRotate || false;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x1a1a1a);
      this.scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

      this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
      this.camera.position.set(0, 0, 12);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.container.appendChild(this.renderer.domElement);

      if (options.isModal) {
        this.setupControls();
      }

      this.setupLighting();
      this.createBook();
      this.createParticles();
      
      this.time = 0;
      this.animate();
      
      if (options.onReady) options.onReady();
    }

    setupLighting() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff, 1.5);
      spotLight.position.set(5, 10, 8);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.3;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      this.scene.add(spotLight);

      const fillLight = new THREE.PointLight(0x4ECDC4, 0.5);
      fillLight.position.set(-5, 0, 5);
      this.scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
      rimLight.position.set(0, 5, -5);
      this.scene.add(rimLight);

      const planeGeometry = new THREE.PlaneGeometry(20, 20);
      const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -3.5;
      plane.receiveShadow = true;
      this.scene.add(plane);
    }

    setupControls() {
      if (typeof THREE.OrbitControls === 'undefined') return;
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 20;
    }

    createCoverTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');

      const cyan = '#5DD3D3', black = '#2C2C2C', green = '#4CAF50', darkBlue = '#2C3E50', pink = '#D4A5A5', red = '#C0392B', yellow = '#F1C40F', darkRed = '#8B2635';

      function drawCell(x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
      }

      const w = canvas.width, h = canvas.height, colW = w / 3, rowH = (h - 200) / 4;

      drawCell(0, 0, colW, rowH, cyan);
      drawCell(colW, 0, colW, rowH, black);
      drawCell(colW * 2, 0, colW, rowH, green);
      drawCell(0, rowH, colW, rowH, darkBlue);
      drawCell(colW, rowH, colW, rowH, pink);
      drawCell(colW * 2, rowH, colW, rowH, red);

      const titleY = rowH * 2;
      drawCell(0, titleY, w, 200, green);

      const row3Y = titleY + 200;
      drawCell(0, row3Y, colW, rowH, darkBlue);
      drawCell(colW, row3Y, colW, rowH, red);
      drawCell(colW * 2, row3Y, colW, rowH, yellow);

      const row4Y = row3Y + rowH;
      drawCell(0, row4Y, colW, rowH, darkRed);
      drawCell(colW, row4Y, colW, rowH, pink);
      drawCell(colW * 2, row4Y, colW, rowH, cyan);

      ctx.fillStyle = black;
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Money', 30, 60);
      ctx.fillText('Can Grow', 30, 115);
      ctx.fillText('Without', 30, 170);
      ctx.fillText('Killing', 30, 225);
      ctx.fillText('Your Vibe', 30, 280);

      ctx.fillStyle = black;
      ctx.font = 'bold 120px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('THE SOFT LIFE', w/2, titleY + 100);
      ctx.fillText('INVESTOR', w/2, titleY + 180);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      return texture;
    }

    createSpineTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(0, 0, 64, 1448);
      
      ctx.save();
      ctx.translate(32, 724);
      ctx.rotate(-Math.PI/2);
      ctx.fillStyle = '#2C2C2C';
      ctx.font = 'bold 60px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('THE SOFT LIFE INVESTOR', 0, 20);
      ctx.fillText('IFEMADE KUNAT', 0, 80);
      ctx.restore();

      return new THREE.CanvasTexture(canvas);
    }

    createBackTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#2C3E50';
      ctx.fillRect(0, 0, 1024, 1448);
      
      ctx.fillStyle = '#4CAF50';
      ctx.font = 'bold 80px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('THE SOFT LIFE', 512, 600);
      ctx.fillText('INVESTOR', 512, 700);
      
      ctx.fillStyle = '#5DD3D3';
      ctx.font = '40px Arial, sans-serif';
      ctx.fillText('Money Can Grow', 512, 800);
      ctx.fillText('Without Killing Your Vibe', 512, 850);

      return new THREE.CanvasTexture(canvas);
    }

    createPagesTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#F5F5DC';
      ctx.fillRect(0, 0, 64, 1448);
      
      ctx.fillStyle = '#E0E0E0';
      for(let i=0; i<1448; i+=3) {
        ctx.fillRect(0, i, 64, 1);
      }

      return new THREE.CanvasTexture(canvas);
    }

    createBook() {
      this.bookGroup = new THREE.Group();

      const bookWidth = 3.5, bookHeight = 5, bookDepth = 0.4;
      const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);

      const materials = [
        new THREE.MeshStandardMaterial({ map: this.createPagesTexture(), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: this.createSpineTexture(), roughness: 0.4, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ map: this.createPagesTexture(), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: this.createPagesTexture(), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: this.createCoverTexture(), roughness: 0.4, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ map: this.createBackTexture(), roughness: 0.4, metalness: 0.1 })
      ];

      const book = new THREE.Mesh(geometry, materials);
      book.castShadow = true;
      book.receiveShadow = true;
      
      this.bookGroup.add(book);
      this.scene.add(this.bookGroup);
      this.bookGroup.rotation.y = -0.3;
      this.bookGroup.rotation.x = 0.1;
    }

    createParticles() {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      const posArray = new Float32Array(particlesCount * 3);
      
      for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x4ECDC4,
        transparent: true,
        opacity: 0.6
      });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      this.scene.add(particlesMesh);
      this.particlesMesh = particlesMesh;
    }

    animate = () => {
      requestAnimationFrame(this.animate);
      this.time += 0.01;

      this.bookGroup.position.y = Math.sin(this.time) * 0.2;
      
      if (this.autoRotate) {
        this.bookGroup.rotation.y += 0.005;
      }
      
      this.bookGroup.rotation.x = Math.sin(this.time * 0.3) * 0.05;

      if (this.particlesMesh) {
        this.particlesMesh.rotation.y = this.time * 0.05;
        this.particlesMesh.rotation.x = this.time * 0.02;
      }

      if (this.controls) this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    onWindowResize = () => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    dispose() {
      this.renderer.dispose();
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }

  // Initialize 3D book for landing page
  const landingBook3D = new Book3DViewer('book-3d-container', { autoRotate: true });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (landingBook3D) landingBook3D.onWindowResize();
  });

  // Modal functionality for hero book tap
  const heroBook = document.querySelector('.hero-book-trigger');
  const bookModal = document.getElementById('book-3d-modal');
  const closeBookModal = document.getElementById('close-book-3d-modal');
  
  let modalBook3D = null;

  if (heroBook && bookModal) {
    heroBook.addEventListener('click', () => {
      bookModal.classList.remove('hidden');
      bookModal.classList.add('flex');
      
      setTimeout(() => {
        if (document.getElementById('modal-book-viewer')) {
          if (modalBook3D) modalBook3D.dispose();
          modalBook3D = new Book3DViewer('modal-book-viewer', { isModal: true });
          window.addEventListener('resize', () => {
            if (modalBook3D) modalBook3D.onWindowResize();
          });
        }
      }, 100);
    });
  }

  if (closeBookModal) {
    closeBookModal.addEventListener('click', () => {
      bookModal.classList.add('hidden');
      bookModal.classList.remove('flex');
      if (modalBook3D) {
        modalBook3D.dispose();
        modalBook3D = null;
      }
    });

    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) {
        bookModal.classList.add('hidden');
        bookModal.classList.remove('flex');
        if (modalBook3D) {
          modalBook3D.dispose();
          modalBook3D = null;
        }
      }
    });
  }
});

