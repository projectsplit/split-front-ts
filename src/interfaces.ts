import { CSSProperties, MouseEventHandler } from "react";
import { BudgetInfoResponse, BudgetType } from "./types";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface InputMonetaryProps extends InputProps {
  value?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  currency: string;
  inputError?: boolean;
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
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
  open: boolean;
  inputError?: boolean;
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
  closeButton: boolean;
  budgetType?: BudgetType;
}

export interface OverspentMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  overspent: boolean;
  currency: string;
  offBudgetAmount: string;
  overspentBy: string;
  style?: CSSProperties;
  closeButton: boolean;
  budgetType?: BudgetType;
}

export interface OnTrackMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  amount: string;
  style?: CSSProperties;
  closeButton: boolean;
  budgetType?: BudgetType;
}

export interface SimpleOnTrackMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  closeButton: boolean;
}
export interface ReceivedMoreThanSpentMessageProps
  extends OnTrackMessageProps {}

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
  to?: string;
  children: any;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface CalendarOptionsButtonProps {
  isactive: boolean;
}

export interface ProgressBarProps {
  data: BudgetInfoResponse | undefined;
}

export interface BudgetTitleProps {
  children: any;
}

export interface BottomMenuProps {
  children: any;
  height?: string;
}

export interface MiddleScreenMenuProps extends BottomMenuProps {}

export interface CurrencyOptionProps {
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  budgettype: BudgetType;
}

export interface SpendingCycleInfoProps {
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ConfirmationForBudgetSubmissionProps {
  submitBudget: () => Promise<void>;
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ManageBudgetMenuProps {
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ConfirmationForBudgetDeletionProps {
  removeBudget: () => Promise<void>;
  setMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TopBarWithBackButtonProps {
  header: string;
  onClick: MouseEventHandler<SVGElement>;
}

export interface CumulativeSpendingProps{
  
}
