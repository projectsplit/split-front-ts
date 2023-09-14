import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

export const displayCurrencyAndAmount = (
  amount: string | undefined,
  currency: string
): JSX.Element => {
  const displayCurrencyAfterAmount = ["EUR", "INR", "CNY"].includes(
    currency || ""
  );

  return (
    <>
      {displayCurrencyAfterAmount ? (
        <>{amount}</>
      ) : (
        <>
          {getSymbolFromCurrency(currency)}
          {amount}
        </>
      )}
      {displayCurrencyAfterAmount && getSymbolFromCurrency(currency)}
    </>
  );
};
