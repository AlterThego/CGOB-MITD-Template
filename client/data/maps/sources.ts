export default [
  {
    name: "Open Street Map",
    alt: "osm",
    api: [
      {
        name: "Mapnik",
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
      {
        name: "Humanitarian",
        url: "http://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      },
    ],
  },
  {
    name: "Google",
    alt: "google",
    api: [
      {
        name: "Maps",
        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
      },
      {
        name: "Satellite",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      },
      {
        name: "Satellite Hybrid",
        url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      },
      {
        name: "Terrain",
        url: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      },
    ],
  },
  {
    name: "ESRI",
    alt: "arcgis",
    api: [
      {
        name: "Dark Gray Base",
        url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      },
      {
        name: "Light Gray Base",
        url: "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      },
      {
        name: "World Street Map",
        url: "http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      },
      {
        name: "World Imagery",
        url: "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      },
      {
        name: "World Topo Map",
        url: "http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      },
    ],
  },
  {
    name: "CartoDB",
    alt: "cartodb",
    api: [
      {
        name: "Positron",
        url: "http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      },
      {
        name: "Dark Matter",
        url: "http://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      },
      {
        name: "Positron (No Labels)",
        url: "http://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
      },
      {
        name: "Dark Matter (No Labels)",
        url: "http://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
      },
    ],
  },
];
