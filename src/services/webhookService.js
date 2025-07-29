import api from './api';

export const fetchWebhooks = async () => {
  try {
    const response = await api.get('/webhooks');
    return response.data;
  } catch (error) {
    // Return mock data for demo
    return { webhooks: [] };
  }
};

export const addWebhook = async (webhookUrl) => {
  try {
    const response = await api.post('/add_webhook', {
      webhook_url: webhookUrl
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add webhook');
  }
};

export const deleteWebhook = async (webhookUrl) => {
  try {
    const response = await api.post('/delete_webhook', {
      webhook_url: webhookUrl
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete webhook');
  }
}; 