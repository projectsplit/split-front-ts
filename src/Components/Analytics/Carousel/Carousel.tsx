import React, { useState } from "react";
import { StyledCarousel } from "./Carousel.styled";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { CarouselProps } from "../../../interfaces";
import { CycleType } from "../../../types";

export default function Carousel({
  carouselItems,
  selectedTimeCycleIndex,
  selectedCycle,
}: CarouselProps) {
  
  const nextItem = () => {
    selectedTimeCycleIndex.value =
      (selectedTimeCycleIndex.value + 1) % carouselItems.length;
  };

  const prevItem = () => {
    selectedTimeCycleIndex.value =
      (selectedTimeCycleIndex.value - 1 + carouselItems.length) %
      carouselItems.length;
  };

  const displayCarouselItem = (cycle:CycleType, item:any)=>{
    switch (cycle) {
      case CycleType.Monthly:
        return item
      case CycleType.Weekly:
        if(item.length ===1) return item[0]
        return item[0] + "- " + item[item.length - 1]
      default:
        return 0;
    }
  }

  return (
    <StyledCarousel>
      <div className="carousel-container">
        <div className="arrow-btn left" onClick={prevItem}>
          <SlArrowLeft className="arrow" />
        </div>
        <div
          className="carousel"
          style={{ transform: `translateX(${-selectedTimeCycleIndex * 100}%)` }}
        >
          {carouselItems.map((item: any, index: any) => (
            <div key={index} className="carousel-item">
              {displayCarouselItem(selectedCycle.value,item)}
            </div>
          ))}
        </div>
        <div className="arrow-btn right" onClick={nextItem}>
          <SlArrowRight className="arrow" />
        </div>
      </div>
    </StyledCarousel>
  );
}
