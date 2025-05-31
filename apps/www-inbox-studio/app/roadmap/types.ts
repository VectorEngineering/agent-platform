export type RoadmapStatus =
  | "planned"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface RoadmapItem {
  title: string;
  description: string;
  date: string;
  status: RoadmapStatus;
  product: string;
  features?: string[];
}
