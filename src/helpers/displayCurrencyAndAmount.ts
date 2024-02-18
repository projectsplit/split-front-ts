import getSymbolFromCurrency from "currency-symbol-map";
import { getLocaleFromCurrency } from "./getLocaleFromCurrency";

export const displayCurrencyAndAmount = (
  amount: string | undefined,
  currency: string
): string => {
  const amount2decimal = parseFloat(amount ?? "0");
  const currencySymbol = getSymbolFromCurrency(currency)

  if (amount2decimal < 0)
    return currencySymbol + new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "decimal",
      currency: currency,
      maximumFractionDigits: 0
    }).format(0);

  if (amount2decimal % 1 !== 0) { //check is if it is decimal
    return currencySymbol + new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "decimal",
      currency: currency,
      maximumFractionDigits: 2
    }).format(amount2decimal);
  } else {
    return currencySymbol + new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "decimal",
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount2decimal);
  }
};
