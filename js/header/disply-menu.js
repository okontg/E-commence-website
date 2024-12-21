export const menuElement = document.querySelector('.bx-menu').addEventListener('click',()=>{
  
  const productCategory = document.querySelector('.category__of-product');
  if(productCategory.classList.contains('active')){
    productCategory.classList.remove('active');
  }
  else{
    productCategory.classList.add('active');

    const removeIcon = document.querySelector('.bx-menu'); 
    removeIcon.classList.add('remove-menu-icon');
    
    document.querySelector('.bx-x').classList.remove('hide-category')
  }
})


export const removeCategory = document.querySelector('.bx-x').addEventListener('click',()=>{

  document.querySelector('.bx-x').classList.add('hide-category');
  document.querySelector('.category__of-product').classList.remove('active');
  document.querySelector('.category__of-product').classList.add('transformElement');
 
  const removeIcon = document.querySelector('.bx-menu'); 
  removeIcon.classList.remove('remove-menu-icon');
})
