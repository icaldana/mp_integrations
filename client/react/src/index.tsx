import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LegacyCOW from "./LegacyCOW";
import PaymentBrick from "./PaymentBrick";

const ComponentChooser: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "LegacyCOW":
        return <LegacyCOW />;
      case "PaymentBrick":
        return <PaymentBrick />;
      default:
        return null;
    }
  };

  return (
    <div className="selector-container">
      <h1>Choose a Brick</h1>
      <select className="selector-component"
        value={selectedComponent || ""}
        onChange={handleChange}>
        <option value="">Select a component</option>
        <option value="LegacyCOW">Legacy COW</option>
        <option value="PaymentBrick">Payment Brick</option>
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

