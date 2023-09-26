import React from "react";
import { Wallet } from "@mercadopago/sdk-react";
import styled from "styled-components";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");

const WalletBrickOnInit: React.FC = () => {
  const initialization: any = {
      preferenceId: "1322442691-44375124-0040-41dd-8d63-b3d09e17c7fd",
      redirectMode: 'blank',
  };

  const customization: any = {
      texts: {
          action: 'buy',
          valueProp: 'security_details',
      },
      visual: {
          buttonBackground: 'black',
          borderRadius: '16px',
      },
      checkout: {
          theme: {
              elementsColor: "#4287F5",
              headerColor: "#4287F5",
          },
      },
      callbacks: {
          onReady: () => { console.log('onReady') },
          onSubmit: () => { console.log('onReady') },
          onError: (error: any) => console.error(error),
      },
  };

  const onError = async (error: any) => console.log(error);
  const onReady = async () => console.log("ready");;

  return (
    <Wrapper  className="app-checkout">
      <Wallet initialization={initialization} customization={customization} onReady={onReady} onError={onError} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1em;
`;

export default WalletBrickOnInit;
