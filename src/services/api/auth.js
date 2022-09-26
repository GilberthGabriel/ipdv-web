export default function costCenters(api) {
  return {
    login: (data) => api.post('/auth/login', data),
    refresh: (data) => api.post('/auth/refresh', data),
  };
}
