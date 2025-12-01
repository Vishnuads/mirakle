import React from "react";
import group1 from "../../assets/images/group1.png";
import group2 from "../../assets/images/group2.png";
import group3 from "../../assets/images/group3.png";
import group4 from "../../assets/images/group4.png";

export default function Promise() {
  // 🟩 Store image data in an array
  const promises = [
    { id: 1, img: group1, alt: "Promise 1" },
    { id: 2, img: group2, alt: "Promise 2" },
    { id: 3, img: group3, alt: "Promise 3" },
    { id: 4, img: group4, alt: "Promise 4" },
  ];

  return (
    <div className="container mt-3">
          <div className="text-center mb-4">
        <h2 className="section-title">The Mirakle promise</h2>
       
      </div>
      <div className="row text-center align-items-center g-4">
        {promises.map((item) => (
          <div key={item.id} className="col-6 col-md-3">
            <img
              src={item.img}
              alt={item.alt}
              className="img-fluid promise-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
