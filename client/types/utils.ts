export type HasKey = {
  [key: string]: any;
};

export type StringList = Array<string>;

export type Point = { x: number; y: number };

export type Points = Array<Point>;

export type Coordinate = {
  longitude: number | null;
  latitude: number | null;
  altitude?: number | null;
};

export type DMS = {
  d: number;
  m: number;
  s: number;
};

export type Coordinates = Array<Coordinate>;
