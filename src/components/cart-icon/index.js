import createElement from '../../lib/create-element';
import cartIcon from '../../icons/cart-icon.svg';
import './index.css';

export default class CartIcon {
  elem = null;
  #counter = null;

  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="cart-icon">${cartIcon}</div>`);
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.#counter = createElement(`
      <div class="cart-icon__circle">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
        </div>
      `);
      this.elem.append(this.#counter);
    } else {
      this.#counter.remove();
    }
  }
}
