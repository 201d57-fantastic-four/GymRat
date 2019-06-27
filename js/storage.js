/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

//Looks up if user exists and get exercise data from localStorage
function lookupUser (username){
  var getUserName = JSON.parse(localStorage.getItem(username));
  if(!getUserName){

    return makeNewUser(username);

  } else {
    return getUserName;
  }
}
//Accepts username and creates a new exercise object which is then sent to localStorage & pushed into workingArray
function makeNewUser(username) {
  let excercise = new ExerciseObject('run', 'cardio-mph-distance', []);
  //saving array to local storage
  let workingArray = [];
  workingArray.push(excercise);
  localStorage.setItem(username, JSON.stringify(workingArray));

  return lookupUser(username);
}
function saveUpdatedUserInfo(username,data){
  localStorage.setItem(username, JSON.stringify(data));
}
