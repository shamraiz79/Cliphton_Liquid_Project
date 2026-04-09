
//  javascript funcationality 
        
function switchTab(clickedTab, type) {
            // 1. Update Tab Visuals
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            clickedTab.classList.add('active');

            // 2. Switch Collage Images
            const states = document.querySelectorAll('.collage-state');
            states.forEach(state => {
                state.classList.remove('active');
                if (state.getAttribute('data-type') === type) {
                    state.classList.add('active');
                }
            });
        }

// for slider logic 
let currentIndex = 0;
function moveSlider(direction) {
    const track = document.getElementById('collectionTrack');
    const cards = document.querySelectorAll('.collection-card');
    const totalCards = cards.length;
    // On desktop, we usually see 3 cards. 
    // We can only slide as many times as there are "extra" cards.
    const visibleCards = 3; 
    const maxIndex = totalCards - visibleCards;
    currentIndex += direction;
    // Boundary checks: Don't slide past the first or last card
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    // Calculate move: (Card Width 433px + Gap 20px) = 453px per slide
    const moveDistance = currentIndex * 453; 
    track.style.transform = `translateX(-${moveDistance}px)`;

    updateDots();
}
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}
// for new products slider logic 
//  Product Data 
// We store all products here with a 'category' tag to filter them later.
// const productsData = [
//     {
//         category: 'coffee',
//         title: 'Panama Coffee',
//         desc: 'Introducing El Vergel Estate, a vibrant new coffee...',
//         price: '£13.50',
//         img: 'images/5.png',
//         bgColor: 'bg-pink'
//     },
//     {
//         category: 'coffee',
//         title: 'Peru Coffee',
//         desc: 'A rich, organic blend from the highlands of Peru.',
//         price: '£13.50',
//         img: 'images/6.png',
//         bgColor: 'bg-green'
//     },
//     {
//         category: 'coffee',
//         title: 'House Espresso',
//         desc: 'A consistent, high-quality blend for daily use...',
//         price: '£11.00',
//         img: 'images/5.png', // Reusing image as placeholder
//         bgColor: 'bg-pink'
//     },
//     {
//         category: 'capsule',
//         title: 'Dark Roast Pods',
//         desc: 'Intense and bold flavors in a convenient pod.',
//         price: '£8.00',
//         img: 'images/BoxSection1.png', // Placeholder image
//         bgColor: 'bg-green'
//     },
//     {
//         category: 'capsule',
//         title: 'Light Roast Pods',
//         desc: 'Smooth and subtle notes for a gentle start.',
//         price: '£8.50',
//         img: 'images/BoxSection2.png', // Placeholder image
//         bgColor: 'bg-pink'
//     }
// ];
// --- 2. Switch Tab Function ---
function switchTab(btn, type) {
    // A. Update Tab Buttons UI
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    // B. Update Left Collage (Your existing logic)
    const states = document.querySelectorAll('.collage-state');
    states.forEach(state => {
        state.classList.remove('active');
        // If type is 'all', default to coffee image, otherwise match type
        if (state.dataset.type === type || (type === 'all' && state.dataset.type === 'coffee')) {
            state.classList.add('active');
        }
    });
    // C. Render Products for the selected type
    renderProducts(type);
}
// --- 3. Render Products Function ---
// function renderProducts(filterType) {
//     const track = document.getElementById('productTrack');
//     track.innerHTML = ''; // Clear existing cards

//     // Filter data: If 'all', show everything. Else match category.
//     const filteredProducts = filterType === 'all' 
//         ? productsData 
//         : productsData.filter(p => p.category === filterType);

//     // Generate HTML for each product
//     filteredProducts.forEach(product => {
//         const cardHTML = `
//             <div class="product-card">
//                 <div class="product-img-box ${product.bgColor}">
//                     <img src="${product.img}" alt="${product.title}">
//                 </div>
//                 <div class="product-info">
//                     <h3>${product.title}</h3>
//                     <p class="desc">${product.desc}</p>
//                     <p class="price">${product.price}</p>
//                     <button class="buy-now-btn">Buy Now</button>
//                 </div>
//             </div>
//         `;
//         track.innerHTML += cardHTML;
//     });
//     // Reset Slider Position
//     productIndex = 0;
//     track.style.transform = `translateX(0px)`;
// }
// --- 4. Slider Logic (Updated) ---
let productIndex = 0;
function moveProductSlider(direction) {
    const track = document.getElementById('productTrack');
    const cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return; // Guard clause if empty
    const totalCards = cards.length;
    // Determine visible cards (Desktop: 2, Mobile: 1)
    const visibleCards = window.innerWidth <= 768 ? 1 : 2;
    const maxIndex = Math.max(0, totalCards - visibleCards);

    productIndex += direction;

    // Constraints
    if (productIndex < 0) productIndex = 0;
    if (productIndex > maxIndex) productIndex = maxIndex;

    // Calculate move
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // Match your CSS gap
    const moveDistance = productIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${moveDistance}px)`;
}

// --- 5. Initialize on Load ---
// This ensures "Coffee" products are visible when the page first opens
document.addEventListener('DOMContentLoaded', () => {
   // Select the first tab (Coffee) logically
   renderProducts('coffee');
});
// logic for reviews section slider
const reviewsWin = document.getElementById('reviewsWindow');
const reviewDots = document.querySelectorAll('#reviewDots .dot');
let currentReviewIndex = 0;
let autoScrollTimer;

function getCardWidth() {
    const card = document.querySelector('.review-card');
    return card.offsetWidth + 20;
}
// Auto scroll logic
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        const cards = document.querySelectorAll('.review-card');
        const totalCards = cards.length;
        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = totalCards - visibleCards;

        currentReviewIndex++;
        if (currentReviewIndex > maxIndex) {
            currentReviewIndex = 0;
        }

        reviewsWin.scrollTo({
            left: currentReviewIndex * getCardWidth(),
            behavior: 'smooth'
        });
    }, 4000);
}

//  DOT CLICK FUNCTIONALITY
reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(autoScrollTimer); // stop auto scroll

        currentReviewIndex = index;

        reviewsWin.scrollTo({
            left: index * getCardWidth(),
            behavior: 'smooth'
        });

        startAutoScroll(); // restart auto scroll
    });
});
// Update dots on scroll
reviewsWin.addEventListener('scroll', () => {
    const index = Math.round(reviewsWin.scrollLeft / getCardWidth());
    reviewDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentReviewIndex = index;
});
// Pause on hover
reviewsWin.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
reviewsWin.addEventListener('mouseleave', startAutoScroll);
// Start slider
startAutoScroll();
// logic for mobile device 
   document.querySelectorAll('.has-mega > a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();

        const parent = this.parentElement;

        document.querySelectorAll('.nav-item').forEach(item => {
          if (item !== parent) {
            item.classList.remove('active');
          }
        });
        parent.classList.toggle('active');
      }
    });
  });
//   for dual popup cart logic
function openProductModal(productName) {
    const modal = document.getElementById('productModal');
    const body = document.getElementById('modalBody');
    
    // Detailed popup content
    body.innerHTML = `
        <h2>${productName}</h2>
        <p>£13.50</p>
        <div class="options">
            <label>Wholebean or Ground</label>
            <select><option>Wholebean</option><option>Filter Grind</option></select>
        </div>
        <button class="add-btn">Add to Cart</button>
    `;   
    modal.style.display = 'block';
}
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}
// for fav slider
function moveFavSlider(direction) {
    const windowEl = document.getElementById('favWindow');
    const firstCard = document.querySelector('.favorite-card');
    
    if (windowEl && firstCard) {
        // Calculate: Card Width (approx 33%) + 25px gap
        const cardWidth = firstCard.offsetWidth + 25;
        
        // Scroll the window by the width of one card
        windowEl.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
}
// Optional: Sync Dots
const favWindowEl = document.getElementById('favWindow');
if (favWindowEl) {
    favWindowEl.addEventListener('scroll', () => {
        const cardWidth = document.querySelector('.favorite-card').offsetWidth + 25;
        const index = Math.round(favWindowEl.scrollLeft / cardWidth);
        const dots = document.querySelectorAll('#favDots .dot');
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
}

//  for search bar onclick logic
// Select elements
    const searchBtn = document.getElementById('search-btn');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('search-overlay');
    // Function to open search
    searchBtn.addEventListener('click', function() {
        overlay.classList.add('active');
    });
    // Function to close search
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
    // Optional: Close if clicking on the black background outside input
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
// --- Shopping Cart Logic ---
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    // Open Cart
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
    // Close Cart (X button)
    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    // Close Cart (Click outside)
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });





    // for slider java code
    // --- Vertical Slider Logic ---
function moveVerticalSlider(index) {
    const track = document.getElementById('verticalTrack');
    const dots = document.querySelectorAll('.s-dot');
    const slides = document.querySelectorAll('.content-block');
    const images = document.querySelectorAll('.feature-img'); // ✅ NEW

    // 1. Update Dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // 2. Update Text Slides
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    // 3. Move Track Vertically
    const slideHeight = slides[0].offsetHeight; // ✅ better than fixed 400
    const moveY = index * slideHeight;
    track.style.transform = `translateY(-${moveY}px)`;

    // 4. ✅ SWITCH IMAGES
    images.forEach(img => img.classList.remove('active'));
    if (images[index]) {
        images[index].classList.add('active');
    }
}
// --- Favorites Slider Logic ---
function moveFavoritesSlider(index) {
    const track = document.querySelector('.favorites-grid'); // Or whatever ID your track has
    const dots = document.querySelectorAll('.favorites-section .dot'); // Be specific to this section  
    // 1. Update Dots
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
    // 2. Move Slider Horizontally
    const cardWidth = 325; 
    const moveX = index * cardWidth;
    // Use scrollTo for a smooth scroll effect
    track.scrollTo({
        left: moveX,
        behavior: 'smooth'
    });
}




    