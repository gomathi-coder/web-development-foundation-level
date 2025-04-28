let menuData = [];
let currentPage = location.pathname.split("/").pop() || "index.html";

async function loadMenu() {
    const res = await fetch('json/menu.json');
    menuData = await res.json();
    renderMenu();
}

function renderMenu() {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    menuData.forEach((section, idx) => {
        const parent = document.createElement('div');
        parent.innerHTML = `<div class="parent-section-link" data-idx="${idx}">${section['section-name']}</div>`;
        
        const childDiv = document.createElement('div');
        childDiv.style.display = 'none';

        section['child-pages'].forEach((child, cidx) => {
            if (child.visible === "true") {
                const childLink = document.createElement('a');
                childLink.href = child['page-url'];
                childLink.className = "child-page-link";
                childLink.textContent = child['page-name'];
                childLink.dataset.idx = idx;
                childLink.dataset.cidx = cidx;
                childLink.dataset.markdown = child['mark-down'];
                childLink.dataset.pageid = child['page-id'];
                childLink.dataset.pageversion = child['page-version'];
                childDiv.appendChild(childLink);

                if (currentPage.endsWith(child['page-url'])) {
                    childLink.classList.add('active-child');
                    parent.firstChild.classList.add('active-section');
                    childDiv.style.display = 'block';
                }
            }
        });

        parent.appendChild(childDiv);
        menuDiv.appendChild(parent);
    });

    document.querySelectorAll('.parent-section-link').forEach(link => {
        link.addEventListener('click', () => {
            const next = link.nextElementSibling;
            next.style.display = (next.style.display === 'none') ? 'block' : 'none';
        });
    });

    document.querySelectorAll('.child-page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let mdfilepath = constructNewFilename(link);
            //loadMarkdown(link.getAttribute('href').replace('.html', '.md'));
            loadMarkdown(mdfilepath);
            history.pushState({}, '', link.getAttribute('href'));
            currentPage = link.getAttribute('href');
            renderMenu();
        });
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
    //mdText = mdText.replace(/:::quiz([\s\S]*?):::/g, (_, content) => parseQuizBlock(content));
    mdText = mdText.replace(/:::quiz([\s\S]*?):::/g, (_, content) => parseQuizBlock2(content));

    document.getElementById('content').innerHTML = marked.parse(mdText);
    injectQuizHandlers();

}

function parseQuizBlock(content) {
    const questionMatch = content.match(/\*\*Question:\*\*(.*)/);
    const options = [...content.matchAll(/- (.+?)( ✅)?(\n|$)/g)];
    if (!questionMatch || options.length === 0) return '';

    const question = questionMatch[1].trim();
    const optionsHtml = options.map((opt, idx) => {
        const text = opt[1].trim();
        const isCorrect = opt[2] !== undefined;
        return `<div><input type="radio" name="quiz${quizCounter}" data-correct="${isCorrect}" id="quiz${quizCounter}-${idx}">
                <label for="quiz${quizCounter}-${idx}">${text}</label></div>`;
    }).join("");

    const quizHtml = `<div class="custom-quiz">
        <p><strong>${question}</strong></p>
        ${optionsHtml}
        <button onclick="checkQuiz(${quizCounter})" class="btn btn-sm btn-primary mt-2">Check Answer</button>
        <div id="quiz-result-${quizCounter}" class="mt-2"></div>
    </div>`;

    quizCounter++;
    return quizHtml;
}

function checkQuiz(quizId) {
    const radios = document.querySelectorAll(`input[name="quiz${quizId}"]`);
    let correct = false;
    radios.forEach(r => {
        if (r.checked && r.dataset.correct === "true") {
            correct = true;
        }
    });
    document.getElementById(`quiz-result-${quizId}`).innerHTML = correct ?
        `<span class="text-success">Correct Answer! 🎉</span>` :
        `<span class="text-danger">Wrong Answer. Try Again! ❌</span>`;
}


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

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
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

let quizCounter = 0;

loadMenu();
