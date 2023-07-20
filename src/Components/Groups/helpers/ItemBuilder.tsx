import getSymbolFromCurrency from 'currency-symbol-map'

export const ItemBuilder = (element: any): JSX.Element[] => {
    return element.pendingTransactions.map((transaction: any) => {
      const { userIsSender, userIsReceiver, amount, currency } = transaction;
      const displayCurrencyAfterAmount = ["EUR", "INR", "CNY"].includes(currency);
  
      if (userIsSender && !userIsReceiver) {
        return (
          <div className="groupsInfo">
            <strong>You</strong> owe{" "}
            <span className="owe">
              {displayCurrencyAfterAmount ? amount : (
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
          <div className="groupsInfo">
            <strong>You</strong> are owed{" "}
            <span className="owed">
              {displayCurrencyAfterAmount ? amount : (
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
          <div className="groupsInfo">
            <strong>You</strong> are owed settled
          </div>
        );
      }
    });
  };