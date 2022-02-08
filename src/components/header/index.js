import createElement from '../../lib/create-element';
import logo from '../../icons/logo.svg';
import './index.css';

export default class Header {
  elem = null;
  #header = null;
  #initialTopCoord = null;

  constructor() {
    this.elem = this.#createHeader();
    this.#header = this.elem.querySelector('.hero__header');
    this.addEventListeners();
  }

  updatePosition() {
    if (!this.#initialTopCoord) {
    this.#initialTopCoord = this.#header.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.pageYOffset > this.#initialTopCoord) {
      this.#header.classList.add('hero__header_fixed');
    } else {
      this.#header.classList.remove('hero__header_fixed');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
  }

  #createHeader() {
    const header = createElement(`
    <header class="hero">
      <div class="hero__inner container">

        <div class="hero__header">
          <div class="hero__header-inner">
            <div class="hero__logo">
              ${logo}
              <div class="hero__logo-text">Coffee</div>
            </div>
            <div class="hero__nav"></div>
            <div class="hero__cart-icon"></div>
          </div>
        </div>

        <div class="hero__text">
          <div class="hero__title">Keep your dreams aroused with a cup of coffee</div>
          <div class="hero__description">The coffee ideas shared by these generators are not cool at all, as they are not a human being</div>
          <button type="button" class="hero__button" onclick="location.href='#carousel'">Buy Now</button>
        </div>

      </div>
    </header>
    `);

    return header;
  }
}