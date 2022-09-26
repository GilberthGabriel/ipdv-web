import React, { useState, useEffect } from 'react';
import {
  Table, Container, DropdownButton, Dropdown, Button, Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RemoveItemModal from '../../components/RemoveItemModal';
import Title from '../../components/Title';
import useApi from '../../hooks/useApi';

function Departments() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState();
  const [costCenters, setCostCenters] = useState([]);

  useEffect(() => {
    ApiService.costCenters.getAll().then((res) => setCostCenters(res.data));
    const fetchData = async () => {
      const response = await ApiService.departments.getAll();
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeleteItemId();
    const response = await ApiService.departments.delete(id);
    if (response.status === 200) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleChangeCostCenter = async (event) => {
    if (event.target.value === 'Selecione aqui o centro de custo') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.CostCenterId === event.target.value));
    }
  };

  return (
    <Container>
      <div style={styles.header}>
        <Title title="Departamentos" totalItems={data.length} />
        <Button onClick={() => navigate('/departments/create')}>Criar novo</Button>
      </div>
      <Form.Group className="mb-4 p-1" style={styles.header_filter}>
        <Form.Label htmlFor="department-input">Centro de custo:</Form.Label>
        <Form.Select onChange={handleChangeCostCenter}>
          <option>Selecione aqui o centro de custo</option>
          {costCenters.map((item) => (
            <option value={item.id}>{item.title}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Table variant="hover">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Id</th>
            <th style={{ width: '30%' }}>Título</th>
            <th style={{ width: '30%' }}>Centro de custo</th>
            <th style={{ width: '25%' }}>Data</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr className="align-middle">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.CostCenter?.title}</td>
              <td>{new Date(item.createdAt)?.toLocaleDateString()}</td>
              <td>
                <DropdownButton variant="secondary" className="btn-sm" title="Ações">
                  <Dropdown.Item onClick={() => navigate(`/departments/${item.id}`)}>Editar</Dropdown.Item>
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
    width: '25%',
  },
};

export default Departments;
