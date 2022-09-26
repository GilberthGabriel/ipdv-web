import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import useApi from '../../../hooks/useApi';

function DepartmentsCreateEdit() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [costCenters, setCostCenters] = useState([]);
  const {
    register, watch, setValue, handleSubmit,
  } = useForm();
  const values = watch();
  const isEdditing = !!id;

  useEffect(() => {
    ApiService.costCenters.getAll().then((res) => setCostCenters(res.data));
    const fetch = async () => {
      const response = await ApiService.departments.getOne(id);
      setValue('department', response.data);
    };

    fetch();
  }, []);

  const submit = (data) => {
    const saveData = async () => {
      if (isEdditing) {
        await ApiService.departments.update(id, data.department);
      } else {
        await ApiService.departments.create(data.department);
      }

      navigate('/departments');
    };

    saveData();
  };

  return (
    <Container>
      <Title title={`${isEdditing ? 'Editar' : 'Criar'} departamento`} disableTotalItems />
      <Form style={{ display: 'flex' }}>
        <div className="col-lg-5">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title-input">Título</Form.Label>
            <Form.Control
              id="title-input"
              type="text"
              placeholder="Insira o título do departamento"
              {...register('department.title')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="updated-input">Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Insira a descrição do departamento"
              {...register('department.description')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="costcenter-input">Centro de custo</Form.Label>
            <Form.Select {...register('department.CostCenterId')}>
              <option disabled selected>Selecione aqui o departmento</option>
              {costCenters.map((costCenter) => (
                <option value={costCenter.id}>{costCenter.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSubmit(submit)}>Salvar</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate('/departments')}
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
                value={values?.department?.id}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="created-input">Data de criação</Form.Label>
              <Form.Control
                id="created-input"
                type="text"
                value={new Date(values?.department?.createdAt).toLocaleDateString()}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="updated-input">Última modificação</Form.Label>
              <Form.Control
                id="updated-input"
                type="text"
                value={new Date(values?.department?.updatedAt).toLocaleDateString()}
              />
            </Form.Group>
          </fieldset>
        )}
      </Form>
    </Container>
  );
}

export default DepartmentsCreateEdit;
