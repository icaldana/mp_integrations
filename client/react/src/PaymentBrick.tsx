import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mouseImg from './assets/mouse.jpg';

interface CustomWindow extends Window {
  mercadoPago?: any;
}

const PaymentBrick = () => {
  const [preferenceId, setPreferenceId] = useState("")

  useEffect(() => {
  }, [])


  return (
    <Wrapper className="app-checkout-pro">
      <h3>White wireless mouse</h3>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  padding: 2em;
  background: #dbdbfc;
`;

const ProductImg = styled.img`
  max-width: 15rem;
  border-radius: 1rem;
`;

export default PaymentBrick;
