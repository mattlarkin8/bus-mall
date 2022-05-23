'use strict';

// *********** GLOBAL VARIABLES ****************

let voteCount = 25;
let allProducts = [];
let products = [['bag','jpg'],['banana','jpg'],['bathroom','jpg'],['boots','jpg'],['breakfast','jpg'],['bubblegum','jpg'],['chair','jpg'],['cthulu','jpg'],['dog-duck','jpg'],['dragon','jpg'],['pen','jpg'],['pet-sweep','jpg'],['scissors','jpg'],['shark','jpg'],['sweep','png'],['tauntaun','jpg'],['unicorn','jpg'],['water-can','jpg'],['wine-glass','jpg']];

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

instantiateProducts();
