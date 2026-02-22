
export interface DataPoint {
  x: number;
  y: number;
}

export enum StepId {
  IDENTIFY_RANGE = 0,
  CHOOSE_INTERVAL = 1,
  DRAW_AXES = 2,
  LABEL_AXES = 3,
  PLOT_POINTS = 4,
  JOIN_POINTS = 5,
  ADD_TITLE = 6
}

export interface GraphStep {
  id: StepId;
  title: string;
  description: string;
  tip?: string;
}

export interface ChartConfig {
  width: number;
  height: number;
  margin: { top: 60, right: 40, bottom: 80, left: 80 };
  xLabel: string;
  yLabel: string;
  mainTitle: string;
  xInterval: number;
  yInterval: number;
  xMax: number;
  yMax: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  icon: string;
  data: DataPoint[];
  config: ChartConfig;
  color: string;
}
