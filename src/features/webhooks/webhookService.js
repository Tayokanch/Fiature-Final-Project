import api from '../../services/api';

export const getWebhooks = async (authToken) => {
  try {
    const response = await api.get('/webhooks', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    return { webhooks: [] };
  }
};

export const createWebhook = async (authToken, webhookUrl) => {
  try {
    await api.post('/add_webhook', { webhook_url: webhookUrl }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    throw new Error('Failed to add webhook');
  }
};

export const deleteWebhook = async (authToken, webhookUrl) => {
  try {
    await api.post('/delete_webhook', { webhook_url: webhookUrl }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    throw new Error('Failed to delete webhook');
  }
}; 