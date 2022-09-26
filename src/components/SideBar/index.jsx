import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';

function SideBar() {
  const navigate = useNavigate();

  const handleOnClick = (path) => () => navigate(path);

  return (
    <Nav className="sidebar flex-column" style={{ flex: 1 }}>
      <h1>IPDV</h1>
      <Nav.Link onClick={handleOnClick('/users')}>Usuários</Nav.Link>
      <Nav.Link onClick={handleOnClick('/roles')}>Cargos</Nav.Link>
      <Nav.Link onClick={handleOnClick('/departments')}>Departamentos</Nav.Link>
      <Nav.Link onClick={handleOnClick('/costcenters')}>Centros de custo</Nav.Link>
    </Nav>
  );
}

export default SideBar;
