import React from "react";
import "./css/SpinnerLoader.css"; // Asegurate de tener este archivo en el mismo nivel

const SpinnerLoader = () => {
  return (
    <div className="spinner center">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="spinner-blade"></div>
      ))}
    </div>
  );
};

export default SpinnerLoader;
