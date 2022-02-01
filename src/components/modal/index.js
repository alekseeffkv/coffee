import createElement from '../../lib/create-element';
import './index.css';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.#createModal();
  }

  #createModal() {
    let modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1V11" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 6H11" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>
    </div>
    `);

    return modal;
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(modalBody) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(modalBody);
  }

  open() {
    document.body.prepend(this.elem);

    document.body.classList.add('is-modal-open');

    document.querySelector('.modal__close').addEventListener('click', this.close);

    document.onkeydown = event => {
      if (event.code === 'Escape') this.close();
    };
  }

  close() {
    if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
    
    document.body.classList.remove('is-modal-open');

    document.onkeydown = null;
    }
  }
}
