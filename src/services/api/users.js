export default function users(api) {
  return {
    getAll: () => api.get('/users'),
    getOne: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    export: () => api.get('/users/export', { responseType: 'blob' }),
  };
}
