/* eslint-disable no-undef */
'use strict';
var globalUsername = '';
//creating excercise array for new user


var cardBox = document.getElementById('card-box');

var drawCard = function (exerciseObject, parentEl, uNumber) {
  //make card
  let card = document.createElement('section');
  card.classList += 'card';
  //make title
  let title = document.createElement('h2');
  title.innerText = 'Do you have any new exercises to track?';
  //append
  card.appendChild(title);
  //form
  let addExerciseTypeForm = document.createElement('form');
  addExerciseTypeForm.id = uNumber;

  let distance = document.createElement('input');
  distance.type = 'number';
  distance.name = 'distance';
  distance.placeholder = 'Enter distance in miles';
  distance.className = 'distance-input';
  distance.step = '.1';

  var labelDistance = document.createElement('label');
  labelDistance.htmlFor = distance;
  labelDistance.textContent = 'Distance';

  let duration = document.createElement('h3');
  duration.textContent = 'Duration';

  let hours = document.createElement('input');
  hours.type = 'number';
  hours.name = 'hours';

  var labelhours = document.createElement('label');
  labelhours.htmlFor = hours;
  labelhours.textContent = 'Hours';

  let minutes = document.createElement('input');
  minutes.type = 'number';
  minutes.name = 'minutes';

  var labelminutes = document.createElement('label');
  labelminutes.htmlFor = minutes;
  labelminutes.textContent = 'Minutes';

  let subButton = document.createElement('button');
  subButton.innerText = 'Add today\'s result';
  subButton.id = `sub-button-${uNumber}`;
  subButton.type = 'submit';

  // Event handler - Distance, hours, minutes
  addExerciseTypeForm.addEventListener('submit', function (event) {
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

  addExerciseTypeForm.appendChild(labelDistance);
  addExerciseTypeForm.appendChild(distance);
  addExerciseTypeForm.appendChild(duration);
  addExerciseTypeForm.appendChild(labelhours);
  addExerciseTypeForm.appendChild(hours);
  addExerciseTypeForm.appendChild(labelminutes);
  addExerciseTypeForm.appendChild(minutes);
  addExerciseTypeForm.appendChild(subButton);

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
