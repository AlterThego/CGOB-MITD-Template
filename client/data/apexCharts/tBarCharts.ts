export const BasicBarChart = {
  series: [
    {
      name: "District Case",
      data: [25, 18, 15, 10, 8, 12, 20, 9, 5, 7, 6, 4, 10, 12, 9, 11],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: ["#64C2A6"],
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
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
    },
  },
};

interface BarChartConfig {
  data: number[];
  categories: string[];
  name: string;
  color: string;
}

export const createBarChart = ({ data, categories, name, color }: BarChartConfig) => ({
  series: [
    {
      name: name,
      data,
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: [color],
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
  },
});
