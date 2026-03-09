let skillIcons = document.querySelectorAll(".icon");

let skillHeading = document.querySelector(".skill-content-heading")
let skillInfo = document.querySelector(".skill-content-info")

const skillSet = [
    {
        skill: "Git",
        info: "Proficient in version control using Git, managing branches, resolving merge conflicts, and maintaining clean commit histories across collaborative and solo projects."
    },
    {
        skill: "HTML",
        info: "Strong command of semantic HTML5, building accessible, well-structured web pages that prioritize clarity, SEO best practices, and cross-browser compatibility."
    },
    {
        skill: "CSS",
        info: "Experienced in crafting responsive, visually polished layouts using modern CSS — including Flexbox, Grid, animations, and media queries for seamless cross-device experiences."
    },
    {
        skill: "JavaScript",
        info: "Solid foundation in vanilla JavaScript, including DOM manipulation, async programming, API integration, regex validation, and complex array methods such as map, filter, and reduce."
    },
    {
        skill: "React",
        info: "Familiar with building dynamic, component-based user interfaces using React, leveraging hooks and state management to create interactive and maintainable front-end applications."
    },
    {
        skill: "Figma",
        info: "Able to translate Figma design files into pixel-perfect, responsive interfaces — bridging the gap between design and development with precision and attention to detail."
    }
]


skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", (e) => {
        let value = e.target.getAttribute("value");
        let filtered = skillSet.find((item)=>item.skill.toLowerCase()===value.toLowerCase())
        
        skillHeading.textContent = filtered.skill
        skillInfo.textContent = filtered.info

        
    })
});