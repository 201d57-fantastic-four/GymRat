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

var drawCard = function (exerciseObject, parentEl, uNumber) {
  //make card
  let card = document.createElement('section');
  card.classList += 'card';
  //make title
  let title = document.createElement('h2');
  title.innerText = exerciseObject.exerciseType;
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
  addExerciseTypeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let runDistance = event.target.distance.value;
    let runHours = event.target.hours.value;
    let runMinutes = event.target.minutes.value;

    console.log('Distance: ', runDistance);
    console.log('Hours: ', runHours);
    console.log('Minutes: ', runMinutes);
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

function ExerciseObject(exerciseType, chartType = 'cardio-mph-distance', historicalData = []) {
  this.exerciseType = exerciseType;
  this.historicalData = historicalData;
  this.chartType = chartType;
}

// Get form element
var nameForm = document.getElementById('name');

// Form submit handler - Who are you?
var handleFormSubmitName = function(event) {

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
  let i = 0;
  do {
    drawCard(arr[i], cardBox, i);
    i++;
  } while (i < arr.length);

}

nameForm.addEventListener('submit', (e) => {
  handleFormSubmitName(e);
});
