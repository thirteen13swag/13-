// main.js
import { GlitchSystem } from './glitchEngine.js';
import { AudioAnalyzer } from './audio.js';
import { SecretRouter } from './secrets.js';

class Core {
    constructor() {
        this.glitch = new GlitchSystem();
        this.audio = new AudioAnalyzer();
        this.router = new SecretRouter();
        
        this.initInteractions();
        this.startGlitchProcess();
    }

    initInteractions() {
        // Секретные комбинации
        const konamiCode = [38,38,40,40,37,39,37,39,66,65];
        let inputBuffer = [];
        
        document.addEventListener('keydown', (e) => {
            inputBuffer.push(e.keyCode);
            if (inputBuffer.toString().indexOf(konamiCode) >= 0) {
                this.router.unlock('konami');
            }
        });

        // Тройной клик для активации
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 3) {
                this.glitch.activateHardcoreMode();
                clickCount = 0;
            }
        });

        // Перетаскивание спектрограммы
        let isDragging = false;
        document.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.audio.modifyFrequency(e.clientX / window.innerWidth);
            }
        });
    }

    startGlitchProcess() {
        setInterval(() => {
            document.querySelectorAll('*').forEach(el => {
                if (Math.random() > 0.9) {
                    el.classList.add('glitcher');
                    setTimeout(() => el.classList.remove('glitcher'), 50);
                }
            });
        }, 1000);
    }
}

window.addEventListener('load', () => new Core());
