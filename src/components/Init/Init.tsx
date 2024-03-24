import React, { useState } from "react";
import "./Init.css";

function Init() {
  const [constructionPlan, setConstructionPlan] = useState<string>();

  const handlePlan = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConstructionPlan(event.target.value);
    console.log("Plan value:", event.target.value);
  };

  const handleConfirmPlan = () => {};

  return (
    <div>
      <textarea
        className="ta10em"
        value={constructionPlan}
        onChange={handlePlan}
        placeholder="Construction Plan"
      />
      <button className="confirm" onClick={handleConfirmPlan}>
        Confirm
      </button>
    </div>
  );
}

export default Init;
