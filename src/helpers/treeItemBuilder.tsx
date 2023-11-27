import { UserPendingTransaction } from "../types";
import { displayCurrencyAndAmount } from "./displayCurrencyAndAmount";

export const TreeItemBuilder = (
  pendingTransactions: UserPendingTransaction[]
): JSX.Element[] => {
  return pendingTransactions.map(
    (transaction: UserPendingTransaction, index: number) => {
      const { userIsSender, userIsReceiver, amount, currency } = transaction;

      if (userIsSender && !userIsReceiver) {
        return (
          <div className="groupsInfo" key={index}>
            <strong>You</strong> owe{" "}
            <span className="owe">
              {displayCurrencyAndAmount(amount.toString(), currency)}
            </span>
          </div>
        );
      } else if (!userIsSender && userIsReceiver) {
        return (
          <div className="groupsInfo" key={index}>
            <strong>You</strong> are owed{" "}
            <span className="owed">
            {displayCurrencyAndAmount(amount.toString(), currency)}
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
    }
  );
};
