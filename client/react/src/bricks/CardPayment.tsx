import React from "react";
import styled from "styled-components";
import { CardPayment } from "@mercadopago/sdk-react";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");

const CardPaymentBrick = () => {
  const initialization = {
    amount: 1000,
  };

  const onSubmit = async (formData: any, additionalData: any): Promise<void> => {
    console.log("Form data: ", formData);
    console.log("Additional data: ", additionalData);

    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response: any) => {
          console.log("Payment: ", response);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  };

  const onError = async (error: any) => console.log(error);
  const onReady = async () => console.log("ready");

  return (
    <Wrapper className="app-checkout">
      <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
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

export default CardPaymentBrick;
