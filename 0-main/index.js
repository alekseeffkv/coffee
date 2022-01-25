import Navigation from '../1-navigation/index.js';
import navItems from '../1-navigation/nav-items.js';

import CartIcon from '../2-cart-icon/index.js';

import Carousel from '../4-carousel/index.js';

import Cart from '../6-cart/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const navigation = new Navigation(navItems);
    document.querySelector('.hero__nav').append(navigation.elem);

    const cartIcon = new CartIcon();
    document.querySelector('.hero__cart-icon').append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    const response = await fetch('products.json');
    const json = await response.json();
    const products = JSON.parse(JSON.stringify(json));

    const carousel = new Carousel(products);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    document.body.addEventListener('product-add', event => {
      let addedProduct = products.find(product => product.id == event.detail.productID);
      cart.addProduct(addedProduct, event.detail.productCount);
    });
  }
}