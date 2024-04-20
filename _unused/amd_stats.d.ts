type Line = Array<[x: number, y: number]>;
type StatLines = {
  min: Line;
  medium: Line;
  max: Line;
};
type SexString = "m" | "f";

type FullStats = {
  height_cm: StatLines;
  weight_kg: StatLines;
  bmi: StatLines;
  wh: StatLines;
};
type GraphName = keyof FullStats;

export let amd_stats: {
  m: FullStats;
  f: FullStats;
};
