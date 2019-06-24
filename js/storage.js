//Looks up if user exists and get exercise data from localStorage
function lookupUser (username){
  var getUserName = JSON.parse(localStorage.getItem(username));
  if(!getUserName){
    makeNewUser();

  } else {
    return historicalData;
  }

}