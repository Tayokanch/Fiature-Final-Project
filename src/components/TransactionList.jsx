import React from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import { FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiHash, FiArrowUpRight, FiArrowDownLeft, FiRefreshCw } from 'react-icons/fi';
import { formatTransactionDate, getTransactionStatusColor } from '../Transaction/appStart';

const TransactionList = ({ transactions = [], loading = false }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  if (loading) {
    return (
      <div className="text-center py-8 flex items-center justify-center gap-2" style={{ color: colors.secondaryTextColor }}>
        <FiClock size={20} />
        Loading transactions...
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8 flex items-center justify-center gap-2" style={{ color: colors.secondaryTextColor }}>
        <FiXCircle size={20} />
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: colors.secondaryTextColor }}>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              Date
            </th>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              Type
            </th>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              Asset
            </th>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              Amount
            </th>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              Status
            </th>
            <th 
              className="text-left py-3 px-4 font-medium"
              style={{ color: colors.textColor }}
            >
              TX ID
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const getTransactionTypeColor = (type) => {
              switch (type) {
                case 'swap':
                  return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                case 'withdrawal':
                  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                case 'deposit':
                  return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                default:
                  return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
              }
            };

            const getTransactionIcon = (type) => {
              switch (type) {
                case 'swap':
                  return <FiRefreshCw size={16} style={{ color: colors.iconColor }} />;
                case 'deposit':
                  return <FiArrowDownLeft size={16} style={{ color: colors.iconColor }} />;
                case 'withdrawal':
                  return <FiArrowUpRight size={16} style={{ color: colors.iconColor }} />;
                default:
                  return <FiDollarSign size={16} style={{ color: colors.iconColor }} />;
              }
            };

            return (
              <tr 
                key={transaction.id || index}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                style={{ borderColor: colors.secondaryTextColor }}
              >
                <td 
                  className="py-3 px-4 flex items-center gap-2"
                  style={{ color: colors.textColor }}
                >
                  <FiClock size={14} style={{ color: colors.iconColor }} />
                  {formatTransactionDate(transaction.transaction_date || transaction.timestamp)}
                </td>
                <td 
                  className="py-3 px-4"
                  style={{ color: colors.textColor }}
                >
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(transaction.transaction_type)}
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center ${getTransactionTypeColor(transaction.transaction_type)}`}>
                      {transaction.transaction_type}
                    </span>
                  </div>
                </td>
                <td 
                  className="py-3 px-4 font-medium"
                  style={{ color: colors.textColor }}
                >
                  {transaction.asset}
                </td>
                <td 
                  className="py-3 px-4 font-medium"
                  style={{ color: colors.dashboardTextColor }}
                >
                  {transaction.amount} {transaction.asset}
                </td>
                <td 
                  className="py-3 px-4"
                  style={{ color: colors.textColor }}
                >
                  <span className={`px-2 py-1 rounded-full text-xs ${getTransactionStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td 
                  className="py-3 px-4 font-mono text-xs flex items-center gap-2"
                  style={{ color: colors.secondaryTextColor }}
                >
                  <FiHash size={14} style={{ color: colors.iconColor }} />
                  {transaction.tx_id ? transaction.tx_id.substring(0, 8) + '...' : 'N/A'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList; 