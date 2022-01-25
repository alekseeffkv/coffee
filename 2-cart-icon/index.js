import createElement from '../assets/lib/create-element.js';

export default class CartIcon {
  elem = null;

  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.innerHTML = `
        <div class="cart-icon__circle">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
        </div>`;
    } else {
      this.elem.innerHTML = '';
    }
  }
}
