export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export const saveRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
}; 