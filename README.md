# Coffee Landing Page

Coffee Landing Page --- одностраничный сайт компании по продаже кофейных зерен, который написан на чистом модульном JavaScript. Компоненты собраны с помощью Webpack и размещены на <https://coffee.alekseeffkv.ru>. Есть адаптация под смартфоны.

Проект состоит из следующих модулей:

## Header

Этот компонент создает хедер. После этого в него вставляются еще два модуля: **Navigation** и **CartIcon**.

Компонент навигации берет названия и ссылки для пунктов меню из файла `nav-items.js` и отрисовывает его.

Компонент иконки корзины отрисовывает иконку корзины и имеет метод **update**, который принимает компонент **Cart** и отрисовывает количество товаров в корзине.

При скролле хедер фиксируется.

## Carousel

Этот модуль создает карусель, в которую вставляются карточки товаров в виде компонента **ProductCard**. Перед этим делается запрос на сервер для загрузки файла `products.json`, который содержит данные по продуктам.

В карточке товара пользователь может выбрать количество товара и добавить его в корзину. После этого на иконке корзины появляется количество продуктов в корзине.

## Cart

После клика по иконке корзины загружается компонент **Modal**, который отрисовывает окно корзины. Сама корзина загружается ранее после модуля **CartIcon** и принимает его в качестве аргумента.

В корзине можно изменить количество продуктов, заполнить данные пользователя и отправить заказ на сервер.

## Gallary

Компонент **Gallery** отрисовывает картинки, которые имеют разный размер. Для этого используется библиотека [Masonry](https://masonry.desandro.com/). За подгрузку изображений отвечает метод **ShowMore**.

## FollowUs

Модуль **FollowUs** берет контактные данные из файла `contact-items.js` и отрисовывает их. Все переходы по ссылкам в этом модуле сделаны с помощью JavaScript.

## News

Компонент **News** отрисовывает карточки с новостями. Данные для карточек берет из файла `news-items.js`.

## Footer

Этот модуль создает футер. Контактные данные берет из файла `contact-items.js`.