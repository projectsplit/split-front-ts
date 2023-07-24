import React, { useEffect, useRef, useState } from "react";
import { StyledBudget } from "./Budget.styled";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import InputMonetary from "../InputMonetary/InputMonetary";
import getSymbolFromCurrency from "currency-symbol-map";

export default function Budget() {
  const [amount, setAmount] = useState<string>("");
  const navigate = useNavigate();
  const [currencySymbolMargin, setCurrencySymbolMargin] = useState(10);
  const [width, setWidth] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const dummySpan = useRef<HTMLSpanElement>(null);

  const handleInputChange = (e: any) => {
    const amount = e.target.value;
    setAmount(amount);
    const characterWidth = 10;
    console.log(amount.length);
    const margin = characterWidth * amount.length;
    setCurrencySymbolMargin(margin);
  };

  useEffect(() => {
    if (dummySpan.current) {
      setWidth(dummySpan.current.offsetWidth);
    }
  }, [content]);

  return (
    <StyledBudget>
      <div className="topBar">
        <div className="backButtonContainer">
          <BiArrowBack className="backButton" onClick={() => navigate("/")} />
        </div>
        <div className="descr">Budget Settings</div>
      </div>

      <div className="promptSpendingCap">
        <div className="prompt">Set up your spending cap or goal</div>
        <span className="dummySpan" ref={dummySpan}>
          {content}
        </span>
        <InputMonetary
          value={amount}
          onChange={(e) => handleInputChange(e)}
          currency="USD"
          currencysymbolmargin={currencySymbolMargin}
          width={width}
        />
      </div>

      <div className="promptSpendingCycle">
        <div className="prompt">Select your spending cycle</div>
        <div>options field</div>
      </div>

      <div className="spentInfo">You have spent $156.36 this month</div>
    </StyledBudget>
  );
}
