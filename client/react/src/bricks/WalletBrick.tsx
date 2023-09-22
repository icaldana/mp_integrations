import React from "react";
import { Wallet } from "@mercadopago/sdk-react";
import styled from "styled-components";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");

const WalletBrick: React.FC = () => {
  const onSubmit = async (formData: any) => {
    console.log(formData);
    const yourRequestBodyHere = {
      description: "Dummy description",
      quantity: 1,
      price: 10,
    };

    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(yourRequestBodyHere),
      })
        .then((response) => response.json())
        .then((response) => {
          resolve(response.preference.id);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  };

  const onError = async (error: any) => console.log(error);
  const onReady = async () => console.log("ready");;

  return (
    <Wrapper className="app-checkout">
      <Wallet onSubmit={onSubmit as any} onReady={onReady} onError={onError} />
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

export default WalletBrick;
