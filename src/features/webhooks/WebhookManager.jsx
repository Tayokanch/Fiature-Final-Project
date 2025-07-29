import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/authStore';
import { getWebhooks, createWebhook, deleteWebhook } from './webhookService';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Card from '../../components/Card';

const WebhookManager = () => {
  const { token: authToken } = useAuth();
  const [webhookUrls, setWebhookUrls] = useState([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [webhookError, setWebhookError] = useState('');
  const [webhookSuccess, setWebhookSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setWebhookError('');
      try {
        const response = await getWebhooks(authToken);
        setWebhookUrls(response?.webhooks || []);
      } catch {
        setWebhookError('Failed to load webhooks');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [authToken]);

  const handleAdd = async () => {
    setWebhookError('');
    setWebhookSuccess('');
    if (!newWebhookUrl) return setWebhookError('Webhook URL required');
    if (webhookUrls.length >= 3) return setWebhookError('Max 3 webhooks allowed');
    try {
      await createWebhook(authToken, newWebhookUrl);
      setWebhookUrls([...webhookUrls, newWebhookUrl]);
      setNewWebhookUrl('');
      setWebhookSuccess('Webhook added');
    } catch {
      setWebhookError('Failed to add webhook');
    }
  };

  const handleDelete = async (url) => {
    setWebhookError('');
    setWebhookSuccess('');
    try {
      await deleteWebhook(authToken, url);
      setWebhookUrls(webhookUrls.filter(webhookUrl => webhookUrl !== url));
      setWebhookSuccess('Webhook deleted');
    } catch {
      setWebhookError('Failed to delete webhook');
    }
  };

  return (
    <Card className="mb-4">
      <h2 className="text-lg font-bold mb-2">Webhook Management</h2>
      {webhookError && <div className="text-red-500 text-sm mb-2">{webhookError}</div>}
      {webhookSuccess && <div className="text-green-600 text-sm mb-2">{webhookSuccess}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul className="mb-4">
            {webhookUrls.map((url, i) => (
              <li key={i} className="flex items-center justify-between mb-2">
                <span className="break-all">{url}</span>
                <Button variant="secondary" onClick={() => handleDelete(url)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          {webhookUrls.length < 3 && (
            <div className="flex gap-2">
              <Input
                value={newWebhookUrl}
                onChange={e => setNewWebhookUrl(e.target.value)}
                placeholder="Webhook URL"
                className="flex-1"
              />
              <Button onClick={handleAdd} variant="primary">
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default WebhookManager; 