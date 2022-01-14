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
      <img src="/assets/images/products/${this.#product.image}" class="card__image" alt="product">

      <div class="card__top">
        <div class="card__price">$ ${this.#product.price.toFixed(2)}</div>
        <div class="card__title">${this.#product.name}</div>
        <div class="card__desc">${this.#product.desc}</div>
      </div>
    
      <div class="card__bottom">
        <div class="card__inner">
          <div class="card__count">${this.#count}</div>
          <div class="card__plus"><img src="/assets/images/icons/plus.svg" alt="plus"></div>
          <div class="card__minus"><img src="/assets/images/icons/minus.svg" alt="minus"></div>
        </div>
        <button type="button" class="card__button">Get Delivery</button>
      </div>
    </div>
    `);

    card.addEventListener('click', this.#onCardClick);

    return card;
  }
}
