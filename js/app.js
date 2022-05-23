'use strict';

// *********** GLOBAL VARIABLES ****************

let voteCount = 5;
let allProducts = [];
let products = [['bag','jpg'],['banana','jpg'],['bathroom','jpg'],['boots','jpg'],['breakfast','jpg'],['bubblegum','jpg'],['chair','jpg'],['cthulhu','jpg'],['dog-duck','jpg'],['dragon','jpg'],['pen','jpg'],['pet-sweep','jpg'],['scissors','jpg'],['shark','jpg'],['sweep','png'],['tauntaun','jpg'],['unicorn','jpg'],['water-can','jpg'],['wine-glass','jpg']];

// ********** DOM REFERENCES *******************

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');


let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

// ********** CONSTRUCTOR ********************

function Product(name,fileExtension){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.img = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

// ********** HELPER FUNCTIONS/EXECUTABLE CODE ********

function instantiateProducts(){
  for(let i=0;i<products.length;i++){
    new Product(`${products[i][0]}`,`${products[i][1]}`);
  }
}

// w3resources - Math.floor(Math.random()*items.length)
function getRandomIndex(){
  return Math.floor(Math.random()*allProducts.length);
}

function renderImgs(){
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  let i=0;
  while(i===0){
    if(productOneIndex === productTwoIndex || productOneIndex === productThreeIndex){
      productOneIndex = getRandomIndex();
    }else if(productTwoIndex === productThreeIndex){
      productTwoIndex = getRandomIndex();
    }else{i++;}
  }

  imgOne.src = allProducts[productOneIndex].img;
  imgOne.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imgTwo.src = allProducts[productTwoIndex].img;
  imgTwo.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imgThree.src = allProducts[productThreeIndex].img;
  imgThree.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

instantiateProducts();
renderImgs();

// ********* EVENT HANDLERS *******************
function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for(let i = 0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  //rerender 2 new Product images
  renderImgs();

  // once voting rounds completed - stop clicks
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);

  }

}

function handleShowResults(){
  if(voteCount === 0){
    for(let i = 0; i < allProducts.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${allProducts[i].name} was shown ${allProducts[i].views} times and voted for ${allProducts[i].votes} times.`;
      resultsList.appendChild(liElem);
    }
  }
}

// ********* EVENT LISTENERS ******************

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
