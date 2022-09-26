export default function costCenters(api) {
  return {
    getAll: () => api.get('/costCenters'),
    getOne: (id) => api.get(`/costCenters/${id}`),
    create: (data) => api.post('/costCenters', data),
    update: (id, data) => api.put(`/costCenters/${id}`, data),
    delete: (id) => api.delete(`/costCenters/${id}`),
  };
}
