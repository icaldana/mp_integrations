import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LegacyCOW from "./bricks/LegacyCOW";
import PaymentBrick from "./bricks/PaymentBrick";
import PaymentBrickCTA from "./bricks/PaymentBrickCTA";
import WalletBrickOnInit from "./bricks/WalletBrickOnInit";
import WalletBrickOnSubmit from "./bricks/WalletBrickOnSubmit";
import CardPaymentBrick from "./bricks/CardPayment";

const ComponentChooser: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "LegacyCOW":
        return <LegacyCOW />;
      case "CardPayment":
        return <CardPaymentBrick />;
      case "PaymentBrick":
        return <PaymentBrick />;
      case "PaymentBrickCTA":
        return <PaymentBrickCTA />;
      case "WalletBrickSubmit":
        return <WalletBrickOnSubmit />;
      case "WalletBrickInit":
        return <WalletBrickOnInit />;
      default:
        return null;
    }
  };

  return (
    <div className="selector-container">
      <h1>Choose a Brick</h1>
      <select
        className="selector-component"
        value={selectedComponent || ""}
        onChange={handleChange}
      >
        <option value="">Select a component</option>
        <option value="LegacyCOW">Legacy COW</option>
        <option value="CardPayment">CardPayment</option>
        <option value="PaymentBrick">Payment Brick</option>
        <option value="PaymentBrickCTA">Payment Brick CTA</option>
        <option value="WalletBrickSubmit">Wallet Brick (on Submit)</option>
        <option value="WalletBrickInit">Wallet Brick (on init)</option>
      </select>
      {renderSelectedComponent()}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="app-organizer">
      <ComponentChooser />
    </div>
  </React.StrictMode>
);
