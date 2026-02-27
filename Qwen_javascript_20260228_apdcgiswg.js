// ===== LANDING PAGE FUNCTIONS =====
function enterSite() {
    const landingPage = document.getElementById('landingPage');
    const mainSite = document.getElementById('mainSite');
    
    landingPage.classList.add('hide');
    
    setTimeout(() => {
        landingPage.style.display = 'none';
        mainSite.style.display = 'flex';
        void mainSite.offsetWidth;
        mainSite.classList.add('show');
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

// ===== CHATBOT FUNCTIONS =====
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.classList.toggle('show');
    
    if (chatbotWindow.classList.contains('show')) {
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 300);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// AI Knowledge Base for Digital Citizenship
const aiKnowledge = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        responses: [
            "👋 Hello! I'm your Digital Citizenship Assistant. How can I help you today?",
            "Hi there! Ready to learn about safe and responsible digital behavior?",
            "Hey! Ask me anything about online safety, privacy, or digital ethics!"
        ]
    },
    privacy: {
        keywords: ['privacy', 'personal information', 'data', 'protect', 'secure'],
        responses: [
            "🔒 To protect your privacy online: 1) Use strong passwords, 2) Enable two-factor authentication, 3) Adjust privacy settings on social media, 4) Be cautious about sharing personal info, 5) Use HTTPS websites.",
            "Privacy is essential! Always review app permissions, use a password manager, and think before sharing personal information online."
        ]
    },
    password: {
        keywords: ['password', 'login', 'account', 'security'],
        responses: [
            "🔐 Create strong passwords with: 12+ characters, mix of uppercase/lowercase/numbers/symbols, avoid common words, use a password manager, never reuse passwords!",
            "A strong password is your first line of defense. Consider using a passphrase like 'CorrectHorseBatteryStaple' or a password manager."
        ]
    },
    cyberbullying: {
        keywords: ['bully', 'cyberbullying', 'harassment', 'mean', 'hurtful'],
        responses: [
            "💙 If you experience cyberbullying: 1) Don't respond, 2) Save evidence, 3) Block the person, 4) Report to platform, 5) Tell a trusted adult. You're not alone!",
            "Cyberbullying is never okay. Reach out to trusted friends, family, or counselors. Many platforms have reporting tools - use them!"
        ]
    },
    fakenews: {
        keywords: ['fake news', 'misinformation', 'false', 'verify', 'fact check'],
        responses: [
            "🔍 To identify fake news: 1) Check source credibility, 2) Look for multiple sources, 3) Check the date, 4) Look for evidence, 5) Use fact-checking sites like Snopes or FactCheck.org",
            "Always verify before sharing! Check if reputable news sources are reporting the same story, and be wary of sensational headlines."
        ]
    },
    footprint: {
        keywords: ['digital footprint', 'trail', 'history', 'permanent'],
        responses: [
            "👣 Your digital footprint is everything you leave online - posts, comments, searches, purchases. It can be permanent, so think before you post!",
            "Remember: Once something is online, it can be hard to remove completely. Build a positive digital footprint by sharing responsibly."
        ]
    },
    socialmedia: {
        keywords: ['social media', 'facebook', 'instagram', 'tiktok', 'twitter'],
        responses: [
            "📱 For safe social media use: 1) Review privacy settings regularly, 2) Think before posting, 3) Don't share location in real-time, 4) Be mindful of screen time, 5) Report inappropriate content.",
            "Social media is great for connection, but use it mindfully. Take breaks, curate your feed positively, and remember that not everything online is real."
        ]
    },
    screenshot: {
        keywords: ['screenshot', 'photo', 'image', 'picture'],
        responses: [
            "📸 Always ask permission before sharing screenshots or photos of others. Respect privacy and consider how the person would feel if the image was shared publicly.",
            "Remember: Screenshots can be shared without your knowledge. Be careful what you send in private messages!"
        ]
    },
    copyright: {
        keywords: ['copyright', 'plagiarism', 'credit', 'ownership', 'intellectual property'],
        responses: [
            "⚖️ Respect copyright by: 1) Giving credit to creators, 2) Using licensed or free-to-use content, 3) Understanding fair use, 4) Not copying others' work without permission.",
            "Intellectual property matters! Always cite sources, use Creative Commons content when possible, and respect creators' rights."
        ]
    },
    screentime: {
        keywords: ['screen time', 'addiction', 'balance', 'healthy', 'break'],
        responses: [
            "⏰ For healthy screen time: 1) Set daily limits, 2) Take regular breaks (20-20-20 rule), 3) Have screen-free zones/times, 4) Prioritize sleep, 5) Engage in offline activities.",
            "Digital wellbeing is important! Try app timers, notification management, and regular digital detoxes to maintain balance."
        ]
    },
    phishing: {
        keywords: ['phishing', 'scam', 'fraud', 'suspicious', 'link'],
        responses: [
            "🎣 Avoid phishing by: 1) Never click suspicious links, 2) Check sender email addresses, 3) Look for spelling errors, 4) Don't share passwords via email, 5) Verify requests through official channels.",
            "If something seems too good to be true or creates urgency, it's likely a scam. When in doubt, contact the company directly through official channels."
        ]
    },
    wifi: {
        keywords: ['wifi', 'public', 'network', 'connection', 'internet'],
        responses: [
            "📶 On public WiFi: 1) Use a VPN, 2) Avoid sensitive transactions, 3) Ensure websites use HTTPS, 4) Turn off auto-connect, 5) Use mobile data for important tasks.",
            "Public WiFi can be risky. Hackers can intercept data on unsecured networks. A VPN encrypts your connection for added safety."
        ]
    },
    thanks: {
        keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
        responses: [
            "😊 You're welcome! I'm here whenever you have questions about digital citizenship. Stay safe online!",
            "Happy to help! Remember, being a good digital citizen makes the internet better for everyone. 🌐"
        ]
    },
    goodbye: {
        keywords: ['bye', 'goodbye', 'see you', 'later', 'exit'],
        responses: [
            "👋 Goodbye! Stay safe and responsible online. Come back anytime you have questions!",
            "Take care! Remember to be kind and respectful in all your digital interactions. See you soon!"
        ]
    },
    default: {
        responses: [
            "🤔 That's a great question! While I specialize in digital citizenship topics like online safety, privacy, and digital ethics, I'd recommend checking our Learn section for more detailed information.",
            "I'm here to help with digital citizenship questions! Try asking about privacy, passwords, cyberbullying, fake news, or online safety.",
            "Interesting question! For digital citizenship topics, I can help with: online safety, privacy protection, digital etiquette, media literacy, and more. What would you like to know?"
        ]
    }
};

function findBestResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each category in knowledge base
    for (const category in aiKnowledge) {
        if (category === 'default') continue;
        
        const data = aiKnowledge[category];
        for (const keyword of data.keywords) {
            if (lowerMessage.includes(keyword)) {
                const responses = data.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }
    
    // Return default response
    const defaultResponses = aiKnowledge.default.responses;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user';
    userMessage.innerHTML = `<div class="message-content">${escapeHtml(message)}</div>`;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chatbot-message bot';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="chatbot-typing">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Get AI response after delay
    setTimeout(() => {
        // Remove typing indicator
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        // Get response
        const response = findBestResponse(message);
        
        // Add bot message
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.innerHTML = `<div class="message-content">${response}</div>`;
        messagesContainer.appendChild(botMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

// ===== SPACEBAR TO ENTER SITE =====
document.addEventListener('keydown', (e) => {
    const landingPage = document.getElementById('landingPage');
    if (e.code === 'Space' && !landingPage.classList.contains('hide')) {
        e.preventDefault();
        enterSite();
    }
});