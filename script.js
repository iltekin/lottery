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
        drawEnded: "Çekiliş bitti",
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
        resultListLabel: "İsim Listesi (opsiyonel)",
        resultListPlaceholder: "İsimleri her satıra bir tane gelecek şekilde yapıştırın...",
        resetSettings: "Tüm Ayarları Sıfırla",
        confirmReset: "Tüm ayarları sıfırlamak istediğinizden emin misiniz?",
        applySettings: "Uygula",
        sortOrder: "Sıralama",
        ascending: "Yeniden Eskiye",
        descending: "Eskiden Yeniye"
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
        drawEnded: "Draw ended",
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
        resultListLabel: "Name List (optional)",
        resultListPlaceholder: "Paste names, one per line...",
        resetSettings: "Reset All Settings",
        confirmReset: "Are you sure you want to reset all settings?",
        applySettings: "Apply",
        sortOrder: "Sort Order",
        ascending: "Newest First",
        descending: "Oldest First"
    }
};

document.addEventListener('DOMContentLoaded', () => {
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
    const resultList = document.getElementById('resultList');
    let isSoundOn = localStorage.getItem('soundEnabled') !== 'false';
    let usedNumbers = new Set(); // Çıkan sayıları takip etmek için
    const languageSelect = document.getElementById('language');
    let currentLang = localStorage.getItem('language') || 'tr';
    const mainTitle = document.getElementById('mainTitle');
    const titleInput = document.getElementById('titleInput');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const applySettingsBtn = document.getElementById('applySettings');
    const sortOrder = document.getElementById('sortOrder');

    loadHistory();
    loadSavedNumbers();

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

        document.querySelector('label[for="resultList"]').textContent = translations[lang].resultListLabel;
        resultList.placeholder = translations[lang].resultListPlaceholder;

        resetSettingsBtn.textContent = translations[lang].resetSettings;
        applySettingsBtn.textContent = translations[lang].applySettings;

        document.querySelector('label[for="sortOrder"]').textContent = translations[lang].sortOrder;
        sortOrder.options[0].textContent = translations[lang].ascending;
        sortOrder.options[1].textContent = translations[lang].descending;
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
        
        if (start > end && end) {
            alert(translations[currentLang].startGreaterThanEnd);
            startNum.value = '';
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
        
        // Başlangıç ve bitiş sayısı kontrolü
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
        resultList.disabled = true;
        
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
            const message = document.createElement('div');
            message.textContent = 'Çekiliş bitti';
            message.style.marginTop = '10px';
            message.style.color = '#666';
            message.style.fontSize = '14px';
            pickButton.parentNode.insertBefore(message, pickButton.nextSibling);
            
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
        const resultItems = JSON.parse(localStorage.getItem('resultList') || '[]');
        const startNumber = parseInt(startNum.value) || 1;
        const currentSort = localStorage.getItem('sortOrder') || 'desc';
        
        // Sıralama için geçici dizi oluştur
        let sortedHistory = [...history];
        if (currentSort === 'asc') {
            sortedHistory.reverse();  // Diziyi ters çevir
        }
        
        historyList.innerHTML = sortedHistory
            .map((num, index) => {
                const listIndex = num - startNumber;
                const listItem = resultItems[listIndex];
                const nameSpan = listItem ? `<span class="result-name">${listItem}</span>` : '';
                const numberSpan = `<span class="result-number">${num}</span>`;
                
                // Sıra numarasını doğru hesapla
                const displayIndex = currentSort === 'asc' ? 
                    history.length - index : 
                    index + 1;

                // İsim ve numara aynı kalmalı, sadece sıra numarası değişmeli
                return `<li>
                    <div class="left-content">
                        <span class="index-number">#${displayIndex}</span>
                        ${nameSpan}
                    </div>
                    ${numberSpan}
                </li>`;
            })
            .join('');
        
        clearHistoryBtn.disabled = history.length === 0;
    }

    function loadSavedNumbers() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        if (history.length > 0) {
            // Kullanılmış sayıları ykle
            const savedUsedNumbers = JSON.parse(localStorage.getItem('usedNumbers') || '[]');
            usedNumbers = new Set(savedUsedNumbers);

            const savedNumbers = JSON.parse(localStorage.getItem('lotteryRange') || '{}');
            if (savedNumbers.start !== undefined && savedNumbers.end !== undefined) {
                startNum.value = savedNumbers.start;
                endNum.value = savedNumbers.end;
                startNum.disabled = true;
                endNum.disabled = true;
                resultList.disabled = true;
                
                // Çekiliş başladysa buton yazısını değiştir
                pickButton.textContent = translations[currentLang].pickNewNumber;

                // Maksimum sayın basamak sayısına göre top oluştur
                const digitCount = savedNumbers.end.toString().length;
                ballsContainer.innerHTML = '';
                for (let i = 0; i < digitCount; i++) {
                    const ball = document.createElement('div');
                    ball.className = 'ball';
                    ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                    ballsContainer.appendChild(ball);
                }
            }
        } else {
            // Geçmiş yoksa başlangıç sayısını 1 yap
            startNum.value = '1';
            endNum.value = '';
            // Çekiliş başlamadıysa buton yazısını değiştir
            pickButton.textContent = translations[currentLang].startDraw;
            
            // Geçmiş yoksa 3 top göster
            ballsContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
            resultList.disabled = false;

            // Son sayı inputuna odaklan
            endNum.focus();
        }
    }

    clearHistoryBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmEnd)) {
            localStorage.removeItem('lotteryHistory');
            localStorage.removeItem('lotteryRange');
            usedNumbers.clear();
            loadHistory();
            
            // Input'ları aktif et
            startNum.disabled = false;
            endNum.disabled = false;
            resultList.disabled = false;

            // İsim listesine göre sayıları ayarla
            const items = resultList.value.split('\n').filter(item => item.trim());
            if (items.length > 0) {
                startNum.value = '1';
                endNum.value = items.length.toString();
            } else {
                startNum.value = '1';
                endNum.value = '';
            }
            
            // Buton yazısını değiştir
            pickButton.textContent = translations[currentLang].startDraw;
            
            // Topları temizle ve 3 boş top ekle
            ballsContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
                ballsContainer.appendChild(ball);
            }
            
            // Sayı seç butonunu aktif et
            pickButton.disabled = false;
            
            // Çekiliş bitti mesajını kaldır
            const message = pickButton.nextSibling;
            if (message && message.textContent === 'Çekiliş bitti') {
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

    // Kayıtlı hızı yükle
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

    // Sayfa yüklendiğinde başlığı yükle
    loadTitle();

    // Liste değiştiğinde kaydet
    resultList.addEventListener('change', () => {
        const items = resultList.value.split('\n').filter(item => item.trim());
        localStorage.setItem('resultList', JSON.stringify(items));

        // Çekiliş başlamamışsa (inputlar disabled değilse)
        if (!startNum.disabled && !endNum.disabled) {
            // İlk sayıyı 1 yap
            startNum.value = '1';
            // Son sayıyı liste uzunluğuna eşitle
            endNum.value = items.length.toString();
        }
    });

    // Kaydedilmiş listeyi yükle
    function loadResultList() {
        const savedList = JSON.parse(localStorage.getItem('resultList') || '[]');
        resultList.value = savedList.join('\n');
    }

    // Sayfa yüklendiğinde listeyi de yükle
    loadResultList();

    // Ayarları sıfırlama fonksiyonu
    resetSettingsBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].confirmReset)) {
            // Hızı normale getir
            animationSpeed.value = '2';
            localStorage.setItem('animationSpeed', '2');

            // Title'ı default'a getir
            localStorage.removeItem('drawTitle');
            mainTitle.textContent = translations[currentLang].defaultTitle;
            titleInput.value = translations[currentLang].defaultTitle;

            // İsim listesini temizle
            localStorage.removeItem('resultList');
            resultList.value = '';

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
}); 