export default function roles(api) {
  return {
    getAll: () => api.get('/roles'),
    getOne: (id) => api.get(`/roles/${id}`),
    create: (data) => api.post('/roles', data),
    update: (id, data) => api.put(`/roles/${id}`, data),
    delete: (id) => api.delete(`/roles/${id}`),
  };
}
