/* eslint-disable no-undef */
'use strict';
var globalUsername = '';
//creating excercise array for new user
// eslint-disable-next-line no-unused-vars
function makeNewUser(username) {
  let excercise = new ExerciseObject('run', 'cardio-mph-distance', []);
  //saving array to local storage
  //TODO: Split this off into its own function in Storage.js
  let workingArray = [];
  workingArray.push(excercise);
  localStorage.setItem(username, JSON.stringify(workingArray));
  // eslint-disable-next-line no-undef
  return lookupUser(username);
}

var cardBox = document.getElementById('card-box');
function makeForm(key, uNumber) {
  let form =document.createElement('form');
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
      let userData = lookupUser(globalUsername);
      userData[index].historicalData.push(newExEl);
      saveUpdatedUserInfo(globalUsername, userData);
      cardBox.innerHTML = '';
      show(lookupUser(globalUsername));
    });

    form.appendChild(labelDistance);
    form.appendChild(distance);
    form.appendChild(duration);
    form.appendChild(labelhours);
    form.appendChild(hours);
    form.appendChild(labelminutes);
    form.appendChild(minutes);
    form.appendChild(subButton);
  } else if (key === 'weights-sets-reps') {
    console.log('Nothing here');
  } 
  return form;
}
var drawCard = function (exerciseObject, parentEl, uNumber) {
  //make card
  let card = document.createElement('section');
  card.classList += 'card';
  //make title
  let title = document.createElement('h2');
  title.innerText = 'New exercise to track?';
  //append
  card.appendChild(title);
  let addExerciseTypeForm = makeForm(exerciseObject.chartType,uNumber);

  card.appendChild(addExerciseTypeForm);
  let holder = document.createElement('section');
  holder.className = 'chart-box';
  let chartBox = document.createElement('canvas');
  let chartId = `chart-${uNumber}`;
  chartBox.width = '400';
  chartBox.height = '400';
  chartBox.id = chartId;
  holder.appendChild(chartBox);
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
  //TODO: Fix magic strings
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
  globalUsername = name;
  // eslint-disable-next-line no-undef
  let user = lookupUser(globalUsername);
  show(user);

  // Reset the form to empty
  nameForm.reset();

  //Hides card
  var hideCardOnSubmit = document.querySelector('#signin');
  hideCardOnSubmit.style.display = 'none';
};

function show(arr) {
  cardBox.innerHTML = '';
  let i = 0;
  do {
    drawCard(arr[i], cardBox, i);
    i++;
  } while (i < arr.length);

}

nameForm.addEventListener('submit', (e) => {
  handleFormSubmitName(e);
});

//Modal Start
//Getting Modal
var modal = document.getElementById('aboutUsModal');

//getting open button
var button = document.getElementById('aboutUsButton');

//getting close button
var closeButton = document.getElementsByClassName('close') [0];

//Opens the Modal
button.addEventListener('click', function(){
  modal.style.display = 'block';
});

//closes the Modal
closeButton.addEventListener('click', function(){
  modal.style.display = 'none';
});

// // close windown when clicks outside of modal

// window.addEventListener = ('click', function(event){
//   if (event.target !== modal) {
//     modal.style.display = 'none';
//   }
// });
