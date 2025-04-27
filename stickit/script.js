const products = [
    { id: 1, title: "Sticker 1", price: 5.99, image: "./download (1).jpg" },
    { id: 2, title: "Sticker 2", price: 6.99, image: "./images.jpg" },
    { id: 3, title: "Sticker 3", price: 4.99, image: "./download (1).jpg" },
    { id: 4, title: "Sticker 4", price: 7.99, image: "./download.jpg" },
    { id: 5, title: "Sticker 5", price: 8.99, image: "./download (1).png" }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const renderProducts = () => {
    productGrid.innerHTML = '';
    products.forEach(({id, title, price, image}) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${image}" alt="${title}" class="product-image" />
            <h3 class="product-title">${title}</h3>
            <p class="product-price">$${price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
};

const renderCart = () => {
    cartItemsContainer.innerHTML = cart.length === 0
        ? '<p>Your cart is empty.</p>'
        : cart.map(({id, title, quantity}) => `
            <div class="cart-item">
                <span class="cart-item-name">${title}</span>
                <span class="cart-item-qty">x${quantity}</span>
                <button class="cart-item-remove" data-id="${id}">Remove</button>
            </div>
        `).join('');
    cartTotal.textContent = cart.length === 0 ? '' : `Total: $${cart.reduce((sum, {price, quantity}) => sum + price * quantity, 0).toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
};

const updateCartCount = () => {
    cartCount.textContent = cart.reduce((sum, {quantity}) => sum + quantity, 0);
};

const addToCart = productId => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartItem = cart.find(item => item.id === productId);
    cartItem ? cartItem.quantity++ : cart.push({...product, quantity: 1});
    updateCartCount();
    renderCart();
};

const removeFromCart = productId => {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
};

productGrid.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        addToCart(parseInt(e.target.dataset.id));
    }
});

cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('cart-item-remove')) {
        removeFromCart(parseInt(e.target.dataset.id));
    }
});

checkoutBtn.addEventListener('click', () => {
    window.location.href = 'payment.html';
});

renderProducts();
renderCart();

const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authModal = document.getElementById('auth-modal');
const loginLink = document.getElementById('login-link');
const modalClose = document.getElementById('modal-close');

if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });
}

if (loginLink && authModal) {
    loginLink.addEventListener('click', e => {
        e.preventDefault();
        authModal.style.display = 'block';
    });
}

if (modalClose && authModal) {
    modalClose.addEventListener('click', () => {
        authModal.style.display = 'none';
    });
}

window.addEventListener('click', e => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Login form submitted!');
        authModal.style.display = 'none';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Signup form submitted!');
        authModal.style.display = 'none';
    });
}
