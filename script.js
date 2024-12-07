document.addEventListener('DOMContentLoaded', () => {
    const startNum = document.getElementById('startNum');
    const endNum = document.getElementById('endNum');
    const pickButton = document.getElementById('pickButton');
    const ballsContainer = document.querySelector('.balls-container');
    const historyList = document.getElementById('historyList');

    loadHistory();

    pickButton.addEventListener('click', () => {
        const max = parseInt(endNum.value);
        if (!max || max <= 0) {
            alert('Lütfen geçerli bir sayı giriniz!');
            return;
        }

        // Mevcut topları temizle
        ballsContainer.innerHTML = '';
        
        // Sayı uzunluğuna göre top oluştur
        const digitCount = max.toString().length;
        for (let i = 0; i < digitCount; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerHTML = `<div class="number-strip" id="ball${i}"></div>`;
            ballsContainer.appendChild(ball);
        }

        pickButton.disabled = true;
        animateBalls(max);
    });

    function animateBalls(max) {
        // Önce tek bir random sayı seç
        const randomNumber = Math.floor(Math.random() * (max + 1));
        const digits = max.toString().length;
        
        // Seçilen sayıyı basamaklarına ayır
        const result = randomNumber.toString().padStart(digits, '0').split('').map(Number);
        let currentIndex = 0;

        function animateBall(index) {
            if (index >= digits) {
                saveResult(randomNumber);
                pickButton.disabled = false;
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

            // GSAP ile animasyon
            gsap.fromTo(strip, 
                { y: 0 },
                { 
                    y: -(100 * 99 + selectedNumber * 100),
                    duration: 2,
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
        history.unshift(number);
        localStorage.setItem('lotteryHistory', JSON.stringify(history));
        loadHistory();
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        historyList.innerHTML = history
            .map(num => `<li>Çekiliş Sonucu: ${num}</li>`)
            .join('');
    }
}); 