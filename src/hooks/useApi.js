import { useAuth } from '../contexts/auth';
import { createClient, getRoutes } from '../services/api';

export default function useApi() {
  const { token, tokenExpiration, refresh } = useAuth();
  const api = createClient();
  api.interceptors.request.use(async (config) => {
    let apiToken = token;
    if (new Date() > new Date(tokenExpiration * 1000)) {
      apiToken = await refresh();
    }

    config.headers.Authorization = `Bearer ${apiToken}`;
    return config;
  });

  return getRoutes(api);
}
