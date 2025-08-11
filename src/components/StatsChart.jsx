import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

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

  // Monthly API usage data
  const monthlyData = [
    { month: 'Jan', requests: 120, success: 115, failed: 5 },
    { month: 'Feb', requests: 190, success: 182, failed: 8 },
    { month: 'Mar', requests: 300, success: 285, failed: 15 },
    { month: 'Apr', requests: 500, success: 475, failed: 25 },
    { month: 'May', requests: 200, success: 190, failed: 10 },
    { month: 'Jun', requests: 300, success: 285, failed: 15 },
  ];

  // Success rate data for pie chart
  const successRateData = [
    { name: 'Successful', value: statsData.successfulRequests, color: '#10B981' },
    { name: 'Failed', value: statsData.failedRequests, color: '#EF4444' },
  ];

  // Response time data
  const responseTimeData = [
    { time: '00:00', ms: 180 },
    { time: '04:00', ms: 220 },
    { time: '08:00', ms: 245 },
    { time: '12:00', ms: 280 },
    { time: '16:00', ms: 260 },
    { time: '20:00', ms: 200 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
          style={{ 
            borderColor: colors.borderColor,
            color: colors.textColor 
          }}
        >
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="text-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
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
        
        <div 
          className="text-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <div 
            className="text-2xl font-bold"
            style={{ color: '#10B981' }}
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
        
        <div 
          className="text-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <div 
            className="text-2xl font-bold"
            style={{ color: '#EF4444' }}
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
        
        <div 
          className="text-center p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Monthly API Usage - Composed Chart */}
        <div 
          className="p-3 lg:p-4 rounded-lg border"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <h4 
            className="text-base lg:text-lg font-semibold mb-3 lg:mb-4"
            style={{ color: colors.textColor }}
          >
            Monthly API Usage
          </h4>
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <ComposedChart data={monthlyData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={colors.secondaryTextColor}
                opacity={0.3}
              />
              <XAxis 
                dataKey="month" 
                stroke={colors.textColor}
                fontSize={11}
                className="text-xs lg:text-sm"
              />
              <YAxis 
                stroke={colors.textColor}
                fontSize={11}
                className="text-xs lg:text-sm"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="requests" 
                fill={colors.iconColor}
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate - Pie Chart */}
        <div 
          className="p-3 lg:p-4 rounded-lg border"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <h4 
            className="text-base lg:text-lg font-semibold mb-3 lg:mb-4"
            style={{ color: colors.textColor }}
          >
            Request Success Rate
          </h4>
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <PieChart>
              <Pie
                data={successRateData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {successRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Trend */}
        <div 
          className="p-3 lg:p-4 rounded-lg border md:col-span-2 xl:col-span-1"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor 
          }}
        >
          <h4 
            className="text-base lg:text-lg font-semibold mb-3 lg:mb-4"
            style={{ color: colors.textColor }}
          >
            Response Time Trend (24h)
          </h4>
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <AreaChart data={responseTimeData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={colors.secondaryTextColor}
                opacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                stroke={colors.textColor}
                fontSize={11}
                className="text-xs lg:text-sm"
              />
              <YAxis 
                stroke={colors.textColor}
                fontSize={11}
                className="text-xs lg:text-sm"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="ms" 
                stroke={colors.iconColor}
                fill={colors.iconColor}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsChart; 