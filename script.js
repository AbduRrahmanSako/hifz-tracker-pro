const juz27Data = { 
    "Edh-Dharijat": {start:520, end:523}, 
    "Et-Tur": {start:523, end:525}, 
    "En-Nexhm": {start:526, end:528}, 
    "El-Kamer": {start:528, end:531}, 
    "Er-Rahman": {start:531, end:534}, 
    "El-Waki'ah": {start:534, end:537}, 
    "El-Hadid": {start:537, end:541} 
};

function loadSurahs() {
    const container = document.getElementById('juz27');
    container.innerHTML = "";
    Object.keys(juz27Data).forEach(s => {
        // Kontrollo statusin e ruajtur (Tick)
        const isDone = localStorage.getItem(`status-${s}`) === 'done';
        
        container.innerHTML += `
            <div class="surah-item ${isDone ? 'completed' : ''}" id="item-${s}">
                <button class="tick-btn" onclick="toggleComplete('${s}')">✓</button>
                <span class="surah-name" onclick="showDetails('${s}')">${s}</span>
            </div>`;
    });
}

// Funksioni për Tick-un te lista kryesore
function toggleComplete(surah) {
    const item = document.getElementById(`item-${surah}`);
    const isNowDone = item.classList.toggle('completed');
    localStorage.setItem(`status-${surah}`, isNowDone ? 'done' : 'pending');
}

function showDetails(surahName) {
    const data = juz27Data[surahName];
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('surah-detail-view').style.display = 'block';
    document.getElementById('detail-surah-name').innerText = surahName;
    
    const container = document.getElementById('pages-container');
    container.innerHTML = '';

    for (let i = data.start; i <= data.end; i++) {
        const storageKey = `count-page-${i}`;
        const savedCount = localStorage.getItem(storageKey) || 0;

        container.innerHTML += `
            <div class="page-row">
                <span class="surah-name" onclick="openMushaf(${i})">📖 Faqja ${i}</span>
                <div class="counter-controls">
                    <button class="btn-small btn-minus" onclick="updatePageCount('${storageKey}', -1, ${i})">-</button>
                    <span class="count-val" id="val-${i}">${savedCount}</span>
                    <button class="btn-small btn-plus" onclick="updatePageCount('${storageKey}', 1, ${i})">+</button>
                </div>
            </div>`;
    }
}

function updatePageCount(key, change, pageNum) {
    let current = parseInt(localStorage.getItem(key) || 0);
    current = Math.max(0, current + change);
    localStorage.setItem(key, current);
    document.getElementById(`val-${pageNum}`).innerText = current;
}

function openMushaf(page) {
    const modal = document.getElementById('mushaf-modal');
    const frame = document.getElementById('mushaf-frame');
    frame.src = `https://quran.com/page/${page}`;
    modal.style.display = 'flex';
}

function closeMushaf() {
    document.getElementById('mushaf-modal').style.display = 'none';
    document.getElementById('mushaf-frame').src = "";
}

function goBack() {
    document.getElementById('surah-detail-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    loadSurahs(); // Rifresko listën kryesore që të shfaqen Tick-at
}

function toggleJuz(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === "block") ? "none" : "block";
}

window.onload = loadSurahs;