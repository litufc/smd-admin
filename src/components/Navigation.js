import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.OFFER}>Oferta</Link>
      </li>
      <li>
        <Link to={ROUTES.USERS}>Usuários</Link>
      </li>
      <li>
        <Link to={ROUTES.KEYS}>Chaves</Link>
      </li>
      <li>
        <Link to={ROUTES.RESOURCES}>Recursos</Link>
      </li>
      <li>
        <Link to={ROUTES.ROOMS}>Salas</Link>
      </li>
      <li>
        <Link to={ROUTES.PLACES}>Locais</Link>
      </li>
      <li>
        <Link to={ROUTES.OPTIONS}>Configurações</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;