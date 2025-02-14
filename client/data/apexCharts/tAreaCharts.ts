import { series } from "../basicAreaChartData";
import { liveChartData } from "../liveChart";

export const LiveChart = {
  series: [
    {
      data: liveChartData,
    },
  ],
  chartOptions: {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2.5,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: new Date("01 Mar 2012").getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  },
  selection: "one_year",
};

export const EnvAreaChart = (color: string) => ({
  series: [
    {
      name: "PM 2.5",
      data: series.monthDataSeries1.prices,
    },
  ],
  chartOptions: {
    chart: {
      width: "100%",
      type: "area",
      zoom: {
        enabled: false,
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
      curve: "straight",
      width: 2,
      colors: [color],
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        opacityFrom: 0.6,
        opacityTo: 0.6,
        colorStops: [
          {
            offset: 100,
            color: color,
            opacity: 0.4,
          },
        ],
      },
    },
    labels: series.monthDataSeries1.dates,
    xaxis: {
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
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  },
});

export const EnvTrendsAreaChart = {
  series: [
    {
      name: "prev",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "current",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chartOptions: {
    chart: {
      width: "100%",
      type: "area",
      zoom: {
        enabled: false,
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
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: true,
      offsetX: 0,
      offsetY: -15,
    },
    xaxis: {
      categories: [
        "10 Nov 2024",
        "11 Nov 2024",
        "12 Nov 2024",
        "13 Nov 2024",
        "14 Nov 2024",
        "15 Nov 2024",
        "16 Nov 2024",
      ],
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
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};
