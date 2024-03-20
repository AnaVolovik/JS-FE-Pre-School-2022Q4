document.addEventListener('DOMContentLoaded', function() {
  const menuIconOpen = document.getElementById('menu_icon-open');
  const menuIconClose = document.getElementById('menu_icon-close');
  const menuMobile = document.querySelector('.menu_mobile');
  const menuItem = document.querySelector('.item_mobile');
  const mediaTablet = 'screen and (max-width: 768px)';
  const mediaTabletPlus = 'screen and (max-width: 1439px) and (min-width: 769px)';

  menuIconOpen.onclick = function() {
    menuIconOpen.classList.remove('animaOn');
    menuIconOpen.classList.add('animaOff');
    menuIconClose.classList.remove('animaOff');
    menuIconClose.classList.add('animaOn');
    menuMobile.classList.remove('animaOff');
    menuMobile.classList.add('animaOn');
  }

  menuIconClose.onclick = function() {
    menuIconOpen.classList.remove('animaOff');
    menuIconOpen.classList.add('animaOn');
    menuIconClose.classList.remove('animaOn');
    menuIconClose.classList.add('animaOff');
    menuMobile.classList.remove('animaOn');
    menuMobile.classList.add('animaOff');
  }

  menuItem.onclick = function() {
    menuIconOpen.classList.remove('animaOff');
    menuIconOpen.classList.add('animaOn');
    menuIconClose.classList.remove('animaOn');
    menuIconClose.classList.add('animaOff');
    menuMobile.classList.remove('animaOn');
    menuMobile.classList.add('animaOff');
  }

  document.addEventListener( 'click', (e) => {
    if (document.documentElement.clientWidth < 700) {
      const pathOpen = e.composedPath().includes(menuIconOpen);
      const pathClose = e.composedPath().includes(menuIconClose);
      const pathMenu = e.composedPath().includes(menuMobile);
  
      if (!pathOpen && !pathClose && !pathMenu) {
        menuIconOpen.classList.remove('animaOff');
        menuIconOpen.classList.add('animaOn');
        menuIconClose.classList.remove('animaOn');
        menuIconClose.classList.add('animaOff');
        menuMobile.classList.remove('animaOn');
        menuMobile.classList.add('animaOff');
      }
    }
  });

  window.addEventListener("resize", function() {
    if (window.matchMedia(mediaTablet).matches || window.matchMedia(mediaTabletPlus).matches || document.documentElement.clientWidth >= 1440 ) {
      menuIconOpen.classList.remove('animaOn');
      menuIconOpen.classList.remove('animaOff');
      menuIconClose.classList.remove('animaOn');
      menuIconClose.classList.add('animaOff');
      menuMobile.classList.remove('animaOn');
      menuMobile.classList.add('animaOff');
    }
  });

  const serviceBtns = document.querySelectorAll('.service__nav_btn');
  const serviceList = document.querySelectorAll('.service__list_item');
  let activeBtns = [];
  let blurItems = [];

  serviceList.forEach(el => {
    blurItems.push(el);
  })

  for (let i = 0; i < serviceBtns.length; i++) {
    serviceBtns[i].addEventListener('click', function() {
      serviceBtns[i].classList.toggle('active');

      if(serviceBtns[i].classList.value.match('active')) {
        activeBtns.push(serviceBtns[i]);
      }

      if(activeBtns.length == 3) {
        activeBtns[0].classList.remove('active');
        activeBtns.splice(0,1);
      }

      activeBtns.forEach(el => {
        if(!el.classList.value.match('active')){
          let ind = activeBtns.indexOf(el, 0);
          activeBtns.splice(ind,1);
        }
      });

      blurItems.forEach(el => {
        el.classList.add('blur');
        for (let j = 0; j < activeBtns.length; j++) {
          let str = activeBtns[j].textContent;
          if(el.textContent.match(str.substr(0,4))) {
            el.classList.remove('blur');
          }
        }
        if (activeBtns.length == 0) {
          el.classList.remove('blur');
        }
      })
    })
  }

  const ratesOpened = document.querySelectorAll('.accordion__item_opened');
  const titlesOpened = document.querySelectorAll('.accordion__title_opened');
  const ratesClosed = document.querySelectorAll('.accordion__item_closed');

  for (let i = 0; i < ratesClosed.length; i++) {

    ratesClosed[i].addEventListener('click', function() {
      ratesOpened.forEach(el => el.classList.remove('opened'));
      ratesClosed.forEach(el => el.classList.remove('closed'));
      ratesOpened[i].classList.add('opened');
      ratesClosed[i].classList.add('closed');

      titlesOpened[i].addEventListener('click', function() {
        ratesOpened.forEach(el => el.classList.remove('opened'));
        ratesClosed.forEach(el => el.classList.remove('closed'));
      })
    })
  }

  const wrapperForm = document.querySelector('.wrapper_form');
  const formCities = document.querySelector('.form__cities');
  const formTitle = document.querySelector('.form__title');
  const circleForm = document.querySelector('.circle__form');
  const wrapperCities = document.querySelector('.wrapper_cities');
  const city = document.querySelectorAll('.city');
  let selectCity = document.querySelector('.select_city');
  let activeCity = [];

  const allCities = [
    {
      city: 'Canandaigua, NY',
      phone: '+1	585	393 0001',
      officeAddress: '151 Charlotte Street'
    },
    {
      city: 'New York City',
      phone: '+1	212	456 0002',
      officeAddress: '9 East 91st Street'
    },
    {
      city: 'Yonkers, NY',
      phone: '+1	914	678 0003',
      officeAddress: '511 Warburton Ave'
    },
    {
      city: 'Sherrill, NY',
      phone: '+1	315	908 0004',
      officeAddress: '14 WEST Noyes BLVD'
    }
  ];

  const cityCard = document.querySelector('.city__card');
  const itemValues = document.querySelectorAll('.item_value');
  const cardBtn = document.querySelector('.card__btn');

  formTitle.addEventListener('click', function() {
    formCities.classList.toggle('form__cities_opened');
    formTitle.classList.toggle('form__title_opened');
    circleForm.classList.toggle('circle__form_opened');
    wrapperCities.classList.toggle('wrapper_cities_opened');
    cityCard.style.display = 'none';
    formTitle.style.backgroundColor = '#c1e698';
  })

  for (let i = 0; i < city.length; i++) {
    city[i].addEventListener('click', function() {

      selectCity.innerHTML = city[i].textContent;
      city[i].classList.add('activeCity');
      formCities.classList.toggle('form__cities_opened');
      formTitle.style.backgroundColor = '#c1e698';
      circleForm.classList.toggle('circle__form_opened');
      wrapperCities.classList.toggle('wrapper_cities_opened');
      
      activeCity.push(city[i]);
      if (activeCity.length > 1) {
        activeCity[0].classList.remove('activeCity');
        activeCity.splice(0,1);
      }

      cityCard.style.display = 'block';
      for (let j = 0; j < allCities.length; j++) {
        if(allCities[j]['city'] === city[i].textContent) {
          itemValues[0].innerHTML = allCities[j]['city'];
          itemValues[1].innerHTML = allCities[j]['phone'];
          itemValues[2].innerHTML = allCities[j]['officeAddress'];
          const linkTel = document.querySelector('.card__link');
          linkTel.setAttribute( 'href', 'tel:'+ allCities[j]['phone']);
        }
      }
    })
  }

  document.addEventListener( 'click', (e) => {
    const pathSelect = e.composedPath().includes(wrapperForm);
    
    if (!pathSelect) {
      selectCity.innerHTML = 'City';
      formCities.classList.remove('form__cities_opened');
      formTitle.classList.remove('form__title_opened');
      formTitle.style.backgroundColor = '#d6e7d2';
      circleForm.classList.remove('circle__form_opened');
      wrapperCities.classList.remove('wrapper_cities_opened');
      cityCard.style.display = 'none';
    }
  });
})