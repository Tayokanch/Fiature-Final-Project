import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/authStore';
import { fetchDashboardData } from './dashboardService';
import BalanceCard from './BalanceCard';
import TransactionList from './TransactionList';
import StatsChart from '../../components/StatsChart';
import { useTheme } from '../../store/themeStore';
import { getThemeColors } from '../../utils/themeUtils';

const Dashboard = () => {
  const { token: authToken } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setDashboardError('');
      try {
        const balanceResponse = await fetchDashboardData(authToken);
        setBalance(balanceResponse?.balance || 0);
        const transactionsResponse = await fetchDashboardData(authToken);
        setTransactions(transactionsResponse?.transactions || []);
      } catch (error) {
        setDashboardError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [authToken]);

  return (
    <div className="space-y-6">
      <h1 
        className="text-3xl font-bold mb-4 flex items-center gap-3"
        style={{ color: colors.textColor }}
      >
        <FiDatabase size={32} style={{ color: colors.iconColor }} />
        Developer Dashboard
      </h1>
      {dashboardError && <div className="text-red-500">{dashboardError}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="balance" className="col-span-1">
          <div className="text-lg font-semibold flex items-center gap-2">
            <FiDollarSign size={20} style={{ color: colors.iconColor }} />
            Balance
          </div>
          <div className="text-2xl mt-2">{isLoading ? '...' : balance}</div>
        </Card>
        <Card variant="stats" className="col-span-2">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FiBarChart3 size={20} style={{ color: colors.iconColor }} />
            Stats (Mock)
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <FiTrendingUp size={16} style={{ color: colors.iconColor }} />
              Total Requests: 123
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp size={16} style={{ color: colors.iconColor }} />
              Success: 120
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp size={16} style={{ color: colors.iconColor }} />
              Failed: 3
            </div>
          </div>
        </Card>
      </div>
      <JWTDisplay token={authToken} />
      <TransactionList transactions={transactions} loading={isLoading} />
    </div>
  );
};

export default Dashboard; 