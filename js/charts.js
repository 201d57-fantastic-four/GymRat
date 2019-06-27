// eslint-disable-next-line no-unused-vars
var charts = {
  'cardio-mph-distance': (chartbox, historicalData) => {
    let distanceArr = [];
    let mphArr = [];
    let durationArr = [];
    let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let durationColor = 'rgba(75, 192, 192, 0.3)';
    let mphColor = 'rgba(153, 102, 255, 0.2)';

    historicalData.forEach(element => {
      distanceArr.push(element.distance);
      mphArr.push(element.mph);
      durationArr.push(element.duration);
    });
    if(mphArr.length > 7){
      do {
        distanceArr.shift();
        mphArr.shift();
      // eslint-disable-next-line semi
      } while (mphArr.length > 7)
    }
    var chartelem = chartbox.getContext('2d');
    var myChart = new Chart(chartelem, {
      type: 'bar',
      data: {
        labels: day,
        datasets: [{
          label: ['Distance'],
          data: distanceArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
        },{
          label: 'MPH',
          data: mphArr,
          type: 'line',
          backgroundColor: mphColor,
          borderColor: mphColor,
          borderWidth: 1,
        },{
          label: 'Duration',
          data: durationArr,
          type: 'bubble',
          backgroundColor: durationColor,
          borderColor: durationColor,
          borderWidth: 2,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 50,
              min : 0,
              stepSize: 5,
              beginAtZero: true
            }
          }]
        }
      }
    });
  },
  //Draws our Weights Chart
  'weight-sets-reps': (chartbox, historicalData) =>{
    let weightArr = [];
    let numOfRepsArr = [];
    let numOfSetsArr = [];
    let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let setsColor = 'rgba(75, 192, 192, 0.3)';
    let numOfRepsColor = 'rgba(153, 102, 255, 0.2)';

    for (let i = 0; i < historicalData.length; i++){
      for( let j = 0; j < historicalData[i].length; j++){
        let hdElem = historicalData[i][j];
        numOfRepsArr.push(hdElem.reps);
        weightArr.push(hdElem.weight);
        numOfSetsArr.push(weightArr.length);
        // console.log(numOfSetsArr);
      }
    }
    if(numOfRepsArr.length > 7){
      do {
        weightArr.shift();
        numOfRepsArr.shift();
      // eslint-disable-next-line semi
      } while (numOfRepsArr.length > 7)
    }

    var chartelem = chartbox.getContext('2d');
    var myChart = new Chart(chartelem, {
      type: 'bar',
      data: {
        labels: day,
        datasets: [{
          label: ['Weight'],
          data: weightArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
        },{
          label: '# of Reps',
          data: numOfRepsArr,
          type: 'line',
          backgroundColor: numOfRepsColor,
          borderColor: numOfRepsColor,
          borderWidth: 1,
        },{
          label: 'Number of Sets',
          data: numOfSetsArr,
          type: 'bubble',
          backgroundColor: setsColor,
          borderColor: setsColor,
          borderWidth: 2,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 500,
              min : 0,
              stepSize: 20,
              beginAtZero: true
            }
          }]
        }
      }
    });
  },
  };