'use strict';

// *********** GLOBAL VARIABLES ****************

let voteCount = 25;
let allProducts = [];
let products = [['bag','jpg'],['banana','jpg'],['bathroom','jpg'],['boots','jpg'],['breakfast','jpg'],['bubblegum','jpg'],['chair','jpg'],['cthulhu','jpg'],['dog-duck','jpg'],['dragon','jpg'],['pen','jpg'],['pet-sweep','jpg'],['scissors','jpg'],['shark','jpg'],['sweep','png'],['tauntaun','jpg'],['unicorn','jpg'],['water-can','jpg'],['wine-glass','jpg']];

// ********** DOM REFERENCES *******************

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// ************ CANVAS REFERENCE ****************
let ctx = document.getElementById('my-chart').getContext('2d');

// ********** CONSTRUCTOR ********************

function Product(name,fileExtension){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.img = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

// ******** USE DATA FROM LOCAL STORAGE *********

// pull data from storage
let retrievedProducts = localStorage.getItem('products');
// parse data back to usable code
let parsedProducts = JSON.parse(retrievedProducts);

// use the data from local storage
if(retrievedProducts){
  allProducts=parsedProducts;
}else{
  instantiateProducts();
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

let numsIndex = [];
function renderImgs(){
  while(numsIndex.length<6){
    let randomNum = getRandomIndex();
    if(!numsIndex.includes(randomNum)){
      numsIndex.push(randomNum);
    }
  }

  let productOneIndex = numsIndex.shift();
  let productTwoIndex = numsIndex.shift();
  let productThreeIndex = numsIndex.shift();

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
// render random images to page
renderImgs();

// *********** RENDER CHART ****************
function renderChart(){
  let productNames =[];
  let productVotes =[];
  let productViews = [];

  for(let i=0;i<allProducts.length;i++){
    productNames.push(allProducts[i].name);
    productVotes.push(allProducts[i].votes);
    productViews.push(allProducts[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx,myChartObj);
}


// ********* EVENT HANDLERS *******************
function handleClick(event) {
  voteCount--;

  let imgClicked = event.target.alt;

  for(let i=0;i<allProducts.length;i++){
    if(imgClicked===allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  renderImgs();

  // once voting rounds completed - stop clicks
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);

    // Stringify and add allProducts array to local storage
    let stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products',stringifiedProducts);

    renderChart();
  }
}

// ********* EVENT LISTENERS ******************

imgContainer.addEventListener('click', handleClick);
