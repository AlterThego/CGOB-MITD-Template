export function generateDayWiseTimeSeries(
  baseval: any,
  count: any,
  yrange: any,
) {
  let series = [];
  for (let i = 0; i < count; i++) {
    let x = baseval;
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000;
  }
  return series;
}

export function updateData(chartRef: any, timeline: string): void {
	console.log("clicked")
  chartRef.selection = timeline;
  switch (timeline) {
    case "one_month":
      chartRef.zoomX(
        new Date("28 Jan 2013").getTime(),
        new Date("27 Feb 2013").getTime(),
      );
      break;
    case "six_months":
      chartRef.zoomX(
        new Date("27 Sep 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      );
      break;
    case "one_year":
      chartRef.zoomX(
        new Date("27 Feb 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      );
      break;
    case "ytd":
      chartRef.zoomX(
        new Date("01 Jan 2013").getTime(),
        new Date("27 Feb 2013").getTime(),
      );
      break;
    case "all":
      chartRef.zoomX(
        new Date("23 Jan 2012").getTime(),
        new Date("27 Feb 2013").getTime(),
      );
      break;
    default:
      break;
  }
}
