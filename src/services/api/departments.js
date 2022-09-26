export default function departments(api) {
  return {
    getAll: () => api.get('/departments'),
    getOne: (id) => api.get(`/departments/${id}`),
    create: (data) => api.post('/departments', data),
    update: (id, data) => api.put(`/departments/${id}`, data),
    delete: (id) => api.delete(`/departments/${id}`),
  };
}
