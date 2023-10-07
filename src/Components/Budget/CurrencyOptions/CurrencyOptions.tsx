import React, { useEffect, useState } from "react";
import { StyledCurrencyOptions } from "./CurrencyOptions.styled";
import { CurrencyOptionProps } from "../../../interfaces";
import { currencyData } from "../../../helpers/openExchangeRates";


export default function CurrencyOptions({
  setMenu,
  setCurrency,
}: CurrencyOptionProps) {
  const [trackIndex, setTrackIndex] = useState<number>(
    currencyData.findIndex(
      (currency) => currency.symbol === localStorage.getItem("budgetCurrency")
    )
  );

  const handldeClick = (currency: string, index: number) => {
    setTrackIndex(index);
    setCurrency(currency);
    localStorage.setItem("budgetCurrency", currency);
    setMenu(null);
  };


  
  return (
    <StyledCurrencyOptions height="75vh">
      <div className="header">
        {" "}
        <strong>Select Currency</strong>
      </div>
      {currencyData.map((currency, index) => (
        <div
          key={index}
          className={`currencyOption ${trackIndex === index ? "clicked" : ""}`}
          onClick={() => handldeClick(currency.symbol, index)}
        >
          <div className={currency.flagClass} />
          <div className="currency">
            <div className="currencyTicker">
              <strong>{currency.symbol}</strong>
            </div>
            <div className="currencyDescr">{currency.name}</div>
          </div>
        </div>
      ))}
    </StyledCurrencyOptions>
  );
}
