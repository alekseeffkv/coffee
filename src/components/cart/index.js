/* eslint-disable max-len */
import createElement from '../../lib/create-element';
import escapeHtml from '../../lib/escape-html';
import Modal from '../modal';
import './index.css';
import minus from '../../icons/minus.svg';
import plus from '../../icons/plus.svg';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product, count) {
    if (product === null || product === undefined) return;

    const itemIndex = this.cartItems.findIndex((item) => item.product.id === product.id);

    if (itemIndex === -1) {
      this.cartItems.push({ product, count });
    } else {
      this.cartItems[itemIndex].count += count;
    }

    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  updateProductCount(productId, amount) {
    const itemIndex = this.cartItems.findIndex((item) => item.product.id === productId);
    const modifiedItem = this.cartItems[itemIndex];

    if (amount === 1) {
      modifiedItem.count += 1;
    } else if (amount === -1) {
      modifiedItem.count -= 1;
    }

    if (modifiedItem.count === 0) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.onProductUpdate(modifiedItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalPrice, item) => totalPrice + item.count * item.product.price,
      0,
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/src/components/product-card/images/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              ${minus}
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              ${plus}
            </button>
          </div>
          <div class="cart-product__price">$ ${(count * product.price).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`
    <form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input"
        placeholder="Name" required value="John Smith">

        <input name="email" type="email" class="cart-form__input"
        placeholder="Email" required value="john@gmail.com">

        <input name="tel" type="tel" class="cart-form__input"
        placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input"
        placeholder="Address" required value="Madison Avenue, New York, USA">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">Total</span>
            <span class="cart-buttons__info-price">$ ${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">Order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    if (this.isEmpty()) return;

    this.modal = new Modal();

    this.modal.setTitle('Your order');

    const modalBody = document.createElement('div');
    modalBody.innerHTML = `
    ${this.cartItems.map((item) => this.renderProduct(item.product, item.count).outerHTML).join('')}
      ${this.renderOrderForm().outerHTML}
    `;
    this.modal.setBody(modalBody);

    this.modal.open();

    modalBody.addEventListener('click', (event) => {
      const target = event.target;
      const productTarget = target.closest('.cart-product');

      if (target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productTarget.dataset.productId, -1);
      } else if (target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productTarget.dataset.productId, 1);
      }
    });

    document
      .querySelector('.cart-form')
      .addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return;

    const productId = cartItem.product.id;
    const modalBody = document.querySelector('.modal__body');
    const productElement = modalBody.querySelector(`[data-product-id="${productId}"]`);
    const productCount = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`,
    );
    const productPrice = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`,
    );
    const infoPrice = modalBody.querySelector('.cart-buttons__info-price');

    if (cartItem.count === 0) {
      productElement.remove();
    } else {
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `$ ${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }

    infoPrice.innerHTML = `$ ${this.getTotalPrice().toFixed(2)}`;

    if (this.isEmpty()) this.modal.close();
  }

  onSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('.cart-form');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    }).then(() => {
      this.modal.setTitle('Order successful!');

      const modalBody = document.createElement('div');
      modalBody.classList.add('modal__body-inner');
      modalBody.innerHTML = `
        <p>
          Your order is being collected.<br>
          We’ll notify you about delivery time shortly.
        </p>
        <svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <g fill-rule="evenodd">
          <path d="m462 168c0-61.855-50.145-112-112-112s-112 50.145-112 112v65.332c0 5.1562 4.1797 9.3359 9.332 9.3359 5.1562 0 9.3359-4.1797 9.3359-9.3359v-65.332c0-51.547 41.785-93.332 93.332-93.332s93.332 41.785 93.332 93.332v65.332c0 5.1562 4.1797 9.3359 9.3359 9.3359 5.1523 0 9.332-4.1797 9.332-9.3359z"/>
          <path d="m415.33 205.33c5.1562 0 9.3359-4.1758 9.3359-9.332s-4.1797-9.332-9.3359-9.332h-130.66c-5.1562 0-9.3359 4.1758-9.3359 9.332s4.1797 9.332 9.3359 9.332z"/>
          <path d="m160.6 239.93c-3.6445 3.6445-9.5547 3.6445-13.199 0-3.6445-3.6484-3.6445-9.5547 0.003906-13.199l37.09-37.086c1.5664-1.6836 3.75-2.793 6.1914-2.9609 0.22266-0.011719 19.316-0.019531 19.316-0.019531 5.1562 0 9.332 4.1758 9.332 9.332s-4.1758 9.332-9.332 9.332h-14.793z"/>
          <path d="m539.4 239.93c3.6445 3.6445 9.5547 3.6445 13.199 0 3.6445-3.6484 3.6445-9.5547-0.003906-13.199l-37.09-37.086c-1.5664-1.6836-3.75-2.793-6.1914-2.9609-0.22266-0.011719-19.316-0.019531-19.316-0.019531-5.1562 0-9.332 4.1758-9.332 9.332s4.1758 9.332 9.332 9.332h14.793z"/>
          <path d="m144.67 233.33v280c0 5.1562 4.1758 9.3359 9.332 9.3359h392c5.1562 0 9.332-4.1797 9.332-9.3359v-280c0-5.1523-4.1758-9.332-9.332-9.332h-392c-5.1562 0-9.332 4.1797-9.332 9.332zm197.6 204.4c3.6445 3.6445 9.5547 3.6445 13.199 0l105.59-105.6c3.6445-3.6445 3.6445-9.5547 0-13.199-3.6445-3.6445-9.5547-3.6445-13.199 0l-98.996 98.996-59.395-59.398c-3.6484-3.6445-9.5547-3.6445-13.203 0-3.6445 3.6445-3.6445 9.5547 0 13.199z"/>
        </g>
        </svg>
      `;
      this.modal.setBody(modalBody);

      this.cartItems.length = 0;

      this.cartIcon.update(this);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
