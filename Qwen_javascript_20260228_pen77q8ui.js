// ===== LANDING PAGE FUNCTIONS =====
function enterSite() {
    const landingPage = document.getElementById('landingPage');
    const mainSite = document.getElementById('mainSite');
    
    // Hide landing page
    landingPage.classList.add('hide');
    
    // Show main site
    setTimeout(() => {
        landingPage.style.display = 'none';
        mainSite.style.display = 'flex';
        
        // Trigger reflow
        void mainSite.offsetWidth;
        
        // Show with fade in
        mainSite.classList.add('show');
        
        // Load home content
        loadContent('home');
    }, 800);
}

// ===== SIDEBAR FUNCTIONS =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const xIcon = toggleBtn.querySelector('.x-icon');
    const menuIcon = toggleBtn.querySelector('.menu-icon');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        xIcon.style.display = 'none';
        menuIcon.style.display = 'block';
    } else {
        xIcon.style.display = 'block';
        menuIcon.style.display = 'none';
    }
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// ===== NAVIGATION FUNCTIONS =====
const navLinks = document.querySelectorAll('.nav-link');
const app = document.getElementById('app');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const section = link.getAttribute('data-section');
        loadContent(section);
        
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// ===== CONTENT LOADING FUNCTION =====
async function loadContent(section) {
    console.log('Loading:', section);
    try {
        const response = await fetch('/content/' + section + '.html');
        
        if (!response.ok) {
            throw new Error('File not found');
        }
        
        const html = await response.text();
        app.innerHTML = html;
        showNotification(`${section} loaded!`);
    } catch (error) {
        console.error(error);
        app.innerHTML = `
            <div class="content-section active">
                <h1 class="main-title">Error</h1>
                <p class="subtitle">Could not load ${section}</p>
            </div>
        `;
    }
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== ALLOW SPACEBAR TO ENTER SITE =====
document.addEventListener('keydown', (e) => {
    const landingPage = document.getElementById('landingPage');
    if (e.code === 'Space' && !landingPage.classList.contains('hide')) {
        e.preventDefault();
        enterSite();
    }
});