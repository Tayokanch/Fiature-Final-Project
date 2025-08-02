import api from './api';
import { AppStartData } from '../Transaction/appStart';

// Fetch all dashboard data from /onAppStartup endpoint
export const fetchDashboardData = async () => {
  try {
    console.log('Making API call to /onAppStartup...');
    const response = await api.get('/onAppStartup');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    console.log('Using mock data due to API failure...');
    // Return mock data when API fails (CORS issue, etc.)
    return AppStartData;
  }
}; 