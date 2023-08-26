import getSymbolFromCurrency from "currency-symbol-map";
import { UserPendingTransaction } from "../types";

export const treeItemBuilder = (pendingTransactions: UserPendingTransaction[]): JSX.Element[] => {
  return pendingTransactions.map((transaction: UserPendingTransaction, index: number) => {
    const { userIsSender, userIsReceiver, amount, currency } = transaction;
    
    const displayCurrencyAfterAmount = ["EUR", "INR", "CNY"].includes(currency);

    if (userIsSender && !userIsReceiver) {
      return (
        <div className="groupsInfo" key={index}>
          <strong>You</strong> owe{" "}
          <span className="owe">
            {displayCurrencyAfterAmount ? (
              amount
            ) : (
              <>
                {getSymbolFromCurrency(currency)}
                {amount}
              </>
            )}
            {displayCurrencyAfterAmount && getSymbolFromCurrency(currency)}
          </span>
        </div>
      );
    } else if (!userIsSender && userIsReceiver) {
      return (
        <div className="groupsInfo" key={index}>
          <strong>You</strong> are owed{" "}
          <span className="owed">
            {displayCurrencyAfterAmount ? (
              amount
            ) : (
              <>
                {getSymbolFromCurrency(currency)}
                {amount}
              </>
            )}
            {displayCurrencyAfterAmount && getSymbolFromCurrency(currency)}
          </span>
        </div>
      );
    } else {
      return (
        <div className="groupsInfo" key={index}>
          <strong>You</strong> are settled
        </div>
      );
    }
  });
};
