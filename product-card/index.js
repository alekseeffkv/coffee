import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #product = {};
  #count = 0;
  elem = null;

  constructor(product) {
    this.#product = product;

    this.elem = this.#createCard();
  }

  #onCardClick = e => {
    if (e.target.closest('.card__plus')) {
      this.#count += 1;
      this.elem.querySelector('.card__count').textContent = this.#count;
    }

    if (e.target.closest('.card__minus')) {
      if (this.#count) {
        this.#count -= 1;
        this.elem.querySelector('.card__count').textContent = this.#count;
      }
    }

    if (e.target.closest('.card__button')) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: {
          productID: this.#product.id,
          productCount: this.#count
        },
        bubbles: true
      }));
    }
  }

  #createCard() {
    let card = createElement(`
    <div class="card">
      <div class="card__image" style="background-image: url(/assets/images/products/${this.#product.image})"></div>

      <div class="card__top">
        <div class="card__price">$ ${this.#product.price.toFixed(2)}</div>
        <div class="card__title">${this.#product.name}</div>
        <div class="card__description">${this.#product.desc}</div>
      </div>
    
      <div class="card__bottom">
        <div class="card__inner">
          <div class="card__count">${this.#count}</div>
          <div class="card__plus">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 6H11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card__minus">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <button type="button" class="card__button">Add to Cart</button>
      </div>
    </div>
    `);

    card.addEventListener('click', this.#onCardClick);

    return card;
  }
}
