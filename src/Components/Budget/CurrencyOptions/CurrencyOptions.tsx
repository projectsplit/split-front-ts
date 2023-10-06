import React from "react";
import { StyledCurrencyOptions } from "./CurrencyOptions.styled";
import { CurrencyOptionProps } from "../../../interfaces";
import { currencyData } from "../../../helpers/openExchangeRates";

export default function CurrencyOptions({ setMenu }: CurrencyOptionProps) {

  return (
    <StyledCurrencyOptions height="75vh">
      <div className="header">
        {" "}
        <strong>Select Currency</strong>
      </div>
      {currencyData.map((currency) => (
        <div className="currencyOption">
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
