import { ReactNode } from "react";

interface PlanPopUpProps {
  trigger: boolean;
  children: ReactNode;
}

function PlanPopUp(props: PlanPopUpProps) {
  return props.trigger ? (
    <div className="popup">
      <div className="inner-popup">
        <button className="close-btn">{props.children}</button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PlanPopUp;
