import createElement from '../../lib/create-element';
import './index.css';
import logo from '../../icons/logo.svg';
import phone from '../../icons/phone.svg';
import twitter from '../../icons/twitter.svg';
import vk from '../../icons/vk.svg';
import linkedin from '../../icons/linkedin.svg';

export default class Footer {
  contactItems = {};

  elem = null;

  constructor(contactItems) {
    this.contactItems = contactItems;
    this.elem = this.#createFooter();
  }

  #createFooter() {
    const footer = createElement(`
    <div class="footer">
      <div class="footer__inner">
        <div class="footer__body">
          <div class="footer__begin">
            <a href="/" class="footer__logo">
              ${logo}
              <div class="footer__logo-text">Coffee</div>
            </a>
            <div class="footer__creating">
              Creating a catchy tagline coffee shop business growth.
            </div>
            <div class="footer__phone">
              <div class="footer__phone-icon">${phone}</div>
              <a href="tel:${this.contactItems.phone}" class="footer__number">
                ${this.contactItems.phone}
              </a>
            </div>
          </div>

          <div class="footer__categories">
            <div class="footer__cat-title">CATEGORIES</div>
            <a href="#">Ashley Szekeres Art</a>
            <a href="#">Merchandise</a>
            <a href="#">Gift Certificates</a>
          </div>

          <div class="footer__info">
            <div class="footer__info-title">INFORMATION</div>
            <a href="#carousel">Coffee Beans</a>
            <a href="#follow">Contact Us</a>
            <a href="#">Blog</a>
          </div>
          
          <div class="footer__follow">
            <div class="footer__follow-title">FOLLOW US</div>
            <div class="footer__social">
              <a href="${this.contactItems.twitter}" target="_blank" class="footer__twitter">
                ${twitter}
              </a>
              <a href="${this.contactItems.vk}" target="_blank" class="footer__vk">
                ${vk}
              </a>
              <a href="${this.contactItems.linkedin}" target="_blank" class="footer__linkedin">
                ${linkedin}
              </a>
            </div>
          </div>
        </div>
        <div class="footer__copyright">Copyright © 2021 Coffee. All rights reserved.</div>
      </div>
    </div>
    `);

    return footer;
  }
}
