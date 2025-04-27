let menuData = [];
let currentPage = location.pathname.split("/").pop() || "index.html";

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
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
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

async function loadMenu() {
    const res = await fetch('json/menu.json');
    menuData = await res.json();
    renderMenu();
}

function renderMenu() {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    menuData.forEach((section, idx) => {
        // Skip hidden top-level sections
        if (section.visible !== "true") return;
        if (section["teacher-section"] === "true" && !showTeacherSection) return;
        if (section["extended-section"] === "true" && !showExtendedSection) return;

        const parent = document.createElement('div');

        const parentSectionLink = document.createElement('div');
        parentSectionLink.className = 'parent-section-link';
        parentSectionLink.dataset.idx = idx;
        parentSectionLink.textContent = section['section-name'];

        // Add class if teacher or extended
        if (section["teacher-section"] === "true") parentSectionLink.classList.add('teacher-section');
        if (section["extended-section"] === "true") parentSectionLink.classList.add('extended-section');

        const childDiv = document.createElement('div');
        
        // Always show all sections expanded by default
        childDiv.style.display = 'block';

        let hasActiveChild = false;

        section['child-pages'].forEach((child, cidx) => {
            if (child.visible !== "true") return;
            if (child["teacher-section"] === "true" && !showTeacherSection) return;
            if (child["extended-section"] === "true" && !showExtendedSection) return;

            const childLink = document.createElement('a');
            childLink.href = child['page-url'];
            childLink.className = "child-page-link";
            childLink.textContent = child['page-name'];
            childLink.dataset.idx = idx;
            childLink.dataset.cidx = cidx;
            childLink.dataset.markdown = child['mark-down'];
            childLink.dataset.pageid = child['page-id'];
            childLink.dataset.pageversion = child['page-version'];

            if (currentPage.endsWith(child['page-url'])) {
                childLink.classList.add('active-child');
                parentSectionLink.classList.add('active-section');
                hasActiveChild = true;
            }

            // Add class if teacher or extended
            if (child["teacher-section"] === "true") childLink.classList.add('teacher-section');
            if (child["extended-section"] === "true") childLink.classList.add('extended-section');

            childDiv.appendChild(childLink);
        });

        // Highlight parent section if it has active child
        if (hasActiveChild) {
            parentSectionLink.classList.add('active-section');
        }

        parent.appendChild(parentSectionLink);
        parent.appendChild(childDiv);
        menuDiv.appendChild(parent);
    });

    // Remove parent toggling event listeners, since we want all expanded by default
    // But if you want toggling, you can keep this and just initially expand them

    // Add click handlers for child links
    document.querySelectorAll('.child-page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let mdfilepath = constructNewFilename(link);
            loadMarkdown(mdfilepath);
            history.pushState({}, '', link.getAttribute('href'));
            currentPage = link.getAttribute('href');
            renderMenu();
        });
    });

    // Apply show/hide teacher and extended sections immediately in the UI
    applySectionVisibility();
}

function applySectionVisibility() {
    // Show/hide all elements with these classes
    document.querySelectorAll('.teacher-section').forEach(el => {
        el.style.display = showTeacherSection ? '' : 'none';
    });
    document.querySelectorAll('.extended-section').forEach(el => {
        el.style.display = showExtendedSection ? '' : 'none';
    });
}

function constructNewFilename(link) {
    const markdownPath = link.getAttribute('data-markdown'); // e.g. "some/deeply/nested/path/filename.md"
    const pageId = link.getAttribute('data-pageid');         // e.g. "intro-page"
    const pageVersion = link.getAttribute('data-pageversion'); // e.g. "aab"

    // Separate the directory path and the filename
    const lastSlashIndex = markdownPath.lastIndexOf('/');
    let dir = '';
    let filename = markdownPath;
    if (lastSlashIndex !== -1) {
      dir = markdownPath.substring(0, lastSlashIndex + 1);  // keep trailing slash
      filename = markdownPath.substring(lastSlashIndex + 1);
    }

    // Remove .md extension from filename
    const baseName = filename.replace(/\.md$/, '');

    // Construct new file name with the pageId and pageVersion appended
    return `${dir}${baseName}-${pageId}-${pageVersion}.md`;
}

async function loadMarkdown(mdFile) {
    const res = await fetch(`content/${mdFile}`);
    let mdText = await res.text();

    mdText = mdText.replace(/:::note([\s\S]*?):::/g, '<div class="custom-note">$1</div>');
    mdText = mdText.replace(/:::warning([\s\S]*?):::/g, '<div class="custom-warning">$1</div>');
    mdText = mdText.replace(/:::tip([\s\S]*?):::/g, '<div class="custom-tip">$1</div>');
    mdText = mdText.replace(/:::quiz([\s\S]*?):::/g, (_, content) => parseQuizBlock2(content));

    document.getElementById('content').innerHTML = marked.parse(mdText);
    injectQuizHandlers();
}

function parseQuizBlock2(content) {
    // ... unchanged (same as your original)
}

function escapeHtml(text) {
    // ... unchanged
}

function injectQuizHandlers() {
    // ... unchanged
}

let quizCounter = 0;

// Event listeners for toggling teacher and extended sections
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

loadPreferences();
loadMenu();