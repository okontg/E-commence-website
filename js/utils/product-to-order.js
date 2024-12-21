export function productToOrder(cart){
   /**
       * CSS WITH JAVA SCRIPT STYLES
       */
  function effectStyling(){

    //ADD A BLUR EFFECT TO THE CART
    const blur__effect = document.querySelector('[data-main="container"]');
    let blurEffect = false;
    if(!blur__effect.classList.contains('blur__effect')){
      blur__effect.classList.add('blur__effect');
      blurEffect = true;
    }
    else{
      blur__effect.classList.remove('blur__effect');
      blurEffect = false;
    }

    /**-------------- DISPLAY FORM */
    if(blurEffect){
      const visibleElement = document.querySelector('[data-form="form"]');
      if(visibleElement.classList.contains('invisible')){
        visibleElement.classList.remove('invisible');
        visibleElement.classList.add('visible');
      }
      else{
        visibleElement.classList.add('invisible');
        visibleElement.classList.remove('visible');
      }
    }
  }
  effectStyling();

  document.querySelector('[data-submit="form"]').addEventListener('click',(e)=>{
    e.preventDefault();

    productToOrder()
  })

  /**-----------------
   * ------------------PRODUCT TO ORDER
   */
  function productToOrder(){
    const orderProduct = confirm('You Want to Place Order?')
    if(orderProduct){
      //------ORDER DATE
      const now = new Date();
      const dateFormate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }

      const orderDate = now.toLocaleDateString('en-Us',dateFormate);
      //------------MAKE A ORDER ID FOR EACH ORDER
      const order__id = Math.floor(Math.random() * 19997467).toString(18).padStart(8, '0');
      //--------GET THE ORDER PRODUCT FROM THE LOCAL STORAGE
      const currentOrderItems = JSON.parse(localStorage.getItem('orderProduct')) || [];
      //----------USE SPARDE METHOD
      currentOrderItems.push({orderId: order__id, date: orderDate, items: [...cart]});
      
      localStorage.setItem('orderProduct',JSON.stringify(currentOrderItems));

      cart = [];
      window.location.reload(true);
      localStorage.setItem('product',JSON.stringify(cart));
    }
    else{
      console.log('Order Not Placed');
    }  
  }
}

export function reMoveForm(){
/**
   *------------ REMOVE THE FORM
   */
   document.querySelector('[data-remove="form"]').addEventListener('click',()=>{
    const visibleElement = document.querySelector('[data-form="form"]');
    const blur__effect = document.querySelector('[data-main="container"]');
    if(visibleElement.classList.contains('visible')){
      blur__effect.classList.remove('blur__effect');
      visibleElement.classList.remove('visible');
      visibleElement.classList.add('invisible');
    } 
  });
}