import createElement from '../assets/lib/create-element.js';

export default class CartIcon {
  elem = null;
  #initialTopCoord = null;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <div class="cart-icon__circle">
            <span class="cart-icon__count">${cart.getTotalCount()}</span>
          </div>
        </div>`;

      this.updatePosition();
    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth == 0) return;

    if (!this.#initialTopCoord) {
    this.#initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.pageYOffset > this.#initialTopCoord) {
      let leftIndent = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px';
      
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: leftIndent
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }

    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}
