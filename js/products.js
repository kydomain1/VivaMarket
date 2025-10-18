// ===== Products Page JavaScript =====
document.addEventListener('DOMContentLoaded', function() {
    // ===== Product Filtering =====
    const filterBtns = document.querySelectorAll('.product-filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
    
    function filterProducts(category) {
        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'flex';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // ===== Product View Details Modal =====
    const viewButtons = document.querySelectorAll('.view-product-btn');
    
    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            showProductModal(productItem);
        });
    });
    
    function showProductModal(productItem) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('productModal');
        if (!modal) {
            modal = createModal();
            document.body.appendChild(modal);
        }
        
        // Get product data
        const img = productItem.querySelector('.product-img img').src;
        const title = productItem.querySelector('.product-details h3').textContent;
        const category = productItem.querySelector('.product-category').textContent;
        const price = productItem.querySelector('.product-price').textContent;
        const description = productItem.querySelector('.product-description').textContent;
        const rating = productItem.querySelector('.product-rating').innerHTML;
        
        // Populate modal
        modal.querySelector('.modal-image img').src = img;
        modal.querySelector('.modal-info h2').textContent = title;
        modal.querySelector('.modal-category').textContent = category;
        modal.querySelector('.modal-price').textContent = price;
        modal.querySelector('.modal-description').textContent = description;
        modal.querySelector('.modal-rating').innerHTML = rating;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'productModal';
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="closeProductModal()">×</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="" alt="Product">
                    </div>
                    <div class="modal-info">
                        <span class="modal-category"></span>
                        <h2></h2>
                        <div class="modal-rating"></div>
                        <div class="modal-price"></div>
                        <p class="modal-description"></p>
                        <ul class="modal-features">
                            <li>High-quality materials and construction</li>
                            <li>Excellent customer reviews and ratings</li>
                            <li>Fast shipping and easy returns</li>
                            <li>Satisfaction guaranteed</li>
                        </ul>
                        <div class="modal-actions">
                            <button class="buy-now-btn">
                                <i class="fas fa-shopping-cart"></i> Buy Now
                            </button>
                            <button class="add-wishlist-btn">
                                <i class="far fa-heart"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
        
        return modal;
    }
    
    // ===== Product Animation on Scroll =====
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
    
    productItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// ===== Close Product Modal =====
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== Close modal on Escape key =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// ===== Add animation styles =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

