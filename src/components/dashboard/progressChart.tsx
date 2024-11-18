import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ProgressChart = () => {
  const numbers = Array.from({ length: 168 }, (_, i) => i + 1);
  const daysOfWeek =  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let currentDayIndex = 0;

  const data = {
    labels: numbers,
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          {x: 0, y: 3},
          {x: 3, y: 3.5},
          {x: 10, y: 3.6},
          {x: 11, y: 4},
          {x: 13, y: 3},
          {x: 15, y: 2},
          {x: 19, y: 1.2},
          {x: 22, y: 1.5},
          {x: 21, y: 2},
          {x: 24, y: 2.2},
          {x: 27, y: 2.5},
          {x: 29, y: 2.2},
          {x: 31, y: 3},
          {x: 32, y: 3.2},
          {x: 33, y: 3.1},
          {x: 34, y: 2},
          {x: 38, y: 1.6},
          {x: 40, y: 3},
          {x: 44, y: 3.5},
          {x: 45, y: 4},
          {x: 62, y: 2},
          {x: 66, y: 1.8},
          {x: 78, y: 3.7},
          {x: 91, y: 5},
          {x: 95, y: 2.9},
          {x: 101, y: 1.9},
          {x: 150, y: 3},
          {x: 155, y: 3.3},
          {x: 160, y: 3.1},
          {x: 168, y: 2},

        ],
        fill: true,
        borderColor: 'rgb(93, 232, 91)',
        backgroundColor: "rgba(93, 232, 91, 0.15)",
        tension: 0.3,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        ticks: {
          maxTicksLimit: 7,
          callback: function (value: number, index: number) {
            if (index % 24 === 0) {
              const dayLabel = daysOfWeek[currentDayIndex];
              currentDayIndex = (currentDayIndex + 1) % 7;
              return dayLabel;
            }
            return '';
          },
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: number) {
            return value + ' h';
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <p className="text-themetext text-[24px] font-bold mb-[10px]">Progress</p>
      <p className="text-themetext text-[14px] mb-[20px] max-w-[377px]">Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent pretium varius nulla arcu nunc elementum. </p>

      <div className='bg-background-second rounded-2xl p-[32px] max-w-[863px] flex justify-center'>
        <Line data={data} options={options} style={{  maxWidth: '800px', maxHeight: '430px' }} />
      </div>

    </div>
  )
}