// Health Page: Case Classification
export const ColumnChart = {
  series: [
    {
      name: "Suspect",
      data: [4, 6, 8, 5, 6, 9, 7, 10],
    },
    {
      name: "Probable",
      data: [8, 9, 10, 10, 9, 11, 9, 12],
    },
    {
      name: "Confirmed",
      data: [4, 4, 4, 3, 5, 5, 5, 5],
    },
  ],
  chartOptions: {
    theme: {
      palette: "palette1",
    },
    chart: {
      type: "bar",
      aspectRatio: 1,
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    },
    yaxis: {
      title: {
        text: "Case Classification",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + " cases";
        },
      },
    },
  },
};
// Health Page: Admitted
export const ColumnChart2 = {
  series: [
    {
      name: "Addmitted",
      data: [3, 11, 5, 10, 2, 5, 6, 5, 3, 9, 6, 8],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    fill: {
      colors: ["#F66D44"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val: number) {
          return val;
        },
      },
    },
  },
};

// Mortality Page: Mortality by Year
export const ColumnChart3 = {
  series: [
    {
      name: "Mortality Count",
      data: [4, 6, 8, 5, 6],
    },
    {
      name: "Male Count",
      data: [8, 9, 10, 10, 9],
    },
    {
      name: "Female Count",
      data: [4, 4, 4, 3, 5],
    },
  ],
  chartOptions: {
    theme: {
      palette: "palette1",
    },
    chart: {
      type: "bar",
      aspectRatio: 1,
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["2019", "2020", "2021", "2022", "2023"],
    },
    yaxis: {
      title: {
        text: "Mortality by Year",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val;
        },
      },
    },
  },
};

