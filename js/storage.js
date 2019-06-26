/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

//Looks up if user exists and get exercise data from localStorage
// eslint-disable-next-line no-unused-vars
function lookupUser (username){
  var getUserName = JSON.parse(localStorage.getItem(username));
  if(!getUserName){
    // eslint-disable-next-line no-undef
    return makeNewUser(username);

  } else {
    return getUserName;
  }
}
function makeNewUser(username) {
  let excercise = new ExerciseObject('run', 'cardio-mph-distance', []);
  //saving array to local storage
  let workingArray = [];
  workingArray.push(excercise);
  localStorage.setItem(username, JSON.stringify(workingArray));
  // eslint-disable-next-line no-undef
  return lookupUser(username);
}
function saveUpdatedUserInfo(username,data){
  localStorage.setItem(username, JSON.stringify(data));
}
