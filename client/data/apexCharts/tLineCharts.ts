import { liveChartData } from "../liveChart";

export const SyncingLineChart = {
  series: [
    {
      data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  chartOptions: {
    chart: {
      id: "fb",
      group: "social",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#008FFB"],
    stroke: {
      width: 2,
    },
    title: {
      text: "AQI Trends by Week",
      align: "left",
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
  },
  seriesLine2: [
    {
      data: generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 20, {
        min: 10,
        max: 30,
      }),
    },
  ],
  chartOptionsLine2: {
    chart: {
      id: "tw",
      group: "social",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#546E7A"],
    stroke: {
      width: 2,
    },
    title: {
      text: "AQI Trends by Month",
      align: "left",
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
  },
};
export const TimeSeriesLineChart = {
  series: [
    {
      name: "Water Level",
      data: liveChartData,
    },
  ],
  chartOptions: {
    chart: {
      type: "area",
      stacked: false,
      width: "100%",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  },
};
export const MultipleLineChart = {
  series: [
    {
      name: "NO2 Concentration",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "SO2 Concentration",
      data: [160, 100, 56, 82, 47, 62, 38, 75, 99, 74, 57, 87],
    },
    {
      name: "CO2 Concentration",
      data: [30, 60, 35, 50, 49, 60, 70, 91, 125, 140, 160, 180],
    },
    {
      name: "CO Concentration",
      data: [200, 90, 37, 36, 44, 45, 50, 58, 60, 70, 80, 90],
    },
    {
      name: "PM2.5 Concentration",
      data: [35, 110, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: "PM10 Concentration",
      data: [20, 80, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "straight",
    },
    legend: {
      tooltipHoverFormatter: function (val: string, opts: any) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: number) {
              return val + " (PPM)";
            },
          },
        },
        {
          title: {
            formatter: function (val: number) {
              return val + " (PPM)";
            },
          },
        },
        {
          title: {
            formatter: function (val: number) {
              return val + " (PPM)";
            },
          },
        },
        {
          title: {
            formatter: function (val: number) {
              return val + " (PPM)";
            },
          },
        },
        {
          title: {
            formatter: function (val: number) {
              return val + " (μg/m3)";
            },
          },
        },
        {
          title: {
            formatter: function (val: number) {
              return val + " (μg/m3)";
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  },
};
