import React from "react";
import style from "../styling/account.module.css";

const CropPlanTable = ({ plans }) => {
  if (!plans?.length) {
    return <p>Δεν υπάρχουν πλάνα.</p>;
  }

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Ημερομηνία</th>
          <th>Έτη</th>
          <th>Καλλιέργειες</th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan) => (
          <tr key={plan.id}>
            <td>{new Date(plan.created_at).toLocaleDateString()}</td>
            <td>{plan.years}</td>
            <td>{plan.crops.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CropPlanTable;