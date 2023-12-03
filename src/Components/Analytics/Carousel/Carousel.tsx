import React, { useState } from "react";
import { StyledCarousel } from "./Carousel.styled";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useQueryClient } from "@tanstack/react-query";

export default function Carousel({ carouselItems, selectedTimeCycleIndex, firstDayOfMonth, lastDayOfMonth }: any) {

  const queryClient = useQueryClient();

  const nextItem = () => {
    selectedTimeCycleIndex.value = (selectedTimeCycleIndex.value+1) % carouselItems.length
    queryClient.invalidateQueries(["cumulativeSpending",firstDayOfMonth,lastDayOfMonth]);
    
  };
  
  const prevItem = () => {
    selectedTimeCycleIndex.value = (selectedTimeCycleIndex.value- 1 + carouselItems.length) % carouselItems.length
    queryClient.invalidateQueries(["cumulativeSpending",firstDayOfMonth,lastDayOfMonth]);
  };


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
              {item}
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
