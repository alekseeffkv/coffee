import Masonry from 'masonry-layout';
import createElement from '../../lib/create-element';
import './index.css';

export default class Gallery {
  images = [];

  elem = null;

  constructor(images) {
    this.images = images;
    this.elem = this.#createGallery();
  }

  showMore() {
    const hidden = document.querySelectorAll('.gallery__img.hidden');
    for (let i = 0; i < 6 && i < hidden.length; i++) {
      hidden[i].classList.remove('hidden');
    }

    const masonryElem = document.querySelector('.gallery__inner');

    // eslint-disable-next-line no-new
    new Masonry(masonryElem, {
      itemSelector: '.gallery__img',
      columnWidth: 360,
      horizontalOrder: true,
      gutter: 35,
    });

    if (!document.querySelector('.gallery__img.hidden')) {
      document.querySelector('.gallery__button').remove();
    }
  }

  #createGallery() {
    const gallery = createElement(`
    <div class="gallery">
      <div class="gallery__name">
        <div class="gallery__title">Our Gallery</div>
        <div class="gallery__description">
        The coffee shop name generator is a great tool
        for those that are deliberating what to call their new coffee.
        </div>
      </div>

      <div class="gallery__inner">
        ${this.images
          .map((image) => {
            return `<img src="/src/components/gallery/images/${image}"
            class="gallery__img hidden" alt="slide"></img>`;
          })
          .join('')}
      </div>

      <button type="button" class="gallery__button">LOAD MORE</button>
    </div>
    `);

    gallery.querySelector('.gallery__button').addEventListener('click', this.showMore);

    return gallery;
  }
}
