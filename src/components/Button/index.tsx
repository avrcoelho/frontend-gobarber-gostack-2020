import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<Props> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
