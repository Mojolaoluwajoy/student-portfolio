# Student Portfolio & Academic Management Website

**COS 106 – Introduction to Web Technologies · Practical Term Project**
**Student:** Adebola Mojolaoluwa Joy · B.Sc. Software Engineering, MIVA Open University

🔗 **Live site:** https://mojolaoluwajoy.github.io/student-portfolio/

A responsive, multi-page personal portfolio and academic planner built with plain HTML, CSS and JavaScript (no frameworks), and hosted on GitHub Pages.

Full project documentation with screenshots: [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)

## Pages

| Page | File | What it contains |
|---|---|---|
| Home | `index.html` | Name, photo, welcome message, navigation menu and brief biography |
| About Me | `about.html` | Educational background, career aspirations, technical skills, hobbies, work experience and a demo video |
| Projects | `projects.html` | Six projects with descriptions, images and links to their GitHub repositories |
| Academic Planner | `planner.html` | Interactive task manager: add tasks, mark them as completed, delete them |
| Contact | `contact.html` | Form with name, email, phone and message, checked with JavaScript validation |

## How the requirements are met

### HTML
- **Semantic elements:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Forms:** contact form and planner form
- **Tables:** education and work experience (About page)
- **Images, hyperlinks and lists:** used on every page
- **Multimedia:** `<video>` element showing a demo of the planner (About page)

### CSS (`css/style.css`)
- **One external stylesheet** shared by all pages
- **Consistent colour scheme** defined once as CSS variables in `:root`
- **Flexbox** for the header and hero section; **CSS Grid** for project cards and page layouts
- **Navigation styling** with hover states and a highlighted link for the current page
- **Animations and transitions:** page fade-in, cards that lift on hover, planner tasks that slide in
- **Responsive, mobile-friendly design:** `@media` queries and a collapsible ☰ menu on small screens

### JavaScript (`js/main.js`)
- **Event handling:** clicks, form submissions, checkbox changes
- **DOM manipulation:** building the task list, showing error messages, toggling the mobile menu
- **Form validation:** no field may be empty, the email must be in a valid format, and the phone number may contain digits only
- **Dynamic content updates:** the task list and the Total / Done / Remaining counters update straight away
- **Arrays and functions:** tasks are stored in an array of objects and managed through separate functions
- **Interactive task management:** add, complete and delete tasks, with tasks saved in the browser (`localStorage`)

## Folder structure

```
student-portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/style.css
├── js/main.js
├── images/      profile photo and project images
└── media/       planner demo video
```

## Running it locally

No installation needed. Download or clone the repository and open `index.html` in any web browser.
