// RadialBarChart.jsx
import React from 'react';
import ApexCharts from 'react-apexcharts';

const RadialBarChart = ({ color }) => {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10,
      id: 'radialBarChart', // Added a chart ID for targeting in CSS
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120,
            style: {
              fontFamily: 'sans-serif', // You can also remove this if using CSS className
            },
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
            style: {
              fontFamily: 'Returning Customer', // Same as above
            },
          },
        },
      },
    },
    fill: {
      colors: [color],
      type: 'solid',
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Median Ratio'],  // Your chart label
  };

  const series = [67];

  return (
    <div className="radial-bar-chart-container">
      <h5 className="chart-title   mb-[16px] font-[600] text-[16px] text-[#313b5e]">Conversions</h5> {/* Added title */}
      <div id="chart" className="sans">
        <ApexCharts options={options} series={series} type="radialBar" height={350} />
      </div>
    </div>
  );
};

export default RadialBarChart;
