// ===== Search Data =====
const articles = [
    {
        id: 1,
        title: "Top 10 Summer Fashion Trends for 2025",
        excerpt: "Discover the hottest fashion trends this summer season with our comprehensive guide to stylish outfits and accessories...",
        category: "fashion",
        categoryLabel: "Fashion",
        date: "August 15, 2025",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        url: "article-fashion.html",
        keywords: ["fashion", "trends", "summer", "style", "clothing", "accessories", "outfits"]
    },
    {
        id: 2,
        title: "Ultimate Morning Skincare Routine Guide",
        excerpt: "Achieve glowing, healthy skin with our expert-recommended morning skincare routine and product reviews...",
        category: "beauty",
        categoryLabel: "Beauty",
        date: "June 20, 2025",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
        url: "article-beauty.html",
        keywords: ["skincare", "beauty", "routine", "morning", "products", "skin", "health"]
    },
    {
        id: 3,
        title: "Transform Your Living Room: Modern Design Ideas",
        excerpt: "Explore stunning modern living room designs and find the perfect furniture pieces to create your dream space...",
        category: "home",
        categoryLabel: "Home",
        date: "May 10, 2025",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
        url: "article-home.html",
        keywords: ["home", "living room", "design", "interior", "furniture", "modern", "decor"]
    },
    {
        id: 4,
        title: "Best Beach Resorts for Your Summer Vacation",
        excerpt: "Plan your perfect beach getaway with our curated list of top-rated resorts offering luxury and relaxation...",
        category: "travel",
        categoryLabel: "Travel",
        date: "March 25, 2025",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        url: "article-travel.html",
        keywords: ["travel", "beach", "resort", "vacation", "summer", "hotel", "holiday"]
    },
    {
        id: 5,
        title: "Essential Kitchen Tools for Home Chefs",
        excerpt: "Elevate your cooking game with our comprehensive review of must-have kitchen tools and appliances...",
        category: "food",
        categoryLabel: "Food",
        date: "January 18, 2025",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        url: "article-food.html",
        keywords: ["kitchen", "cooking", "tools", "chef", "food", "appliances", "culinary"]
    },
    {
        id: 6,
        title: "Building Your Emergency Fund: Complete Guide",
        excerpt: "Learn how to create a financial safety net to protect yourself from unexpected expenses and achieve financial security...",
        category: "finance",
        categoryLabel: "Finance",
        date: "February 15, 2025",
        image: "https://images.unsplash.com/photo-1554224311-beee4f8a7c8?w=800&q=80",
        url: "category-finance.html",
        keywords: ["finance", "money", "savings", "emergency fund", "budget", "financial planning"]
    }
];

// ===== Get Search Query from URL =====
function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// ===== Perform Search =====
function performSearch(query, category = 'all') {
    if (!query) {
        return articles;
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return articles.filter(article => {
        // Category filter
        if (category !== 'all' && article.category !== category) {
            return false;
        }
        
        // Search in title, excerpt, and keywords
        const searchText = `${article.title} ${article.excerpt} ${article.keywords.join(' ')}`.toLowerCase();
        
        return searchTerms.some(term => searchText.includes(term));
    });
}

// ===== Highlight Search Terms =====
function highlightText(text, query) {
    if (!query) return text;
    
    const searchTerms = query.split(' ');
    let highlightedText = text;
    
    searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    
    return highlightedText;
}

// ===== Display Results =====
function displayResults(results, query) {
    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');
    const searchQueryEl = document.getElementById('searchQuery');
    const resultsCount = document.getElementById('resultsCount');
    
    // Update search query display
    if (query) {
        searchQueryEl.innerHTML = `Results for <span>"${query}"</span>`;
    } else {
        searchQueryEl.textContent = 'All Articles';
    }
    
    // Update results count
    resultsCount.textContent = `Found ${results.length} ${results.length === 1 ? 'result' : 'results'}`;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Display results
    results.forEach((article, index) => {
        const resultCard = document.createElement('article');
        resultCard.className = 'result-item article-card';
        resultCard.style.animationDelay = `${index * 0.1}s`;
        
        resultCard.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <span class="article-badge">${article.categoryLabel}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-date"><i class="far fa-calendar"></i> ${article.date}</span>
                </div>
                <h3 class="article-title">${highlightText(article.title, query)}</h3>
                <p class="article-excerpt">${highlightText(article.excerpt, query)}</p>
                <a href="${article.url}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        resultsContainer.appendChild(resultCard);
    });
}

// ===== Initialize Search Page =====
document.addEventListener('DOMContentLoaded', function() {
    const searchQuery = getSearchQuery();
    const searchInput = document.getElementById('searchInputPage');
    const searchButton = document.getElementById('searchButton');
    
    // Set initial search value
    if (searchInput) {
        searchInput.value = searchQuery;
    }
    
    // Perform initial search
    let currentCategory = 'all';
    const results = performSearch(searchQuery, currentCategory);
    displayResults(results, searchQuery);
    
    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const newQuery = searchInput.value.trim();
            if (newQuery) {
                window.location.href = `search.html?q=${encodeURIComponent(newQuery)}`;
            }
        });
    }
    
    // Enter key to search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const newQuery = searchInput.value.trim();
                if (newQuery) {
                    window.location.href = `search.html?q=${encodeURIComponent(newQuery)}`;
                }
            }
        });
    }
    
    // Category filters
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Get selected category
            currentCategory = this.getAttribute('data-category');
            
            // Filter and display results
            const filteredResults = performSearch(searchQuery, currentCategory);
            displayResults(filteredResults, searchQuery);
        });
    });
});

