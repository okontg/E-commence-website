/**
 * IMPORT FILES
 */
import { products } from "../product.js";
import { formateMoney } from "../utils/money.js";
import { productToOrder, reMoveForm } from "../utils/product-to-order.js";
//import { orders } from "../order-item.js";

let cart =  JSON.parse(localStorage.getItem('product')) || [];
 
const reloadPage = ()=>{
  if(cart.length >= 1){
    let cartHTML = '';

    cart.map(cartContainer =>{
      const {id, quantity} = cartContainer;

      const productId = products.find((product__ids)=> product__ids.id === id);
      const {name, price, image} = productId;

      /**
       * TOTAL PRICE
       */
      const total__price = price * quantity;
      
      cartHTML += `
      <div class="wrapper js__product-to-delete-${id}">
        <div class="which__product grid-item">
          <h3 class="product__id">Product ID: ${id}</h3>
          <button class="delete" data-product-to="delete" data-product-id="${id}">×</button>
        </div>

        <div class="product__wrapper">
          <img src="${image}" alt="product image" width="200" class="product-to__order">

          <div class="product__info">
            <h3 class="product__name">${name}</h3>
            <div class="quantity__button grid-item">
              <button class="decres__button" data-decrement-item="${id}" data-decrement="button">—</button>
              <span class="total-item" data-quantity-${id}>${quantity}</span>
              <button class="incress__button" data-increment-item="${id}" data-increment="button">+</button>
            </div>

            <div class="product__price grid-item">
              <span class="single__price">$${formateMoney(price)}</span>
              <span class="total__price">$${formateMoney(total__price)}</span>
            </div>

          </div>
        </div> 
      </div>
      `; 

      document.querySelector('[data-htmlElement="cart"]').innerHTML = cartHTML;
    });

    const sum__up =()=>{
      let sumPrice = 0;
      cart.map(total__quantity =>{
        const {id, quantity} = total__quantity;

        const product__price = products.find(matching__id => matching__id.id === id);
        const {price} = product__price;

        sumPrice += price * quantity;
      })
      return sumPrice;
    }
    const total__amount = sum__up();

    const totalItemOrder = cart.map(total__item => total__item.quantity).reduce((y,x )=> y + x, 0);

    const orderHTML =`
     <div class="order__wrapper">
        <div class="total__items"><h3>Total Item(s):</h3> <span>${totalItemOrder}</span> </div>
        <div class="total__amount-of-item"><h4>Total Amount: </h4><span>$${formateMoney(total__amount)}</span></div>
        <div class="orders-button"><button class="order__button" data-order="item">Place Ordr(s)</button></div>
      </div> 

      <div class="order-button">
        <a href="../html/order-item.html"> See order</a>
      </div>
    `;

    document.querySelector('[data-left-container="product"]').innerHTML = orderHTML;
  }
  else{
    const visibleElement = document.querySelector('header .header__invisible');
    visibleElement.style.display = 'flex';
  }

  /**
   *------------- INCREMENT PRODUCT BUTTON
   */
  document.querySelectorAll('[data-increment="button"]').forEach((button)=>{
    button.addEventListener('click',()=>{
    const in__crement =  button.dataset.incrementItem;
    
    cartFun(in__crement, false);
    
    });
  });

  /**
   *----------- DECREMENT PRODUCT BUTTON
   */
  document.querySelectorAll('[data-decrement="button"]').forEach((button)=>{
    button.addEventListener('click',()=>{
      
      const de__crement = button.dataset.decrementItem;

      cartFun(de__crement, true);
    });
  });

  //-------------UPDATE THE QUANTITY AND PAGE BASE ON THE BUTTON CLICKED
  function cartFun(id, isDecrement){
    const itemToUpdate = cart.find((cartId)=> cartId.id === id);

    if(itemToUpdate){
      itemToUpdate.quantity += isDecrement ? -1 : 1;

      cart = cart.filter((x)=> x.quantity !== 0);
     
      cartLessThanOne();
    }
    save(itemToUpdate);
  }

  /**
   * if the cart is zero(0)
   */
  function cartLessThanOne(){
    if(cart.length <= 0){
      document.querySelector('[data-htmlElement="cart"]').innerHTML = '';
      document.querySelector('[data-left-container="product"]').innerHTML = '';
    }
  } 

  /**
   *------------- DELETE PRODUCT BUTTON
   */
  document.querySelectorAll('[data-product-to="delete"]').forEach((deleteButton)=>{
    deleteButton.addEventListener('click',()=>{
      const deleteId = deleteButton.dataset.productId;
      
      const deleteProduct = document.querySelector(`.js__product-to-delete-${deleteId}`);
      
      const confirmButton = confirm('You Want to Remove the Product?');
      if(confirmButton){
        deleteProduct.remove();
        cart = cart.filter((x) => x.id !== deleteId);    
        save();

        cartLessThanOne();
      }      
    });
  });

  //------------- SAVE TO LOCAL STORAGE
  function save(){
    localStorage.setItem('product',JSON.stringify(cart));
    reloadPage();
  }

  //---------SUM ITEMS IN THE CART
  const totalItemOrder = cart.map(total__item => total__item.quantity).reduce((y,x )=> y + x, 0);
  document.querySelector('[data-total="item"]').innerText = `Total Item: ${totalItemOrder}`;


  /**
   *---------- ITEM TO ORDER
   */
  if(cart.length !== 0){
    const orderItems = document.querySelector('[data-order="item"]').addEventListener('click',()=>{

     productToOrder(cart);
     //save();

    });
    orderItems;
  }
  else{
    console.log('The Cart is Empty');
  }
  reMoveForm();
} 
reloadPage();



