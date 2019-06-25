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
  distance.className = 'distance-input';

  let time = document.createElement('input');
  time.type = 'time';

  let subButton = document.createElement('button');
  subButton.innerText = 'Add todays result';
  subButton.id = `sub-button-${uNumber}`;
  subButton.type = 'submit';
  //TODO: add event listener to form submit

  addExerciseTypeForm.appendChild(distance);
  addExerciseTypeForm.appendChild(time);
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
function ExerciseObject(exerciseType, chartType = 'cardio-mph-distance', historicalData = []) {
  this.exerciseType = exerciseType;
  this.historicalData = historicalData;
  this.chartType = chartType;
}

debugger;
//DailyCardio Constructor 
function DailyCardioExercise(duration, distance){
  this.duration = duration;
  this.distance = distance; 

  DailyCardioExercise.historicalData.push(this);

  calculateAvgDistance();
}

//Calculates AvgDistance
DailyCardioExercise.prototype.calculateAvgDistance = function(duration, distance){
  var avgDistance = Math.ceil(duration/distance);

  this.historicalData.push(avgDistance);

  localStorage.setItem(avgDistance, JSON.stringify(historicalData));
 
  return avgDistance
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
