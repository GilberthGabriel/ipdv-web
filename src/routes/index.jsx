import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';
import Layout from '../components/Layout';
import Users from '../pages/Users';
import UsersCreateEdit from '../pages/Users/CreateEdit';
import Roles from '../pages/Roles';
import RolesCreateEdit from '../pages/Roles/CreateEdit';
import Departments from '../pages/Departments';
import DepartmentsCreateEdit from '../pages/Departments/CreateEdit';
import CostCenters from '../pages/CostCenters';
import CostCentersCreateEdit from '../pages/CostCenters/CreateEdit';
import Login from '../pages/Login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Login />} />
    <Route path="/users" element={<Layout element={<Users />} />} />
    <Route path="/users/create" element={<Layout element={<UsersCreateEdit />} />} />
    <Route path="/users/:id" element={<Layout element={<UsersCreateEdit />} />} />
    <Route path="/roles" element={<Layout element={<Roles />} />} />
    <Route path="/roles/create" element={<Layout element={<RolesCreateEdit />} />} />
    <Route path="/roles/:id" element={<Layout element={<RolesCreateEdit />} />} />
    <Route path="/departments" element={<Layout element={<Departments />} />} />
    <Route path="/departments/create" element={<Layout element={<DepartmentsCreateEdit />} />} />
    <Route path="/departments/:id" element={<Layout element={<DepartmentsCreateEdit />} />} />
    <Route path="/costcenters" element={<Layout element={<CostCenters />} />} />
    <Route path="/costcenters/create" element={<Layout element={<CostCentersCreateEdit />} />} />
    <Route path="/costcenters/:id" element={<Layout element={<CostCentersCreateEdit />} />} />
  </Route>,
));

export default function Router() {
  return <RouterProvider router={router} />;
}
