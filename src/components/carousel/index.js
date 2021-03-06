import createElement from '../../lib/create-element';
import ProductCard from '../product-card';
import './index.css';
import arrow from '../../icons/arrow.svg';

export default class Carousel {
  products = [];

  elem = null;

  constructor(products) {
    this.products = products;
    this.elem = this.#createCarousel();
  }

  #initCarousel(carousel) {
    const products = carousel.querySelector('.carousel__inner');
    const arrowRight = carousel.querySelector('.carousel__arrow_right');
    const arrowLeft = carousel.querySelector('.carousel__arrow_left');
    let position = 0;

    arrowLeft.hidden = true;

    carousel.addEventListener('click', (event) => {
      const target = event.target.closest('div');
      let slidesWidth;
      let slidesAmount;

      if (document.documentElement.clientWidth >= 1150) {
        slidesWidth = 1185;
        slidesAmount = 3;
      } else {
        slidesWidth = 395;
        slidesAmount = 1;
      }

      if (target === arrowRight) {
        position -= slidesWidth;
      } else if (target === arrowLeft) {
        position += slidesWidth;
      }

      products.style.transform = `translateX(${position}px)`;

      if (position === 0) {
        arrowLeft.hidden = true;
      } else if (position === -(this.products.length / slidesAmount - 1) * slidesWidth) {
        arrowRight.hidden = true;
      } else {
        arrowLeft.hidden = false;
        arrowRight.hidden = false;
      }
    });
  }

  #createCarousel() {
    const carousel = createElement(`
    <div class="carousel">
      <div class="carousel__name">
        <div class="carousel__title">That is Our Best Offer</div>
        <div class="carousel__description">
        A coffee shop will help you to tell the audience what your business.
        </div>
      </div>

      <div class="carousel__arrow carousel__arrow_left">
       ${arrow}
      </div>

      <div class="carousel__arrow carousel__arrow_right">
        ${arrow}
      </div>
    
      <div class="carousel__inner"></div>
    </div>
    `);

    this.products
      .map((product) => new ProductCard(product))
      .map((productCard) => carousel.querySelector('.carousel__inner').append(productCard.elem));

    this.#initCarousel(carousel);

    return carousel;
  }
}
