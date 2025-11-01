function toggleMenu() {
    // Toggle mobile menu visibility
    document.querySelector(".mobile-menu").classList.toggle("active");
  
    // Toggle hamburger (bars) and close (X) button states
    document.querySelector(".close-menu").classList.toggle("active");
  }
  
  // Close menu when clicking outside or on a link
  document.addEventListener("click", function (event) {
    const menu = document.querySelector(".mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    const closeMenu = document.querySelector(".close-menu");
  
    if (
        menu.classList.contains("active") &&
        !menu.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        menu.classList.remove("active");
        closeMenu.classList.remove("active");
      }
      
  });


  gsap.registerPlugin(ScrollTrigger);

  // ✅ ZOOM EFFECT - Separate timeline
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".zoom_start",
        start: "top top",
        end: "bottom top",  // ✅ Ends before reaching horizontal section
        pin: true,
        scrub: true,
      },
    })
    .to(".start_img", {
      scale: 10,
      transformOrigin: "center center",
      ease: "power1.inOut",
    })
    .to(
      ".section.hero",
      {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut",
      },
      "<"
    );
  
  // ✅ HORIZONTAL SCROLL - Now it starts correctly
  const section = document.querySelector(".horizontal-section");
  const wrapper = section.querySelector(".wrapper");
  const items = wrapper.querySelectorAll(".item");
  
  items.forEach((item, index) => {
    if (index !== 0) {
      gsap.set(item, { xPercent: 100 });
    }
  });
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top+=7%",  // ✅ Starts later, preventing early appearance
      pin: true,
      end: () => `+=${items.length * 100}%`,
      scrub: 1,
      invalidateOnRefresh: true,
    },
    defaults: { ease: "none" },
  });
  
  items.forEach((item, index) => {
    timeline.to(item, { scale: 0.9, borderRadius: "10px" });
  
    if (items[index + 1]) {
      timeline.to(items[index + 1], { xPercent: 0 }, "<");
    }
  });
  
  gsap.registerPlugin(ScrollTrigger);

  // Initially hide the header
  gsap.set("header", { autoAlpha: 0 });
  
  // Show header when #parchment is in view and keep it visible
  gsap.to("header", {
    autoAlpha: 1,
    duration: 0.3,
    scrollTrigger: {
      trigger: "#parchment",
      start: "top bottom", // When the top of parchment enters the viewport
      toggleActions: "play none none none" // Show once, no reverse
    }
  });
  
  
