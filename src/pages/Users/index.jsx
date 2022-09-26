import React, { useState, useEffect } from 'react';
import {
  Button, Table, Container, DropdownButton, Dropdown, Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RemoveItemModal from '../../components/RemoveItemModal';
import Title from '../../components/Title';
import useApi from '../../hooks/useApi';

function Users() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    ApiService.departments.getAll().then((res) => setDepartments(res.data));
    const fetchData = async () => {
      const response = await ApiService.users.getAll();
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeleteItemId();
    const response = await ApiService.users.delete(id);
    if (response.status === 200) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleChangeDepartment = async (event) => {
    if (event.target.value === 'Selecione aqui o cargo') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.Role.Department.id === event.target.value));
    }
  };

  const handleExport = async () => {
    const response = await ApiService.users.export();
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <Container>
      <div style={styles.header}>
        <Title title="Usuários" totalItems={data.length} />
        <div style={styles.header_buttons}>
          <Button onClick={() => navigate('/users/create')} className="mb-2">Criar novo</Button>
          <Button onClick={handleExport}>Exportar</Button>
        </div>
      </div>
      <Form.Group className="mb-4 p-1" style={styles.header_filter}>
        <Form.Label htmlFor="department-input">Cargo:</Form.Label>
        <Form.Select onChange={handleChangeDepartment}>
          <option>Selecione aqui o cargo</option>
          {departments.map((department) => (
            <option value={department.id}>{department.title}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Table variant="hover">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Id</th>
            <th style={{ width: '25%' }}>Nome</th>
            <th style={{ width: '25%' }}>Email</th>
            <th style={{ width: '20%' }}>Departamento</th>
            <th style={{ width: '15%' }}>Data</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr className="align-middle">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item?.Role?.Department?.title}</td>
              <td>{new Date(item.createdAt)?.toLocaleDateString()}</td>
              <td>
                <DropdownButton variant="secondary" className="btn-sm" title="Ações">
                  <Dropdown.Item onClick={() => navigate(`/users/${item.id}`)}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDeleteItemId(item.id)}>Excluir</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <RemoveItemModal
        show={!!deleteItemId}
        onClose={() => setDeleteItemId()}
        onConfirm={() => handleDelete(deleteItemId)}
      />
    </Container>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_filter: {
    width: '20%',
  },
  header_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
};

export default Users;
