import type { HasKey } from "../utils";

export type ArticleImage = HasKey & {
  id: number;
  class: string;
  created_at: string;
  desc: string;
  filename: string;
  name: string;
  path: string;
  uploaded_by: string;
  uploading_brgy: string | null;
  uploading_office: string;
  uploading_office_id: number;
};

export type Article = HasKey & {
  barangayName: string | null;
  body: string;
  created_at: string;
  id: number;
  office: number;
  office_name: string;
  slug: string;
  title: string;
  image: Array<ArticleImage> | null;
};
