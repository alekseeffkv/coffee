import './index.css';

import Header from './components/header';

import Navigation from './components/navigation';
import navItems from './components/navigation/nav-items';

import CartIcon from './components/cart-icon';

import Carousel from './components/carousel';

import Cart from './components/cart';

import Gallery from './components/gallery';
import images from './components/gallery/images.js';

import FollowUs from './components/follow-us';
import contactItems from './components/follow-us/contact-items';

import News from './components/news';
import newsItems from './components/news/news-items';

class Main {

  constructor() {
  }

  async render() {
    const header = new Header();
    document.body.prepend(header.elem);

    const navigation = new Navigation(navItems);
    document.querySelector('.hero__nav').append(navigation.elem);

    const cartIcon = new CartIcon();
    document.querySelector('.hero__cart-icon').append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    const response = await fetch('/src/products.json');
    const json = await response.json();
    const products = JSON.parse(JSON.stringify(json));

    const carousel = new Carousel(products);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    carousel.elem.addEventListener('product-add', event => {
      let addedProduct = products.find(product => product.id == event.detail.productID);
      cart.addProduct(addedProduct, event.detail.productCount);
    });

    const gallery = new Gallery(images);
    document.querySelector('[data-gallery-holder]').append(gallery.elem);
    gallery.showMore();

    const followUs = new FollowUs(contactItems);
    document.querySelector('[data-follow-holder]').append(followUs.elem);

    const news = new News(newsItems);
    document.querySelector('[data-news-holder]').append(news.elem);
  }
}

const main = new Main();

main.render()
  .then(() => console.log('Страница готова!'));
