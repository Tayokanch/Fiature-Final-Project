import api from '../../services/api';

export const fetchBalance = async (authToken) => {
  try {
    const response = await api.get('/balance', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    return { balance: 0 };
  }
};

export const fetchTransactions = async (authToken) => {
  try {
    const response = await api.post('/getAlltransactions', {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    return { transactions: [] };
  }
};

export const fetchDashboardData = async (authToken) => {
  try {
    const [balanceResponse, transactionsResponse] = await Promise.all([
      fetchBalance(authToken),
      fetchTransactions(authToken)
    ]);
    return {
      balance: balanceResponse.balance,
      transactions: transactionsResponse.transactions
    };
  } catch (error) {
    return { balance: 0, transactions: [] };
  }
}; 