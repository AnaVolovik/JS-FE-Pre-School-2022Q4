document.addEventListener('DOMContentLoaded', function() {
  let burger = document.getElementById('menu-mobile__icon');
  let overlay = document.querySelector('.wrapper-overlay');
  let mobileMenu = document.querySelector('.menu-mobile__wrapper');
  let bodyScroll = document.getElementsByTagName('body')[0];
  let menuItem = document.querySelectorAll('li');

  function openBurger() {
    burger.classList.toggle('rotate-icon');
    overlay.classList.toggle('overlay');
    mobileMenu.classList.toggle('show-menu');
    bodyScroll.classList.toggle('no-scroll');
  }

  burger.addEventListener('click', openBurger);
  menuItem.forEach(el => el.addEventListener('click', openBurger));

  document.addEventListener('click', (e) => {
    if (document.documentElement.clientWidth < 767) {
      const pathIcon = e.composedPath().includes(burger);
      const pathMenu = e.composedPath().includes(mobileMenu);
  
      if (!pathIcon && !pathMenu) {
        openBurger();
      }
    }
  });
});
//TODO
//Реализация слайдера-карусели на странице Main: (0/36)
//Реализация пагинации на странице Pets: (0/36)
//Реализация попап на обеих страницах: (0/12)