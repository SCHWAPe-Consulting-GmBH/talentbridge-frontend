import { Chart as ChartJS, RadarController, RadialLinearScale, Filler, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.font.family = 'Nunito Sans';
ChartJS.defaults.font.weight = 'bold';