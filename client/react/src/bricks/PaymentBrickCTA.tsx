import React from "react";
import styled from "styled-components";
import { Payment } from "@mercadopago/sdk-react";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");

interface CustomWindows extends Window {
  paymentBrickController?: any;
}

const createPayment = () => {
  const customWindow: CustomWindows = window;
  customWindow.paymentBrickController
    .getFormData()
    .then((form: any) => {
      console.log("formData received, creating payment...");
      fetch("http://localhost:8000/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form.formData,
          description: "White mouse",
          external_reference: "Mouse Store",
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error: any) => {
      console.error(error);
    });
};

const PaymentBrickCustomCTA: React.FC = () => {
  // Hard to know how to type the payers object
  const initialization = {
    amount: 10000,
    preferenceId: "1322442691-c6dd8eab-5fe8-4a77-a65c-44b8ff1d5250",
    payer: {
      firstName: "Ana",
      lastName: "Silva",
      identification: {
        type: "CPF",
        number: "19119119100",
      },
      email: "test_user_639018@testuser.com",
      address: {
        zipCode: "06233200",
        federalUnit: "SP",
        city: "Osasco",
        neighborhood: "Centro",
        streetName: "Rua 7 de Setembro",
        streetNumber: "100" as any, // Typed as number
        complement: "Casa 4",
      },
    },
  };

  // PROBLEM WITH THIS TYPE
  const customization: any = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
    visual: {
      hideFormTitle: false,
      hidePaymentButton: true,
    },
  };

  // Form there is any. I don't know how to type this --> any.formData
  const onSubmit = async (form: any) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form.formData,
          description: "White mouse",
          external_reference: "Mouse Store",
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          resolve(0);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };
  const onReady = async () => {};

  return (
    <Wrapper className="app-checkout">
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
      <button type="button" onClick={createPayment}>
        Custom Payment Button
      </button>
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

export default PaymentBrickCustomCTA;
