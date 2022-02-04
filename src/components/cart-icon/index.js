import createElement from '../../lib/create-element';
import cartIcon from '../../icons/cart.svg';
import './index.css';

export default class CartIcon {
  elem = null;
  #counter = null;

  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
    <div class="cart-icon">
      ${cartIcon}
      <div class="cart-icon__circle hidden"></div>
    </div>
    `);
  }

  update(cart) {
    const counterContainer = this.elem.querySelector('.cart-icon__circle');

    if (!cart.isEmpty()) {
      this.#counter = `<span class="cart-icon__count">${cart.getTotalCount()}</span>`;
      counterContainer.innerHTML = this.#counter;
      counterContainer.classList.remove('hidden');
    } else {
      counterContainer.classList.add('hidden');
    }
  }
}
