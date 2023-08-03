import React from "react";
import styled from "styled-components";
import { Payment } from '@mercadopago/sdk-react';

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-814cc87a-446c-4d2d-ae74-eebcda92c656");
const PaymentBrick = () => {
  const initialization = {
    amount: 10000,
    preferenceId: "285966773-0f5aaa61-6b61-43d5-b8db-4627609e1512",
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
      fetch("/process_payment", {
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
  padding: 1em;
`;


export default PaymentBrick;
