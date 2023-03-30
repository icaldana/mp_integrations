import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CustomWindow extends Window {
  mercadoPago?: any;
}

const App = () => {
  const [preferenceId, setPreferenceId] = useState("")

  useEffect(() => {
    const searchParameters = Object.fromEntries(new URLSearchParams(window.location.search));
    if (Object.keys(searchParameters).length) {
      console.log(searchParameters)
      alert(`Status do pagamento: ${JSON.stringify(searchParameters)}`)
    }
  }, [])

  useEffect(() => {
    if (!preferenceId) return;
    alert("Calling checkout");
    const customWindow: CustomWindow = window;
    customWindow.mercadoPago.checkout({
      preference: {
        id: preferenceId
      },
      render: {
        container: '.checkout-button',
        label: 'Comprar!',
      },
      autoOpen: true
    });
  }, [preferenceId])

  const createPreference = async () => {
    console.log("Creating preference...");
    try {
      const preference = await fetch("http://localhost:8000/preference",
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          method: "POST",
          body: JSON.stringify({
            description: "White mouse",
            price: 200,
            quantity: 1
          })
        })

      const preferenceJson = await preference.json();
      console.log(`Preference created with id: ${preferenceJson.id}`);
      setPreferenceId(preferenceJson.id);
    } catch (error) {
      console.log("Error creating preference...");
      return JSON.stringify(error);
    }
  }


  return (
    <Wrapper className="app-checkout-pro">
      <h3>White wireless mouse</h3>
      <ProductImg src={mouseImg} className='shopping-cart--mouse' alt='mouse' />
      {!preferenceId && <button onClick={createPreference}>Comprar!</button>}
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

export default App;
