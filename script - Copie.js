// Récupération des éléments
const addButtons = document.querySelectorAll('.btn-add');
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
    });
});

btnClear.addEventListener('click', () => {
    cart = [];
    renderCart();
});

// Appel initial
renderCart()