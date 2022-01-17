import Navigation from '../1-navigation/index.js';
import navItems from '../1-navigation/nav-items.js';

import CartIcon from '../2-cart-icon/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let navigation = new Navigation(navItems);
    document.querySelector('.hero__nav').append(navigation.elem);

    let cartIcon = new CartIcon();
    document.querySelector('.hero__cart-icon').append(cartIcon.elem);
  }
}