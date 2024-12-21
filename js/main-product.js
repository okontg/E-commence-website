import { menuElement, removeCategory } from "./header/disply-menu.js";
import { products } from "./product.js";
import { filterProduct, inputProductSearch, enterKey } from "./header/search-engine.js";
import { formateMoney } from "./utils/money.js";

menuElement;
removeCategory;
filterProduct();
inputProductSearch;
enterKey();


const basket = JSON.parse(localStorage.getItem('product')) ||[];

function productsFun(){

  let htmlElement = '';

  products.forEach((product)=>{
    const {id, image, name, price, category} = product;

    htmlElement += `
   <div class="product ${category}" data-search="search" >
      <img src="${image}" alt="product image"  class="product__image">

      <div class="product__details">
        <div class="set-background">
          <div class="container">
            <h3 class="product__name" data-product-name="search">${name}</h3>
            <span class="product-amount">$${formateMoney(price)}</span>
          </div>
          
          <div class="add-to-cart-wrapper">
            <button class="add-to-cart" data-add-product="${id}" data-add-cart="prodcut">Add to Cart</button>
            <h4 class="visible-state to__visible-${id}">Added</h4>
            <select class="select-quantity-${id}">
              <option value="1" class="product__quantity">1</option>
              <option value="2" class="product__quantity">2</option>
              <option value="3" class="product__quantity">3</option>
              <option value="4" class="product__quantity">4</option>
              <option value="5" class="product__quantity">5</option>
              <option value="6" class="product__quantity">6</option>
              <option value="7" class="product__quantity">7</option>
              <option value="8" class="product__quantity">8</option>
              <option value="9" class="product__quantity">9</option>
              <option value="10" class="product__quantity">10</option>
            </select>

          </div>
        </div>
      </div>
    </div>
  `;
  });

  document.querySelector('.product-wrapper').innerHTML = htmlElement;

}

productsFun();


/**
 * ADD EVENT LISTENER TO BUTTON ADD TO CART
 */

document.querySelectorAll('[data-add-cart="prodcut"]').forEach((buttonAddProduct)=>{
  buttonAddProduct.addEventListener('click',()=>{

    const productIds = buttonAddProduct.dataset.addProduct;
    
    const toVisible = document.querySelector(`.to__visible-${productIds}`);
    const visibility = (!buttonAddProduct.classList.contains('visible-state') && toVisible.classList.contains('visible-state'));
    
    /**
     *------------ SET TIME OUT 
     */
     let is__visible = false;
      if (visibility) {
        setTimeout(() => {
          buttonAddProduct.classList.add('visible-state');
          toVisible.classList.remove('visible-state');
          is__visible = true;
      
          setTimeout(() => {
            if (is__visible) {
              buttonAddProduct.classList.remove('visible-state');
              toVisible.classList.add('visible-state');
            }
          }, 1000); 
        }, 500);
      }
    
    
    selectingQuantity(productIds);
    localStorageFun();
  })
});


/**
 * USE REDUSE METHOD TO ADD THE QUANITIES TOGETHER
 */
const addQuantity =()=>{
  const sum = basket.map((item)=> item.quantity).reduce((y,x)=> y + x,0);
  document.querySelector('[data-product="quantity"]').innerText = sum;
} 

addQuantity();

/**
 * PUSH THE ITEM TO THE CART 
 */
const selectingQuantity =(product__id)=>{
  //SELECT PRODUCT QUANTITY
  const selectQuantity = document.querySelector(`.select-quantity-${product__id}`).value;
  const convertToNumber = Number(selectQuantity);

  //CHECK IF THE BUTTON CLICK MATCHED ANY ID IN THE BASKET/LOCAL STORAGE
  const matchingItem = basket.find((basketId)=> basketId.id === product__id);

  if(matchingItem === undefined){
    basket.push({
      id: product__id,
      quantity: 1,
      quantity: convertToNumber
    });
  }
  else{
    //SET A BOOLEAN VALUE OF TRUE,
    /*IF THERE IS A SELECTED VALUE INCRMENT THE QUANTITY
      BY THE SELECTED VALUE (convertToNumber)ELSE INCREMENT BY 1 */
    const isSelectedItem = true;
    matchingItem.quantity += isSelectedItem ? convertToNumber : 1;
  }   
}

//SAVE TO LOCAL STORAGE
const localStorageFun = ()=>{
  localStorage.setItem('product', JSON.stringify(basket));

  addQuantity();
}
