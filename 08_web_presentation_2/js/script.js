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
function getPageIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page-id');
}

function loadPageById(pageId) {
    if (!pageId) return false;
    // Find the link element with matching page-id
    const childLink = Array.from(document.querySelectorAll('.child-page-link'))
        .find(link => link.dataset.pageid === pageId);

    if (childLink) {
        // Simulate the click behavior without actually flipping the page (to avoid re-render twice)
        let mdfilepath = constructNewFilename(childLink);
        loadMarkdown(mdfilepath);
        history.replaceState({}, '', childLink.getAttribute('href'));
        currentPage = childLink.getAttribute('href');
        
        // Update the active classes in menu items
        renderMenu();
        return true;
    }

    return false;
}


function loadPreferences() {
    const teacherPref = getCookie('showTeacherSection');
    const extendedPref = getCookie('showExtendedSection');
    if (teacherPref !== "") showTeacherSection = teacherPref === "true";
    if (extendedPref !== "") showExtendedSection = extendedPref === "true";
}

async function loadMenu() {
    const res = await fetch('json/menu.json');
    menuData = await res.json();
    renderMenu();

    // After menu is rendered, check for page-id
    const queryPageId = getPageIdFromUrl();
    /*
    if (queryPageId) {
        const pageLoaded = loadPageById(queryPageId);
        if (!pageLoaded) {
            console.warn(`Page ID "${queryPageId}" not found in menu.`);
        }
    }*/

        const pageLoaded = queryPageId ? loadPageById(queryPageId) : false;

        if (!pageLoaded) {
            // just load index.md and show index.html in URL
            loadMarkdown('index.md');
            history.replaceState({}, '', 'index.html');
            currentPage = 'index.html';
            renderMenu();
        }
}

function getSectionIcon(section) {
    if (section["teacher-section"] === "true") return `<i class="bi bi-person-badge section-icon" title="Teacher Section"></i>`;
    if (section["extended-section"] === "true") return `<i class="bi bi-star section-icon" title="Extended Section"></i>`;
    return `<i class="bi bi-journal section-icon" title="Section"></i>`;
}

function getChildIcon(child) {
    if (child["teacher-section"] === "true") return `<i class="bi bi-person-badge child-icon" title="Teacher Page"></i>`;
    if (child["extended-section"] === "true") return `<i class="bi bi-star child-icon" title="Extended Page"></i>`;
    return `<i class="bi bi-file-earmark child-icon" title="Page"></i>`;
}

// Main render: searchQuery is optional for filtering
function renderMenu(searchQuery="") {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';
    menuData.forEach((section, idx) => {
        if (section.visible !== "true") return;
        if (section["teacher-section"] === "true" && !showTeacherSection) return;
        if (section["extended-section"] === "true" && !showExtendedSection) return;

        // Filter child pages
        let filteredChildren = section['child-pages'].filter(child => {
            if (child.visible !== "true") return false;
            if (child["teacher-section"] === "true" && !showTeacherSection) return false;
            if (child["extended-section"] === "true" && !showExtendedSection) return false;
            if (!searchQuery) return true;
            return (
                child['page-name'].toLowerCase().includes(searchQuery) ||
                section['section-name'].toLowerCase().includes(searchQuery)
            );
        });
        if (searchQuery && filteredChildren.length === 0) return;

        const parent = document.createElement('div');
        // Build parent section link with chevron and icon
        const parentSectionLink = document.createElement('div');
        parentSectionLink.className = 'parent-section-link expanded';
        parentSectionLink.dataset.idx = idx;
        parentSectionLink.innerHTML =
            `<i class="bi bi-chevron-down chevron"></i>` +
            getSectionIcon(section) +
            `<span>${section['section-name']}</span>`;

        const childDiv = document.createElement('div');
        childDiv.style.display = 'block';
        let hasActiveChild = false;

        filteredChildren.forEach((child, cidx) => {
           const childLink = document.createElement('a');
            childLink.href = child['page-url'];
            childLink.className = "child-page-link";
            childLink.innerHTML = getChildIcon(child) + `<span>${child['page-name']}</span>`;
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

            childDiv.appendChild(childLink);
        });

        // Highlight parent section if needed
        if (hasActiveChild) {
            parentSectionLink.classList.add('active-section');
        }

        parent.appendChild(parentSectionLink);
        parent.appendChild(childDiv);
        menuDiv.appendChild(parent);
    });

    // Section toggle (expand/collapse) - you might implement it if you want real folding
    document.querySelectorAll('.parent-section-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 600) return;
            const next = link.nextElementSibling;
            if (next.style.display === 'none') {
                next.style.display = 'block';
                link.classList.remove('collapsed');
                link.classList.add('expanded');
                link.querySelector('.chevron').classList.remove('collapsed');
                link.querySelector('.chevron').classList.add('expanded');
            } else {
                next.style.display = 'none';
                link.classList.remove('expanded');
                link.classList.add('collapsed');
                link.querySelector('.chevron').classList.remove('expanded');
                link.querySelector('.chevron').classList.add('collapsed');
            }
        });
    });

    // Child click
    document.querySelectorAll('.child-page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let mdfilepath = constructNewFilename(link);
            loadMarkdown(mdfilepath);
            history.pushState({}, '', link.getAttribute('href'));
            currentPage = link.getAttribute('href');
            renderMenu();
            // Always auto-close sidebar on mobile
            if(window.innerWidth <= 991) {
                document.getElementById('left-pane').classList.remove('open');
                sidebarBackdrop.classList.remove('open');
            }
        });
    });

    applySectionVisibility();
}

// Show/hide teacher/extended UI (for any remaining static icons)
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
    // Markdown block custom replacements
    mdText = mdText.replace(
        /:::note([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-note">${escapeHtml(content)}</div>`
    ).replace(
        /:::warning([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-warning">${escapeHtml(content)}</div>`
    ).replace(
        /:::tip([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-tip">${escapeHtml(content)}</div>`
    ).replace(
        /:::teachersnote([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-teachersnote">${escapeHtml(content)}</div>`
    ).replace(
        /:::comment([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-comment">${escapeHtml(content)}</div>`
    ).replace(
        /:::practice([\s\S]*?):::/g, (_, content) =>
            `<div class="custom-practice">${escapeHtml(content)}</div>`
    ).replace(
        /:::codeoutput([\s\S]*?):::/g, '<div class="custom-codeoutput">$1</div>'
    ).replace(
        /:::quiz([\s\S]*?):::/g, (_, content) =>
            parseQuizBlock2(content)
    );
    document.getElementById('content').innerHTML = marked.parse(mdText);
    injectQuizHandlers();
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
}

// Improved quiz block: [q]What?[/q][c]wrong[/c][c]right[a][/c]
function parseQuizBlock2(content) {
    // Extract question
    const qMatch = /\[q\](.*?)\[\/q\]/s.exec(content);
    if (!qMatch) return '';

    const question = qMatch[1].trim();

    // Extract choices
    const choiceRegex = /\[c\](.*?)\[\/c\]/gs;
    const choices = [];
    let m;
    while ((m = choiceRegex.exec(content)) !== null) {
        let text = m[1];
        let isAnswer = false;
        if (/\[a\]$/.test(text)) {
            isAnswer = true;
            text = text.replace(/\[a\]$/, '').trim();
        }
        choices.push({ text: text.trim(), isAnswer });
    }
    const quizId = 'quiz-' + Math.random().toString(36).substr(2, 9);
    let html = `<div class="custom-quiz" id="${quizId}">`;
    html += `<div class="quiz-question">${escapeHtml(question)}</div>`;
    html += `<ul class="quiz-choices">`;
    choices.forEach(choice => {
        html += `<li class="quiz-choice">
            <label>
                <input type="radio" name="${quizId}-choice" data-correct="${choice.isAnswer}" />
                <span class="choice-text">${escapeHtml(choice.text)}</span>
            </label>
        </li>`;
    });
    html += `</ul>`;
    html += `<div class="quiz-result"></div>`;
    html += `</div>`;
    return html;
}

function injectQuizHandlers() {
    document.querySelectorAll('.custom-quiz').forEach(quiz => {
        const resultDiv = quiz.querySelector('.quiz-result');
        quiz.querySelectorAll('input[type=radio]').forEach(input => {
            input.addEventListener('change', () => {
                const isCorrect = input.dataset.correct === 'true';
                if (isCorrect) {
                    resultDiv.textContent = "Correct! 🎉";
                    resultDiv.style.color = "green";
                } else {
                    resultDiv.textContent = "Incorrect. Try again.";
                    resultDiv.style.color = "red";
                }
            });
        });
    });
}

// MENU SEARCH: debounce not needed, menu is likely small
document.getElementById('menuSearch').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    renderMenu(query);
});

// Teacher/Extended toggles
document.getElementById('toggleTeacher').addEventListener('click', () => {
    showTeacherSection = !showTeacherSection;
    setCookie('showTeacherSection', showTeacherSection, 30);
    renderMenu(document.getElementById('menuSearch').value.trim().toLowerCase());
});
document.getElementById('toggleExtended').addEventListener('click', () => {
    showExtendedSection = !showExtendedSection;
    setCookie('showExtendedSection', showExtendedSection, 30);
    renderMenu(document.getElementById('menuSearch').value.trim().toLowerCase());
});

loadPreferences();
loadMenu();

// --- MOBILE SIDEBAR LOGIC ---
const leftPane = document.getElementById('left-pane');
let sidebarBackdrop = document.createElement('div');
sidebarBackdrop.className = "left-pane-backdrop";
document.body.appendChild(sidebarBackdrop);

document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    leftPane.classList.add('open');
    sidebarBackdrop.classList.add('open');
});
sidebarBackdrop.addEventListener('click', () => {
    leftPane.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
});
window.addEventListener('resize', () => {
    if(window.innerWidth > 991) {
        leftPane.classList.remove('open');
        sidebarBackdrop.classList.remove('open');
    }
});