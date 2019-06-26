// eslint-disable-next-line no-unused-vars
var charts = {
  'cardio-mph-distance': (chartbox, historicalData) => {
    let distanceArr = [];
    let mphArr = [];
    historicalData.forEach(element => {
      distanceArr.push(element.distance);
      mphArr.push(element.mph);
    });
    if(mphArr.length > 7){
      do {
        distanceArr.shift();
        mphArr.shift();
      // eslint-disable-next-line semi
      } while (mphArr.length > 7)
    }
    //TODO: implement this/draw chart.
    var chartelem = chartbox.getContext('2d');
    var myChart = new Chart(chartelem, {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
          label: 'Distance',
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
          type: 'line'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 7,
              min : 0,
              stepSize: 1,
              beginAtZero: true
            }
          }]
        }
      }
    });

  }
};

