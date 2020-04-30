import React from 'react';

import { Container } from './styles';

interface TootipProps {
  title: string;
  className?: string;
}

const Tootip: React.FC<TootipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tootip;
