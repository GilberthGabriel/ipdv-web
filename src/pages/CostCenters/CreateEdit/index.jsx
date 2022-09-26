import React, { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import useApi from '../../../hooks/useApi';

function CostCentersCreateEdit() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register, watch, setValue, handleSubmit,
  } = useForm();
  const values = watch();
  const isEdditing = !!id;

  useEffect(() => {
    const fetchCostCenter = async () => {
      const response = await ApiService.costCenters.getOne(id);
      setValue('costCenter', response.data);
    };

    fetchCostCenter();
  }, []);

  const submit = (data) => {
    const saveData = async () => {
      if (isEdditing) {
        await ApiService.costCenters.update(id, data.costCenter);
      } else {
        await ApiService.costCenters.create(data.costCenter);
      }

      navigate('/costcenters');
    };

    saveData();
  };

  return (
    <Container>
      <Title title={`${isEdditing ? 'Editar' : 'Criar'} centro de custo`} disableTotalItems />
      <Form style={{ display: 'flex' }}>
        <div className="col-lg-5">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title-input">Título</Form.Label>
            <Form.Control
              id="title-input"
              type="text"
              placeholder="Insira o título do centro de custo"
              value={values?.costCenter?.title}
              {...register('costCenter.title')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="updated-input">Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Insira a descrição do centro de custo"
              value={values?.costCenter?.description}
              {...register('costCenter.description')}
            />
          </Form.Group>
          <Button onClick={handleSubmit(submit)}>Salvar</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate('/costcenters')}
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
                value={values?.costCenter?.id}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="created-input">Data de criação</Form.Label>
              <Form.Control
                id="created-input"
                type="text"
                value={new Date(values?.costCenter?.createdAt).toLocaleDateString()}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="updated-input">Última modificação</Form.Label>
              <Form.Control
                id="updated-input"
                type="text"
                value={new Date(values?.costCenter?.updatedAt).toLocaleDateString()}
              />
            </Form.Group>
          </fieldset>
        )}
      </Form>
    </Container>
  );
}

export default CostCentersCreateEdit;
