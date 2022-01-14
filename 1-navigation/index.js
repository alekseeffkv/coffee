import createElement from "../assets/lib/create-element.js";

export default class Navigation {
  navItems = [];
  elem = null;

  constructor(navItems) {
    this.navItems = navItems;
    this.elem = this.#createNav();
  }

  #linkTemplate(navItem) {
    return `<a href="${navItem.link}" class="navigation__item">${navItem.title}</a>`;
  }

  #createNav() {
    const nav = createElement(`
      <nav class="navigation">
        ${this.navItems.map(this.#linkTemplate).join('')}
      </nav>
    `)

    let preLink = null;

    nav.addEventListener('click', e => {
      if (e.target.classList.contains("navigation__item")) {
        !preLink || preLink.classList.remove("navigation__item_active");

        e.target.classList.add("navigation__item_active");

        preLink = e.target;
      }
    });

    return nav;
  }
}