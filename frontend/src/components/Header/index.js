import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo-header.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Radar Governamental" />
          <Link to="/user">USUÁRIOS</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Radar Governamental</strong>
              <Link to="/">
                <button type="button">sair do sistema</button>
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
