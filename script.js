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
    circleText.classList.remove("hidden");
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
      iframeOverlayList[index].classList.add("hidden");
      console.log("activated");
    } else {
      button.textContent = "Interact with Site";
      iframeOverlayList[index].classList.remove("hidden");
      button.classList.remove("active-button");
    }
  });
});
