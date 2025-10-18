// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // ===== Search Functionality =====
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');
    
    // Handle form submission
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Handle search icon click
    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
            } else {
                searchInput.focus();
            }
        });
    }

    // ===== Category Filter =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterByCategory(filter);
        });
    });

    // ===== Category Cards Click (only for non-linked cards) =====
    const categoryCards = document.querySelectorAll('.category-card:not([href])');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Scroll to articles section
            const articlesSection = document.querySelector('.articles');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Filter articles after a short delay
            setTimeout(() => {
                filterByCategory(category);
                
                // Update active filter button
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === category) {
                        btn.classList.add('active');
                    }
                });
            }, 500);
        });
    });

    // ===== Smooth Scroll for Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Animation on Scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe category cards
    const categoryCardsAnim = document.querySelectorAll('.category-card');
    categoryCardsAnim.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ===== Filter Articles by Search (Legacy - kept for compatibility) =====
function filterArticles(searchTerm) {
    // This function is now handled by the search page
    // Kept for backward compatibility
    return;
}

// ===== Filter Articles by Category =====
function filterByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    let visibleCount = 0;
    
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'block';
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    showNoResults(visibleCount === 0);
}

// ===== Show No Results Message =====
function showNoResults(show) {
    let noResultsMsg = document.querySelector('.no-results');
    
    if (show) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #6C757D;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #FF6B9D;"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            document.querySelector('.articles-grid').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// ===== Pagination =====
const paginationBtns = document.querySelectorAll('.page-btn');
paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        paginationBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll to top of articles
        const articlesSection = document.querySelector('.articles');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Footer Category Links =====
document.querySelectorAll('.footer-section a[data-category]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Filter by category after scroll
        setTimeout(() => {
            filterByCategory(category);
            
            // Update filter buttons
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
        }, 500);
    });
});

