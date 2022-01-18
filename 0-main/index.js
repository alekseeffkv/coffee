import Navigation from '../1-navigation/index.js';
import navItems from '../1-navigation/nav-items.js';

import CartIcon from '../2-cart-icon/index.js';

import Carousel from '../4-carousel/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let navigation = new Navigation(navItems);
    document.querySelector('.hero__nav').append(navigation.elem);

    let cartIcon = new CartIcon();
    document.querySelector('.hero__cart-icon').append(cartIcon.elem);

    let response = await fetch('products.json');
    let json = await response.json();
    let products = JSON.parse(JSON.stringify(json));

    let carousel = new Carousel(products);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);
  }
}