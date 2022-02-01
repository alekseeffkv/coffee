import createElement from '../../lib/create-element';
import './index.css';
import plus from '../../icons/plus.svg';
import minus from '../../icons/minus.svg';

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
      <div class="card__image" style="background-image: url(/src/components/product-card/images/${this.#product.image})"></div>

      <div class="card__top">
        <div class="card__price">$ ${this.#product.price.toFixed(2)}</div>
        <div class="card__title">${this.#product.name}</div>
        <div class="card__description">${this.#product.desc}</div>
      </div>
    
      <div class="card__bottom">
        <div class="card__inner">
          <div class="card__count">${this.#count}</div>
          <div class="card__plus">
            ${plus}
          </div>
          <div class="card__minus">
            ${minus}
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
