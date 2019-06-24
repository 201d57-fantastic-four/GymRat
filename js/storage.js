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
