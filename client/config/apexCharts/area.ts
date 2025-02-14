import { defu } from "defu";
import ApexCharts from "apexcharts";
import BaseConfig from "./base";

export const Area = (
  color: string,
  options?: ApexCharts.ApexOptions | ComputedRef<ApexCharts.ApexOptions>,
) => {
  return computed(() =>
    defu(
      toValue(options) ?? {},
      defu(
        {
          chart: {
            type: "area",
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
        BaseConfig().value,
      ),
    ),
  );
};

export const Trends = (
  options?: ApexCharts.ApexOptions | ComputedRef<ApexCharts.ApexOptions>,
) => {
  return computed(() =>
    defu(
      toValue(options) ?? {},
      defu(
        {
          chart: {
            type: "area",
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
        BaseConfig().value,
      ),
    ),
  );
};

export const Live = (
  options?: ApexCharts.ApexOptions | ComputedRef<ApexCharts.ApexOptions>,
) => {
  return computed(() =>
    defu(
      toValue(options) ?? {},
      defu(
        {
          chart: {
            type: "area",
            height: 350,
            zoom: {
              autoScaleYaxis: true,
            },
          },
        },
        BaseConfig().value,
      ),
    ),
  );
};
