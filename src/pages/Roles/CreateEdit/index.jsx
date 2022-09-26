import React, { useEffect, useState } from 'react';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import useApi from '../../../hooks/useApi';

function RolesCreateEdit() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const {
    register, watch, setValue, handleSubmit,
  } = useForm();
  const values = watch();
  const isEdditing = !!id;

  useEffect(() => {
    ApiService.departments.getAll().then((res) => setDepartments(res.data));
    const fetch = async () => {
      const response = await ApiService.roles.getOne(id);
      setValue('role', response.data);
    };

    fetch();
  }, []);

  const submit = (data) => {
    const saveData = async () => {
      if (isEdditing) {
        await ApiService.roles.update(id, data.role);
      } else {
        await ApiService.roles.create(data.role);
      }

      navigate('/roles');
    };

    saveData();
  };

  return (
    <Container>
      <Title title={`${isEdditing ? 'Editar' : 'Criar'} cargo`} disableTotalItems />
      <Form style={{ display: 'flex' }}>
        <div className="col-lg-5">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title-input">Título</Form.Label>
            <Form.Control
              id="title-input"
              type="text"
              placeholder="Insira o título do cargo"
              {...register('role.title')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title-input">Salário</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                id="title-input"
                type="number"
                placeholder="Insira o salário do cargo"
                value={values.role?.wage}
                {...register('role.wage')}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="updated-input">Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Insira a descrição do cargo"
              {...register('role.description')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="department-input">Centro de custo</Form.Label>
            <Form.Select {...register('role.DepartmentId')}>
              <option disabled selected>Selecione aqui o departamento</option>
              {departments.map((department) => (
                <option value={department.id}>{department.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSubmit(submit)}>Salvar</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate('/roles')}
          >
            Cancelar
          </Button>
        </div>
        {isEdditing && (
          <fieldset disabled className="col-lg-4" style={{ marginLeft: '4vw' }}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="id-input">Identificador</Form.Label>
              <Form.Control
                id="id-input"
                type="text"
                value={values?.role?.id}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="created-input">Data de criação</Form.Label>
              <Form.Control
                id="created-input"
                type="text"
                value={new Date(values?.role?.createdAt).toLocaleDateString()}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="updated-input">Última modificação</Form.Label>
              <Form.Control
                id="updated-input"
                type="text"
                value={new Date(values?.role?.updatedAt).toLocaleDateString()}
              />
            </Form.Group>
          </fieldset>
        )}
      </Form>
    </Container>
  );
}

export default RolesCreateEdit;
