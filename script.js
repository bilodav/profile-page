const skillIcons = document.querySelectorAll(".icon");

let skillHeading = document.querySelector(".skill-content-heading");
let skillInfo = document.querySelector(".skill-content-info");

const skillSet = [
  {
    skill: "Git",
    info: "Proficient in version control using Git, managing branches, resolving merge conflicts, and maintaining clean commit histories across collaborative and solo projects.",
  },
  {
    skill: "HTML",
    info: "Strong command of semantic HTML5, building accessible, well-structured web pages that prioritize clarity, SEO best practices, and cross-browser compatibility.",
  },
  {
    skill: "CSS",
    info: "Experienced in crafting responsive, visually polished layouts using modern CSS — including Flexbox, Grid, animations, and media queries for seamless cross-device experiences.",
  },
  {
    skill: "JavaScript",
    info: "Solid foundation in vanilla JavaScript, including DOM manipulation, async programming, API integration, regex validation, and complex array methods such as map, filter, and reduce.",
  },
  {
    skill: "React",
    info: "Familiar with building dynamic, component-based user interfaces using React, leveraging hooks and state management to create interactive and maintainable front-end applications.",
  },
  {
    skill: "Figma",
    info: "Experienced in turning Figma designs into responsive, production-ready interfaces, effectively bridging the gap between design concepts and functional web applications.",
  },
  {
    skill: "TypeScript",
    info: "Skilled in leveraging TypeScript across frontend and backend development to create reliable, scalable, and maintainable web applications.",
  },
];

skillIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", (e) => {
    let value = e.target.getAttribute("value");
    let filtered = skillSet.find(
      (item) => item.skill.toLowerCase() === value.toLowerCase(),
    );

    skillHeading.textContent = filtered.skill;
    skillInfo.textContent = filtered.info;
  });
});

// Scroll Snap Logic
const scrollContainer = document.querySelector(".scroll-container");
const sections = document.querySelectorAll(".scroll-container > section");
const track = document.querySelector(".horizontal-track");
const numCards = document.querySelectorAll(".website-card").length;

let isScrolling = false;
let currentIndex = 0;
let currentCard = 0;
let manualScrollTimeout = null;
let isProgrammatic = false; // separate flag for programmatic scrolls

function getShowcaseIndex() {
  return Array.from(sections).findIndex((s) => s.id === "showcase");
}

function getSectionAtScroll() {
  const scrollMid =
    scrollContainer.scrollTop + scrollContainer.clientHeight / 2;
  let found = 0;
  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollMid >= top && scrollMid < bottom) found = index;
  });
  return found;
}

function goToSection(index) {
  if (index < 0 || index >= sections.length) return;

  const showcaseIndex = getShowcaseIndex();

  if (index === showcaseIndex && currentIndex < index) {
    currentCard = 0;
    track.style.transition = "none";
    track.style.transform = `translateX(0)`;
  }

  if (index === showcaseIndex && currentIndex > index) {
    currentCard = numCards - 1;
    track.style.transition = "none";
    track.style.transform = `translateX(-${currentCard * 100}vw)`;
  }

  currentIndex = index;
  isProgrammatic = true;
  isScrolling = true;

  sections[index].scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    isScrolling = false;
    isProgrammatic = false;
    updateActiveSection();
  }, 800);
}

function goToCard(index) {
  if (index < 0 || index >= numCards) return false;
  currentCard = index;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${currentCard * 100}vw)`;

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 550);

  return true;
}

// Sync after manual scrollbar drag — snaps to nearest section when user stops
scrollContainer.addEventListener("scroll", () => {
  if (isProgrammatic) return; // ignore scroll events we triggered

  // Clear any previous timer
  clearTimeout(manualScrollTimeout);

  // Wait until scrolling fully stops, then sync and snap
  manualScrollTimeout = setTimeout(() => {
    const nearest = getSectionAtScroll();
    currentIndex = nearest;

    // Sync card position if in showcase
    const showcaseIndex = getShowcaseIndex();
    if (nearest === showcaseIndex) {
      const trackX = new DOMMatrix(getComputedStyle(track).transform).m41;
      currentCard = Math.round(Math.abs(trackX) / window.innerWidth);
    }

    // Snap to the nearest section so we're perfectly aligned
    isProgrammatic = true;
    isScrolling = true;
    sections[nearest].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isScrolling = false;
      isProgrammatic = false;
      updateActiveSection();
    }, 800);
  }, 150); // fires 150ms after scrolling stops
});

scrollContainer.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (isScrolling) return;

    const showcaseIndex = getShowcaseIndex();

    if (currentIndex === showcaseIndex) {
      if (e.deltaY > 0) {
        const handled = goToCard(currentCard + 1);
        if (!handled) goToSection(currentIndex + 1);
      } else {
        const handled = goToCard(currentCard - 1);
        if (!handled) goToSection(currentIndex - 1);
      }
      return;
    }

    if (e.deltaY > 0) {
      goToSection(currentIndex + 1);
    } else {
      goToSection(currentIndex - 1);
    }
  },
  { passive: false },
);

let touchStartY = 0;

scrollContainer.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

scrollContainer.addEventListener("touchend", (e) => {
  if (isScrolling) return;
  const delta = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(delta) < 30) return;

  const showcaseIndex = getShowcaseIndex();

  if (currentIndex === showcaseIndex) {
    if (delta > 0) {
      const handled = goToCard(currentCard + 1);
      if (!handled) goToSection(currentIndex + 1);
    } else {
      const handled = goToCard(currentCard - 1);
      if (!handled) goToSection(currentIndex - 1);
    }
    return;
  }

  if (delta > 0) {
    goToSection(currentIndex + 1);
  } else {
    goToSection(currentIndex - 1);
  }
});
// Circle animation
const icons = document.querySelectorAll(".icon");
const circle = document.querySelector(".circle");
const circleText = document.querySelector(".circle-skill-text");

icons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    circle.style.animationPlayState = "paused";
    icons.forEach((i) => (i.style.animationPlayState = "paused"));
    circleText.classList.remove("hide");
  });

  icon.addEventListener("mouseleave", () => {
    circle.style.animationPlayState = "running";
    icons.forEach((i) => (i.style.animationPlayState = "running"));
  });
});

// Logic to unlock iframe

const iframeElList = document.querySelectorAll("iframe");
const iframeOverlayList = document.querySelectorAll(".iframe-overlay");

const projectButtonList = document.querySelectorAll(
  ".project-description button",
);

projectButtonList.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    console.log(index);
    if (button.textContent === "Interact with Site") {
      button.textContent = "Disable";
      button.classList.add("active-button");
      iframeOverlayList[index].classList.add("hide");
      console.log("activated");
    } else {
      button.textContent = "Interact with Site";
      iframeOverlayList[index].classList.remove("hide");
      button.classList.remove("active-button");
    }
  });
});

// NavBar size response

const burgerMenu = document.querySelector(".burger-menu");
const navBarList = document.querySelector(".nav-list");
const navBarIdentifier = document.querySelector(".section-identifier");
const smallScreenMenu = document.querySelector(".small-screen-menu");
const smallScreenMenuItem = document.querySelectorAll(".small-screen-menu div");

console.log(smallScreenMenuItem);

function handleNavbarResize() {
  if (window.innerWidth < 968) {
    // Mobile: Show burger menu, hide nav list and contact button
    burgerMenu.classList.remove("hide");
    navBarList.classList.add("hide");
    navBarIdentifier.classList.add("nav-center");
    updateActiveSection();
  } else {
    // Desktop: Hide burger menu, show nav list and contact button
    burgerMenu.classList.add("hide");
    navBarList.classList.remove("hide");
    navBarIdentifier.classList.remove("hide");
    navBarIdentifier.classList.remove("nav-center");
    updateActiveSection();
  }
}

// Run on page load
handleNavbarResize();

// Run on window resize
window.addEventListener("resize", handleNavbarResize);

// handle animation for click on burger menu and bring on menu

burgerMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!burgerMenu.classList.contains("active")) {
    burgerMenu.classList.add("active");

    smallScreenMenu.classList.remove("hide");
  } else if (burgerMenu.classList.contains("active")) {
    burgerMenu.classList.remove("active");

    smallScreenMenu.classList.add("hide");
  }
});

smallScreenMenuItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    let link = item.querySelector("a");
    window.location.href = link.getAttribute("href");
    smallScreenMenu.classList.add("hide");
    burgerMenu.classList.remove("active");
  });
});

document.querySelector("body").addEventListener("click", () => {
  smallScreenMenu.classList.add("hide");
  burgerMenu.classList.remove("active");
});

navBarIdentifier.addEventListener("click", () => {
  if (navBarIdentifier.textContent === "Contact Me") {
    window.location.href = "#contact-me";
  }
});

function updateActiveSection() {
  // Get all the sections
  const sections = document.querySelectorAll("section[id]");

  // Get all nav links
  const navLinks = document.querySelectorAll(".nav-center a[href^='#']");

  // Get current scroll position within the scroll container
  // (the page scrolls inside .scroll-container, not the window)
  const scrollPosition = scrollContainer.scrollTop + 150;

  let currentSection = "";

  // Determine which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // If at the very top of the scroll container, highlight the intro section
  if (scrollContainer.scrollTop < 100) {
    currentSection = "intro";
  }

  //update of active class on nav links
  const sectionIdentifier = document.querySelector(".section-identifier");

  smallScreenMenuItem.forEach((link) => {
    link.classList.remove("hide");
    let linkEl = link.querySelector("a");
    let hrefEl = linkEl.getAttribute("href");
    if (hrefEl === `#${currentSection}`) {
      link.classList.add("hide");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }

    if (window.innerWidth < 968) {
      // sectionIdentifier.textContent=currentSection;

      if (currentSection === "intro") {
        sectionIdentifier.textContent = "Home";
      } else if (currentSection === "skill-set") {
        sectionIdentifier.textContent = "Skills";
      } else if (currentSection === "showcase") {
        sectionIdentifier.textContent = "Projects";
      } else if (currentSection === "resume") {
        sectionIdentifier.textContent = "Certifications";
      } else if (currentSection === "about-me") {
        sectionIdentifier.textContent = "About";
      } else if (currentSection === "contact-me") {
        sectionIdentifier.textContent = "Contact Me";
      }
    } else {
      sectionIdentifier.textContent = "Contact Me";
    }
  });
}

// Optional: Smooth scroll enhancement (already have scroll-behavior: smooth in CSS)
// But this adds a click handler to update immediately
document.querySelectorAll('.nav-center a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    // Remove active from all links
    document
      .querySelectorAll(".nav-center a")
      .forEach((l) => l.classList.remove("active"));
    // Add active to clicked link
    this.classList.add("active");
  });
});
