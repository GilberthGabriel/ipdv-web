import React, { useState } from 'react';
import {
  Alert, Button, Card, Form,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

function Login() {
  const navigate = useNavigate();
  const context = useAuth();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  const submit = async (data) => {
    const result = await context.login(data);
    if (!result) {
      setError(!result);
    }
  };

  if (context.signed) {
    navigate('/users');
  }

  return (
    <div style={styles.container}>
      <Card className="col-3" style={styles.card}>
        <Card.Header style={styles.header}>
          <Card.Title style={styles.cardTitle}>
            Autenticação
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Insira o email"
              {...register('email', { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insira a senha"
              {...register('password', { required: true })}
            />
          </Form.Group>
          <Alert variant="danger" hidden={!error}>
            Falha de autenticação
          </Alert>
        </Card.Body>
        <Card.Footer style={styles.footer}>
          <div className="d-grid gap-2">
            <Button onClick={handleSubmit(submit)}>Enviar</Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#292929',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  card: {
    padding: '1rem',
  },
  footer: {
    background: '#fff',
  },
  header: {
    background: '#fff',
  },
};

export default Login;
