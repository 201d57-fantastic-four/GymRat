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
  'weight-sets-reps': (chartbox, historicalData) =>{
    //TODO: Draw Chart for weight
  }
};