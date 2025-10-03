import React, { useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ color = "#ff6c2f" }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Wait for next tick to ensure DOM is rendered
    setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.chart?.resize();
      }
    }, 0);
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 280,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    colors:  [color],
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Orders',
      data: [80, 50, 30, 90, 40, 60, 50, 60, 65, 42, 67, 74],
    },
  ];

  return (
    <div className="bg-white p-4 rounded-[5px] shadow-md h-full">
      <h2 className="text-[16px] font-[500] mb-4 text-[#313b5e]">Performance</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={280}
        ref={chartRef}
      />
    </div>
  );
};

export default ColumnChart;
