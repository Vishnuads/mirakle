import React from "react";
import bg from "../../assets/images/footerbg.png";

export default function ProductBg() {
  return (
    <div className="product-bg  mt-5">
      <img src={bg} alt="Footer Background" className="img-fluid w-100" />
    </div>
  );
}
