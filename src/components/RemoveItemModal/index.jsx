import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function RemoveItemModal({ show, onConfirm, onClose }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Modal.Header closeButton>Deseja remover esse item?</Modal.Header>
      <Modal.Body>Esta ação é irreversível</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Remover
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveItemModal;
