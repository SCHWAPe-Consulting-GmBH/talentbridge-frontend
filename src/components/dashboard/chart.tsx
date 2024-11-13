import { Radar } from 'react-chartjs-2';
import '@/utils/chartjsConfig';

export const ChartDashboard = () => {
  const data = {
    labels: [
      'Progress',
      'Homework',
      'Documents',
      'Meetings',
      'Students',
      'Courses',
    ],
    datasets: [
      {
        label: '2022',
        data: [44, 5, 80, 80, 60, 90],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        label: '2023',
        data: [80, 25, 40, 90, 70, 50],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  const legendMargin = {
    id: "legendMargin",
    beforeInit: function (chart: any) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 35);
      };
    }
  };

  return (
    <div className="w-[450px] h-[455px] bg-white rounded-2xl p-6 relative 
    before:content-[''] before:absolute before:top-[66px] before:w-[400px] before:h-[1px] before:bg-gray-300 before:rounded-full
    after:content-[''] after:absolute after:top-[65px] after:w-[64px] after:h-[3px] after:bg-primary after:rounded-full">
      <h3 className='text-[24px] font-bold absolute'>Chart</h3>
      <Radar
        plugins={[legendMargin]}
        data={data}
        options={{
          responsive: true,
          scales: {
            r: {
              pointLabels: {
                font: {
                  family: 'Nunito Sans',
                  size: 14,
                },
              },
              ticks: {
                stepSize: 20,
              },
            },
          },
          plugins: {
            legend: {
              align: 'end',
              position: 'top',
              labels: {
                font: {
                  size: 12,
                },
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 10,
                boxHeight: 7,
              },
            },
          },
        }}
      />
    </div>
  );
};
