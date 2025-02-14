export type ProjectionRegister = {
  name: string;
  def: string;
  extent: Array<number>;
};

export default [
  {
    name: "EPSG:3123",
    def: "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,3.068,-4.903,-1.578,-1.06 +units=m +no_defs +type=crs",
    extent: [-52167.23, 331757.86, 1498887.07, 2481152.45],
  },
  {
    name: "EPSG:3124",
    def: "+proj=tmerc +lat_0=0 +lon_0=123 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,3.068,-4.903,-1.578,-1.06 +units=m +no_defs +type=crs",
    extent: [-275716.23, 331763.55, 1274388.34, 2470207.03],
  },
  {
    name: "EPSG:3125",
    def: "+proj=tmerc +lat_0=0 +lon_0=125 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,3.068,-4.903,-1.578,-1.06 +units=m +no_defs +type=crs",
    extent: [-500221.55, 331770.32, 1050844.26, 2481177.12],
  },
  {
    name: "EPSG:3857",
    def: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs",
    extent: [-20037508.34, -20048966.1, 20037508.34, 20048966.1],
  },
  {
    name: "EPSG:32651",
    def: "+proj=utm +zone=51 +datum=WGS84 +units=m +no_defs +type=crs",
    extent: [166021.44, 0.0, 833978.56, 9329005.18],
  },
] as Array<ProjectionRegister>;
