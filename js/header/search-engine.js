
// USE EVENT DELEGATION FOR THE SEARCH BUTTON

/**
 * The header button to search for category
 */
export function filterProduct() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('[data-key]')) {
      const data__Key = target.dataset.key;

      // Remove the 'active' class from all data-key elements
      const allDataKeys = document.querySelectorAll('[data-key]');
      allDataKeys.forEach(key => key.classList.remove('active-state'));

      // Add the 'active' class to the clicked element
      target.classList.add('active-state');

      // Handle product filtering based on data__Key
      const productWrapper = document.querySelectorAll('[data-search="search"]');
      if (data__Key === 'all') {
        productWrapper.forEach(productClass => productClass.classList.remove('hidden'));
      } else {
        productWrapper.forEach(productClass => {
          const productCategory = productClass.classList.contains(data__Key);
          if (productCategory) {
            productClass.classList.remove('hidden');
          } else {
            productClass.classList.add('hidden');
          }
        });
      }
    }
  });
}
  

/**
 * Search for product using the input filed
 */

function productToSearch(){
  const searchInputFiled = document.querySelector('[data-input-filed="search"]');
  const searchInputValue = searchInputFiled.value.toUpperCase();
  const productContainers = document.querySelectorAll('[data-search="search"]');

  let isMatchedFound = false;

  productContainers.forEach((product__container)=>{
    const productName = product__container.querySelector('.product__name').textContent.toUpperCase();

    if(productName.includes(searchInputValue)){   
      product__container.classList.remove('hidden');
      isMatchedFound = true;
    }
    else{
      product__container.classList.add('hidden');  
    } 
  });

  if(!isMatchedFound){
    alert('No Matched Product, Please search another product');
    window.location.reload();
  }

  searchInputFiled.value = ''; 
}

export const inputProductSearch = document.querySelector('[data-submit="search"]')
.addEventListener('click',()=>{
  productToSearch()
});

export function enterKey(){

  window.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
      productToSearch();
    }    
  })
}



  