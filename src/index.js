// import debounce from "lodash.debounce";
// import {alert, error as notifyError, info as notifyInfo} from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';


function fetchCountries(searchQuery) {
    return fetch(
      `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

const input = document.getElementById("input");
const list = document.getElementById("list");
const country = document.getElementById("country");


input.addEventListener('input', onInputChange)

function onInputChange(e) {
e.preventDefault();

const inputValue = e.target.value.trim()
console.log(inputValue);
}