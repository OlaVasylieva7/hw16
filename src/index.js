import debounce from 'lodash.debounce';
import { alert, error as notifyError, info as notifyInfo } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import fetchCountries from './js/fetchCountries';

const input = document.getElementById('input');
const list = document.getElementById('list');
const country = document.getElementById('country');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    clearData();
    return;
  }

  fetchCountries(inputValue)
    .then(fetchResponse)
    .catch(error => {
      notifyError(`something went wrong ${error}`);
    });
}

function clearData() {
  list.innerHTML = '';
  country.innerHTML = '';
}

function renderCountry(countryInfo) {
  country.insertAdjacentHTML('beforeend', countryInfo);
}

function renderCountryList(countryList) {
  list.insertAdjacentHTML('beforeend', countryList);
}

function fetchResponse(countries) {
  clearData();

  if (countries.length > 10) {
    notifyInfo({
      text: 'too many matches found. please enter a more specific query!',
      delay: 2000,
    });
  } else if (countries.length > 1 && countries.length <= 10) {
    const countryList = countries
      .map(
        country => `
          <li><img class="list__img" src="${country.flags.svg}" width="30">
          <p>${country.name.official}</p></li>
        `
      )
      .join('');
    renderCountryList(countryList);
  } else if (countries.length === 1) {
    const selectedCountry = countries[0];
    const countryInfo = `
      <h2>${selectedCountry.name.official}</h2>
      <p><strong>Capital:</strong> ${selectedCountry.capital}</p>
      <p><strong>Population:</strong> ${selectedCountry.population}</p>
      <p><strong>Languages:</strong> ${Object.values(
        selectedCountry.languages
      ).join(', ')}</p>
      <img src="${selectedCountry.flags.svg}" alt="Flag of ${
      selectedCountry.name.official
    }" width="100">
    `;
    renderCountry(countryInfo);
  }
}
