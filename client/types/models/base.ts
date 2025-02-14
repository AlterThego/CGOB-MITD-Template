import type { HasKey } from "../utils";

export type BaseModel = HasKey & {
  id?: string;
};
