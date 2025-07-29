import api from './api';

export const fetchBalance = async () => {
  try {
    const response = await api.get('/balance');
    return response.data;
  } catch (error) {
    // Return mock data for demo
    return { balance: 1250.75 };
  }
};

export const fetchTransactions = async () => {
  try {
    const response = await api.post('/getAlltransactions');
    return response.data;
  } catch (error) {
    // Return mock data for demo
    return {
      transactions: [
        {
          id: 1,
          date: '2024-01-15T10:30:00Z',
          type: 'credit',
          amount: 500.00,
          status: 'completed',
          reference: 'TXN-001-2024'
        },
        {
          id: 2,
          date: '2024-01-14T15:45:00Z',
          type: 'debit',
          amount: 150.25,
          status: 'completed',
          reference: 'TXN-002-2024'
        },
        {
          id: 3,
          date: '2024-01-13T09:20:00Z',
          type: 'credit',
          amount: 750.50,
          status: 'pending',
          reference: 'TXN-003-2024'
        },
        {
          id: 4,
          date: '2024-01-12T14:15:00Z',
          type: 'debit',
          amount: 89.99,
          status: 'completed',
          reference: 'TXN-004-2024'
        },
        {
          id: 5,
          date: '2024-01-11T11:30:00Z',
          type: 'credit',
          amount: 1200.00,
          status: 'completed',
          reference: 'TXN-005-2024'
        }
      ]
    };
  }
}; 