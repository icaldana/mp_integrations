import React from "react";
import styled from "styled-components";
import { Payment } from "@mercadopago/sdk-react";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-de563cac-2acb-4ec6-b506-9fb302a2848d");

interface CustomWindows extends Window {
  paymentBrickController?: any;
}

const PaymentBrick = () => {
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

  const customization: any = {
    paymentMethods: {
      bankTransfer: ["pix"],
      ticket: "all",
      atm: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
      minInstallments: 1,
      maxInstallments: 10,
    },
    visual: {
      defaultPaymentOption: {
        ticketForm: true,
      },
      hideFormTitle: false,
      hidePaymentButton: false,
      texts: {
        formTitle: "Form title",
        emailSectionTitle: "email section title",
        installmentsSectionTitle: "installments section title",
        cardholderName: {
          label: "cardholder name",
          placeholder: "cardholder name",
        },
        email: {
          label: "email",
          placeholder: "email",
        },
        cardholderIdentification: {
          label: "cardholder identification",
        },
        cardNumber: {
          label: "card number",
          placeholder: "card number",
        },
        expirationDate: {
          label: "expiration date",
          placeholder: "expiration date",
        },
        securityCode: {
          label: "security code",
          placeholder: "security code",
        },
        entityType: {
          placeholder: "entity type",
          label: "entity type",
        },
        financialInstitution: {
          placeholder: "financial institution",
          label: "financial institution",
        },
        selectInstallments: "select installments",
        selectIssuerBank: "see issuer bank",
        formSubmit: "form submit",
        paymentMethods: {
          newCreditCardTitle: "new credit card",
          creditCardTitle: "credit card",
          creditCardValueProp: "credit card value prop",
          newDebitCardTitle: "new debit card",
          debitCardTitle: "debit card",
          debitCardValueProp: "debit card value prop",
          ticketTitle: "ticket",
          ticketValueProp: "ticket value prop",
        },
      },
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
  const onReady = async () => {
    const customWindow: CustomWindows = window;
    setTimeout(() => {
      if (customWindow.paymentBrickController.update({ amount: 20000 })) {
        alert("Amount updated");
      }
    }, 10000);
  };

  return (
    <Wrapper className="app-checkout">
      <Payment
        initialization={initialization}
        customization={customization}
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

export default PaymentBrick;
