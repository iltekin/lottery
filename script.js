// Dil çevirileri
const translations = {
    tr: {
        firstNumber: "İlk Sayı",
        lastNumber: "Son Sayı",
        startDraw: "Çekilişi Başlat",
        pickNewNumber: "Yeni Sayı Çek",
        drawResults: "Sonuçlar",
        endDraw: "Çekilişi Bitir",
        settings: "Ayarlar",
        drawSpeed: "Çekiliş Hızı",
        slow: "Yavaş",
        normal: "Normal",
        fast: "Hızlı",
        drawEnded: "Çekilecek başka sayı kalmadı",
        confirmEnd: "Çekilişi bitirmek istediğinizden emin misiniz? Tüm sonuçlar silinecektir.",
        enterValidStart: "Lütfen geçerli bir başlangıç sayısı giriniz!",
        enterValidEnd: "Lütfen geçerli bir bitiş sayısı giriniz!",
        startGreaterThanEnd: "Başlangıç sayısı, bitiş sayısından büyük olamaz!",
        endLessThanStart: "Bitiş sayısı, başlangıç sayısından küçük olamaz!",
        startPlaceholder: "Başlangıç sayısı",
        endPlaceholder: "Bitiş sayısı",
        defaultTitle: "Piyango Çekilişi",
        titleLabel: "Başlık (opsiyonel)",
        titlePlaceholder: "Başlık giriniz",
        resetSettings: "Tüm Ayarları Sıfırla",
        confirmReset: "Tüm ayarları sıfırlamak istediğinizden emin misiniz?",
        applySettings: "Uygula",
        sortOrder: "Sıralama",
        ascending: "Yeniden Eskiye",
        descending: "Eskiden Yeniye",
        noResults: "Henüz çekiliş sonucu bulunmuyor",
        namesList: "İsim Listesi",
        namesListDescription: "İsimleri her satıra bir tane gelecek şekilde yazın...",
        save: "Kaydet",
        clearList: "Listeyi Temizle",
        confirmClear: "Listeyi temizlemek istediğinizden emin misiniz?",
        editWarning: "Çekiliş başladıktan sonra isim listesini düzenleyemezsiniz, öncelikle çekilişi bitirmeniz gerekiyor.",
        startLessThanOne: "İlk sayı 1'den küçük olamaz!",
        saveResults: "Sonuçları İndir",
        noResultsToSave: "İndirilecek sonuç bulunmuyor"
    },
    en: {
        firstNumber: "First Number",
        lastNumber: "Last Number",
        startDraw: "Start Draw",
        pickNewNumber: "Pick New Number",
        drawResults: "Results",
        endDraw: "End Draw",
        settings: "Settings",
        drawSpeed: "Draw Speed",
        slow: "Slow",
        normal: "Normal",
        fast: "Fast",
        drawEnded: "There are no more numbers to draw",
        confirmEnd: "Are you sure you want to end the draw? All results will be deleted.",
        enterValidStart: "Please enter a valid start number!",
        enterValidEnd: "Please enter a valid end number!",
        startGreaterThanEnd: "Start number cannot be greater than end number!",
        endLessThanStart: "End number cannot be less than start number!",
        startPlaceholder: "Start number",
        endPlaceholder: "End number",
        defaultTitle: "Lottery Draw",
        titleLabel: "Title (optional)",
        titlePlaceholder: "Enter title",
        resetSettings: "Reset All Settings",
        confirmReset: "Are you sure you want to reset all settings?",
        applySettings: "Apply",
        sortOrder: "Sort Order",
        ascending: "Newest First",
        descending: "Oldest First",
        noResults: "No draw results yet",
        namesList: "Name List",
        namesListDescription: "Enter names, one per line...",
        save: "Save",
        clearList: "Clear List",
        confirmClear: "Are you sure you want to clear the list?",
        editWarning: "You cannot edit the name list after the draw has started, you need to end the draw first.",
        startLessThanOne: "First number cannot be less than 1!",
        saveResults: "Save Results",
        noResultsToSave: "No results to save"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Temel elementleri seç
    const startNum = document.getElementById('startNum');
    const endNum = document.getElementById('endNum');
    const pickButton = document.getElementById('pickButton');
    const ballsContainer = document.querySelector('.balls-container');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPopup = document.getElementById('settingsPopup');
    const closePopup = document.getElementById('closePopup');
    const animationSpeed = document.getElementById('animationSpeed');
    const soundBtn = document.getElementById('soundBtn');
    const processingSound = document.getElementById('processingSound');
    const resultSound = document.getElementById('resultSound');
    const namesBtn = document.getElementById('namesBtn');
    const namesPopup = document.getElementById('namesPopup');
    const closeNamesPopup = document.getElementById('closeNamesPopup');
    let isSoundOn = localStorage.getItem('soundEnabled') !== 'false';
    let usedNumbers = new Set();
    const languageSelect = document.getElementById('language');
    let currentLang = localStorage.getItem('language') || 'tr';
    const mainTitle = document.getElementById('mainTitle');
    const titleInput = document.getElementById('titleInput');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const applySettingsBtn = document.getElementById('applySettings');
    const sortOrder = document.getElementById('sortOrder');

    // Kaydedilmiş sayıları yükle
    function loadSavedNumbers() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        
        // İsim listesini kontrol et
        const names = (localStorage.getItem('namesList') || '').split('\n').filter(name => name.trim());
        
        if (history.length > 0) {
            const savedUsedNumbers = JSON.parse(localStorage.getItem('usedNumbers') || '[]');
            usedNumbers = new Set(savedUsedNumbers);

            const savedNumbers = JSON.parse(localStorage.getItem('lotteryRange') || '{}');
            if (savedNumbers.start !== undefined && savedNumbers.end !== undefined) {
                startNum.value = savedNumbers.start;
                endNum.value = savedNumbers.end;
                startNum.disabled = true;
                endNum.disabled = true;
                
                pickButton.textContent = translations[currentLang].pickNewNumber;

                const digitCount = savedNumbers.end.toString().length;
                ballsContainer.innerHTML = '';
                for (let i = 0; i < digitCount; i++) {
                    const ball = document.createElement('div');
                    ball.className = 'ball';
                    ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                    ballsContainer.appendChild(ball);
                }
            }
        } else if (names.length > 0) {
            // Eğer çekiliş yoksa ama isim listesi varsa
            startNum.value = '1';
            endNum.value = names.length.toString();
            startNum.disabled = true;
            endNum.disabled = true;
            
            // İsim sayısını localStorage'a kaydet
            localStorage.setItem('lotteryRange', JSON.stringify({
                start: 1,
                end: names.length
            }));
            
            pickButton.textContent = translations[currentLang].startDraw;
            
            // Topları isim sayısına göre ayarla
            const digitCount = names.length.toString().length;
            ballsContainer.innerHTML = '';
            for (let i = 0; i < digitCount; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
        } else {
            startNum.value = '1';
            endNum.value = '';
            pickButton.textContent = translations[currentLang].startDraw;
            
            ballsContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }

            endNum.focus();
        }
        
        adjustHistoryHeight();
    }

    // İsim listesi popup'ını oluştur
    const namesListContent = document.querySelector('.names-list-body');
    namesListContent.innerHTML = `
        <div class="setting-item">
            <label for="namesTextarea">${translations[currentLang].namesListDescription}</label>
            <textarea id="namesTextarea"></textarea>
        </div>
        <div class="names-list-buttons">
            <button id="saveNames" class="apply-button">${translations[currentLang].save}</button>
            <button id="clearNames" class="text-button">${translations[currentLang].clearList}</button>
        </div>
    `;

    // Sayfa yüklendiğinde başlangıç durumunu ayarla
    loadHistory();
    loadSavedNumbers();

    // İsim listesi elementlerini seç
    const namesTextarea = document.getElementById('namesTextarea');
    const saveButton = document.getElementById('saveNames');
    const clearButton = document.getElementById('clearNames');

    // İsim listesi popup'ını aç
    namesBtn.addEventListener('click', () => {
        namesPopup.style.display = 'flex';
        namesTextarea.value = localStorage.getItem('namesList') || '';

        // Çekiliş durumuna göre butonları ayarla
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        const isDrawActive = history.length > 0;
        const warningMessage = document.querySelector('.warning-message') || (() => {
            const warning = document.createElement('div');
            warning.className = 'warning-message';
            warning.textContent = translations[currentLang].editWarning;
            namesTextarea.parentNode.insertBefore(warning, namesTextarea);
            return warning;
        })();

        namesTextarea.disabled = isDrawActive;
        saveButton.disabled = isDrawActive;
        clearButton.disabled = isDrawActive;

        if (isDrawActive) {
            namesTextarea.style.opacity = '0.7';
            saveButton.style.opacity = '0.7';
            clearButton.style.opacity = '0.7';
            warningMessage.style.display = 'block';
        } else {
            namesTextarea.style.opacity = '1';
            saveButton.style.opacity = '1';
            clearButton.style.opacity = '1';
            warningMessage.style.display = 'none';
        }
    });

    // İsim listesi popup'ını kapat
    closeNamesPopup.addEventListener('click', () => {
        namesPopup.style.display = 'none';
    });

    // İsim listesini kaydet
    saveButton.addEventListener('click', () => {
        console.log('Save button clicked'); // Debug için
        const names = namesTextarea.value.split('\n').filter(name => name.trim());
        localStorage.setItem('namesList', namesTextarea.value);
        namesPopup.style.display = 'none';
        
        if (names.length > 0) {
            startNum.value = '1';
            endNum.value = names.length.toString();
            startNum.disabled = true;
            endNum.disabled = true;
        } else {
            startNum.disabled = false;
            endNum.disabled = false;
            startNum.value = '1';
            endNum.value = '';
        }

        // Badge'i güncelle
        updateNamesBadge();

        // Listeyi güncelle
        loadHistory();
    });

    // İsim listesini temizle
    clearButton.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmClear)) {
            namesTextarea.value = '';
            localStorage.setItem('namesList', '');
            updateNamesBadge();
            startNum.disabled = false;
            endNum.disabled = false;
            endNum.value = '';
        }
    });

    // Popup dışına tıklandığında kapat
    namesPopup.addEventListener('click', (e) => {
        if (e.target === namesPopup) {
            namesPopup.style.display = 'none';
        }
    });

    // Dil değiştirme fonksiyonu
    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelector('label[for="startNum"]').textContent = translations[lang].firstNumber;
        document.querySelector('label[for="endNum"]').textContent = translations[lang].lastNumber;
        document.querySelector('label[for="animationSpeed"]').textContent = translations[lang].drawSpeed;
        document.querySelector('.history-header h3').textContent = translations[lang].drawResults;
        clearHistoryBtn.textContent = translations[lang].endDraw;
        document.querySelector('.popup-header h3').textContent = translations[lang].settings;
        
        // Input placeholder'larını güncelle
        startNum.placeholder = translations[lang].startPlaceholder;
        endNum.placeholder = translations[lang].endPlaceholder;

        // İsim listesi metinlerini güncelle
        document.querySelector('.names-list-header h3').textContent = translations[lang].namesList;
        document.querySelector('label[for="namesTextarea"]').textContent = translations[lang].namesListDescription;
        saveButton.textContent = translations[lang].save;
        clearButton.textContent = translations[lang].clearList;

        // Uyarı mesajını güncelle
        const warningMessage = document.querySelector('.warning-message');
        if (warningMessage) {
            warningMessage.textContent = translations[lang].editWarning;
        }

        // Hız seçeneklerini güncelle
        const speedOptions = animationSpeed.options;
        speedOptions[0].textContent = translations[lang].slow;
        speedOptions[1].textContent = translations[lang].normal;
        speedOptions[2].textContent = translations[lang].fast;
        
        // Buton metnini güncelle
        if (!document.querySelector('.history-section').querySelector('li')) {
            pickButton.textContent = translations[lang].startDraw;
        } else {
            pickButton.textContent = translations[lang].pickNewNumber;
        }

        // Çekiliş bitti mesajını güncelle
        const message = pickButton.nextSibling;
        if (message && (message.textContent === 'Çekiliş bitti' || message.textContent === 'Draw ended')) {
            message.textContent = translations[lang].drawEnded;
        }

        localStorage.setItem('language', lang);

        // Başlık input placeholder'ını güncelle
        document.querySelector('label[for="titleInput"]').textContent = translations[lang].titleLabel;
        titleInput.placeholder = translations[lang].titlePlaceholder;

        // Eğer varsayılan başlık kullanılıyorsa, yeni dildeki başlığı göster
        const savedTitle = localStorage.getItem('drawTitle');
        if (!savedTitle) {
            mainTitle.textContent = translations[lang].defaultTitle;
            titleInput.value = translations[lang].defaultTitle;
        }

        resetSettingsBtn.textContent = translations[lang].resetSettings;
        applySettingsBtn.textContent = translations[lang].applySettings;

        document.querySelector('label[for="sortOrder"]').textContent = translations[lang].sortOrder;
        sortOrder.options[0].textContent = translations[lang].ascending;
        sortOrder.options[1].textContent = translations[lang].descending;

        // Boş durum mesajını güncelle
        if (historyList.querySelector('.empty-state')) {
            historyList.querySelector('.empty-state p').textContent = translations[lang].noResults;
        }
    }

    // Dil seçimi değiştiğinde
    languageSelect.addEventListener('change', () => {
        updateLanguage(languageSelect.value);
    });

    // Sayfa yüklendiğinde dil ayarını yükle
    languageSelect.value = currentLang;
    updateLanguage(currentLang);

    // Başlangıç sayısı kontrolü
    startNum.addEventListener('change', () => {
        const start = parseInt(startNum.value);
        const end = parseInt(endNum.value);
        
        // İlk sayı 1'den küçük olamaz kontrolü
        if (start < 1) {
            alert(translations[currentLang].startLessThanOne);
            startNum.value = '1';
            return;
        }
        
        // Mevcut kontrol
        if (start > end && end) {
            alert(translations[currentLang].startGreaterThanEnd);
            startNum.value = '1';
        }
    });

    // Bitiş sayısı kontrolü
    endNum.addEventListener('change', () => {
        const start = parseInt(startNum.value);
        const end = parseInt(endNum.value);
        
        if (start > end && start) {
            alert(translations[currentLang].endLessThanStart);
            endNum.value = '';
        }
    });

    pickButton.addEventListener('click', () => {
        const start = parseInt(startNum.value);
        const end = parseInt(endNum.value);
        
        // İlk sayı kontrolü
        if (isNaN(start) || start < 1) {
            alert(translations[currentLang].startLessThanOne);
            startNum.value = '1';
            return;
        }
        
        // Mevcut kontroller
        if (isNaN(start) || start < 0) {
            alert(translations[currentLang].enterValidStart);
            return;
        }
        
        if (!end || end <= 0) {
            alert(translations[currentLang].enterValidEnd);
            return;
        }

        // İlk tıklamada buton yazısını değiştir
        pickButton.textContent = translations[currentLang].pickNewNumber;

        // Aralığı kaydet
        localStorage.setItem('lotteryRange', JSON.stringify({
            start: start,
            end: end
        }));

        // Input'ları devre dışı bırak
        startNum.disabled = true;
        endNum.disabled = true;
        namesTextarea.disabled = true;
        
        // Mevcut topları temizle
        ballsContainer.innerHTML = '';
        
        // Sayı uzunluğuna göre top oluştur
        const digitCount = end.toString().length;
        for (let i = 0; i < digitCount; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
            ballsContainer.appendChild(ball);
        }

        pickButton.disabled = true;
        animateBalls(end);
    });

    function animateBalls(max) {
        const start = parseInt(startNum.value);
        // Kullanılmamış bir sayı seç
        let availableNumbers = [];
        for (let i = start; i <= max; i++) {
            if (!usedNumbers.has(i)) {
                availableNumbers.push(i);
            }
        }

        // Hiç kullanılmamış sayı kalmadıysa
        if (availableNumbers.length === 0) {
            pickButton.disabled = true;
            
            // Çekiliş bitti mesajı
            const message = document.createElement('span');
            message.style.marginTop = '10px';
            message.style.color = '#198754';
            message.textContent = translations[currentLang].drawEnded;
            if (!pickButton.nextSibling || pickButton.nextSibling.nodeName !== 'SPAN') {
                pickButton.parentNode.insertBefore(message, pickButton.nextSibling);
            }
            
            return;
        }

        // Random bir sayı seç
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers[randomIndex];
        usedNumbers.add(randomNumber);

        const digits = max.toString().length;
        
        // Seçilen sayıyı basamaklarına ayır
        const result = randomNumber.toString().padStart(digits, '0').split('').map(Number);
        let currentIndex = 0;

        function animateBall(index) {
            if (index >= digits) {
                saveResult(randomNumber);
                pickButton.disabled = false;
                // Sonuç sesini çal
                if (isSoundOn) {
                    resultSound.currentTime = 0;
                    resultSound.play();
                }

                // Tüm topları highlight et
                const allBalls = document.querySelectorAll('.ball');
                allBalls.forEach(ball => {
                    ball.classList.add('highlight-ball-animation');
                    setTimeout(() => {
                        ball.classList.remove('highlight-ball-animation');
                    }, 2000);
                });

                return;
            }

            const ball = document.getElementById(`ball${index}`);
            const selectedNumber = result[index];

            // Sonsuz döngü için strip oluştur
            let strip = document.createElement('div');
            strip.className = 'number-strip';
            
            // 10 set rakam oluştur (sonsuz görünüm için)
            for (let j = 0; j < 10; j++) {
                for (let i = 0; i <= 9; i++) {
                    let num = document.createElement('div');
                    num.className = 'number';
                    num.textContent = i;
                    strip.appendChild(num);
                }
            }
            
            // Son sayıyı ekle
            let finalNum = document.createElement('div');
            finalNum.className = 'number';
            finalNum.textContent = selectedNumber;
            strip.appendChild(finalNum);

            ball.innerHTML = '';
            ball.appendChild(strip);

            // Her rakam için processing sesini çal
            if (isSoundOn) {
                processingSound.currentTime = 0;
                processingSound.play();
            }

            // GSAP ile animasyon
            gsap.fromTo(strip, 
                { y: 0 },
                { 
                    y: -(100 * 99 + selectedNumber * 100),
                    duration: parseInt(animationSpeed.value),
                    ease: "power2.inOut",
                    onComplete: () => {
                        ball.innerHTML = `<div class="number">${selectedNumber}</div>`;
                        animateBall(index + 1);
                    }
                }
            );
        }

        animateBall(0);
    }

    function saveResult(number) {
        let history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        history.push(number);
        localStorage.setItem('lotteryHistory', JSON.stringify(history));
        
        // Kullanılmış sayıları da kaydet
        localStorage.setItem('usedNumbers', JSON.stringify([...usedNumbers]));
        
        // Geçmiş eklendiğinde butonu aktif et
        clearHistoryBtn.disabled = false;
        
        loadHistory();

        // Son eklenen satırı bul ve highlight animasyonunu uygula
        const currentSort = localStorage.getItem('sortOrder') || 'desc';
        const historyItems = historyList.querySelectorAll('li');
        // desc modunda ilk öğe, asc modunda son öğe highlight edilmeli
        const targetItem = currentSort === 'asc' ? historyItems[0] : historyItems[historyItems.length - 1];
        
        if (targetItem) {
            targetItem.classList.add('highlight-animation');
            setTimeout(() => {
                targetItem.classList.remove('highlight-animation');
            }, 2000);
        }
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        const namesList = localStorage.getItem('namesList') || '';
        const names = namesList.split('\n').filter(name => name.trim());
        const startNumber = parseInt(startNum.value) || 1;
        const currentSort = localStorage.getItem('sortOrder') || 'desc';

        // Sonuçları indirme butonu için container
        const saveButtonContainer = document.createElement('div');
        saveButtonContainer.className = 'save-results-container';
        
        const saveButton = document.createElement('button');
        saveButton.className = 'save-results-button';
        saveButton.innerHTML = `<i class="fas fa-download"></i> ${translations[currentLang].saveResults}`;
        saveButton.onclick = downloadResults;
        saveButtonContainer.appendChild(saveButton);

        if (history.length === 0) {
            // Boş durum mesajı
            historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-list-ol"></i>
                    <p>${translations[currentLang].noResults}</p>
                </div>`;
            saveButton.disabled = true;
            saveButton.style.opacity = '0.5';
        } else {
            // Normal liste görünümü
            historyList.innerHTML = history
                .map((num, index) => {
                    const listIndex = num - startNumber;
                    const listItem = names[listIndex];
                    const nameSpan = listItem ? `<span class="result-name">${listItem}</span>` : '';
                    const numberSpan = `<span class="result-number">${num}</span>`;
                    
                    const displayIndex = currentSort === 'asc' ? 
                        history.length - index : 
                        index + 1;

                    return `<li>
                        <div class="left-content">
                            <span class="index-number">#${displayIndex}</span>
                            ${nameSpan}
                        </div>
                        ${numberSpan}
                    </li>`;
                })
                .join('');
            saveButton.disabled = false;
            saveButton.style.opacity = '1';
        }
        
        // Mevcut save-results-container'ı kaldır (varsa)
        const existingContainer = document.querySelector('.save-results-container');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // Yeni container'ı ekle
        historyList.parentNode.appendChild(saveButtonContainer);
        
        clearHistoryBtn.disabled = history.length === 0;
        adjustHistoryHeight();
    }

    // Sonuçları indirme fonksiyonu
    function downloadResults() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        if (history.length === 0) {
            alert(translations[currentLang].noResultsToSave);
            return;
        }

        const namesList = localStorage.getItem('namesList') || '';
        const names = namesList.split('\n').filter(name => name.trim());
        const startNumber = parseInt(startNum.value) || 1;
        const currentSort = localStorage.getItem('sortOrder') || 'desc';
        const title = mainTitle.textContent;
        
        // Tarih ve saat formatı
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const dateStr = `${day}.${month}.${year}`;
        const timeStr = `${hours}:${minutes}:${seconds}`;

        let content = `${title}\n`;
        content += `${dateStr} ${timeStr}\n\n`;
        content += `${translations[currentLang].drawResults}:\n`;
        content += '------------------------\n';

        const sortedHistory = currentSort === 'asc' ? [...history].reverse() : [...history];
        
        sortedHistory.forEach((num, index) => {
            const listIndex = num - startNumber;
            const listItem = names[listIndex];
            const displayIndex = index + 1;
            
            if (listItem) {
                content += `${displayIndex}. ${listItem} (${num})\n`;
            } else {
                content += `${displayIndex}. ${num}\n`;
            }
        });

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // Dosya adında da aynı tarih formatını kullan
        a.download = `cekilis_sonuclari_${day}-${month}-${year}.txt`;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Çekilişi bitir
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmEnd)) {
            localStorage.removeItem('lotteryHistory');
            localStorage.removeItem('lotteryRange');
            usedNumbers.clear();
            loadHistory();
            
            // Input'ları aktif et
            namesTextarea.disabled = false;
            namesTextarea.style.opacity = '1';
            saveButton.disabled = false;
            saveButton.style.opacity = '1';
            clearButton.disabled = false;
            clearButton.style.opacity = '1';
            
            const warningMessage = document.querySelector('.warning-message');
            if (warningMessage) {
                warningMessage.style.display = 'none';
            }

            // İsim listesindeki isim sayısını kontrol et
            const names = (localStorage.getItem('namesList') || '').split('\n').filter(name => name.trim());
            if (names.length > 0) {
                startNum.value = '1';
                endNum.value = names.length.toString();
                startNum.disabled = true;
                endNum.disabled = true;
                
                // İsim sayısını localStorage'a kaydet
                localStorage.setItem('lotteryRange', JSON.stringify({
                    start: 1,
                    end: names.length
                }));
            } else {
                startNum.disabled = false;
                endNum.disabled = false;
                startNum.value = '1';
                endNum.value = '';
            }
            
            pickButton.textContent = translations[currentLang].startDraw;
            
            ballsContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
            
            pickButton.disabled = false;
            
            const message = pickButton.nextSibling;
            if (message && message.textContent === translations[currentLang].drawEnded) {
                message.remove();
            }
        }
    });

    // Popup kontrolü
    settingsBtn.addEventListener('click', () => {
        settingsPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
        settingsPopup.style.display = 'none';
    });

    // Popup dışına tıklandığında kapat
    settingsPopup.addEventListener('click', (e) => {
        if (e.target === settingsPopup) {
            settingsPopup.style.display = 'none';
        }
    });

    // Animasyon hızını localStorage'a kaydet
    animationSpeed.addEventListener('change', () => {
        localStorage.setItem('animationSpeed', animationSpeed.value);
    });

    // Kaytlı hızı yükle
    const savedSpeed = localStorage.getItem('animationSpeed');
    if (savedSpeed) {
        animationSpeed.value = savedSpeed;
    }

    // Ses durumunu başlangıçta ayarla
    updateSoundIcon();

    // Ses açma/kapama kontrolü
    soundBtn.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        localStorage.setItem('soundEnabled', isSoundOn);
        updateSoundIcon();
    });

    function updateSoundIcon() {
        if (isSoundOn) {
            soundBtn.classList.remove('muted');
            soundBtn.querySelector('i').className = 'fas fa-volume-up';
        } else {
            soundBtn.classList.add('muted');
            soundBtn.querySelector('i').className = 'fas fa-volume-mute';
        }
    }

    // Başlığı yükle
    function loadTitle() {
        const savedTitle = localStorage.getItem('drawTitle');
        if (savedTitle) {
            mainTitle.textContent = savedTitle;
            titleInput.value = savedTitle;
        } else {
            mainTitle.textContent = translations[currentLang].defaultTitle;
            titleInput.value = translations[currentLang].defaultTitle;
        }
    }

    // Başlığı kaydet
    titleInput.addEventListener('input', () => {
        const newTitle = titleInput.value.trim() || translations[currentLang].defaultTitle;
        mainTitle.textContent = newTitle;
        localStorage.setItem('drawTitle', newTitle);
    });

    // Sayfa yüklendiğinde başlığı yükle
    loadTitle();

    // Ayarları sıfırlama fonksiyonu
    resetSettingsBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmReset)) {
            // Hızı normale getir
            animationSpeed.value = '2';
            localStorage.setItem('animationSpeed', '2');

            // Title' default'a getir
            localStorage.removeItem('drawTitle');
            mainTitle.textContent = translations[currentLang].defaultTitle;
            titleInput.value = translations[currentLang].defaultTitle;

            // Sıralama ayarını varsayılana getir (desc)
            sortOrder.value = 'desc';
            localStorage.setItem('sortOrder', 'desc');

            // Listeyi güncelle
            loadHistory();
        }
    });

    // Uygula butonu için event listener
    applySettingsBtn.addEventListener('click', () => {
        settingsPopup.style.display = 'none';  // Sadece popup'ı kapat
    });

    // Sıralama tercihini kaydet
    sortOrder.addEventListener('change', () => {
        localStorage.setItem('sortOrder', sortOrder.value);
        loadHistory();  // Listeyi yeniden yükle
    });

    // Sayfa yüklendiğinde sıralama tercihini yükle
    const savedSort = localStorage.getItem('sortOrder') || 'desc';
    sortOrder.value = savedSort;

    // Sağ sütun yüksekliğini ayarlama fonksiyonu
    function adjustHistoryHeight() {
        const lotterySection = document.querySelector('.lottery-section');
        const historySection = document.querySelector('.history-section');
        historySection.style.minHeight = `${lotterySection.clientHeight - 60}px`;
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde yüksekliği ayarla
    window.addEventListener('load', adjustHistoryHeight);
    window.addEventListener('resize', adjustHistoryHeight);

    // İsim sayısı badge'ini güncelle
    function updateNamesBadge() {
        const names = (localStorage.getItem('namesList') || '').split('\n').filter(name => name.trim());
        let badge = document.querySelector('.names-badge');
        
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'names-badge';
            namesBtn.appendChild(badge);
        }
        
        badge.textContent = names.length;
    }

    // Sayfa yüklendiğinde badge'i güncelle
    updateNamesBadge();

    // Çekiliş bittiğinde
    function endDraw() {
        pickButton.disabled = true;
        const message = document.createElement('span');
        message.style.marginLeft = '20px';
        message.style.color = '#198754';
        message.style.fontWeight = '500';
        message.style.display = 'inline-block';
        message.style.marginTop = '10px';
        message.textContent = translations[currentLang].drawEnded;
        if (!pickButton.nextSibling || pickButton.nextSibling.nodeName !== 'SPAN') {
            pickButton.parentNode.insertBefore(message, pickButton.nextSibling);
        }
    }
}); 