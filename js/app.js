var nameForm = document.getElementById('name');

var handleFormSubmitName = function(event) {
  event.preventDefault();

  var name = event.target.name.value;

  console.log('Name: ', name);

  // Reset the form to empty
  nameForm.reset();
};

nameForm.addEventListener('submit', handleFormSubmitName);
