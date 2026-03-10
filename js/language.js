// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Determine the default language (English, unless previously saved as PT)
    let currentLanguage = localStorage.getItem('portfolioLanguage') || 'en';

    // Function to update the UI texts based on the selected language
    function updateTexts(lang) {
        // Ensure translations are available
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error('Translations not loaded for language:', lang);
            return;
        }

        const dict = translations[lang];

        // Find all elements with the 'data-i18n' attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // CASE 1: For inputs and textareas, we ONLY change the placeholder
                // This prevents overwriting the actual typed value (el.value)
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                }
                // CASE 2: For labels, we use textContent to be safe
                // In Bootstrap floating labels, the label is a separate element
                else if (el.tagName === 'LABEL') {
                    el.textContent = dict[key];
                }
                // CASE 3: For everything else (h1, p, span, div, a)
                else {
                    // Update innerHTML to allow tags like <br> or &middot;
                    el.innerHTML = dict[key];
                }
            }
        });

        // Update language selector UI if exists
        updateLanguageSelectorUI(lang);
    }

    // Function to update the appearance of the language buttons
    function updateLanguageSelectorUI(lang) {
        const btnPT = document.getElementById('btn-lang-pt');
        const btnEN = document.getElementById('btn-lang-en');

        if (btnPT && btnEN) {
            if (lang === 'pt') {
                btnPT.classList.add('fw-bolder', 'text-primary');
                btnEN.classList.remove('fw-bolder', 'text-primary');
            } else {
                btnEN.classList.add('fw-bolder', 'text-primary');
                btnPT.classList.remove('fw-bolder', 'text-primary');
            }
        }
    }

    // Function to change the language and save to localStorage
    window.setLanguage = function (lang) {
        if (lang === 'pt' || lang === 'en') {
            currentLanguage = lang;
            localStorage.setItem('portfolioLanguage', lang);
            updateTexts(lang);
        }
    };

    // Initialize texts on load
    updateTexts(currentLanguage);
});