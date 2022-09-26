import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar';
import { useAuth } from '../../contexts/auth';

function Layout({ element }) {
  const navigate = useNavigate();
  const { signed } = useAuth();

  useEffect(() => {
    if (!signed) {
      navigate('/');
    }
  }, []);

  return (
    <div style={styles.container}>
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10" style={styles.content}>
        {element}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    boxSizing: 'border-box',
  },
  content: {
    paddingLeft: '2vw',
    paddingRight: '2vw',
  },
};

export default Layout;
