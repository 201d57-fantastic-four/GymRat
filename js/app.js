/* eslint-disable no-undef */
'use strict';

// Global Variables
var cardBox = document.getElementById('card-box');
var weightForm = null;

// ------------------------------------------------------------
// Dynamically gerenates forms for both cardio & weightlifting
// ------------------------------------------------------------
function makeForm(key, uNumber) {
  // Select the form element from the DOM
  weightForm = document.createElement('form');

  // If the key is "cardio-mph-distance" then we generate the cardio form
  if (key === 'cardio-mph-distance') {
    //form id
    weightForm.id = uNumber;

    // input - distance
    let distance = document.createElement('input');
    distance.required = true;
    distance.type = 'number';
    distance.name = 'distance';
    distance.placeholder = 'Enter distance in miles';
    distance.className = 'distance-input';
    distance.step = '.1';
    distance.min = .1;
    distance.max = 10;

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
    hours.max = 5;

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

    // button - submit
    let subButton = document.createElement('button');
    subButton.innerText = 'Add today\'s result';
    subButton.id = `sub-button-${uNumber}`;
    subButton.type = 'submit';

    // Event handler - Distance, hours, minutes
    // -----------------------------------------
    weightForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Get form input values
      let runDistance = parseFloat(event.target[0].value);
      let runHours = parseFloat(event.target[1].value);
      // 0.6 is the ratio that we would devide minutes by to get the decimal value... IE 45/.6 => 75 *.01 => 0.75
      let runMinutes = (parseFloat(event.target[2].value) / .6) * 0.01;
      let runTime = runHours + runMinutes;
      let index = parseFloat(event.target.id);

      // Create a new exercise element with the form input values
      let newExEl = new CardioElement(runTime, runDistance);

      // Look up the logged in user data
      let userData = lookupUser(getGlobalUsername());
      userData[index].historicalData.push(newExEl);

      // Save the user data to local storage
      saveUpdatedUserInfo(getGlobalUsername(), userData);

      // Clear our container element
      cardBox.innerHTML = '';

      // Display the correct user data in the DOM
      show(lookupUser(getGlobalUsername()));
    });

    // Append DOM elements to their form parent element
    weightForm.appendChild(labelDistance);
    weightForm.appendChild(distance);
    weightForm.appendChild(duration);
    weightForm.appendChild(labelhours);
    weightForm.appendChild(hours);
    weightForm.appendChild(labelminutes);
    weightForm.appendChild(minutes);
    weightForm.appendChild(subButton);
  } else if (key === 'weight-sets-reps') {
    // Set form id & class
    weightForm.id = uNumber;
    weightForm.className = 'weight-form';

    // label - Sets
    let label = document.createElement('label');
    label.id = 'sets-label';
    label.for = 'setsInput';
    label.innerText = 'Sets';

    // input - sets
    let setsNumberInput = document.createElement('input');
    setsNumberInput.required = true;
    setsNumberInput.name = 'setsInput';
    setsNumberInput.min = 1;
    setsNumberInput.max = 7;
    setsNumberInput.type = 'number';
    setsNumberInput.placeholder = 'How many sets are you going to do?';

    // button - submit!
    let nextFormButton = document.createElement('button');
    nextFormButton.innerText = 'Next';
    nextFormButton.type = 'submit';

    // Event listener to handle the sets form
    weightForm.addEventListener('submit', handleWeightSetsFormSub);

    // Append DOM elements
    weightForm.appendChild(label);
    weightForm.appendChild(setsNumberInput);
    weightForm.appendChild(nextFormButton);
  }

  return weightForm;
}

// -----------------------------------------------------------
// Event listener to handle the form for weights and reps
// This is split up so we can remove the event listener later
// -----------------------------------------------------------
function handleWeightSetsFormSub(e) {
  e.preventDefault();
  createSecondaryWeightsForm(parseFloat(e.target[0].value));
}

// -----------------------------------------------------------
// Generate the correct amount of weight and rep form inputs
// -----------------------------------------------------------
function createSecondaryWeightsForm(totalNumber) {
  // Remove event listener
  weightForm.removeEventListener('submit', handleWeightSetsFormSub);

  // Clear the form HTML
  weightForm.innerHTML = '';

  // Setup form class for CSS
  weightForm.className = 'weight-reps-form';

  // Generate the totol number of sets from the user input
  for (let i = 0; i < totalNumber; i++) {
    // input - weight
    let weightInput = document.createElement('input');
    weightInput.required = true;
    weightInput.type = 'number';
    weightInput.name = `weightInput-${i}`;
    weightInput.placeholder = 'Enter weight';
    weightInput.min = 1;
    weightInput.max = 500;

    // label - weight
    let weightLabel = document.createElement('label');
    weightLabel.for = `weightInput-${i}`;
    weightLabel.innerText = 'Weight';

    // input - reps
    let repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.required = true;
    repsInput.name = `repsInput-${i}`;
    repsInput.placeholder = 'Enter reps';
    repsInput.min = 1;
    repsInput.max = 30;
    let repsLabel = document.createElement('label');
    repsLabel.for = `repsInput-${i}`;
    repsLabel.innerText = 'Reps';

    // Add hr element to breakup form inputs
    let hrEl = document.createElement('hr');

    // Append elements to the DOM parent element
    weightForm.appendChild(weightLabel);
    weightForm.appendChild(weightInput);
    weightForm.appendChild(repsLabel);
    weightForm.appendChild(repsInput);
    weightForm.appendChild(hrEl);
  }

  // button - submit weight & reps
  let subButton = document.createElement('button');
  subButton.type = 'submit';
  subButton.innerText = 'Add';
  weightForm.appendChild(subButton);

  // Event listener - Weight & Reps form
  // -------------------------------------------
  weightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let workingWeight = [];
    let workingReps = [];
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].name.split('-')[0] === 'weightInput') {
        workingWeight.push(parseFloat(e.target[i].value));
      } else if (e.target[i].name.split('-')[0] === 'repsInput') {
        workingReps.push(parseFloat(e.target[i].value));
      }
    }

    // Get the user from localstorage
    let userData = lookupUser(getGlobalUsername());
    let todaysRecord = [];

    // Use the WeightReps constructor and push the new record into todaysRecord array
    for (let i = 0; i < workingWeight.length; i++) {
      let newWeightObject = new WeightReps(workingWeight[i], workingReps[i]);
      todaysRecord.push(newWeightObject);
    }

    userData[parseFloat(weightForm.id)].historicalData.push(todaysRecord);
    // Save user data to localstorage
    saveUpdatedUserInfo(getGlobalUsername(), userData);
    // Display user data to the DOM
    show(lookupUser(getGlobalUsername()));
  });
}

// ----------------------------------------------------
// Provides the user an option to track a new exercise
// ----------------------------------------------------
function generateTrackNewEx() {
  // section - card container
  let card = document.createElement('section');
  card.classList += 'card';
  card.id = 'form-box';

  // div - user profile container
  let profileDiv = document.createElement('div');
  profileDiv.id = 'profile1';
  let profileImg = document.createElement('img');
  profileImg.src = './assets/user.png';
  let profileWordsDiv = document.createElement('div');
  profileWordsDiv.id = 'words';
  let profileName = document.createElement('p');
  profileName.textContent = `Hello, ${getGlobalUsername()}`;

  // h2 - Track new exercise?
  let title = document.createElement('h2');
  title.innerText = 'Track new exercise?';

  // button - Yes
  let button = document.createElement('button');
  button.innerText = 'Yes';
  button.id = 'track-new-exercise-type-button';
  
  // Append elements to the DOM parent element
  profileDiv.appendChild(profileImg);
  profileWordsDiv.appendChild(profileName);
  profileWordsDiv.appendChild(title);
  profileWordsDiv.appendChild(button);
  profileDiv.appendChild(profileWordsDiv);
  card.appendChild(profileDiv);
  cardBox.appendChild(card);

  // Event listener - click and generate a new exercise form
  button.addEventListener('click', () => {
    generateAddExercizeForm(card);
  });

  // ----------------------------------------------------------
  // Generate the form for user to input new exercise to track
  // ----------------------------------------------------------
  function generateAddExercizeForm(card) {
    // Clear the card element
    card.innerHTML = '';

    // Profile container
    let profileDiv = document.createElement('div');
    profileDiv.id = 'profile2';

    // img - profile image
    let profileImg = document.createElement('img');
    profileImg.src = './assets/user.png';

    // p - profile name
    let profileName1 = document.createElement('p');
    profileName1.textContent = `${getGlobalUsername()},`;

    // p - Let's get tracking
    let profileName2 = document.createElement('p');
    profileName2.textContent = 'Let\'s get tracking!';

    // Append elements to the DOM parent element
    profileDiv.appendChild(profileImg);
    profileDiv.appendChild(profileName1);
    profileDiv.appendChild(profileName2);
    card.appendChild(profileDiv);

    // form element
    let form = document.createElement('form');
    form.id = 'new-track-form';

    // label - What Exercise do you want to track?
    let inputLabel = document.createElement('label');
    inputLabel.textContent = 'What Exercise do you want to track?';
    form.appendChild(inputLabel);

    // input - exercise name?
    let exNameEl = document.createElement('input');
    exNameEl.required = true;
    exNameEl.maxLength = 16;
    exNameEl.placeholder = 'ex. Run, Bike, Swim, Bench, Squat, . . .';
    exNameEl.name = 'exName';
    form.appendChild(exNameEl);

    // label - exercise type
    inputLabel = document.createElement('label');
    inputLabel.textContent = 'Exercise Type';
    form.appendChild(inputLabel);

    // select - options for exercise type
    let keys = Object.getOwnPropertyNames(charts);
    let dropDown = document.createElement('select');
    for (let i = 0; i < keys.length; i++) {
      let optionEl = document.createElement('option');
      optionEl.value = keys[i];
      optionEl.innerText = keys[i].split('-').join(' ');
      dropDown.appendChild(optionEl);
    }
    form.appendChild(dropDown);

    // button - submit
    let subButton = document.createElement('button');
    subButton.innerText = 'Track!';
    subButton.type = 'submit';

    // Event listener - submit the users input
    let exName = null;
    let exChart = null;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      exName = e.target[0].value;
      exChart = keys[dropDown.selectedIndex];
      let userData = lookupUser(getGlobalUsername());
      userData.push(new ExerciseObject(exName, exChart, []));
      saveUpdatedUserInfo(getGlobalUsername(), userData);
      show(lookupUser(getGlobalUsername()));
    });

    // Append elements to DOM parent element
    form.appendChild(subButton);
    card.appendChild(form);
  }
}

// ----------------------------------------------------------------
// Creates the card element that enables the user to enter new data
// Displays users data in a chart
// -----------------------------------------------------------------
var drawCard = function (exerciseObject, parentEl, uNumber) {
  // section - make card
  let card = document.createElement('section');
  card.classList += 'card';

  // h2 - make title
  let title = document.createElement('h2');
  title.innerText = `New ${exerciseObject.exerciseType} to track?`;
  let subTitle = document.createElement('h4');
  subTitle.innerText = `Your past data for: ${exerciseObject.exerciseType}`;
  card.appendChild(title);

  // Make the correct user form with the correct user inputs for the exercise
  let addExerciseTypeForm = makeForm(exerciseObject.chartType, uNumber);
  card.appendChild(addExerciseTypeForm);

  // section - create containing element
  let holder = document.createElement('section');
  holder.className = 'chart-box';

  // canvas - create the canvas element for chartjs
  let chartBox = document.createElement('canvas');
  let chartId = `chart-${uNumber}`;
  chartBox.width = '400';
  chartBox.height = '400';
  chartBox.id = chartId;

  // Append elements to DOM parent element
  holder.appendChild(chartBox);
  card.appendChild(subTitle);
  card.appendChild(holder);

  // eslint-disable-next-line no-undef
  charts[exerciseObject.chartType](chartBox, exerciseObject.historicalData);

  parentEl.appendChild(card);
};

// ----------------------------------
// Gets the current data & time
// ex. 6-28-2019 10:00:00
// ----------------------------------
function getCurrentDateAndTime() {
  var today = new Date();
  var date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
}

// ****************************************
// Exercise Object Constructor
// eslint-disable-next-line no-unused-vars
// ****************************************
function ExerciseObject(exerciseType, chartType = 'cardio-mph-distance', historicalData = []) {
  this.exerciseType = exerciseType;
  this.historicalData = historicalData;
  this.chartType = chartType;
}

// *****************************************
// DailyCardio Constructor
// *****************************************
function CardioElement(duration, distance) {
  this.duration = duration;
  this.distance = distance;
  this.currentDateAndTime = getCurrentDateAndTime();
  this.mph = Math.trunc(this.distance / this.duration);
  //update form
}

// Get form element on the login page
var nameForm = document.getElementById('name');

// ----------------------------------------
// Form submit handler - Who are you?
// ----------------------------------------
var handleFormSubmitName = function (event) {
  event.preventDefault();
  // Save input value
  var name = event.target.name.value;

  // Get global username from localstorage
  localStorage.setItem('globalUsername', JSON.stringify(name));

  // eslint-disable-next-line no-undef
  let user = lookupUser(getGlobalUsername());
  show(user);

  // Reset the form to empty
  nameForm.reset();

  // Hides card
  var hideCardOnSubmit = document.querySelector('#signin');
  hideCardOnSubmit.style.display = 'none';

  // Change header login link to logout
  var loginLink = document.getElementById('login');
  loginLink.textContent = 'Logout';
};

// --------------------------------------------
// Shows the user data
// --------------------------------------------
function show(arr) {
  // Clear the container HTML
  cardBox.innerHTML = '';

  // Provides the user an option to track a new exercise
  generateTrackNewEx();

  //generate the track new exercise button/form
  let i = 0;
  do {
    drawCard(arr[i], cardBox, i);
    i++;
  } while (i < arr.length);
}

// ***********************************************
// Constructor - Weight & Reps
// ***********************************************
function WeightReps(weight, reps) {
  this.weight = weight;
  this.reps = reps;
  this.currentDateAndTime = getCurrentDateAndTime();
}

// Event listener - Submit form username input for the login page
// --------------------------------------------------------------
nameForm.addEventListener('submit', (e) => {
  handleFormSubmitName(e);
});

// Modal START
// ---------------------------------------------------
// Getting Modal
var modal = document.getElementById('aboutUsModal');

// getting open button
var button = document.getElementById('aboutUsButton');

// getting close button
var closeButton = document.getElementsByClassName('close')[0];

// Opens the Modal
button.addEventListener('click', function () {
  modal.style.display = 'block';
});

// closes the Modal
closeButton.addEventListener('click', function () {
  modal.style.display = 'none';
});
// Modal END
// ------------------------------------------------------

// Select the Login link in the header
var loginLink = document.getElementById('login');

// Add click event listener and check whether to change it from Logout to Login
// ----------------------------------------------------------------------------
loginLink.addEventListener('click', function () {
  if (loginLink.textContent === 'Logout') {
    loginLink.textContent = 'Login';
  }

  // Set the global username from localstorage to null
  localStorage.setItem('globalUsername', null);

  // Reload the page
  location.reload();
});

// ----------------------------------------
// Get global username from localstorage
// ----------------------------------------
function getGlobalUsername() {
  return JSON.parse(localStorage.getItem('globalUsername'));
}

// -------------------------------------------
// Initial App check if global username exits
// -------------------------------------------
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


// When the app initializes call the initApp and make a check for the global username
initApp();
