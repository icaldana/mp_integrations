import React from "react";
import styled from "styled-components";
import { Payment } from '@mercadopago/sdk-react';

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");
const PaymentBrick = () => {
  const initialization = {
    amount: 10000,
    preferenceId: "1322442691-c9788a31-3aad-4998-9eb1-87b0e94675e3",
  };
  const customization: any = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
    visual: undefined
  };
  const onSubmit = async (form: any) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.formData),
      })
        .then((response) => response.json())
        .then((response) => {
          resolve(0);
        })
        .catch((error) => {
          reject();
        });
    });
  };
  const onError = async (error: any) => {
    console.log(error);
  };
  const onReady = async () => {};

  return <Wrapper className="app-checkout-pro">


<Payment
   initialization={initialization}
   customization={customization}
   onSubmit={onSubmit}
   onReady={onReady}
   onError={onError}
/>

  </Wrapper>;
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1em;
`;


export default PaymentBrick;
