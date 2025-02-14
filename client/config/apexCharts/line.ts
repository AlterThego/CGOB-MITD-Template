import { defu } from "defu";
import ApexCharts from "apexcharts";
import BaseConfig from "./base";

export const Multi = (
  options?: ApexCharts.ApexOptions | ComputedRef<ApexCharts.ApexOptions>,
) => {
  return computed(() =>
    defu(
      toValue(options) ?? {},
      defu(
        {
          chart: {
            type: "line",
          },
          stroke: {
            width: 2,
            curve: "straight",
          },
          legend: {
            tooltipHoverFormatter: function (val: string, opts: any) {
              return (
                val +
                ` - <strong>
                ${opts.w.globals.series[opts.seriesIndex][
                  opts.dataPointIndex
                ]?.toFixed(2)}
                </strong>`
              );
            },
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6,
            },
          },
          grid: {
            borderColor: "#f1f1f1",
          },
        },
        BaseConfig().value,
      ),
    ),
  );
};

export const Sync = (
  options?: ApexCharts.ApexOptions | ComputedRef<ApexCharts.ApexOptions>,
) => {
  const base = defu(
    toValue(options) ?? {},
    defu(
      {
        chart: {
          group: "social",
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
        stroke: {
          width: 2,
        },
        title: {
          align: "left",
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      BaseConfig().value,
    ),
  );
  return computed(() => ({
    line1: defu(
      {
        chart: {
          id: "fb",
        },
        colors: ["#008FFB"],
        title: {
          text: "AQI Trends by Week",
        },
      },
      base,
    ),
    line2: defu(
      {
        chart: {
          id: "tw",
        },
        colors: ["#546E7A"],
        title: {
          text: "AQI Trends by Month",
        },
      },
      base,
    ),
  }));
};
