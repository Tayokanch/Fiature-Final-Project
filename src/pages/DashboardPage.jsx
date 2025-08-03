import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from '../components/Card';
import Button from '../components/Button';
import WebhookManager from '../components/WebhookManager';
import TransactionList from '../components/TransactionList';

import StatsChart from '../components/StatsChart';
import { fetchDashboardData } from '../services/dashboardService';
import { AppStartData } from '../Transaction/appStart';



const DashboardPage = () => {
  const { token } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch all data from /onAppStartup endpoint
        const dashboardData = await fetchDashboardData();
        setBalance(dashboardData.totalBalance || AppStartData.totalBalance);
        setAssets(dashboardData.userAssets || AppStartData.userAssets);
        setTransactions(dashboardData.userTransactions || AppStartData.userTransactions);
      } catch (err) {
        console.error('Dashboard data error:', err);
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
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card variant="balance" className="col-span-1">
          <div className="text-center mb-6 p-4 rounded-lg border" style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.inputBg
          }}>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: colors.textColor }}
            >
              Total Balance
            </h3>
            <div 
              className="text-3xl font-bold"
              style={{ color: colors.dashboardTextColor }}
            >
              ${balance.toLocaleString()}
            </div>
          </div>
          
          {/* Assets Table inside Balance Card */}
          <div className="border-t pt-6" style={{ borderColor: colors.borderColor }}>
                         <div className="flex items-center justify-between mb-4">
               <h4 
                 className="text-lg font-semibold"
                 style={{ color: colors.textColor }}
               >
                 Your Assets
               </h4>
               <div 
                 className="text-sm px-2 py-1 rounded-full border"
                 style={{ 
                   color: colors.secondaryTextColor,
                   backgroundColor: colors.inputBg,
                   borderColor: colors.borderColor
                 }}
               >
                 {assets.length} assets
               </div>
             </div>
            
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-1"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : !assets || assets.length === 0 ? (
              <div className="text-center py-6">
                <div 
                  className="text-sm"
                  style={{ color: colors.secondaryTextColor }}
                >
                  No assets found
                </div>
              </div>
                         ) : (
                                                               <div>
                  <table className="w-full">
                   <thead>
                     <tr 
                       className="border-b"
                       style={{ borderColor: colors.borderColor }}
                     >
                       <th 
                         className="text-left py-3 px-4 font-semibold text-sm"
                         style={{ color: colors.textColor }}
                       >
                         Asset
                       </th>
                       <th 
                         className="text-left py-3 px-4 font-semibold text-sm"
                         style={{ color: colors.textColor }}
                       >
                         Symbol
                       </th>
                       <th 
                         className="text-right py-3 px-4 font-semibold text-sm"
                         style={{ color: colors.textColor }}
                       >
                         Balance
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {assets.map((asset, index) => (
                                               <tr 
                          key={asset.symbol}
                          className={`border-b transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer ${
                            index === assets.length - 1 ? '' : 'border-b'
                          }`}
                          style={{ 
                            borderColor: colors.borderColor,
                            backgroundColor: index % 2 === 0 ? 'transparent' : `${colors.cardBg}30`
                          }}
                                                     onMouseEnter={(e) => {
                             e.currentTarget.style.backgroundColor = `${colors.cardBg}50`;
                             e.currentTarget.style.transform = 'translateY(-1px)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : `${colors.cardBg}30`;
                             e.currentTarget.style.transform = 'translateY(0)';
                           }}
                        >
                                                   <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img 
                                  src={asset.logo_url} 
                                  alt={asset.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div 
                                  className="w-8 h-8 rounded-full items-center justify-center text-xs font-bold hidden"
                                  style={{ 
                                    backgroundColor: colors.iconColor,
                                    color: colors.brandButtonText
                                  }}
                                >
                                  {asset.symbol.charAt(0)}
                                </div>
                              </div>
                              <div>
                                <div 
                                  className="font-semibold text-sm"
                                  style={{ color: colors.textColor }}
                                >
                                  {asset.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span 
                              className="px-3 py-1.5 rounded-full text-xs font-semibold inline-block w-[50px] text-center"
                              style={{ 
                                backgroundColor: colors.iconColor,
                                color: colors.brandButtonText
                              }}
                            >
                              {asset.symbol}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div 
                              className="font-bold text-sm"
                              style={{ color: colors.textColor }}
                            >
                              {asset.balance}
                            </div>
                          </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            )}
          </div>
        </Card>

                 <Card variant="stats" className="col-span-1 lg:col-span-2">
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
          className="p-3 rounded-lg font-mono text-xs break-all border"
          style={{ 
            color: colors.secondaryTextColor,
            backgroundColor: colors.inputBg,
            borderColor: colors.borderColor
          }}
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
        <TransactionList transactions={transactions} loading={loading} />
      </Card>
    </div>
  );
};

export default DashboardPage; 