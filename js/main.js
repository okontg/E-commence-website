let products ={
  data:[
    {
      productName: 'Regular White T-Shirt',
      category: 'Topwear',
      price: '30',
      image: '../products/men-golf-polo-t-shirt-blue.jpg'
    },
    {
      productName: 'Beige Short Skirt',
      category: 'Bottomwear',
      price: '49',
      image: '../products/women-chiffon-beachwear-coverup-black.jpg'
    },
    {
      productName: 'Sport Smartwatch',
      category: 'Watch',
      price: '99',
      image: '../products/straw-sunhat.webp'
    },
    {
      productName: 'Basic Knitted Top',
      category: 'Topwear',
      price: '30',
      image: '../products/adults-plain-cotton-tshirt-2-pack-teal.jpg'
    },
    {
      productName: 'Black Leather Jacket',
      category: 'Jacket',
      price: '129',
      image: '../products/men-cozy-fleece-zip-up-hoodie-red.jpg'
    },
    {
      productName: 'Stylish Pink Trouser',
      category: 'Bottomwear',
      price: '200',
      image: '../products/women-stretch-popover-hoodie-black.jpg'
    },
    {
      productName: `Brown Men's' Jacket`,
      category: 'Jacket',
      price: '189',
      image: '../products/men-athletic-shoes-green.jpg'
    }, 
    {
      productName: 'Luxury Tower Set',
      category: 'Bottomwear',
      price: '93',
      image: '../products/luxury-tower-set-6-piece.jpg'
    }, 
    {
      productName: 'Duvet Cover Blue',
      category: 'Topwear',
      price: '100',
      image: '../products/duvet-cover-set-blue-twin.jpg'
    },
    {
      productName: 'Men Chino Trouser',
      category: 'Topwear',
      price: '29',
      image: '../products/men-chino-pants-beige.jpg'
    }
  ]
};

for(let i of products.data){
  //create card
  let card = document.createElement('div');
  //card should have category and should stay hidden initially
  card.classList.add('card', i.category, 'hidden');
  //image div
  let imgContainer = document.createElement('div');
  imgContainer.classList.add('image-container');
  //img tag
  let image = document.createElement('img');
  image.setAttribute('src',i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  document.getElementById('products').appendChild(card);

  //product details
  let productDetails = document.createElement('div');
  productDetails.classList.add('product-details')
  let productName = document.createElement('h4');
  productName.classList.add('product-name');
  productName.innerText = i.productName.toUpperCase();
  productDetails.appendChild(productName);
  card.appendChild(productDetails);

  //price
  let price = document.createElement('h5');
  price.classList.add('product-price');
  price.innerText = `$${i.price}`;
  productDetails.appendChild(price);
}

//perameter passed from button (paremeter same as category)
function filterProduct(value){
  //Button class code
  let buttons = document.querySelectorAll('.button-value');
  buttons.forEach(button =>{
    //Check if the value equals innerText
    if(value.toUpperCase() == button.innerText.toUpperCase()){
      button.classList.add('active');
    }
    else{
      button.classList.remove('active');
    }
  });

  //select all cards
  let elements = document.querySelectorAll('.card');
  //loop through all cards
  elements.forEach((element)=>{
    //display all cards on 'all' button click

    if(value == 'all'){
      element.classList.remove('hidden');
    }
    else{
      //check if element contains category class
      if(element.classList.contains(value)){
        //display elment base on category
        element.classList.remove('hidden');
      }
      else{
        //hide other elements
        element.classList.add('hidden');
      }
    }
  })
}

//search button click
document.getElementById('search')
.addEventListener('click',()=>{
  //initializations
  let searchInput = document.getElementById('search-input').value;
  let product__name = document.querySelectorAll('.product-name');
  let cards = document.querySelectorAll('.card');

  //loop through all product__name
  product__name.forEach((element,index)=>{
    //check if the text include the search value

    if(element.innerText.includes(searchInput.toUpperCase())){
      //display matching card
      cards[index].classList.remove('hidden');
    }
    else{
      //hide other
      cards[index].classList.add('hidden')
    }
  })
})

//initial display all product
window.onload =()=>{
  filterProduct('all')
}