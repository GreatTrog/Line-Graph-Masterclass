
import { Dataset, StepId, GraphStep } from './types';

export const DATASETS: Dataset[] = [
  {
    id: 'bean-growth',
    name: 'Bean Plant Growth',
    description: 'Track how a bean plant grows taller over 10 days.',
    icon: 'fa-seedling',
    color: 'bg-emerald-500',
    data: [
      { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 5 },
      { x: 4, y: 7 }, { x: 5, y: 10 }, { x: 6, y: 13 }, { x: 7, y: 16 },
      { x: 8, y: 19 }, { x: 9, y: 22 }, { x: 10, y: 25 },
    ],
    config: {
      width: 600, height: 500,
      margin: { top: 60, right: 40, bottom: 80, left: 80 },
      xLabel: 'Time (Days)', yLabel: 'Height (cm)',
      mainTitle: 'Graph showing the growth of a bean plant over 10 days',
      xInterval: 2, yInterval: 5, xMax: 10, yMax: 30,
    }
  },
  {
    id: 'light-bulb',
    name: 'Bulb Brightness',
    description: 'Measure how brightness (Lumens) changes with Voltage.',
    icon: 'fa-lightbulb',
    color: 'bg-amber-500',
    data: [
      { x: 0, y: 0 }, { x: 2, y: 150 }, { x: 4, y: 380 }, { x: 6, y: 620 },
      { x: 8, y: 880 }, { x: 10, y: 1100 }, { x: 12, y: 1200 }
    ],
    config: {
      width: 600, height: 500,
      margin: { top: 60, right: 40, bottom: 80, left: 80 },
      xLabel: 'Voltage (V)', yLabel: 'Brightness (Lumens)',
      mainTitle: 'Graph showing brightness for different voltages',
      xInterval: 2, yInterval: 200, xMax: 12, yMax: 1400,
    }
  },
  {
    id: 'spring-extension',
    name: 'Spring Extension',
    description: 'Explore decimals by measuring how much a spring stretches.',
    icon: 'fa-vector-square',
    color: 'bg-blue-500',
    data: [
      { x: 0, y: 0 }, { x: 1, y: 2.5 }, { x: 2, y: 5.2 }, { x: 3, y: 7.8 },
      { x: 4, y: 10.1 }, { x: 5, y: 12.5 }
    ],
    config: {
      width: 600, height: 500,
      margin: { top: 60, right: 40, bottom: 80, left: 80 },
      xLabel: 'Force (N)', yLabel: 'Extension (cm)',
      mainTitle: 'Graph showing spring extension against force',
      xInterval: 1, yInterval: 2.5, xMax: 5, yMax: 15,
    }
  },
  {
    id: 'cooling-water',
    name: 'Cooling Water',
    description: 'Observe how the temperature of hot water drops over time.',
    icon: 'fa-temperature-low',
    color: 'bg-cyan-500',
    data: [
      { x: 0, y: 95.5 }, { x: 1, y: 82.3 }, { x: 2, y: 71.0 }, { x: 3, y: 62.5 },
      { x: 4, y: 55.2 }, { x: 5, y: 49.8 }, { x: 6, y: 45.1 }, { x: 7, y: 41.2 }
    ],
    config: {
      width: 600, height: 500,
      margin: { top: 60, right: 40, bottom: 80, left: 80 },
      xLabel: 'Time (Minutes)', yLabel: 'Temperature (°C)',
      mainTitle: 'Graph showing water temperature cooling over time',
      xInterval: 1, yInterval: 10, xMax: 8, yMax: 100,
    }
  }
];

export const STEPS: GraphStep[] = [
  {
    id: StepId.IDENTIFY_RANGE,
    title: "1. Find Minimum & Maximum",
    description: "First, look at your data table. What are the smallest and largest numbers? This tells you how big your graph needs to be.",
    tip: "Check both columns to find the smallest and largest values."
  },
  {
    id: StepId.CHOOSE_INTERVAL,
    title: "2. Choose an Interval",
    description: "Think about the scale. You need to count up in equal steps (like 2s, 5s, or 10s) until you reach your maximum number.",
    tip: "Keep intervals equal. Don't change the gap size as you go!"
  },
  {
    id: StepId.DRAW_AXES,
    title: "3. Draw & Number Axes",
    description: "Draw your vertical (Y) and horizontal (X) axes. Crucially, the numbers go exactly ON the lines, not in the gaps!",
    tip: "Use a sharp pencil and a ruler for straight, neat lines."
  },
  {
    id: StepId.LABEL_AXES,
    title: "4. Label Your Axes",
    description: "Tell your reader what the numbers mean. Include the units in brackets, like (cm) or (V).",
    tip: "Always remember to name both axes clearly."
  },
  {
    id: StepId.PLOT_POINTS,
    title: "5. Plot the Points",
    description: "Find the X value, use a ruler to go straight up until you reach the Y value. Mark it with a neat 'x'.",
    tip: "Accuracy is key! Check each point twice before marking it."
  },
  {
    id: StepId.JOIN_POINTS,
    title: "6. Join the Points",
    description: "Connect your points using a ruler for straight lines between each 'x'. This shows the trend clearly.",
    tip: "A line graph shows how one thing changes over time or against another variable."
  },
  {
    id: StepId.ADD_TITLE,
    title: "7. Give it a Title",
    description: "Every graph needs a clear title so everyone knows exactly what the data is showing.",
    tip: "A good title starts with 'A graph to show...'"
  }
];
