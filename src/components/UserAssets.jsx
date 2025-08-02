import React from 'react';
import Card from './Card';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

const UserAssets = ({ assets = [], loading = false }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!assets || assets.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div 
            className="text-lg font-semibold mb-2"
            style={{ color: colors.textColor }}
          >
            No Assets Found
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryTextColor }}
          >
            You don't have any crypto assets yet.
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: colors.textColor }}
        >
          Your Assets
        </h3>
        <div 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          {assets.length} assets
        </div>
      </div>
      
      <div className="space-y-3">
        {assets.map((asset) => (
          <div 
            key={asset.symbol}
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.cardBg 
            }}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={asset.logo_url} 
                alt={asset.name}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <div 
                  className="font-semibold"
                  style={{ color: colors.textColor }}
                >
                  {asset.name}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: colors.secondaryTextColor }}
                >
                  {asset.symbol}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div 
                className="font-semibold"
                style={{ color: colors.textColor }}
              >
                {asset.balance}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.secondaryTextColor }}
              >
                {asset.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserAssets; 