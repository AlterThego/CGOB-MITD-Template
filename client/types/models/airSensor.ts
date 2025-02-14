import type { BaseModel } from ".";
import type { HasKey, Coordinate, DMS } from "../utils";

export type AirSensorStatuses = HasKey & {
  success: number;
  failed: number;
  total: number;
};

export type AirSensorCoordinates = BaseModel &
  Coordinate & {
    dms: {
      lat: DMS;
      lng: DMS;
    };
  };

export type AirSensor = BaseModel & {
  name: string;
  active: boolean;
  coordinates?: AirSensorCoordinates;
  statuses: AirSensorStatuses;
  usn: number;
  last_updated: string;
};

export type AQDataResult = HasKey & {
  avg: number;
  min: number;
  max: number;
  end: string;
  start: string;
  unit: string;
  data: {
    [key: string]: number;
  };
};
