import Config from './js/cards';
import { Header } from './js/Header/header';
import { CardsContainer } from './js/CardsContainer/cardsContainer';
import { ChangeCategories } from './js/Categories/changeCategories';
import { DrawMainPage } from './js/drawMainPage';
import { RenderCardsForPlay } from './js/renderCardsForPlay';
import { Footer } from './js/Footer/footer';
import { RenderStatistic } from './js/renderStatistic';

document.body.appendChild(Header(Config.categories));
document.body.appendChild(CardsContainer(Config.categories));
document.body.appendChild(Footer());

const cardsContainer = document.querySelector('.cards-container');
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const burgerSpan = document.querySelector('.burger span');
const links = document.querySelectorAll('.nav .menu li a');
const switchButton = document.querySelector('.switch');

const state = {
  isTrainMode: true,
  isHome: true,
  pageNumber: 0,
};

let count = 1;
let prevCount = 0;
const newSoundsArray = [];
const sounds = [];
const result = [];

const statisticArray = [];
if (Config.cardsConfig) {
  Object.keys(Config.cardsConfig).forEach(key => {
    Object.values(Config.cardsConfig[key]).forEach((value) => {
      statisticArray.push(value);
    });
  })
}

const changeBurgerMenuStyle = (className) => {
  links.forEach((link) => {
    link.style.textDecoration = 'none';
  });
  document.querySelector(className).style.textDecoration = 'underline';
  nav.classList.remove('open-close');
  burger.classList.remove('burger-active');
};

const renderCards = (array, className) => {
  changeBurgerMenuStyle(className);
  cardsContainer.innerHTML = ChangeCategories(array);
  state.isHome = false;
};

const renderStatisticPage = (className, array) => {
  changeBurgerMenuStyle(className);
  cardsContainer.innerHTML = '';
  state.isHome = false;
  cardsContainer.appendChild(RenderStatistic(array));
};

const playAudio = (arr, target) => {
  arr.forEach((card) => {
    if (target.getAttribute('id') === card.id) {
      const audio = new Audio(card.audio);
      audio.play();
    }
  });
};

const flipBack = (property) => {
  property.addEventListener('mouseleave', () => {
    property.querySelector('.front').classList.remove('front-flip');
    property.querySelector('.back').classList.remove('back-flip');
  });
};

const changeTheme = () => {
  if (state.isTrainMode) {
    nav.classList.remove('play-mode');
    document.querySelectorAll('.card').forEach((item) => {
      item.classList.remove('play-mode');
    });
  } else {
    nav.classList.add('play-mode');
    document.querySelectorAll('.card').forEach((item) => {
      item.classList.add('play-mode');
    });
  }
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const repeatWord = (array) => {
  document.querySelector('.btn-repeat').addEventListener('click', () => {
    array[array.length - 1].play();
  });
};

const clickOnCard = (array) => {
  cardsContainer.insertAdjacentHTML('afterbegin', '<div class="star-container"></div>');
  const starContainer = document.querySelector('.star-container');
  const GAME_CARDS_AMOUNT = 8;
  document.addEventListener('click', (event) => {
    const targetId = event.target.getAttribute('id');
    const targetClass = event.target.getAttribute('class');
    if (targetClass === 'card-body' || targetClass === 'click-img' && count <= GAME_CARDS_AMOUNT) {
      if (count === GAME_CARDS_AMOUNT && array[prevCount].id === targetId) {
        const trueSound = new Audio('audio/true-click.mp3');
        trueSound.play();
        result.push(true);
        event.target.closest('.card').style.filter = 'brightness(0.3)';
        event.target.closest('.card').querySelector('.click-img').classList.remove('click-img');
        count += 1;
        let gameMistakes = 0;
        gameMistakes = result.reduce((prev, curr) => prev + Number(!curr), 0);
        setTimeout(() => {
          const header = document.querySelector('header');
          header.style.display = 'none';
          const footer = document.querySelector('footer');
          footer.style.display = 'none';
          if (gameMistakes === 0) {
            cardsContainer.innerHTML = `
            <div class="end-game-wrapper">
              <div class="end-game">
                <img src="img/success.jpg" alt="Success">
              </div>
              <div class="game-errors">You win!</div>
            </div>
            `;
            const success = new Audio('audio/success.mp3');
            success.play();
          } else {
            cardsContainer.innerHTML = `
              <div class="end-game-wrapper">
                <div class="end-game">
                  <img src="img/failure.jpg" alt="Success">
                </div>
                <div class="game-errors">${gameMistakes} errors!</div>
              </div>
            `;
            const lose = new Audio('audio/you_lose.mp3');
            lose.play();
          }
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }, 1000);
      } else if (array[prevCount].id === targetId) {
        const trueSound = new Audio('audio/true-click.mp3');
        trueSound.play();
        result.push(true);
        starContainer.insertAdjacentHTML('afterbegin', '<img class="star-img" src="img/star-win.svg" alt="star">');
        event.target.closest('.card').style.filter = 'brightness(0.3)';
        event.target.closest('.card').querySelector('.click-img').classList.remove('click-img');
        setTimeout(() => {
          const sound = new Audio(array[count].audio);
          sound.play();
          prevCount += 1;
          count += 1;
          sounds.push(sound);
          repeatWord(sounds);
        }, 1000);
      } else {
        const errorSound = new Audio('audio/error.mp3');
        starContainer.insertAdjacentHTML('afterbegin', '<img class="star-img" src="img/star.svg" alt="star">');
        errorSound.play();
        result.push(false);
      }
    }
  });
};

const gameStart = (array) => {
  array.forEach((item) => {
    const obj = {
      id: item.id,
      audio: item.audio,
    };
    newSoundsArray.push(obj);
  });
  shuffleArray(newSoundsArray);

  const sound = new Audio(newSoundsArray[0].audio);
  sound.play();
  clickOnCard(newSoundsArray);

  document.querySelector('.btn-start-game').remove();

  const btnRepeat = document.createElement('button');
  btnRepeat.innerHTML = 'Repeat';
  btnRepeat.classList.add('btn-repeat');
  cardsContainer.append(btnRepeat);
  sounds.push(sound);
  repeatWord(sounds);
};

document.addEventListener('click', (event) => {
  const { target } = event;
  const targetId = target.getAttribute('id');
  const targetClass = target.getAttribute('class');
  // burger
  if (target === burger || target === burgerSpan) {
    nav.classList.toggle('open-close');
    burger.classList.toggle('burger-active');
  } else if (event.target.closest('body') && !event.target.closest('nav')) {
    nav.classList.remove('open-close');
    burger.classList.remove('burger-active');
  }

  // change category
  if (targetId === '0' || targetClass === 'home') {
    changeBurgerMenuStyle('.home');
    cardsContainer.innerHTML = DrawMainPage(Config.categories);
    changeTheme();
    state.isHome = true;
  }
  Config.categories.forEach((item) => {
    if (targetId === item.id || targetClass === `link${item.id}`) {
      state.pageNumber = +item.id;
      renderCards(item.cards, `.link${+item.id}`);
      if (state.pageNumber !== Config.categories.length + 1 && state.isHome === false && state.isTrainMode === false) {
        cardsContainer.innerHTML = RenderCardsForPlay(Config.categories[state.pageNumber - 1].cards);
      }
      changeTheme();
    }
  });
  if (targetClass === 'statistic') {
    renderStatisticPage('.statistic', statisticArray);
    state.pageNumber = Config.categories.length + 1;
  }

  // play audio
  if (state.isTrainMode) {
    Config.categories.forEach((item) => {
      playAudio(item.cards, event.target);
    });
  }

  // rotate cards
  if (targetClass === ('reverse-button')) {
    event.target.closest('.front').classList.add('front-flip');
    event.target.closest('.card-flip').querySelector('.back').classList.add('back-flip');
    flipBack(event.target.closest('.card-flip'));
  }

  // start game
  if (targetClass === 'btn-start-game') {
    gameStart(Config.categories[state.pageNumber - 1].cards);
  }
  if (targetClass === 'btn-statistic sort-a-z') {
    statisticArray.sort((a,b) => a.name.localeCompare(b.name));
    renderStatisticPage('.statistic', statisticArray);
  }
  if (targetClass === 'btn-statistic sort-z-a') {
    statisticArray.sort((a,b) => b.name.localeCompare(a.name));
    renderStatisticPage('.statistic', statisticArray);
  }
});

switchButton.addEventListener('change', () => {
  state.isTrainMode = !state.isTrainMode;
  changeTheme();
  if (!state.isTrainMode && !state.isHome && state.pageNumber !== Config.categories.length + 1) {
    cardsContainer.innerHTML = RenderCardsForPlay(Config.categories[state.pageNumber - 1].cards);
    changeTheme();
  } 
  if (state.isTrainMode && !state.isHome && state.pageNumber !== Config.categories.length + 1) {
    renderCards(Config.categories[state.pageNumber - 1].cards, `.link${Config.categories[state.pageNumber - 1].id}`);
    changeTheme();
  }
});
