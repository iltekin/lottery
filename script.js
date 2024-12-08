// Dil çevirileri
const translations = {
    tr: {
        firstNumber: "İlk Sayı",
        lastNumber: "Son Sayı",
        startDraw: "Çekilişi Başlat",
        pickNewNumber: "Yeni Sayı Çek",
        pickNewBall: "Top Çek",
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
        defaultTitle: "Şanslı Top",
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
        noResultsToSave: "İndirilecek sonuç bulunmuyor",
        singleNumber: "TEK NUMARA",
        singleBall: "TEK TOP",
        multiAuto: "ÇOKLU OTOMATİK",
        drawCount: "Çekim sayısı",
        stopDraw: "Çekilişi Durdur",
        invalidDrawCount: "Lütfen 1-100 arası bir çekim sayısı girin",
        drawCountPlaceholder: "Çekim sayısı",
        uploadImageText: "Resim seçmek için tıklayın",
        backgroundImageLabel: "Arkaplan Resmi",
        footerText: '<a href="https://sansli.top">sansli.top</a> projesi <a href="https://x.com/sezeriltekin" target="_blank" rel="noopener noreferrer">sezer iltekin</a> tarafından <a href="https://github.com/iltekin/sansli-top" target="_blank" rel="noopener noreferrer">açık kaynak</a> olarak geliştirilmiştir.<br><a href="https://buymeacoffee.com/sezeriltekin" target="_blank" rel="noopener noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Bana Kahve Ismarla"></a>'
    },
    en: {
        firstNumber: "First Number",
        lastNumber: "Last Number",
        startDraw: "Start Draw",
        pickNewNumber: "Pick New Number",
        pickNewBall: "Pick Ball",
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
        defaultTitle: "Lucky Ball",
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
        noResultsToSave: "No results to save",
        singleNumber: "SINGLE NUMBER",
        singleBall: "SINGLE BALL",
        multiAuto: "MULTI AUTO",
        drawCount: "Draw count",
        stopDraw: "Stop Draw",
        invalidDrawCount: "Please enter a draw count between 1-100",
        drawCountPlaceholder: "Draw count",
        uploadImageText: "Click to select image",
        backgroundImageLabel: "Background Image",
        footerText: '<a href="https://sansli.top">sansli.top</a> project is developed as <a href="https://github.com/iltekin/sansli-top" target="_blank" rel="noopener noreferrer">open source</a> by <a href="https://x.com/sezeriltekin" target="_blank" rel="noopener noreferrer">sezer iltekin</a>.<br><a href="https://buymeacoffee.com/sezeriltekin" target="_blank" rel="noopener noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"></a>'
}
};

document.addEventListener('DOMContentLoaded', () => {
    // Ziyaretçi sayısını artır ve göster
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    let endpoint = 'incr';
    if (loginTime && (currentTime - parseInt(loginTime)) < fiveMinutes) {
        endpoint = 'get';
    }

    fetch(`https://count.iltekin.com/sanslitop/${endpoint}/start`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('loginTime', currentTime.toString());
        const visitorCount = document.createElement('div');
        visitorCount.className = 'visitor-count';
        visitorCount.textContent = `${data.value}`;
        const userIcon = document.createElement('i');
        userIcon.className = 'fas fa-user';
        visitorCount.insertBefore(userIcon, visitorCount.firstChild);
        document.body.appendChild(visitorCount);
    })
    .catch(error => {
        console.log('Ziyaretçi sayısı alınamadı:', error);
    });
    
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
    const drawTypeSelect = document.getElementById('drawType');
    const drawCountInput = document.getElementById('drawCount');
    const drawCountContainer = document.querySelector('.draw-count-input');
    const drawError = document.getElementById('draw-error');
    let isAutoDrawing = false;
    let autoDrawInterval;

    // Global değişken olarak ekleyelim
    let currentBallIndex = 0;

    // Arkaplan resmi için event listener'ları ekle
    const backgroundInput = document.getElementById('backgroundImage');
    const selectBackgroundBtn = document.getElementById('selectBackground');
    const removeBackgroundBtn = document.getElementById('removeBackground');

    // Resim yükleme alanı için elementleri seç
    const imageUploadArea = document.querySelector('.image-upload-area');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = imagePreview.querySelector('img');

    // Sayfa yüklendiğinde mevcut arkaplanı kontrol et
    const savedBackground = localStorage.getItem('backgroundImage');
    if (savedBackground) {
        document.body.style.backgroundImage = `url(${savedBackground})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        previewImg.src = savedBackground;
        uploadPlaceholder.style.display = 'none';
        imagePreview.style.display = 'block';
    }

    // Resim yükleme alanına tıklandığında
    imageUploadArea.addEventListener('click', () => {
        backgroundInput.click();
    });

    // Resim seçildiğinde
    backgroundInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                localStorage.setItem('backgroundImage', imageData);
                document.body.style.backgroundImage = `url(${imageData})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundAttachment = 'fixed';
                previewImg.src = imageData;
                uploadPlaceholder.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Resmi kaldır butonuna tıklandığında
    removeBackgroundBtn.addEventListener('click', (e) => {
        e.stopPropagation();  // Üst elementin click event'ini engelle
        localStorage.removeItem('backgroundImage');
        document.body.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
        uploadPlaceholder.style.display = 'flex';
        imagePreview.style.display = 'none';
        previewImg.src = '';
    });

    // resetSettingsBtn için event listener'ı güncelle
    resetSettingsBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmReset)) {
            // Hızı normale getir
            localStorage.setItem('animationSpeed', '2');
            
            // Hız butonlarını güncelle
            document.querySelectorAll('.speed-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.value === '2') {
                    btn.classList.add('active');
                }
            });

            // Title'ı boş yap
            localStorage.setItem('drawTitle', ' ');
            mainTitle.textContent = ' ';
            titleInput.value = '';

            // Sıralama ayarını varsayılana getir (desc)
            localStorage.setItem('sortOrder', 'desc');
            document.querySelectorAll('.sort-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.value === 'desc') {
                    btn.classList.add('active');
                }
            });

            // Listeyi güncelle
            loadHistory();

            // Dil ayarını varsayılana getir (tr)
            localStorage.setItem('language', 'tr');
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.value === 'tr') {
                    btn.classList.add('active');
                }
            });
            updateLanguage('tr');

            // Draw type'ı varsayılana getir (single-number)
            localStorage.setItem('drawType', 'single-number');
            drawTypeSelect.value = 'single-number';
            
            // Buton metnini güncelle
            const history = document.querySelector('.history-section').querySelector('li');
            if (history) {
                pickButton.textContent = translations[currentLang].pickNewNumber;
            }

            // Arkaplanı sıfırla
            localStorage.removeItem('backgroundImage');
            document.body.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
            uploadPlaceholder.style.display = 'flex';
            imagePreview.style.display = 'none';
            previewImg.src = '';

            // Popup'ı kapat
            settingsPopup.style.display = 'none';
        }
    });

    // Kaydedilmi sayıları yükle
    function loadSavedNumbers() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        
        // İsim listesini kontrol et
        const names = (localStorage.getItem('namesList') || '').split('\n').filter(name => name.trim());
        
        if (history.length > 0) {
            // Kullanılmış sayıları localStorage'dan yükle
            usedNumbers = new Set(history);

            const savedNumbers = JSON.parse(localStorage.getItem('lotteryRange') || '{}');
            if (savedNumbers.start !== undefined && savedNumbers.end !== undefined) {
                startNum.value = savedNumbers.start;
                endNum.value = savedNumbers.end;
                startNum.disabled = true;
                endNum.disabled = true;
                
                pickButton.textContent = translations[currentLang].pickNewNumber;

                // Top sayısını çekiliş türüne göre belirle
                const digitCount = savedNumbers.end.toString().length;
                const ballCount = drawTypeSelect.value === 'single-ball' ? 1 : digitCount;
                
                ballsContainer.innerHTML = '';
                for (let i = 0; i < ballCount; i++) {
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

    // loadHistory fonksiyonunu buraya taşıyalım
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
        saveButton.innerHTML = '<i class="fas fa-download"></i>';
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
            // Sıralamaya göre listeyi düzenle
            const sortedHistory = [...history];
            if (currentSort === 'asc') {
                sortedHistory.reverse();
            }

            // Normal liste görünümü
            historyList.innerHTML = sortedHistory
                .map((num, index) => {
                    const listIndex = num - startNumber;
                    const listItem = names[listIndex];
                    const nameSpan = listItem ? `<span class="result-name">${listItem}</span>` : '';
                    const numberSpan = `<span class="result-number">${num}</span>`;
                    
                    // Sıra numarasını sıralamaya göre ayarla
                    const displayIndex = currentSort === 'asc' ? 
                        sortedHistory.length - index : 
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
        
        // Yeni container'ı history-section'a ekle
        document.querySelector('.history-section').appendChild(saveButtonContainer);
        
        clearHistoryBtn.disabled = history.length === 0;
        adjustHistoryHeight();
    }

    // downloadResults fonksiyonunu ekleyelim
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

    // Sayfa yüklendiğinde başlangıç durumunu ayarla
    loadHistory();
    loadSavedNumbers();

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

    // İsim listesi içeriğini düzenleyen fonksiyon
    function updateNamesTextarea(isDrawActive) {
        const namesTextarea = document.getElementById('namesTextarea');
        const names = (localStorage.getItem('namesList') || '').split('\n').filter(name => name.trim());
        
        if (isDrawActive && names.length > 0) {
            // Çekiliş aktifken sıra numaralı göster
            namesTextarea.value = names
                .map((name, index) => `${index + 1}. ${name}`)
                .join('\n');
        } else {
            // Normal halde sıra numarasız göster
            namesTextarea.value = names.join('\n');
        }
    }

    // namesBtn click event'inde güncelle
    namesBtn.addEventListener('click', () => {
        namesPopup.style.display = 'flex';
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        const isDrawActive = history.length > 0;
        
        updateNamesTextarea(isDrawActive);

        // Çekiliş durumuna göre butonları ayarla
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
        
        // Input placeholder'ları güncelle
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
        document.querySelectorAll('.speed-option').forEach(btn => {
            const speed = btn.dataset.value;
            if (speed === '4') btn.textContent = translations[lang].slow;
            if (speed === '2') btn.textContent = translations[lang].normal;
            if (speed === '1') btn.textContent = translations[lang].fast;
        });
        
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

        // Başlık kontrolünü güncelle
        const savedTitle = localStorage.getItem('drawTitle');
        if (savedTitle !== null) {
            mainTitle.textContent = savedTitle;
            titleInput.value = savedTitle;
        } else {
            mainTitle.textContent = ' ';  // Boş başla
            titleInput.value = '';  // Input da boş başlasın
            localStorage.setItem('drawTitle', ' ');  // localStorage'a boş kaydet
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

        // Sıralama seçeneklerini güncelle
        document.querySelectorAll('.sort-option').forEach(btn => {
            const sort = btn.dataset.value;
            if (sort === 'desc') btn.textContent = translations[lang].descending;
            if (sort === 'asc') btn.textContent = translations[lang].ascending;
        });

        // Draw type seçeneklerini güncelle
        const drawTypeOptions = drawTypeSelect.options;
        drawTypeOptions[0].textContent = translations[lang].singleNumber;
        drawTypeOptions[1].textContent = translations[lang].singleBall;
        drawTypeOptions[2].textContent = translations[lang].multiAuto;

        // Çekim sayısı placeholder'ını güncelle
        if (drawCountInput) {
            drawCountInput.placeholder = translations[lang].drawCountPlaceholder;
        }

        // Arkaplan resmi yükleme metnini güncelle
        const uploadPlaceholderText = document.querySelector('#uploadPlaceholder span');
        if (uploadPlaceholderText) {
            uploadPlaceholderText.textContent = translations[lang].uploadImageText;
        }

        // Arkaplan resmi label'ını güncelle
        const backgroundLabel = document.querySelector('label[for="backgroundImage"]');
        if (backgroundLabel) {
            backgroundLabel.textContent = translations[lang].backgroundImageLabel;
        }

        // Footer metnini güncelle
        document.querySelector('.footer p').innerHTML = translations[lang].footerText;
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

    // Pick button click event'ini güncelle
    pickButton.addEventListener('click', () => {
        const start = parseInt(startNum.value);
        const end = parseInt(endNum.value);
        
        if (isNaN(start)) {
            alert(translations[currentLang].enterValidStart);
            return;
        }
        
        if (isNaN(end)) {
            alert(translations[currentLang].enterValidEnd);
            return;
        }
        
        if (start > end) {
            alert(translations[currentLang].startGreaterThanEnd);
            return;
        }
        
        const max = end;
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        
        if (history.length === 0) {
            // İlk çekilişte input'ları devre dışı bırak
            startNum.disabled = true;
            endNum.disabled = true;
            
            // İlk çekilişte topları oluştur
            const digits = max.toString().length;
            
            ballsContainer.innerHTML = '';
            for (let i = 0; i < digits; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
            
            // Başlangıç ve bitiş sayılarını kaydet
            localStorage.setItem('lotteryRange', JSON.stringify({ start, end }));
        }
        
        // Tüm sayılar çekildiyse uyarı ver
        if (usedNumbers.size >= (end - start + 1)) {
            endDraw();
            return;
        }

        if (drawTypeSelect.value === 'multi-auto') {
            if (!isAutoDrawing) {
                startAutoDraw();
            } else {
                stopAutoDraw();
            }
            return;
        }
        
        // Yeni çekim öncesi topları temizle
        const digits = max.toString().length;
        ballsContainer.innerHTML = '';
        for (let i = 0; i < digits; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
            ballsContainer.appendChild(ball);
        }
        
        // Çekiliş türüne göre animasyonu başlat
        if (drawTypeSelect.value === 'single-ball') {
            animateSingleBall(max);
        } else {
            animateBalls(max);
        }
        
        // Buton metnini güncelle
        if (history.length === 0) {
            pickButton.textContent = drawTypeSelect.value === 'single-ball' ? 
                translations[currentLang].pickNewBall : 
                translations[currentLang].pickNewNumber;
        }
    });

    // Çekilişi bitir butonuna tıklandığında otomatik çekimi de durdur
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmEnd)) {
            stopAutoDraw();
            localStorage.removeItem('lotteryHistory');
            localStorage.removeItem('lotteryRange');
            usedNumbers.clear();
            loadHistory();
            
            // Hata mesajını temizle
            drawError.innerHTML = '';
            
            // İsim listesi textarea'sını güncelle
            updateNamesTextarea(false);
            
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

            // Çekilişi bitir butonuna tıklandığında currentBallIndex'i sıfırla
            currentBallIndex = 0;
            localStorage.removeItem('currentNumber');
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

    // Animasyon hızın localStorage'a kaydet
    animationSpeed.addEventListener('change', () => {
        localStorage.setItem('animationSpeed', animationSpeed.value);
    });

    // Kaytlı hızı yükle
    const savedSpeed = localStorage.getItem('animationSpeed');
    if (savedSpeed) {
        animationSpeed.value = savedSpeed;
    }

    // Ses durumunu başlangıta ayarla
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
        if (savedTitle !== null) {
            mainTitle.textContent = savedTitle;
            titleInput.value = savedTitle;
        } else {
            mainTitle.textContent = ' ';  // Boş başla
            titleInput.value = '';  // Input da boş başlasın
            localStorage.setItem('drawTitle', ' ');  // localStorage'a boş kaydet
        }
    }

    // Başlığı kaydet
    titleInput.addEventListener('input', () => {
        const newTitle = titleInput.value.trim() || '';
        mainTitle.textContent = newTitle;
        localStorage.setItem('drawTitle', newTitle);
    });

    // Sayfa yüklendiğinde başlangıç durumunu ayarla
    loadHistory();
    loadSavedNumbers();

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
        historySection.style.minHeight = `${lotterySection.clientHeight}px`;
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
        drawError.innerHTML = translations[currentLang].drawEnded;
    }

    // createSpeedButtons fonksiyonunda hız değerlerini düzeltelim
    function createSpeedButtons() {
        const speedSelect = document.getElementById('animationSpeed');
        const speedValue = localStorage.getItem('animationSpeed') || '2';
        const speedContainer = document.createElement('div');
        speedContainer.className = 'speed-buttons';
        
        const speeds = [
            { value: '4', label: translations[currentLang].slow },
            { value: '2', label: translations[currentLang].normal },
            { value: '1', label: translations[currentLang].fast }
        ];
        
        speeds.forEach(speed => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `speed-option ${speed.value === speedValue ? 'active' : ''}`;
            button.dataset.value = speed.value;
            button.textContent = speed.label;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.speed-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                localStorage.setItem('animationSpeed', speed.value);
            });
            
            speedContainer.appendChild(button);
        });
        
        speedSelect.parentNode.replaceChild(speedContainer, speedSelect);
    }

    // createSortButtons fonksiyonunu ekleyelim
    function createSortButtons() {
        const sortSelect = document.getElementById('sortOrder');
        const sortValue = localStorage.getItem('sortOrder') || 'desc';
        const sortContainer = document.createElement('div');
        sortContainer.className = 'speed-buttons';  // Aynı stili kullanıyoruz
        
        const sortOptions = [
            { value: 'desc', label: translations[currentLang].descending },
            { value: 'asc', label: translations[currentLang].ascending }
        ];
        
        sortOptions.forEach(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `sort-option ${option.value === sortValue ? 'active' : ''}`;
            button.dataset.value = option.value;
            button.textContent = option.label;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.sort-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                localStorage.setItem('sortOrder', option.value);
                loadHistory();
            });
            
            sortContainer.appendChild(button);
        });
        
        sortSelect.parentNode.replaceChild(sortContainer, sortSelect);
    }

    // createLanguageButtons fonksiyonunu ekleyelim
    function createLanguageButtons() {
        const langSelect = document.getElementById('language');
        const langValue = localStorage.getItem('language') || 'tr';
        const langContainer = document.createElement('div');
        langContainer.className = 'speed-buttons';  // Aynı stili kullanıyoruz
        
        const languages = [
            { value: 'tr', label: '🇹🇷 Türkçe' },
            { value: 'en', label: '🇬🇧 English' }
        ];
        
        languages.forEach(lang => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `lang-option ${lang.value === langValue ? 'active' : ''}`;
            button.dataset.value = lang.value;
            button.textContent = lang.label;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.lang-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                localStorage.setItem('language', lang.value);
                updateLanguage(lang.value);
            });
            
            langContainer.appendChild(button);
        });
        
        langSelect.parentNode.replaceChild(langContainer, langSelect);
    }

    // Sayfa yüklendiğinde çağır
    createSpeedButtons();
    createSortButtons();
    createLanguageButtons();

    // Tek top çekimi için fonksiyonu güncelleyelim
    function animateSingleBall(max) {
        const digits = max.toString().length;
        let randomNumber;
        
        // İlk çekilişte yeni sayı seç
        if (currentBallIndex === 0) {
            do {
                randomNumber = Math.floor(Math.random() * (max - 1 + 1)) + 1;
            } while (usedNumbers.has(randomNumber));

            // Seçilen sayıyı localStorage'a kaydet
            localStorage.setItem('currentNumber', randomNumber.toString());
            
            // Topları yeniden oluştur
            ballsContainer.innerHTML = '';
            for (let i = 0; i < digits; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
        } else {
            // Mevcut sayıyı localStorage'dan al
            randomNumber = parseInt(localStorage.getItem('currentNumber'));
            
            // Önceki topların içeriğini koru
            const result = randomNumber.toString().padStart(digits, '0').split('').map(Number);
            for (let i = 0; i < currentBallIndex; i++) {
                const ball = document.getElementById(`ball${i}`);
                if (ball) {
                    ball.innerHTML = `<div class="number">${result[i]}</div>`;
                }
            }
        }

        const result = randomNumber.toString().padStart(digits, '0').split('').map(Number);

        function animateBall(index) {
            if (index >= digits) {
                // Son topa geldiysek
                if (currentBallIndex === digits) {
                    saveResult(randomNumber);
                    usedNumbers.add(randomNumber);
                    currentBallIndex = 0; // Sıfırla
                    localStorage.removeItem('currentNumber'); // Geçici sayıyı temizle
                    
                    if (isSoundOn) {
                        resultSound.currentTime = 0;
                        resultSound.play();
                    }

                    // Highlight efekti
                    const allBalls = document.querySelectorAll('.ball');
                    allBalls.forEach(ball => {
                        ball.classList.add('highlight-ball-animation');
                        setTimeout(() => {
                            ball.classList.remove('highlight-ball-animation');
                        }, 2000);
                    });
                }
                pickButton.disabled = false;
                return;
            }

            const ball = document.getElementById(`ball${index}`);
            const selectedNumber = result[index];
            const currentSpeed = localStorage.getItem('animationSpeed') || '2';

            // Strip oluştur ve animasyon yap
            let strip = document.createElement('div');
            strip.className = 'number-strip';
            
            for (let j = 0; j < 10; j++) {
                for (let i = 0; i <= 9; i++) {
                    let num = document.createElement('div');
                    num.className = 'number';
                    num.textContent = i;
                    strip.appendChild(num);
                }
            }
            
            let finalNum = document.createElement('div');
            finalNum.className = 'number';
            finalNum.textContent = selectedNumber;
            strip.appendChild(finalNum);

            ball.innerHTML = '';
            ball.appendChild(strip);

            if (isSoundOn) {
                processingSound.currentTime = 0;
                processingSound.play();
            }

            gsap.fromTo(strip, 
                { y: 0 },
                { 
                    y: -(100 * 99 + selectedNumber * 100),
                    duration: parseInt(currentSpeed),
                    ease: "power2.inOut",
                    onComplete: () => {
                        ball.innerHTML = `<div class="number">${selectedNumber}</div>`;
                        currentBallIndex++; // Bir sonraki topa geç
                        pickButton.disabled = false;

                        // Son topun animasyonu bittiyse sonucu kaydet
                        if (currentBallIndex === digits) {
                            saveResult(randomNumber);
                            usedNumbers.add(randomNumber);
                            currentBallIndex = 0;
                            localStorage.removeItem('currentNumber');
                            
                            if (isSoundOn) {
                                resultSound.currentTime = 0;
                                resultSound.play();
                            }

                            // Highlight efekti
                            const allBalls = document.querySelectorAll('.ball');
                            allBalls.forEach(ball => {
                                ball.classList.add('highlight-ball-animation');
                                setTimeout(() => {
                                    ball.classList.remove('highlight-ball-animation');
                                }, 2000);
                            });
                        }
                    }
                }
            );
        }

        pickButton.disabled = true;
        animateBall(currentBallIndex);
    }

    // Draw type değiştiğinde topları güncelle
    drawTypeSelect.addEventListener('change', () => {
        const history = document.querySelector('.history-section').querySelector('li');
        const end = parseInt(endNum.value);
        
        // Draw type'ı localStorage'a kaydet
        localStorage.setItem('drawType', drawTypeSelect.value);
        
        if (!isNaN(end)) {
            const digits = end.toString().length;
            
            // Her zaman sayı kadar top göster
            ballsContainer.innerHTML = '';
            for (let i = 0; i < digits; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
        }
        
        // Çoklu otomatik seçildiğinde input'u göster
        if (drawTypeSelect.value === 'multi-auto') {
            drawCountContainer.style.display = 'block';
            drawCountInput.placeholder = translations[currentLang].drawCount;
        } else {
            drawCountContainer.style.display = 'none';
        }
        
        if (!history) {
            pickButton.textContent = translations[currentLang].startDraw;
        } else {
            pickButton.textContent = drawTypeSelect.value === 'single-ball' ? 
                translations[currentLang].pickNewBall : 
                translations[currentLang].pickNewNumber;
        }
    });

    // Sayfa yüklendiğinde draw type'ı yükle
    const savedDrawType = localStorage.getItem('drawType');
    if (savedDrawType) {
        drawTypeSelect.value = savedDrawType;
        
        // Çoklu otomatik seçiliyse input'u göster
        if (savedDrawType === 'multi-auto') {
            drawCountContainer.style.display = 'block';
            drawCountInput.placeholder = translations[currentLang].drawCount;
        }
        
        // Eğer çekiliş devam ediyorsa buton metnini güncelle
        const history = document.querySelector('.history-section').querySelector('li');
        if (history) {
            pickButton.textContent = savedDrawType === 'single-ball' ? 
                translations[currentLang].pickNewBall : 
                translations[currentLang].pickNewNumber;
        }
    }

    // Otomatik çekim fonksiyonları
    function startAutoDraw() {
        const drawCount = parseInt(drawCountInput.value);
        if (isNaN(drawCount) || drawCount < 1 || drawCount > 100) {
            alert(translations[currentLang].invalidDrawCount);
            return;
        }

        let currentDraw = 0;
        isAutoDrawing = true;
        pickButton.textContent = translations[currentLang].stopDraw;
        drawCountInput.disabled = true;

        function draw() {
            if (currentDraw < drawCount && isAutoDrawing) {
                const end = parseInt(endNum.value);
                const start = parseInt(startNum.value);
                
                // Kullanılabilir sayı kalmadıysa durdur
                if (usedNumbers.size >= (end - start + 1)) {
                    stopAutoDraw();
                    endDraw();
                    return;
                }

                // Yeni çekim öncesi topları temizle
                const digits = end.toString().length;
                ballsContainer.innerHTML = '';
                for (let i = 0; i < digits; i++) {
                    const ball = document.createElement('div');
                    ball.className = 'ball';
                    ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                    ballsContainer.appendChild(ball);
                }

                // Animasyon tamamlandığında bir sonraki çekimi başlat
                animateBalls(end, () => {
                    currentDraw++;
                    if (currentDraw === drawCount) {
                        setTimeout(() => {
                            stopAutoDraw();
                        }, 1000); // Son çekimden 1 saniye sonra durdur
                    } else if (isAutoDrawing) {
                        setTimeout(draw, 1000); // Bir sonraki çekimi 1 saniye sonra başlat
                    }
                });
            }
        }

        // İlk çekimi başlat
        draw();
    }

    function stopAutoDraw() {
        isAutoDrawing = false;
        clearInterval(autoDrawInterval);
        pickButton.textContent = translations[currentLang].startDraw;
        drawCountInput.disabled = false;
    }

    // animateBalls fonksiyonuna callback parametresi ekleyelim
    function animateBalls(max, callback) {
        const start = parseInt(startNum.value);
        let availableNumbers = [];
        for (let i = start; i <= max; i++) {
            if (!usedNumbers.has(i)) {
                availableNumbers.push(i);
            }
        }

        if (availableNumbers.length === 0) {
            pickButton.disabled = true;
            drawError.innerHTML = translations[currentLang].drawEnded;
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers[randomIndex];
        usedNumbers.add(randomNumber);

        const digits = max.toString().length;
        const result = randomNumber.toString().padStart(digits, '0').split('').map(Number);
        let currentIndex = 0;

        function animateBall(index) {
            if (index >= digits) {
                saveResult(randomNumber);
                pickButton.disabled = false;
                
                if (isSoundOn) {
                    resultSound.currentTime = 0;
                    resultSound.play();
                }

                const allBalls = document.querySelectorAll('.ball');
                allBalls.forEach(ball => {
                    ball.classList.add('highlight-ball-animation');
                    setTimeout(() => {
                        ball.classList.remove('highlight-ball-animation');
                    }, 2000);
                });

                // Animasyon tamamlandığında callback'i çağır
                if (callback) callback();
                return;
            }

            const ball = document.getElementById(`ball${index}`);
            const selectedNumber = result[index];
            const currentSpeed = localStorage.getItem('animationSpeed') || '2';

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
                    duration: parseInt(currentSpeed),
                    ease: "power2.inOut",
                    onComplete: () => {
                        ball.innerHTML = `<div class="number">${selectedNumber}</div>`;
                        animateBall(index + 1);
                    }
                }
            );
        }

        pickButton.disabled = true;
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

    document.getElementById('clearNames').addEventListener('click', function() {
        document.getElementById('namesTextarea').value = '';
        document.getElementById('namesPopup').style.display = 'none';  // Popup'ı kapat
    });

    // Mobil görünümde sıralamayı kontrol et
    function checkMobileSort() {
        if (window.innerWidth <= 768) {
            localStorage.setItem('sortOrder', 'asc');
            loadHistory();
        }
    }

    // Sayfa yüklendiğinde kontrol et
    checkMobileSort();

    // Pencere boyutu değiştiğinde kontrol et
    window.addEventListener('resize', checkMobileSort);

    // Title input container'ını oluştur ve mevcut input'u içine al
    const titleInputContainer = document.createElement('div');
    titleInputContainer.className = 'title-input-container';
    const titleInputParent = titleInput.parentNode;

    // Input'u yeni container'a taşı
    titleInput.remove();
    titleInputContainer.appendChild(titleInput);

    // Çarpı ikonunu oluştur
    const clearTitleBtn = document.createElement('span');
    clearTitleBtn.className = 'clear-title-btn';
    clearTitleBtn.innerHTML = '&times;';
    titleInputContainer.appendChild(clearTitleBtn);

    // Container'ı orijinal yere yerleştir
    titleInputParent.appendChild(titleInputContainer);

    // Çarpı ikonuna tıklama olayını ekle
    clearTitleBtn.addEventListener('click', () => {
        titleInput.value = ' ';  // Bir boşluk karakteri
        mainTitle.textContent = ' ';  // Bir boşluk karakteri
        localStorage.setItem('drawTitle', ' ');  // Bir boşluk karakteri
    });
}); 