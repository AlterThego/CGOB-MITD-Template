export const DonutChart = {
  series: [44, 55, 41, 30],
  chartOptions: {
    theme: {
      palette: "palette2",
    },
    chart: {
      id: "donut-chart",
      type: "donut",
    },
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
  },
};
export const PieChart = {
  series: [25, 18, 15, 10, 8, 12, 20, 9, 5, 7, 6, 4, 10, 12, 9],
  chartOptions: {
    chart: {
      offsetX: -20,
      type: "pie",
    },
    labels: [
      "Atab",
      "Irisan",
      "Loakan",
      "Aruroa Hill",
      "Pacdal",
      "Atok Trail",
      "Engineer's Hill",
      "Scout Barrio",
      "Mines View",
      "Quezon Hill",
      "Quirino Hill",
      "Pinsao",
      "City Camp",
      "Lucban",
      "Campo Filipino",
      "Asin",
    ],
    legend: {
      width: 430,
      offsetX: -10,
      position: "bottom",
    },
  },
};
