import React, { useState } from 'react';
import Card from '../../components/Card';
import { getThemeColors } from '../../styles/theme';
import { useThemeStore } from '../../store/themeStore';

const JWTDisplay = ({ token }) => {
  const { isDarkMode } = useThemeStore();
  const colors = getThemeColors(isDarkMode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!token) return null;

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs break-all" style={{ color: colors.textColor }}>
          {token}
        </div>
        <button
          className="ml-4 px-2 py-1 rounded text-xs border"
          style={{ background: colors.brandButtonBg, color: colors.brandButtonText }}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </Card>
  );
};

export default JWTDisplay; 