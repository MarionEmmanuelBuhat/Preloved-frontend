import css from './frontpage.module.css';

import logo from '../assets/preloved-logo.jpg';
import shopping_cart from '../assets/icons/shopping_cart.svg';
import search_icon from '../assets/icons/search_icon.svg';

import beigeJacket from '../assets/clothes/beige-jacket.jpg';
import blueBoxer from '../assets/clothes/blue-boxer-shorts.jpg';
import checkeredSweater from '../assets/clothes/checkered-sweater.jpg';
import greySlacks from '../assets/clothes/grey-slacks.jpg';
import khakiJacket from '../assets/clothes/khaki-jacket.jpg';
import greenSweater from '../assets/clothes/green-sweater.jpg';

const repeatArray = (array, n) => Array.from({ length: n }, () => array).flat();

export default function() {
  const clothingItems = [
    beigeJacket,
    blueBoxer,
    checkeredSweater,
    greySlacks,
    khakiJacket,
    greenSweater,
  ];

  const repeatedClothingItems = repeatArray(clothingItems, 10);

  return (
    <div className={css.wrapper}>
      <div className={css.nav_bar}>
        <img src={logo} className={css.logo} alt="Preloved Logo" />
        <div className={css.search_bar}>
          <img src={search_icon} alt="Search Icon" />
          <input type="text" placeholder="Search" />
        </div>
        <img src={shopping_cart} className={css.shopping_cart} alt="Shopping Cart" />
        <button>
          <p>Sign Up</p>
        </button>
        <button>
          <p>Login</p>
        </button>
      </div>

      <div className={css.display_clothing}>
        {repeatedClothingItems.map((item, index) => (
          <img key={index} src={item} alt={`Clothing Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}