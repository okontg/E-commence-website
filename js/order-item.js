import { products } from "./product.js";

const orderPorduct = JSON.parse(localStorage.getItem('orderProduct'));

console.log(orderPorduct);

function content() {
  const holder = [];
  if(orderPorduct !== null ){
    orderPorduct.forEach((container__id) => {
      const container = container__id;
      let containerHtml = '';

      container.items.forEach((item) => {
        const matchingProduct = products.find((product) => product.id === item.id);
        if (matchingProduct) {
          const { image, id, name/* other properties */ } = matchingProduct;
          containerHtml += `
            <div class="order-product">
              
              <div class="data-order-info">
                <img src="${image}">
                <div class="order__info">
                  <h5 class="product__name">${name}</h5>
                  <h5>Prograss Bar</h5>
                  <div class="">
                    <div class="progresses"><span></span></div>
                    <div class="progress-label">
                      <h6>Start</h6>
                      <h6>Progress</h6>
                      <h6>Deliver</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      });

      holder.push({ containerId: container, html: containerHtml });
    });
    return holder;
  } 
}

function displayHTML() {
  const orders = content();
  const mainContainer = document.querySelector('[data-order-product="orders"]');

  if(orders !== undefined){
    orders.forEach((order) => {
      const {orderId, date} = order.containerId;
    
      const orderContainer = document.createElement('div');
      orderContainer.classList.add('new-order__container');
      orderContainer.innerHTML = `
      <div class="order-data">
        <h3 class="order__id">Order ID: ${orderId}</h3> 
        <h4 class="order__date">${date}</h4> 
      </div>
      ${order.html}`;
      mainContainer.appendChild(orderContainer);
    });
  }
}
displayHTML();
