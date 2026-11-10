# Raphael Davids | Personal Portfolio

A responsive, single-page portfolio site for **Bilo Raphael Davids**, an aspiring full-stack web developer. It showcases skills, live projects, certifications, and contact details, and is built with plain HTML, CSS, and JavaScript, with no frameworks or build step.

<!-- Add your live site link here, e.g. **Live site:** https://your-site-url -->

## Features

- **Hero intro** with name, title, and banner image
- **Sticky navigation** with smooth anchor links, plus a burger menu for small screens
- **Interactive skills section** with a circular layout of icons (Git, HTML, CSS, JavaScript, TypeScript, React, Figma) that reveal their names on hover
- **Project showcase** with a horizontally scrolling track of live site previews embedded in iframes, each with a description and a "Go to Site" link
- **Certifications grid** displaying earned certificates
- **About Me** section with a profile photo and personal summary
- **Contact section** with email, phone, GitHub, and LinkedIn links
- Glassmorphism-style cards and a responsive layout

## Featured Projects

| Project | Description | Tech |
| --- | --- | --- |
| [Sylphcode](https://sylphcode.co.za) | Web development agency site | HTML, CSS, JS |
| [Oakbeam](https://bilodav.github.io/Oakbeam/) | Responsive business website | HTML, CSS |
| [Palateer](https://bilodav.github.io/Palateer/) | Recipe discovery and weekly meal planner | React, hooks, routing, local storage |
| [JS Joust](https://bilodav.github.io/js_joust/) | Real-time multiplayer party game using phone motion controls | JavaScript, Web Audio, accelerometer API, P2P |
| [Task Manager](https://bilodav.github.io/umuzi-task-manager/) | Task creation, editing, and tracking app | HTML, CSS, JS |
| [Catholic Fide](https://catholicfide.sylphcode.co.za/) | Community-focused, accessible website | HTML, CSS, JS |
| [Pokémon Search](https://bilodav.github.io/pokemon-search-app/) | Pokémon lookup using an external API with error handling | HTML, CSS, JS, REST API |

## Tech Stack

- **HTML5** for semantic structure
- **CSS3** for layout, responsive design, and styling
- **Vanilla JavaScript** for navigation, menu toggling, and interactions
- **Font Awesome** SVG icons (inline)

## Project Structure

```
profile-page/
├── .vscode/          # Editor settings
├── assets/
│   └── images/       # Banner, profile photo, and certificate images
├── public/           # Static public files
├── index.html        # Page markup and content
├── style.css         # Styles
└── script.js         # Interactivity
```

## Getting Started

No installation or build tools are needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/bilodav/profile-page.git
   cd profile-page
   ```
2. Open `index.html` in your browser, or serve it locally with an extension such as VS Code's Live Server.

## Customizing

- **Text and links:** edit the sections in `index.html` (`#intro`, `#skill-set`, `#showcase`, `#resume`, `#about-me`, `#contact-me`).
- **Projects:** duplicate a `website-card` block inside the showcase track and update the iframe `src`, link, and description.
- **Certificates and images:** replace the files in `assets/images/`.
- **Styling:** adjust `style.css`.

## Contact

- GitHub: [@bilodav](https://github.com/bilodav)
- LinkedIn: [Bilo Raphael Davids](https://www.linkedin.com/in/bilo-raphael-davids-608995187/)
- Email: bilodavids@gmail.com
