import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/authStore';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from '../components/Card';
import Button from '../components/Button';
import WebhookManager from '../components/WebhookManager';
import TransactionList from '../components/TransactionList';
import StatsChart from '../components/StatsChart';
import { fetchBalance, fetchTransactions } from '../services/dashboardService';

const DashboardPage = () => {
  const { token } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [balanceData, transactionsData] = await Promise.all([
          fetchBalance(),
          fetchTransactions()
        ]);
        
        setBalance(balanceData.balance || 0);
        setTransactions(transactionsData.transactions || []);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div style={{ color: colors.textColor }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 
          className="text-3xl font-bold"
          style={{ color: colors.textColor }}
        >
          Developer Dashboard
        </h1>
        <div className="text-sm" style={{ color: colors.secondaryTextColor }}>
          Welcome back, Developer!
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Balance and Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="balance" className="col-span-1">
          <div className="text-center">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: colors.textColor }}
            >
              Account Balance
            </h3>
            <div 
              className="text-3xl font-bold"
              style={{ color: colors.dashboardTextColor }}
            >
              ${balance.toLocaleString()}
            </div>
          </div>
        </Card>

        <Card variant="stats" className="col-span-2">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: colors.textColor }}
          >
            API Usage Statistics
          </h3>
          <StatsChart />
        </Card>
      </div>

      {/* JWT Token Display */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-lg font-semibold"
            style={{ color: colors.textColor }}
          >
            JWT Token
          </h3>
          <Button
            variant="secondary"
            onClick={() => copyToClipboard(token)}
            className="text-sm"
          >
            Copy Token
          </Button>
        </div>
        <div 
          className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-xs break-all"
          style={{ color: colors.secondaryTextColor }}
        >
          {token}
        </div>
      </Card>

      {/* Webhook Management */}
      <WebhookManager />

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-lg font-semibold"
            style={{ color: colors.textColor }}
          >
            Recent Transactions
          </h3>
          <Button variant="secondary" className="text-sm">
            View All
          </Button>
        </div>
        <TransactionList transactions={transactions} />
      </Card>
    </div>
  );
};

export default DashboardPage; 