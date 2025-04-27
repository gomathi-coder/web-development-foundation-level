let menuData = [];
const currentPage = window.location.pathname.split("/").pop();
let showTeacherSection = true;
let showExtendedSection = true;

// Utility functions for cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

function loadPreferences() {
  const teacherPref = getCookie('showTeacherSection');
  const extendedPref = getCookie('showExtendedSection');

  if (teacherPref !== "") {
    showTeacherSection = teacherPref === "true";
  }
  if (extendedPref !== "") {
    showExtendedSection = extendedPref === "true";
  }
}

async function fetchMenu() {
  const response = await fetch('data/menu.json');
  menuData = await response.json();
  renderMenu();
  updatePageTitle();
}

function renderMenu() {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';

  menuData.forEach((section, sectionIndex) => {
    if (section.visible !== "true") return;
    if (section["teacher-section"] === "true" && !showTeacherSection) return;
    if (section["extended-section"] === "true" && !showExtendedSection) return;

    const parentDiv = document.createElement('div');
    parentDiv.className = 'mb-2';

    const parentButton = document.createElement('button');
    parentButton.className = 'parent-button btn btn-link text-start';
    if (section["teacher-section"] === "true") parentButton.classList.add('teacher-section');
    if (section["extended-section"] === "true") parentButton.classList.add('extended-section');

    const collapseId = `section-${sectionIndex}`;
    parentButton.setAttribute('data-bs-toggle', 'collapse');
    parentButton.setAttribute('data-bs-target', `#${collapseId}`);
    parentButton.setAttribute('aria-expanded', 'false');
    parentButton.innerText = section["section-name"];

    const childDiv = document.createElement('div');
    childDiv.className = 'collapse';
    childDiv.id = collapseId;

    let sectionHasActivePage = false;

    section['child-pages'].forEach(page => {
      if (page.visible !== "true") return;
      if (page["teacher-section"] === "true" && !showTeacherSection) return;
      if (page["extended-section"] === "true" && !showExtendedSection) return;

      const childLink = document.createElement('a');
      childLink.href = page["page-url"];
      childLink.className = 'child-link';
      if (page["teacher-section"] === "true") childLink.classList.add('teacher-section');
      if (page["extended-section"] === "true") childLink.classList.add('extended-section');

      if (currentPage === page["page-url"]) {
        childLink.classList.add('active');
        sectionHasActivePage = true;
      }

      childLink.innerText = page["page-name"];
      childDiv.appendChild(childLink);
    });

    if (sectionHasActivePage) {
      childDiv.classList.add('show');
      parentButton.classList.add('active', 'expanded');
    } else {
      parentButton.classList.add('collapsed');
    }

    parentDiv.appendChild(parentButton);
    parentDiv.appendChild(childDiv);
    menu.appendChild(parentDiv);
  });
}

function updatePageTitle() {
  menuData.forEach(section => {
    section['child-pages'].forEach(page => {
      if (page["page-url"] === currentPage) {
        document.title = page["page-name"] + " - Web Development Foundation";
        const rightPane = document.querySelector('.right-pane');
        if (rightPane) {
          rightPane.querySelector('h2')?.remove();
          const h2 = document.createElement('h2');
          h2.innerText = page["page-name"];
          rightPane.prepend(h2);
        }
      }
    });
  });
}

// Event Listeners for toggle buttons
document.getElementById('toggleTeacher').addEventListener('click', () => {
  showTeacherSection = !showTeacherSection;
  setCookie('showTeacherSection', showTeacherSection, 30);
  renderMenu();
});

document.getElementById('toggleExtended').addEventListener('click', () => {
  showExtendedSection = !showExtendedSection;
  setCookie('showExtendedSection', showExtendedSection, 30);
  renderMenu();
});

// Initialization
loadPreferences();
fetchMenu();
