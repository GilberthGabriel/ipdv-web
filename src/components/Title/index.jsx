import React from 'react';
import './index.css';

function Title({ title, totalItems, disableTotalItems }) {
  return (
    <div className="title-area">
      <h1>{title}</h1>
      {!disableTotalItems && (
        <small>
          Quantidade de registros:
          {' '}
          {totalItems || 0}
        </small>
      )}
    </div>
  );
}

export default Title;
