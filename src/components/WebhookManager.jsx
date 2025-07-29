import React, { useState, useEffect } from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { addWebhook, deleteWebhook, fetchWebhooks } from '../services/webhookService';

const WebhookManager = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const [webhooks, setWebhooks] = useState([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    try {
      setLoading(true);
      const response = await fetchWebhooks();
      setWebhooks(response.webhooks || []);
    } catch (err) {
      setError('Failed to load webhooks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebhook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newWebhookUrl) {
      setError('Webhook URL is required');
      return;
    }

    if (webhooks.length >= 3) {
      setError('Maximum 3 webhooks allowed');
      return;
    }

    try {
      await addWebhook(newWebhookUrl);
      setWebhooks([...webhooks, newWebhookUrl]);
      setNewWebhookUrl('');
      setSuccess('Webhook added successfully');
    } catch (err) {
      setError('Failed to add webhook');
    }
  };

  const handleDeleteWebhook = async (url) => {
    try {
      await deleteWebhook(url);
      setWebhooks(webhooks.filter(webhook => webhook !== url));
      setSuccess('Webhook deleted successfully');
    } catch (err) {
      setError('Failed to delete webhook');
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: colors.textColor }}
        >
          Webhook Management
        </h3>
        <span 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          {webhooks.length}/3 webhooks
        </span>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          {success}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4" style={{ color: colors.secondaryTextColor }}>
          Loading webhooks...
        </div>
      ) : (
        <>
          {/* Webhook List */}
          <div className="space-y-3 mb-4">
            {webhooks.map((webhook, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span 
                  className="text-sm font-mono break-all"
                  style={{ color: colors.textColor }}
                >
                  {webhook}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteWebhook(webhook)}
                  className="ml-3 text-xs"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          {/* Add Webhook Form */}
          {webhooks.length < 3 && (
            <form onSubmit={handleAddWebhook} className="flex gap-3">
              <Input
                placeholder="Enter webhook URL"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="primary">
                Add Webhook
              </Button>
            </form>
          )}

          {webhooks.length === 0 && (
            <div 
              className="text-center py-8 text-sm"
              style={{ color: colors.secondaryTextColor }}
            >
              No webhooks configured. Add your first webhook above.
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default WebhookManager; 