import createElement from '../../lib/create-element';
import './index.css';
import phone from '../../icons/phone.svg';
import email from '../../icons/email.svg';
import twitter from '../../icons/twitter.svg';
import facebook from '../../icons/facebook.svg';
import instagram from '../../icons/instagram.svg';
import linkedin from '../../icons/linkedin.svg';

export default class FollowUs {
  contactItems = {};
  elem = null;

  constructor(contactItems) {
    this.contactItems = contactItems;
    this.elem = this.#createFollowUs();
  }

  #onContactClick = e => {
    if (e.target.closest('.follow__number')) {
      document.location.href = `tel:${this.contactItems.phone}`;
    }

    if (e.target.closest('.follow__address')) {
      document.location.href = `mailto:${this.contactItems.email}`;
    }

    if (e.target.closest('.follow__twitter')) {
      window.open(this.contactItems.twitter,'_blank');
    }

    if (e.target.closest('.follow__facebook')) {
      window.open(this.contactItems.facebook,'_blank');
    }

    if (e.target.closest('.follow__instagram')) {
      window.open(this.contactItems.instagram,'_blank');
    }

    if (e.target.closest('.follow__linkedin')) {
      window.open(this.contactItems.linkedin,'_blank');
    }
  }

  #createFollowUs() {
    const followUs = createElement(`
    <div class=follow>
      <div class=follow__info>
        <div class=follow__title>Follow US</div>
        <div class=follow__text>Have an inquiry?<br>Text or call and ask Something.</div>
        <div class=follow__contact>
          <div class=follow__phone>
            <div class=follow__phone-icon>${phone}</div>
            <div class=follow__number>${this.contactItems.phone}</div>
          </div>
          <div class=follow__email>
            <div class=follow__email-icon>${email}</div>
            <div class=follow__address>${this.contactItems.email}</div>
          </div>
          <div class=follow__social>
            <div class=follow__twitter>${twitter}</div>
            <div class=follow__facebook>${facebook}</div>
            <div class=follow__instagram>${instagram}</div>
            <div class=follow__linkedin>${linkedin}</div>
          </div>
        </div>
      </div>
    </div>
    `);

    followUs.addEventListener('click', this.#onContactClick);

    return followUs;
  }
}