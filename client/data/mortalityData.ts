export interface MortatlityDataType {
  id: number;
  name: string;
  value: number;
}

export const CauseOfDeathData: MortatlityDataType[] = [
  {
    id: 1,
    name: "Vascular Disease",
    value: 1757,
  },
  {
    id: 2,
    name: "Cancecr",
    value: 1565,
  },
  {
    id: 3,
    name: "Heart Disease",
    value: 1517,
  },
  {
    id: 4,
    name: "Pneumonia",
    value: 952,
  },
  {
    id: 5,
    name: "Others",
    value: 612,
  },
  {
    id: 6,
    name: "Kidney Disease",
    value: 439,
  },
  {
    id: 7,
    name: "Accident and Trauma",
    value: 347,
  },
  {
    id: 8,
    name: "Diabetes Mellitus",
    value: 315,
  },
  {
    id: 9,
    name: "Sepsis",
    value: 220,
  },
  {
    id: 10,
    name: "Upper Gastrointestinal Bleeding",
    value: 182,
  },
];

export const MortalityByAgeGroup: MortatlityDataType[] = [
  {
    id: 1,
    name: "70 and Above",
    value: 1757,
  },
  {
    id: 2,
    name: "65 to 69",
    value: 1565,
  },
  {
    id: 3,
    name: "60 to 64",
    value: 1517,
  },
  {
    id: 4,
    name: "55 to 59",
    value: 952,
  },
  {
    id: 5,
    name: "50 to 54",
    value: 952,
  },
  {
    id: 6,
    name: "45 to 49",
    value: 612,
  },
  {
    id: 7,
    name: "71 and Above",
    value: 439,
  },
  {
    id: 8,
    name: "40 to 44",
    value: 347,
  },
  {
    id: 9,
    name: "35 to 39",
    value: 315,
  },
  {
    id: 10,
    name: "30 to 34", 
    value: 220,
  },
];
