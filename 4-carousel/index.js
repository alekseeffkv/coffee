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
    let arrowRightImage = carousel.querySelector('.carousel__arrow_right img');
    let arrowLeft = carousel.querySelector('.carousel__arrow_left');
    let arrowLeftImage = carousel.querySelector('.carousel__arrow_left img');
    let position = 0;
  
    arrowLeftImage.classList.add('carousel__arrow_inactive');
  
    carousel.addEventListener('click', event => {
      let target = event.target.closest('div');
      let slidesWidth;

      if (document.documentElement.clientWidth >= 1023) {
        slidesWidth = 1053;
      }
  
      if (target == arrowRight && !arrowRightImage.classList.contains('carousel__arrow_inactive')) {
        position -= slidesWidth;
      } else if (target == arrowLeft && !arrowLeftImage.classList.contains('carousel__arrow_inactive')) {
        position += slidesWidth;
      }
  
      products.style.transform = `translateX(${position}px)`;
      
      if (position == 0) {
        arrowLeftImage.classList.add('carousel__arrow_inactive');
      } else if (position == -(this.products.length / 3 - 1) * slidesWidth) {
        arrowRightImage.classList.add('carousel__arrow_inactive');
      } else {
        arrowLeftImage.classList.remove('carousel__arrow_inactive');
        arrowRightImage.classList.remove('carousel__arrow_inactive');
      }
    });
  }

  #createCarousel() {
    let carousel = createElement(`
    <div class="carousel">
      <div class="carousel__top">

        <div class="carousel__name">
          <div class="carousel__title">That is Our Best Offer</div>
          <div class="carousel__desc">A coffee shop will help you to tell the audience what your business.</div>
        </div>

        <div class="carousel__arrows">

          <div class="carousel__arrow_left">
            <img src="/assets/images/icons/arrow-left.svg" alt="left">
          </div>

          <div class="carousel__arrow_right">
            <img src="/assets/images/icons/arrow-right.svg" alt="right">
          </div>

        </div>
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
