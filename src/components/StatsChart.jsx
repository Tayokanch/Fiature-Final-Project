import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatsChart = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  // Mock data - replace with real API data
  const statsData = {
    totalRequests: 1234,
    successfulRequests: 1189,
    failedRequests: 45,
    averageResponseTime: 245,
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'API Requests',
        data: [120, 190, 300, 500, 200, 300],
        backgroundColor: colors.iconColor,
        borderColor: colors.iconColor,
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Successful', 'Failed'],
    datasets: [
      {
        data: [statsData.successfulRequests, statsData.failedRequests],
        backgroundColor: [
          '#10B981', // Green for success
          '#EF4444', // Red for failed
        ],
        borderColor: [
          '#10B981',
          '#EF4444',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: colors.secondaryTextColor,
        },
        ticks: {
          color: colors.textColor,
        },
      },
      x: {
        grid: {
          color: colors.secondaryTextColor,
        },
        ticks: {
          color: colors.textColor,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.textColor,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div 
            className="text-2xl font-bold"
            style={{ color: colors.dashboardTextColor }}
          >
            {statsData.totalRequests.toLocaleString()}
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryTextColor }}
          >
            Total Requests
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div 
            className="text-2xl font-bold text-green-600"
            style={{ color: colors.dashboardTextColor }}
          >
            {statsData.successfulRequests.toLocaleString()}
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryTextColor }}
          >
            Successful
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div 
            className="text-2xl font-bold text-red-600"
            style={{ color: colors.dashboardTextColor }}
          >
            {statsData.failedRequests.toLocaleString()}
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryTextColor }}
          >
            Failed
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div 
            className="text-2xl font-bold"
            style={{ color: colors.dashboardTextColor }}
          >
            {statsData.averageResponseTime}ms
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryTextColor }}
          >
            Avg Response
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 
            className="text-lg font-semibold mb-4"
            style={{ color: colors.textColor }}
          >
            Monthly API Usage
          </h4>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        
        <div>
          <h4 
            className="text-lg font-semibold mb-4"
            style={{ color: colors.textColor }}
          >
            Request Success Rate
          </h4>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsChart; 