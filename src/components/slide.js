import React from "react";

import { slidesData } from "./constants";
import banner from "../assets/bannerimage.png"

const Slider = () => {
  return (
    <div class="container py-4">
      <div class="row align-items-center">
        <div className="col-md-8  mb-4 mb-md-0">
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {slidesData.map((element, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  style={{ height: "200px" }}
                >
                  <img src={element.image}
                    className="d-block w-100 h-100 object-fit-cover"
                    alt={element.name}
                    style={{ height: 200, width: 100 }} />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
              style={{ color: "black" }}
            >
              <span className="carousel-control-prev-icon" style={{ color: "black" }}></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="p-3 text-center">
            <img src={banner}
              className="d-block w-100 h-50 object-fit-cover"
              alt="banner"
              style={{ objectFit: "cover", height: 200 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Slider