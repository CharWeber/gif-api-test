import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'

// let slideAni = anime({
//   targets:'.box',
//   translateX:300,
//   translateY:300,
//   loop: true,
//   direction:'alternate',
//   easing: 'easeInOutElastic',
//   duration:2000
// })

function checkResponse(response) {
  if (response === undefined) {
    return new Error("Error, response not defined.");
  } else {
    return true;
  }
}

$(document).ready(function () {
  $('#gifSearchForm').submit(function (e) {
    e.preventDefault();
    const search = $('#gifSearchBar').val();
    $('#gifSearchBar').val("");
    
    let request = new XMLHttpRequest();
    
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=g&lang=en`;
    
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        try {
          const isResponseDefined = checkResponse(response);
          if (isResponseDefined instanceof Error) {
            console.error(isResponseDefined.message);
            throw ReferenceError("Response is not defined!");
          }
        } catch(error) {
          console.error(`There was an error: ${error.message}`);
        }
        getElements(response);
      }
    }
    
    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('ul#resultDisplay').empty();
      response.data.forEach(element => $('ul#resultDisplay').append(`<li id='${element.id}'><a href='${element.url}'><img src='${element.images.downsized.url}'></a></li>`));
    }
  });

  $('#gifTrending').click(function() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=g`;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('ul#trendingDisplay').empty();
      response.data.forEach(element => $('ul#trendingDisplay').append(`<li id='${element.id}'><a href='${element.url}'><img src='${element.images.downsized.url}'></a></li>`));
    }
  });

  $('#gifRandom').click(function() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=r`;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('ul#randomDisplay').empty();
      $('ul#randomDisplay').append(`<li id='${response.data.id}'><a href='${response.data.url}'><img src='${response.data.images.downsized.url}'></a></li>`);
    }
  });
});