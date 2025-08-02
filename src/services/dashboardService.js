import api from './api';

// Fetch all dashboard data from /onAppStartup endpoint
export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/onAppStartup');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    // Return mock data for demo/fallback
    return {
      totalBalance: "50.00",
      userAssets: [],
      userTransactions: []
    };
  }
}; 