'use strict';
// eslint-disable-next-line no-unused-vars
var charts = {
  'cardio-mph-distance': (chartbox, historicalData) => {
    let distanceArr = [];
    let mphArr = [];
    let durationArr = [];
    let days = ['', '', '', '', '', '', ''];
    let durationColor = 'rgba(153, 102, 255, 0.5)';
    let mphColor = 'rgba(232,232,232, 0.5)';
    let mphBorder = 'rgba(211,211,211, 1.0)';

    historicalData.forEach(element => {
      distanceArr.push(element.distance);
      mphArr.push(element.mph);
      durationArr.push(element.duration);
    });

    // Need to access the index of the days array
    for (let i = 0; i < historicalData.length; i++) {
      days[i] = historicalData[i].currentDateAndTime;
    }

    if(mphArr.length > 7){
      do {
        distanceArr.shift();
        mphArr.shift();
        days.shift();
      // eslint-disable-next-line semi
      } while (mphArr.length > 7)
    }

    var chartelem = chartbox.getContext('2d');
    var myChart = new Chart(chartelem, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: ['Distance'],
          data: distanceArr,
          backgroundColor: [
            'rgba(255, 0, 96, 0.2)',
            'rgba(77, 206, 223, 0.2)',
            'rgba(31, 148, 240, 0.2)',
            'rgba(252, 180, 75, 0.2)',
            'rgba(31, 148, 240, 0.2)',
            'rgba(77, 206, 223, 0.2)',
            'rgba(255, 0, 96, 0.2)'
          ],
          borderColor: [
            'rgba(255, 0, 96, 0.2)',
            'rgba(77, 206, 223, 0.2)',
            'rgba(31, 148, 240, 0.2)',
            'rgba(252, 180, 75, 0.2)',
            'rgba(31, 148, 240, 0.2)',
            'rgba(77, 206, 223, 0.2)',
            'rgba(255, 0, 96, 0.2)'
          ],
          borderWidth: 1,
        },{
          label: 'MPH',
          data: mphArr,
          type: 'line',
          backgroundColor: mphColor,
          borderColor: mphBorder,
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
              max: 10,
              min : 0,
              stepSize: 1,
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              max: 7,
              min : 7,
              stepSize: 1,
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
        console.log(weightArr);
      }
    }
    //allocates number of sets
    for (let g = 0; g < weightArr.length; g++){
      var sets = weightArr.length;
      numOfSetsArr.push(sets);
    }
    // if(numOfRepsArr.length > 7){
    //   do {
    //     weightArr.shift();
    //     numOfRepsArr.shift();
    //   // eslint-disable-next-line semi
    //   } while (numOfRepsArr.length > 7)
    // }

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