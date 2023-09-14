import { CSSProperties } from "react";
import { BudgetInfoResponse, BudgetType } from "./types";
import { inflateRaw } from "zlib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  width?: number;
  inputWidth?: number;
}

export interface InputMonetaryProps extends InputProps {
  value?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  currency: string;
  currencysymbolmargin?: number;
  width?: number;
}

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
}

export interface SpendingCycleSelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: boolean;
  children: any;
}

export interface LoadingSpinnerProps {
  name: string;
  fontSize: number;
}

export interface QRscannerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface OptionsButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
}

export interface CalendarProps {
  children: any;
  setCalendarDay: React.Dispatch<React.SetStateAction<string>>;
  budgettype: BudgetType;
}

export interface OptionsContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean | string;
}

export interface TreeAdjustedContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean | string;
  items: (string | JSX.Element)[];
}

export interface RecommendationMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  days: string;
  reduceAmount: string;
  offBudgetAmount: string;
  style?: CSSProperties;
}

export interface OverspentMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  offBudgetAmount: string;
  overspentBy: string;
  days: string;
  style?: CSSProperties;
}

export interface OnTrackMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  amount: string;
  style?: CSSProperties;
}

export interface TreeProps {
  items: (string | JSX.Element)[];
}

export interface SelectionButtonProps {
  children: any;
  name: string;
  description: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface NewButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface CategoryButtonProps {
  children: any;
}

export interface CalendarOptionsButtonProps {
  isActive: boolean;
}

export interface ProgressBarProps {
  data: BudgetInfoResponse | undefined;
  isFetching: boolean;
}

export interface BudgetTitleProps {
  children: any;
}
