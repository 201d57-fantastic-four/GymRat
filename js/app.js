'use strict';

//creating excercise array for new user
function makeNewUser(username) {
  var excercise = {
    excerciseType: 'run',
    draw: 'cardio-mph-distance',
    historicalData: [],

  };
  //saving array to local storage
  localStorage.setItem(username, JSON.stringify(excercise));
}

