/* eslint-disable */

console.log('getCurrentYear', helpers.getCurrentYear());
/* DEMO: show how to update current year */

// get the footer year element
const footerYearEl = document.querySelector('#footer-year');
// update the content of the year element to result of helpers.getCurrentYear
footerYearEl.innerHTML = helpers.getCurrentYear();

