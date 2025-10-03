// AreaChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = () => {
  const series = [{
    name: "STOCK ABC",
    data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
  }];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      colors: ['#ff6c2f'],
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: '#ff6c2f', opacity: 0.4 },
          { offset: 100, color: '#ff6c2f', opacity: 0 }
        ]
      }
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May',
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'
      ],
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    grid: {
      show: false
    },
    legend: { show: false },
    tooltip: { enabled: false }
  };

  return (
    <div id="chart" style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default AreaChart;
