import createElement from '../../lib/create-element';
import './index.css';
import plus from '../../icons/plus.svg';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.#createModal();
  }

  #createModal() {
    const modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            ${plus}
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

    document.onkeydown = (event) => {
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
