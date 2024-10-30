export const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiCall = async (url, options = {}) => {
  const headers = {
    ...authHeader(),
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('API call failed');
  }
  return response.json();
};

