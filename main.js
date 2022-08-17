import grabAPI from './js/components/lookup';
import allAPI from './js/components/findall';
import { getData } from './js/components/database';
// import { setupCounter } from "./js/components/store";
import { movieObj, movieDataList } from './js/components/movie';
const app = document.createElement('div');
const searchFormDiv = document.getElementById('appForm');
searchFormDiv.append(app);
//   value="dog"  checked="true"
app.innerHTML = ` 
<section> 
  <div id="main">
    <form id="searchFormId">
    <div id="title-div" class="row">
      <label for="Title">Title<span class="requiredText">*</span>:</label>
      <input type="text" id="Title" name="Title"  ><span id="titleErr" class="errorShow"></span>
    </div>
    <div id="year-div" class="row">
      <label for="Year">Year:</label>
      <input type="text" id="Year" name="Year" /><span id="yearErr"></span>
    </div>
    <div id="plot-div" class="row">
      <label for="plotLength">Plot Length<span class="requiredText">*</span>:</label> 
      <input type="radio" value="short" id="Short" name="plot" /> Short
      <input type="radio" value="full" id="Long" name="plot" /> Full
      <span id="plotErr" class="errorShow"></span>
    </div>
    <div id="submit-div" class="row">
      <button type="button" id="submit">Submit</button>
      <button type="button" id="submitAll">Find All</button>
      <button type="button" id="resetButton">Reset</button> 
    </div>
    </form> 
  </div>
</section>`;
/** search key object */
const title = document.getElementById('Title');
const year = document.getElementById('Year');
const plots = document.querySelectorAll('input[name="plot"]');

/** search key error */
const titleErr = document.getElementById('titleErr');
const yearErr = document.getElementById('yearErr');
const plotErr = document.getElementById('plotErr');

const mainDiv = document.getElementById('app');

let query = '';
let queryAll = '';
let plotVal = '';

console.log('plotLen :' + plotVal);
// initDb(); // init db

function search() {
    resetError();
    let errorFound = false;
    console.log('reseting');

    if (title.value == '') {
        titleErr.textContent = 'Please enter a title!';
        errorFound = true;
    }
    if (year.value < 0) {
        yearErr.textContent = 'Please enter a valid year';
        errorFound = true;
    } else if (year.value > 2022 || year.value < 1932) {
        console.log('No Year');
    }

    for (const plot of plots) {
        if (plot.checked) {
            plotVal = plot.value;
            break;
        }
    }

    if (plotVal == '') {
        plotErr.textContent = 'Please select a plot!';
        errorFound = true;
    }

    query = 't=' + title.value;
    query = query + '&y=' + year.value + '&plot=' + plotVal;
    queryAll = title.value;
    // console.log(query);
    // console.log(queryAll);
    return errorFound;
}

const button = document.getElementById('submit');
const buttonALL = document.getElementById('submitAll');
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (search() == false) {
        grabAPI(query);
    }
});

buttonALL.addEventListener('click', (e) => {
    e.preventDefault();
    if (search() == false) {
        allAPI(queryAll, plotVal);
    }
});

function resetError() {
    titleErr.textContent = '';
    yearErr.textContent = '';
    plotErr.textContent = '';
    mainDiv.textContent = '';
}

function resetForm() {
    movieDataList.clear();
    // movieData.splice(0, movieData.length);
    movieObj.plotMovie();
    var formName = document.getElementById('searchFormId');
    formName.reset();
    showMyFavorite();
}

showMyFavorite();

function showMyFavorite() {
    movieDataList.clear();
    getData();
}