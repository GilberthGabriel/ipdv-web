import axios from 'axios';
import users from './users';
import roles from './roles';
import departments from './departments';
import costCenters from './cost_centers';
import auth from './auth';

export const createClient = (data) => axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001/',
  ...data,
});

export const getRoutes = (api) => ({
  auth: auth(api),
  users: users(api),
  roles: roles(api),
  departments: departments(api),
  costCenters: costCenters(api),
});

export const api = getRoutes(createClient());
