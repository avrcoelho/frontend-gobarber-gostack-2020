import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/images/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
