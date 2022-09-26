import React, { useEffect, useState } from 'react';
import {
  Button, Container, Form,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import useApi from '../../../hooks/useApi';

function UsersCreateEdit() {
  const ApiService = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const {
    register, watch, setValue, handleSubmit,
  } = useForm();
  const values = watch();
  const isEdditing = !!id;

  useEffect(() => {
    ApiService.roles.getAll().then((res) => setRoles(res.data));
    const fetch = async () => {
      const response = await ApiService.users.getOne(id);
      setValue('user', response.data);
    };

    fetch();
  }, []);

  const submit = (data) => {
    const saveData = async () => {
      if (isEdditing) {
        await ApiService.users.update(id, data.user);
      } else {
        await ApiService.users.create(data.user);
      }

      navigate('/users');
    };

    saveData();
  };

  return (
    <Container>
      <Title title={`${isEdditing ? 'Editar' : 'Criar'} usuário`} disableTotalItems />
      <Form style={{ display: 'flex' }}>
        <div className="col-lg-5">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title-input">Nome</Form.Label>
            <Form.Control
              id="title-input"
              type="text"
              placeholder="Insira o nome do usuário"
              {...register('user.name')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email-input">Email</Form.Label>
            <Form.Control
              id="email-input"
              type="email"
              placeholder="Insira o email do usuário"
              {...register('user.email')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="department-input">Cargo</Form.Label>
            <Form.Select {...register('user.RoleId')}>
              <option disabled selected>Selecione aqui o cargo</option>
              {roles.map((role) => (
                <option value={role.id}>{role.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password-input">
              {isEdditing ? 'Nova senha' : 'Senha'}
            </Form.Label>
            <Form.Control
              id="password-input"
              type="password"
              placeholder={isEdditing ? 'Insira a nova senha' : 'Insira a senha'}
              {...register('user.password')}
            />
          </Form.Group>
          <Button onClick={handleSubmit(submit)}>Salvar</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate('/users')}
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
                value={values?.user?.id}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="created-input">Data de criação</Form.Label>
              <Form.Control
                id="created-input"
                type="text"
                value={new Date(values?.user?.createdAt).toLocaleDateString()}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="updated-input">Última modificação</Form.Label>
              <Form.Control
                id="updated-input"
                type="text"
                value={new Date(values?.user?.updatedAt).toLocaleDateString()}
              />
            </Form.Group>
          </fieldset>
        )}
      </Form>
    </Container>
  );
}

export default UsersCreateEdit;
