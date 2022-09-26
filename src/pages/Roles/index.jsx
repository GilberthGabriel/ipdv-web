import React, { useState, useEffect } from 'react';
import {
  Table, Container, DropdownButton, Dropdown, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RemoveItemModal from '../../components/RemoveItemModal';
import Title from '../../components/Title';
import useApi from '../../hooks/useApi';
import './index.css';

function Roles() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiService.roles.getAll();
      if (response.status === 200) {
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeleteItemId();
    const response = await ApiService.roles.delete(id);
    if (response.status === 200) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <Container>
      <div style={styles.header}>
        <Title title="Cargos" totalItems={data.length} />
        <Button onClick={() => navigate('/roles/create')}>Criar novo</Button>
      </div>
      <Table variant="hover">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Id</th>
            <th style={{ width: '25%' }}>Título</th>
            <th style={{ width: '20%' }}>Salário</th>
            <th style={{ width: '25%' }}>Departamento</th>
            <th style={{ width: '15%' }}>Data</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="align-middle">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                R$
                {' '}
                {item.wage.toFixed(2)}
              </td>
              <td>{item?.Department?.title}</td>
              <td>{new Date(item.createdAt)?.toLocaleDateString()}</td>
              <td>
                <DropdownButton variant="secondary" className="btn-sm" title="Ações">
                  <Dropdown.Item onClick={() => navigate(`/roles/${item.id}`)}>Editar</Dropdown.Item>
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
};

export default Roles;
