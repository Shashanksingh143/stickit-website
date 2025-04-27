// Sample product data
const products = [
    {
        id: 1,
        title: "Sticker 1",
        price: 5.99,
        image: "./download (1).jpg"
    },
    {
        id: 2,
        title: "Sticker 2",
        price: 6.99,
        image: "./images.jpg"
    },
    {
        id: 3,
        title: "Sticker 3",
        price: 4.99,
        image: "./download (1).jpg"
    },
    {
        id: 4,
        title: "Sticker 4",
        price: 7.99,
        image: "./download.jpg"
    },
    {
        id: 5,
        title: "Sticker 5",
        price: 8.99,
        image: "./download (1).png"
    }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" />
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
    });
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '';
        checkoutBtn.disabled = true;
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <span class="cart-item-name">${item.title}</span>
            <span class="cart-item-qty">x${item.quantity}</span>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        addToCart(id);
    }
});

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-item-remove')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(id);
    }
});

checkoutBtn.addEventListener('click', () => {
    // Redirect to local payment page
    window.location.href = 'payment.html';
    // Optionally, clear cart after redirect if needed
    // cart = [];
    // updateCartCount();
    // renderCart();
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

// Open modal when clicking login link
if (loginLink && authModal) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        authModal.style.display = 'block';
    });
}

// Close modal when clicking close button
if (modalClose && authModal) {
    modalClose.addEventListener('click', () => {
        authModal.style.display = 'none';
    });
}

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Basic form submission handlers (prevent default and alert)
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login form submitted!');
        authModal.style.display = 'none';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signup form submitted!');
        authModal.style.display = 'none';
    });
}
