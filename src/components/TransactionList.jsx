import React from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import { FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiHash } from 'react-icons/fi';

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
              Reference
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr 
              key={index}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              style={{ borderColor: colors.secondaryTextColor }}
            >
              <td 
                className="py-3 px-4 flex items-center gap-2"
                style={{ color: colors.textColor }}
              >
                <FiClock size={14} style={{ color: colors.iconColor }} />
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td 
                className="py-3 px-4"
                style={{ color: colors.textColor }}
              >
                <span className={`px-2 py-1 rounded-full text-xs ${
                  transaction.type === 'credit' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {transaction.type}
                </span>
              </td>
              <td 
                className="py-3 px-4 font-medium flex items-center gap-2"
                style={{ color: colors.dashboardTextColor }}
              >
                <FiDollarSign size={14} style={{ color: colors.iconColor }} />
                ${transaction.amount?.toFixed(2) || '0.00'}
              </td>
              <td 
                className="py-3 px-4"
                style={{ color: colors.textColor }}
              >
                <span className={`px-2 py-1 rounded-full text-xs ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {transaction.status}
                </span>
              </td>
              <td 
                className="py-3 px-4 font-mono text-xs flex items-center gap-2"
                style={{ color: colors.secondaryTextColor }}
              >
                <FiHash size={14} style={{ color: colors.iconColor }} />
                {transaction.reference || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList; 