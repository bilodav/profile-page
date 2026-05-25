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
    info: "Able to translate Figma design files into pixel-perfect, responsive interfaces — bridging the gap between design and development with precision and attention to detail.",
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

const scrollContainer = document.querySelector(".scroll-container");
const section = document.querySelector(".horizontal-section");
const track = document.querySelector(".horizontal-track");
const numCards = document.querySelectorAll(".website-card").length;

let snapTimeout;

scrollContainer.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = scrollContainer.scrollTop;

  const progress =
    (scrollY - sectionTop) / (sectionHeight - scrollContainer.clientHeight);
  const clamped = Math.max(0, Math.min(1, progress));

  const maxTranslate = (numCards - 1) * 100;
  track.style.transform = `translateX(-${clamped * maxTranslate}vw)`;

  // --- Snapping logic ---
  // Only try to snap if we're inside the horizontal section
  if (clamped > 0 && clamped < 1) {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
      // Figure out which card we're closest to (0 to numCards-1)
      const rawCard = clamped * (numCards - 1);
      const nearestCard = Math.round(rawCard);

      // Calculate the exact scrollY that perfectly shows that card
      const targetProgress = nearestCard / (numCards - 1);
      const targetScrollY =
        sectionTop +
        targetProgress * (sectionHeight - scrollContainer.clientHeight);

      scrollContainer.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }, 50); // 150ms after user stops scrolling
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
    }
  });
});
