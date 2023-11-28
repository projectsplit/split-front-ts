import React, { useState } from "react";
import { StyledCurrencyOptions } from "./CurrencyOptions.styled";
import { CurrencyOptionProps } from "../../../interfaces";
import { currencyData } from "../../../helpers/openExchangeRates";
import { Currency } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";

export default function CurrencyOptions({
  menu,
  currency,
  budgettype,
}: CurrencyOptionProps) {
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencyData);

  const queryClient = useQueryClient();

  const handldeClick = (curr: string) => {
    //setCurrency(currency);
    currency.value = curr;
    localStorage.setItem("budgetCurrency", curr);
    queryClient.invalidateQueries(["spending", budgettype, curr]);
    queryClient.getQueryData(["spending", budgettype, curr]);
    menu.value = null;
  };

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = currencyData.filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCurrencies(filteredItems);
  };

  return (
    <StyledCurrencyOptions height="75vh">
      <div className="headerAndSearchbar">
        <div className="header">
          {" "}
          <strong>Select Currency</strong>
        </div>
        <input
          className="searchBar"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchItem}
        />
      </div>
      {filteredCurrencies.length === 0 && (
        <div className="noResults">No results found</div>
      )}

      {filteredCurrencies.map((currency, index) => (
        <div
          key={index}
          className={`currencyOption ${
            localStorage.getItem("budgetCurrency") == currency.symbol
              ? "clicked"
              : ""
          }`}
          onClick={() => handldeClick(currency.symbol)}
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
