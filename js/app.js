/* =====================================================
   RENTEASE - JavaScript Application
   All actions end with WhatsApp - No Database Required
   ===================================================== */

// ===== Configuration =====
const CONFIG = {
    whatsappNumber: '9990997837', // Replace with actual WhatsApp number
    siteUrl: window.location.origin
};

// ===== Indian States & Cities =====
const LOCATIONS = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Noida', 'Gurgaon', 'Indore',
    'Kochi', 'Coimbatore', 'Nagpur', 'Bhopal', 'Vizag', 'Surat'
];

// ===== Rental Categories =====
const CATEGORIES = [
    { id: 'houses', title: 'Houses & Flats', icon: '🏠' },
    { id: 'pg', title: 'PG & Hostels', icon: '🏨' },
    { id: 'coworking', title: 'Co-working Spaces', icon: '💼' },
    { id: 'library', title: 'Library / Study Seats', icon: '📚' },
    { id: 'commercial', title: 'Commercial & Offices', icon: '🏢' }
];

// ===== WhatsApp Integration - ALL ACTIONS END HERE =====
const WhatsApp = {
    generateLink(message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    },

    open(message) {
        window.open(this.generateLink(message), '_blank');
    },

    // Search by location
    searchLocation(location) {
        const message = `Hi! I'm looking for rental properties in *${location}*.\n\nPlease share available options for:\n- Houses/Flats\n- PGs/Hostels\n- Co-working spaces\n- Library seats\n\nThank you!`;
        this.open(message);
    },

    // Search with filters
    searchWithFilters(location, category, minPrice, maxPrice) {
        let message = `Hi! I'm looking for rental properties with the following requirements:\n\n`;
        if (location) message += `📍 *Location:* ${location}\n`;
        if (category && category !== 'all') message += `🏷️ *Category:* ${category}\n`;
        if (minPrice) message += `💰 *Min Budget:* ₹${minPrice}/month\n`;
        if (maxPrice) message += `💰 *Max Budget:* ₹${maxPrice}/month\n`;
        message += `\nPlease share available options. Thank you!`;
        this.open(message);
    },

    // Category inquiry
    categoryInquiry(category) {
        const message = `Hi! I'm interested in *${category}* rentals.\n\nPlease share available options in my area.\n\nThank you!`;
        this.open(message);
    },

    // Property inquiry
    propertyInquiry(propertyName, location, price) {
        const message = `Hi! I'm interested in this property:\n\n🏠 *${propertyName}*\n📍 ${location}\n💰 ₹${price}/month\n\nPlease share more details about:\n- Availability\n- Amenities\n- Visit schedule\n\nThank you!`;
        this.open(message);
    },

    // Book visit
    bookVisit(propertyName, location) {
        const message = `Hi! I'd like to schedule a visit for:\n\n🏠 *${propertyName}*\n📍 ${location}\n\nPlease let me know available dates and timings.\n\nThank you!`;
        this.open(message);
    },

    // Support
    support() {
        const message = `Hi! I need help with RentEase.\n\nMy issue is: `;
        this.open(message);
    },

    // Feedback
    feedback(rating, feedbackText, name) {
        let message = `Hi! Here's my feedback for RentEase:\n\n`;
        message += `⭐ *Rating:* ${rating}/5\n`;
        if (name) message += `👤 *Name:* ${name}\n`;
        message += `\n📝 *Feedback:*\n${feedbackText}`;
        this.open(message);
    },

    // General inquiry
    general() {
        const message = `Hi! I have a question about RentEase.\n\n`;
        this.open(message);
    },

    // Partnership
    partnership() {
        const message = `Hi! I'm interested in listing my property on RentEase.\n\nPlease share the details on how I can become a partner.\n\nThank you!`;
        this.open(message);
    }
};

// Make WhatsApp globally accessible
window.WhatsApp = WhatsApp;

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initHeaderScroll();
    initSearch();
    initFilters();
    initCategories();
    initPropertyCards();
    initFAQ();
    initFeedback();
    initLocationButtons();
});

// ===== Theme Management =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
}

// ===== Mobile Navigation =====
function initMobileNav() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.mobile-nav');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                btn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ===== Header Scroll =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// ===== Search - Ends with WhatsApp =====
function initSearch() {
    const searchForms = document.querySelectorAll('.search-box, .hero-search');

    searchForms.forEach(form => {
        const input = form.querySelector('.search-input');
        const btn = form.querySelector('.btn, button');

        if (input && btn) {
            const handleSearch = () => {
                const location = input.value.trim();
                if (location) {
                    WhatsApp.searchLocation(location);
                } else {
                    alert('Please enter a location to search');
                }
            };

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                handleSearch();
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                }
            });
        }
    });
}

// ===== Filters - Ends with WhatsApp =====
function initFilters() {
    const filterForm = document.querySelector('.filters-form');

    if (filterForm) {
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(filterForm);
            const location = formData.get('location') || '';
            const category = formData.get('category') || 'all';
            const minPrice = formData.get('minPrice') || '';
            const maxPrice = formData.get('maxPrice') || '';

            // Get category name
            let categoryName = 'All Categories';
            if (category !== 'all') {
                const cat = CATEGORIES.find(c => c.id === category);
                categoryName = cat ? cat.title : category;
            }

            WhatsApp.searchWithFilters(location, categoryName, minPrice, maxPrice);
        });
    }
}

// ===== Category Cards - Ends with WhatsApp =====
function initCategories() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const title = card.querySelector('.category-title');
            if (title) {
                WhatsApp.categoryInquiry(title.textContent.trim());
            }
        });
    });
}

// ===== Property Cards - Ends with WhatsApp =====
function initPropertyCards() {
    // Handle View Details buttons
    document.querySelectorAll('.property-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.property-card');
            if (card) {
                const title = card.querySelector('.property-title')?.textContent || 'Property';
                const location = card.querySelector('.property-location')?.textContent || 'Unknown';
                const price = card.querySelector('.property-price')?.textContent || '';
                const priceNum = price.replace(/[^\d]/g, '');
                WhatsApp.propertyInquiry(title, location, priceNum);
            }
        });
    });

    // Handle contact buttons on property detail page
    const contactOwnerBtn = document.querySelector('.contact-owner-btn');
    const bookVisitBtn = document.querySelector('.book-inquiry-btn');

    if (contactOwnerBtn) {
        contactOwnerBtn.addEventListener('click', () => {
            const title = document.querySelector('.property-detail-title')?.textContent || 'Property';
            const location = document.querySelector('.property-detail-location span')?.textContent || '';
            const price = document.querySelector('.property-detail-price')?.textContent || '';
            const priceNum = price.replace(/[^\d]/g, '');
            WhatsApp.propertyInquiry(title, location, priceNum);
        });
    }

    if (bookVisitBtn) {
        bookVisitBtn.addEventListener('click', () => {
            const title = document.querySelector('.property-detail-title')?.textContent || 'Property';
            const location = document.querySelector('.property-detail-location span')?.textContent || '';
            WhatsApp.bookVisit(title, location);
        });
    }
}

// ===== Location Buttons - Quick Search =====
function initLocationButtons() {
    document.querySelectorAll('.location-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.dataset.location || btn.textContent.trim();
            WhatsApp.searchLocation(location);
        });
    });
}

// ===== FAQ Accordion =====
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!wasActive) item.classList.add('active');
            });
        }
    });
}

// ===== Feedback Form - Ends with WhatsApp =====
function initFeedback() {
    const ratingBtns = document.querySelectorAll('.rating-btn');
    const submitBtn = document.querySelector('.feedback-submit');
    let selectedRating = 0;

    ratingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedRating = parseInt(btn.dataset.rating);
            ratingBtns.forEach((b, i) => {
                b.classList.toggle('active', i < selectedRating);
            });
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const feedback = document.querySelector('.feedback-textarea')?.value || '';
            const name = document.querySelector('.feedback-name')?.value || '';

            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }
            if (!feedback.trim()) {
                alert('Please enter your feedback');
                return;
            }

            WhatsApp.feedback(selectedRating, feedback, name);
        });
    }
}

// ===== Animate on Scroll =====
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .section-header').forEach(el => observer.observe(el));
}
