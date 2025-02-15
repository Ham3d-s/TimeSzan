document.addEventListener('DOMContentLoaded', () => {
    const liveDateTimeElement = document.getElementById('liveDateTime');
    const generateDateFormatSelect = document.getElementById('generateDateFormat');
    const generateButton = document.getElementById('generateTimestamp');
    const timestampInput = document.getElementById('timestamp');
    const copyButton = document.getElementById('copyButton');
    const copyIcon = document.getElementById('copyIcon');
    const copyFeedback = document.getElementById('copyFeedback');
    const timestampDetails = document.getElementById('timestampDetails');

    const inputDateFormatSelect = document.getElementById('inputDateFormat');
    const inputTimestampInput = document.getElementById('inputTimestamp');
    const showDetailsButton = document.getElementById('showDetails');
    const inputTimestampDetails = document.getElementById('inputTimestampDetails');

    const pasteButton = document.getElementById('pasteButton');
    const pasteIcon = document.getElementById('pasteIcon');

    function updateLiveDateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Tehran',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        liveDateTimeElement.textContent = new Intl.DateTimeFormat(generateDateFormatSelect.value, options).format(now);
    }

    function generateTimestamp() {
        const now = new Date();
        const timestamp = now.getTime();
        timestampInput.value = timestamp;
        displayTimestampDetails(now, timestamp, generateDateFormatSelect.value);
    }

    function displayTimestampDetails(date, timestamp, locale) {
        const options = {
            timeZone: 'Asia/Tehran',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);
        timestampDetails.textContent = `Timestamp: ${timestamp}\n${formattedDate}`;
    }

    function showTimestampDetails() {
        const inputTimestampValue = inputTimestampInput.value.trim();
        const timestamp = parseInt(inputTimestampValue, 10);

        const messages = {
            'fa-IR': {
                invalidTimestamp: "Timestamp نامعتبر است."
            },
            'en-US': {
                invalidTimestamp: "Invalid Timestamp."
            }
        };

        if (isNaN(timestamp)) {
            inputTimestampDetails.textContent = messages[inputDateFormatSelect.value].invalidTimestamp;
            inputTimestampDetails.classList.add('error');
            return;
        }

        const date = new Date(timestamp);
        displayInputTimestampDetails(date, inputDateFormatSelect.value);
    }

    function displayInputTimestampDetails(date, locale) {
        const options = {
            timeZone: 'Asia/Tehran',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        const formattedDate = new Intl.DateTimeFormat(locale, options).format(date);
        inputTimestampDetails.textContent = `Timestamp: ${date.getTime()}\n${formattedDate}`;
        inputTimestampDetails.classList.remove('error');
    }

    function copyToClipboard() {
        const timestampValue = timestampInput.value;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(timestampValue)
                .then(() => {
                    copyIcon.classList.add('copy-success');
                    copyFeedback.textContent = translations[currentLang].copied;
                    copyFeedback.classList.add('success');
                    copyFeedback.classList.remove('error');
                    setTimeout(() => {
                        copyIcon.classList.remove('copy-success');
                        copyFeedback.textContent = "";
                        copyFeedback.classList.remove('success');
                    }, 1500);
                })
                .catch(err => {
                    copyFeedback.textContent = translations[currentLang].copyError;
                    copyFeedback.classList.add('error');
                    copyFeedback.classList.remove('success');
                });
        } else {
            // Fallback for browsers that do not support Clipboard API
            timestampInput.select();
            document.execCommand('copy');
            copyIcon.classList.add('copy-success');
            copyFeedback.textContent = translations[currentLang].copied;
            copyFeedback.classList.add('success');
            copyFeedback.classList.remove('error');
            setTimeout(() => {
                copyIcon.classList.remove('copy-success');
                copyFeedback.textContent = "";
                copyFeedback.classList.remove('success');
            }, 1500);
        }
    }

    async function pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            const timestamp = parseInt(text.trim(), 10);

            if (!isNaN(timestamp)) {
                inputTimestampInput.value = timestamp;
                const date = new Date(timestamp);
                displayInputTimestampDetails(date, inputDateFormatSelect.value);
            } else {
                console.error('Invalid timestamp in clipboard');
                alert(translations[currentLang].invalidTimestamp); // Use translated message
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            alert(translations[currentLang].clipboardError); // Use translated message
        }
    }

    // Event Listeners
    setInterval(updateLiveDateTime, 1000);

    generateButton.addEventListener('click', generateTimestamp);
    showDetailsButton.addEventListener('click', showTimestampDetails);

    generateDateFormatSelect.addEventListener('change', () => {
        updateLiveDateTime();
        if (timestampInput.value) {
            const timestamp = parseInt(timestampInput.value, 10);
            const date = new Date(timestamp);
            displayTimestampDetails(date, timestamp, generateDateFormatSelect.value);
        }
    });

    copyButton.addEventListener('click', copyToClipboard);
    pasteButton.addEventListener('click', pasteFromClipboard);

    generateDateFormatSelect.addEventListener('change', updateLiveDateTime);

    pasteButton.addEventListener('click', pasteFromClipboard);
});