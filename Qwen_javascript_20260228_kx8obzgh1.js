// Sidebar Toggle
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

// Mobile Sidebar Toggle
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
const app = document.getElementById('app');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get section name
        const section = link.getAttribute('data-section');
        
        // Load content
        loadContent(section);
        
        // Close mobile sidebar if open
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Load Content Function
async function loadContent(section) {
    console.log('Loading:', section);
    try {
        // Fetch from content folder
        const response = await fetch('/content/' + section + '.html');
        
        if (!response.ok) {
            throw new Error('File not found');
        }
        
        const html = await response.text();
        app.innerHTML = html;
        
        // Show notification
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

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Load default content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');
});