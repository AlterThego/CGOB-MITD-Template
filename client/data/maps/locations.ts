import iconCCTV from "~/assets/icons/system/icon-cctv.svg";
import iconFire from "~/assets/icons/system/icon-fire.svg";
import iconBarangayHall from "~/assets/icons/system/icon-barangay-hall.svg";
import iconSchool from "~/assets/icons/system/icon-school.svg";
import iconHealthCenter from "~/assets/icons/system/icon-health-center.svg";
import iconPoliceStation from "~/assets/icons/system/icon-police-station.svg";
import iconEvacCenter from "~/assets/icons/system/icon-evacuation-center.svg";
import pin from "~/assets/pin.svg";

export type Location = {
  name: string;
  title: string;
  color: string;
  icon: string | null;
  visible: boolean;
};

export default [
  {
    name: "barangay_halls",
    title: "Barangay Halls",
    color: "yellow",
    icon: iconBarangayHall,
    visible: true,
  },
  {
    name: "cctv",
    title: "CCTVs",
    color: "gray",
    icon: iconCCTV,
    visible: true,
  },
  {
    name: "evacuation_centers",
    title: "Evacuation Centers",
    color: "lime",
    icon: iconEvacCenter,
    visible: true,
  },
  {
    name: "health_centers",
    title: "Health Centers",
    color: "red",
    icon: iconHealthCenter,
    visible: true,
  },
  {
    name: "police_stations",
    title: "Police Stations",
    color: "blue",
    icon: iconPoliceStation,
    visible: true,
  },
  {
    name: "fire_stations",
    title: "Fire Stations",
    color: "orange",
    icon: iconFire,
    visible: true,
  },
  {
    name: "schools",
    title: "Schools",
    color: "purple",
    icon: iconSchool,
    visible: true,
  },
  {
    name: "coding-zone-point-of-entry",
    title: "Coding Zone Point of Entry",
    color: "pink",
    icon: pin,
    visible: true,
  },
  {
    name: "manholes",
    title: "Manholes",
    color: "pink",
    icon: pin,
    visible: true,
  },

  {
    name: "city-camp-proper-buildings",
    title: "City Camp Proper Buildings",
    color: "pink",
    icon: null,
    visible: true,
  },
  {
    name: "coding-zone-Boundary",
    title: "Coding Zone Boundary",
    color: "pink",
    icon: null,
    visible: true,
  },
] as Array<Location>;
