import './cardsContainer.css';
import { DrawMainPage } from '../drawMainPage';

export const CardsContainer = (categories) => {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');
  cardsContainer.innerHTML = DrawMainPage(categories);
  return cardsContainer;
};
