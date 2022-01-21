import createElement from '../assets/lib/create-element.js';
import ProductCard from '../3-product-card/index.js';

export default class Carousel {
  products = [];
  elem = null;

  constructor(products) {
    this.products = products;
    this.elem = this.#createCarousel();
  }

  #initCarousel(carousel) {
    let products = carousel.querySelector('.carousel__inner');
    let arrowRight = carousel.querySelector('.carousel__arrow_right');
    let arrowLeft = carousel.querySelector('.carousel__arrow_left');
    let position = 0;
  
    arrowLeft.hidden = true;
  
    carousel.addEventListener('click', event => {
      let target = event.target.closest('div');
      let slidesWidth;

      if (document.documentElement.clientWidth >= 1150) {
        slidesWidth = 1185;
      }
  
      if (target == arrowRight) {
        position -= slidesWidth;
      } else if (target == arrowLeft) {
        position += slidesWidth;
      }
  
      products.style.transform = `translateX(${position}px)`;
      
      if (position == 0) {
        arrowLeft.hidden = true;
      } else if (position == -(this.products.length / 3 - 1) * slidesWidth) {
        arrowRight.hidden = true;
      } else {
        arrowLeft.hidden = false;
        arrowRight.hidden = false;
      }
    });
  }

  #createCarousel() {
    let carousel = createElement(`
    <div class="carousel">
      <div class="carousel__name">
        <div class="carousel__title">That is Our Best Offer</div>
        <div class="carousel__description">A coffee shop will help you to tell the audience what your business.</div>
      </div>

      <div class="carousel__arrow carousel__arrow_left">
       <img src="/assets/images/icons/arrow.svg" alt="left">
      </div>

      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/arrow.svg" alt="right">
      </div>
    
      <div class="carousel__inner"></div>
    </div>
    `);

    this.products.map(product => new ProductCard(product))
                 .map(productCard => carousel.querySelector('.carousel__inner').append(productCard.elem));

    this.#initCarousel(carousel);

    return carousel;
  }
}
