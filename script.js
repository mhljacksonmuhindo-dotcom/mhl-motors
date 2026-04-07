// Récupération des éléments
const addButtons = document.querySelectorAll('.btn-add');
const cartHeader = document.getElementById('cart-header');
const cartBadge = document.getElementById('cart-badge');
const successToast = document.getElementById('success-toast');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const btnClear = document.getElementById('btn-clear');

let cart = []; // { name, price, id }

function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.price;

        const li = document.createElement('li');
        li.classList.add('cart-item');

        const spanName = document.createElement('span');
        spanName.textContent = item.name;

        const spanPrice = document.createElement('span');
        spanPrice.textContent = item.price + ' $';

        const btnRemove = document.createElement('button');
        btnRemove.textContent = '×';
        btnRemove.title = 'Retirer';

        btnRemove.addEventListener('click', () => {
            cart = cart.filter((p) => p.id !== item.id);
            renderCart();
        });

        li.appendChild(spanName);
        li.appendChild(spanPrice);
        li.appendChild(btnRemove);

        cartItemsList.appendChild(li);
    });

    cartTotalSpan.textContent = total.toLocaleString('en-US');
    cartBadge.textContent = cart.length;
}

function showToast() {
    successToast.textContent = 'Produit ajouté au panier ! 🛒';
    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 3000);
}

addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        const newItem = {
            id: Date.now() + Math.random(),
            name,
            price
        };

        cart.push(newItem);
        renderCart();
        showToast();
    });
});

cartHeader.addEventListener('click', () => {
    const panier = document.getElementById('panier');
    const backdrop = document.querySelector('.cart-backdrop') || createBackdrop();
    
    const isOpen = panier.classList.contains('open');
    
    if (isOpen) {
        panier.classList.remove('open');
        backdrop.classList.remove('show');
    } else {
        panier.classList.add('open');
        backdrop.classList.add('show');
        renderCart(); // Refresh
    }
});

function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('cart-backdrop');
    backdrop.addEventListener('click', () => {
        document.getElementById('panier').classList.remove('open');
        backdrop.classList.remove('show');
    });
    document.body.appendChild(backdrop);
    return backdrop;
}

btnClear.addEventListener('click', () => {
    cart = [];
    renderCart();
});


renderCart()