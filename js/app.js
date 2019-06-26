/* eslint-disable no-undef */
'use strict';
var cardBox = document.getElementById('card-box');

function makeForm(key, uNumber) {
  console.log('key', key);
  let form = document.createElement('form');
  if (key === 'cardio-mph-distance') {
    //form
    form.id = uNumber;
    // input - distance
    let distance = document.createElement('input');
    distance.required = true;
    distance.type = 'number';
    distance.name = 'distance';
    distance.placeholder = 'Enter distance in miles';
    distance.className = 'distance-input';
    distance.step = '.1';
    distance.min = .1;
    distance.max = 50;

    // label - distance
    var labelDistance = document.createElement('label');
    labelDistance.htmlFor = distance;
    labelDistance.textContent = 'Distance';

    // title - duration
    let duration = document.createElement('h3');
    duration.textContent = 'Duration';

    // input - hours
    let hours = document.createElement('input');
    hours.required = true;
    hours.type = 'number';
    hours.name = 'hours';
    hours.value = 0;
    hours.min = 0;

    // label - hours
    var labelhours = document.createElement('label');
    labelhours.htmlFor = hours;
    labelhours.textContent = 'Hours';

    // input - minutes
    let minutes = document.createElement('input');
    minutes.required = true;
    minutes.type = 'number';
    minutes.name = 'minutes';
    minutes.value = 0;
    minutes.min = 0;
    minutes.max = 59;

    // label - minutes
    var labelminutes = document.createElement('label');
    labelminutes.htmlFor = minutes;
    labelminutes.textContent = 'Minutes';

    // button
    let subButton = document.createElement('button');
    subButton.innerText = 'Add today\'s result';
    subButton.id = `sub-button-${uNumber}`;
    subButton.type = 'submit';

    // Event handler - Distance, hours, minutes
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      //TODO:Split this off into a fn that has the logic to generate the correct exercise element
      let runDistance = parseInt(event.target.distance.value);
      let runHours = parseInt(event.target.hours.value);
      // 0.6 is the ratio that we would devide minutes by to get the decimal value... IE 45/.6 => 75 *.01 => 0.75
      let runMinutes = (parseInt(event.target.minutes.value) / .6) * 0.01;
      let runTime = runHours + runMinutes;
      let index = parseInt(event.target.id);
      //NEW EX EL res of new fn
      let newExEl = new CardioElement(runTime, runDistance);
      //TODO Above chunk gets its own fn and returns an appropreate ex elemnt
      let userData = lookupUser(getGlobalUsername());
      userData[index].historicalData.push(newExEl);
      saveUpdatedUserInfo(getGlobalUsername(), userData);
      cardBox.innerHTML = '';
      show(lookupUser(getGlobalUsername()));
    });

    form.appendChild(labelDistance);
    form.appendChild(distance);
    form.appendChild(duration);
    form.appendChild(labelhours);
    form.appendChild(hours);
    form.appendChild(labelminutes);
    form.appendChild(minutes);
    form.appendChild(subButton);
  } else if (key === 'weight-sets-reps') {
    //TODO: Make the weights form.
  }
  return form;
}
function generateTrackNewEx() {

  let card = document.createElement('section');
  card.classList += 'card';
  card.id = 'form-box';
  let title = document.createElement('h2');
  title.innerText = 'Track new exercise?';
  let button = document.createElement('button');
  button.innerText= 'Track New.';
  button.id = 'track-new-exercise-type-button';

  card.appendChild(title);
  card.appendChild(button);
  cardBox.appendChild(card);
  button.addEventListener('click', ()=>{
    generateAddExercizeForm(card);
  });

  function generateAddExercizeForm(card) {

    card.innerHTML = '';
    let form = document.createElement('form');
    let exNameEl = document.createElement('input');
    exNameEl.placeholder = 'What Exercise do you want to track?';
    exNameEl.name = 'exName';
    form.appendChild(exNameEl);

    let keys = Object.getOwnPropertyNames(charts);
    let dropDown = document.createElement('select');
    for (let i = 0; i < keys.length; i++) {
      let optionEl = document.createElement('option');
      optionEl.value = keys[i];
      optionEl.innerText = keys[i].split('-').join(' ');
      dropDown.appendChild(optionEl);
    }
    form.appendChild(dropDown);

    let subButton = document.createElement('button');
    subButton.innerText = 'Track this';
    subButton.type = 'submit';

    let exName = null;
    let exChart = null;
    form.addEventListener('submit', (e) => {

      e.preventDefault();
      exName = e.target[0].value;
      exChart = keys[dropDown.selectedIndex];
      let userData = lookupUser(getGlobalUsername());
      userData.push(new ExerciseObject(exName,exChart, []));
      saveUpdatedUserInfo(getGlobalUsername(),userData);
      show(lookupUser(getGlobalUsername()));
    });
    form.appendChild(subButton);
    card.appendChild(form);
  }
}
var drawCard = function (exerciseObject, parentEl, uNumber) {
  //make card
  let card = document.createElement('section');
  card.classList += 'card';
  //make title
  let title = document.createElement('h2');
  title.innerText = `New ${exerciseObject.exerciseType} to track?`;
  let subTitle = document.createElement('h2');
  subTitle.innerText = `Your past data for: ${exerciseObject.exerciseType}`;
  //append
  card.appendChild(title);

  let addExerciseTypeForm = makeForm(exerciseObject.chartType, uNumber);

  card.appendChild(addExerciseTypeForm);
  let holder = document.createElement('section');
  holder.className = 'chart-box';
  let chartBox = document.createElement('canvas');
  let chartId = `chart-${uNumber}`;
  chartBox.width = '400';
  chartBox.height = '400';
  chartBox.id = chartId;
  holder.appendChild(chartBox);
  card.appendChild(subTitle);
  card.appendChild(holder);
  // eslint-disable-next-line no-undef
  charts[exerciseObject.chartType](chartBox, exerciseObject.historicalData);

  parentEl.appendChild(card);
};

//Exercise Object Constructor
// eslint-disable-next-line no-unused-vars
function ExerciseObject(exerciseType, chartType = 'cardio-mph-distance', historicalData = []) {
  this.exerciseType = exerciseType;
  this.historicalData = historicalData;
  this.chartType = chartType;
}

//DailyCardio Constructor
function CardioElement(duration, distance) {
  this.duration = duration;
  this.distance = distance;
  this.mph = this.distance / this.duration;
  //update form
}

// Get form element
var nameForm = document.getElementById('name');

// Form submit handler - Who are you?
var handleFormSubmitName = function (event) {
  event.preventDefault();
  // Save input value
  var name = event.target.name.value;

  localStorage.setItem('globalUsername', JSON.stringify(name));

  // eslint-disable-next-line no-undef
  let user = lookupUser(getGlobalUsername());
  show(user);

  // Reset the form to empty
  nameForm.reset();

  //Hides card
  var hideCardOnSubmit = document.querySelector('#signin');
  hideCardOnSubmit.style.display = 'none';

  var loginLink = document.getElementById('login');
  loginLink.textContent = 'Logout';
};

function show(arr) {
  cardBox.innerHTML = '';
  generateTrackNewEx();
  //generate the track new exercise button/form
  let i = 0;
  do {
    drawCard(arr[i], cardBox, i);
    i++;
  } while (i < arr.length);

}
function WeightReps(weight, reps) {
  this.weight = weight;
  this.reps = reps;
}

nameForm.addEventListener('submit', (e) => {
  handleFormSubmitName(e);
});

// Select the Login link in the header
var loginLink = document.getElementById('login');

// Add click event listener and check whether to change it from Logout to Login
// Set the global username from localstorage to null
// Reload the page
loginLink.addEventListener('click', function() {
  if (loginLink.textContent === 'Logout') {
    loginLink.textContent = 'Login';
  }

  localStorage.setItem('globalUsername', null);
  location.reload();
});


// Get global username from localstorage
function getGlobalUsername() {
  return JSON.parse(localStorage.getItem('globalUsername'));
}

// Initial App check if global username exits
function initApp() {
  var globalUsername = getGlobalUsername();

  if (globalUsername) {
    // Look up the global user from localstorage and show user data
    show(lookupUser(globalUsername));
    //Hides card
    var hideCardOnSubmit = document.querySelector('#signin');
    hideCardOnSubmit.style.display = 'none';

    // if global username exists display Logout
    loginLink.textContent = 'Logout';
  }
}

initApp();
