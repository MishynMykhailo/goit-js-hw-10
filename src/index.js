const debounce = require('lodash.debounce');
import './css/styles.css';
import {fetchCountries} from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector("input#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener("input",debounce(searchInput,DEBOUNCE_DELAY))

function searchInput(e){
    countryInfo.innerHTML="";
    countryList.innerHTML="";
    if(e.target.value.match(/[0-9]/)){
        Notify.failure("oops, those are not letters")
        return e.target.value=""
    }else if (e.target.value.trim() === "" || e.target.value.trim() === " "){
        return
    }else if (e.target.value.toLowerCase() === "russia" || e.target.value.toLowerCase() === "russian" || e.target.value.toLowerCase() === "russi"){
            const bodyStyle = document.querySelector("body")
            bodyStyle.classList.add('rusnax')

    }else {
        document.querySelector("body").classList.remove('rusnax')
        const value = e.target.value.trim();
        fetchCountries(value).then(countryListMarkup).catch(error=>{
            Notify.failure("Oops, there is no country with that name")
        })
    }

};
function countryListMarkup(e){
    const fullInfo = e.map(({flags:{svg},name:{official}})=>{
            return `<li><img class="img-country" src="${svg}" alt="${official}"><b>${official}</b></li>`
        }).join('')
            const lang = Object.values(e[0].languages);
                if(e.length >10){
                    Notify.info("Too many matches found. Please enter a more specific name.")
                    return
                }
                if(e.length === 1){
                    let markupCountry  = `
                    <ul class="country-style">
                        <li><b>Capital:</b> ${e[0].capital}</li>
                        <li><b>Population:</b> ${e[0].population}</li>
                        <li><b>Languages:</b> ${lang}</li>
                    </ul>`
                    countryInfo.insertAdjacentHTML('afterbegin',markupCountry)
                };
                return countryList.insertAdjacentHTML('afterbegin',fullInfo)
};


