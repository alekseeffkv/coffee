import createElement from '../../lib/create-element';
import './index.css';
import arrowUp from '../../icons/arrow_up.svg';

export default class News {
  newsItems = [];

  elem = null;

  constructor(newsItems) {
    this.newsItems = newsItems;
    this.elem = this.#createNews();
  }

  #createNews() {
    const news = createElement(`
    <div class="news">
      <div class="news__title">Update News</div>
      <div class="news__description">
        A cup of brewed coffee represents a contribution
        of up to 1.8 grams of fiber of the recommended.
      </div>
      <div class="news__inner">
        ${this.newsItems
          .map(
            (newsItem) => `
          <div class="news__card">
            <div class="news__image"
            style="background-image: url(/src/components/news/images/${newsItem.image})">
            </div>
            <div class="news__body">
              <div class="news__headline">${newsItem.title}</div>
              <div class="news__text">${newsItem.text}</div>
              <a class="news__link" href="${newsItem.link}">
                <span class="news__link-text">Learn More</span>
                ${arrowUp}
              </a>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
    `);

    return news;
  }
}
