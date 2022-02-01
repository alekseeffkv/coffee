import createElement from '../../lib/create-element';
import logo from '../../icons/logo.svg';
import './index.css';

export default class Header {
  elem = null;

  constructor() {
    this.elem = this.#createHeader();
  }

  #createHeader() {
    const header = createElement(`
    <header class="hero">
      <div class="hero__inner container">

        <div class="hero__header">
          <div class="hero__logo">
            ${logo}
            <div class="hero__logo-text">Coffee</div>
          </div>
          <div class="hero__nav"></div>
          <div class="hero__cart-icon"></div>
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