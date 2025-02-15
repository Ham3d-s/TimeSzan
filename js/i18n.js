const translations = {
    'fa': {
        languageBtn: 'English',
        title: 'مبدل زمان',
        generateSection: 'ایجاد Timestamp',
        detailsSection: 'نمایش جزئیات Timestamp',
        selectDateFormat: 'انتخاب قالب تاریخ',
        persian: 'شمسی',
        gregorian: 'میلادی',
        generateBtn: 'ایجاد Timestamp',
        enterTimestamp: 'وارد کردن Timestamp',
        showDetails: 'نمایش جزئیات',
        copied: 'کپی شد!',
        copyError: 'خطا در کپی کردن.',
        invalidTimestamp: 'Timestamp نامعتبر است.',
        clipboardError: 'دسترسی به کلیپ‌بورد امکان‌پذیر نیست',
        infoBtn: 'درباره این برنامه',
        infoContent: `
            <h3>درباره مبدل زمان</h3>
            <p>مبدل زمان یک ابزار قدرتمند و کاربرپسند برای مدیریت و تبدیل Timestamp است. این برنامه به شما امکان می‌دهد تا به راحتی بین Timestamp و فرمت‌های مختلف تاریخ تبدیل انجام دهید.</p>

            <h4>ویژگی‌های اصلی:</h4>
            <ul>
                <li>تبدیل خودکار زمان فعلی به Timestamp</li>
                <li>نمایش تاریخ و زمان به دو تقویم شمسی و میلادی</li>
                <li>امکان تبدیل Timestamp به تاریخ و زمان قابل خواندن</li>
                <li>رابط کاربری ساده و روان</li>
                <li>پشتیبانی از زبان‌های فارسی و انگلیسی</li>
                <li>کپی و پیست سریع Timestamp</li>
                <li>نمایش زنده زمان و تاریخ</li>
            </ul>

            <h4>موارد استفاده:</h4>
            <ul>
                <li>برنامه‌نویسان و توسعه‌دهندگان وب</li>
                <li>متخصصان پایگاه داده</li>
                <li>مدیران سیستم</li>
                <li>کاربران عمومی نیازمند تبدیل تاریخ</li>
            </ul>

            <h4>راهنمای استفاده:</h4>
            <ol>
                <li>برای ایجاد Timestamp: روی دکمه "ایجاد Timestamp" کلیک کنید</li>
                <li>برای تبدیل Timestamp: عدد را در فیلد ورودی وارد کرده و "نمایش جزئیات" را بزنید</li>
                <li>برای تغییر فرمت تاریخ: از منوی کشویی "انتخاب قالب تاریخ" استفاده کنید</li>
            </ol>`,
    },
    'en': {
        languageBtn: 'فارسی',
        title: 'Time Converter',
        generateSection: 'Generate Timestamp',
        detailsSection: 'Show Timestamp Details',
        selectDateFormat: 'Select Date Format',
        persian: 'Persian',
        gregorian: 'Gregorian',
        generateBtn: 'Generate Timestamp',
        enterTimestamp: 'Enter Timestamp',
        showDetails: 'Show Details',
        copied: 'Copied!',
        copyError: 'Error copying.',
        invalidTimestamp: 'Invalid Timestamp.',
        clipboardError: 'Cannot access clipboard',
        infoBtn: 'About This App',
        infoContent: `
            <h3>About Time Converter</h3>
            <p>Time Converter is a powerful and user-friendly tool for managing and converting timestamps. This application allows you to easily convert between timestamps and various date formats.</p>

            <h4>Key Features:</h4>
            <ul>
                <li>Automatic conversion of current time to timestamp</li>
                <li>Date and time display in both Persian and Gregorian calendars</li>
                <li>Convert timestamps to human-readable date and time</li>
                <li>Clean and intuitive user interface</li>
                <li>Bilingual support (English and Persian)</li>
                <li>Quick timestamp copy and paste</li>
                <li>Live date and time display</li>
            </ul>

            <h4>Use Cases:</h4>
            <ul>
                <li>Web developers and programmers</li>
                <li>Database specialists</li>
                <li>System administrators</li>
                <li>General users needing date conversion</li>
            </ul>

            <h4>How to Use:</h4>
            <ol>
                <li>To generate a timestamp: Click the "Generate Timestamp" button</li>
                <li>To convert a timestamp: Enter the number in the input field and click "Show Details"</li>
                <li>To change date format: Use the "Select Date Format" dropdown menu</li>
            </ol>`,
    }
};

let currentLang = 'fa';

function updateLanguage() {
    document.documentElement.lang = currentLang;
    document.title = translations[currentLang].title;

    // Update all text content
    document.querySelector('legend').textContent = translations[currentLang].generateSection;
    document.querySelectorAll('legend')[1].textContent = translations[currentLang].detailsSection;
    document.querySelector('#generateDateFormat').previousElementSibling.textContent = translations[currentLang].selectDateFormat;
    document.querySelector('#inputDateFormat').previousElementSibling.textContent = translations[currentLang].selectDateFormat;
    document.querySelector('#generateTimestamp').textContent = translations[currentLang].generateBtn;
    document.querySelector('#showDetails').textContent = translations[currentLang].showDetails;
    document.querySelector('#languageToggle').textContent = translations[currentLang].languageBtn;
    document.querySelector('#infoToggle').textContent = translations[currentLang].infoBtn;
    document.querySelector('#infoContent').innerHTML = translations[currentLang].infoContent;

    // Update select options
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.options[0].text = translations[currentLang].persian;
        select.options[1].text = translations[currentLang].gregorian;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(); // Initialize language on page load
    document.getElementById('languageToggle').addEventListener('click', () => {
        currentLang = currentLang === 'fa' ? 'en' : 'fa';
        updateLanguage();
    });

    document.getElementById('infoToggle').addEventListener('click', () => {
        const content = document.getElementById('infoContent');
        content.classList.toggle('active');
    });
});