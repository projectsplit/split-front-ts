import { CSSProperties, MouseEventHandler } from "react";
import { BudgetInfoResponse, BudgetType, CycleType } from "./types";
import { Signal } from "@preact/signals-react";

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
  menu: Signal<React.SetStateAction<string | null>>;
}

export interface SetUpSpendingGoalProps {
  menu: Signal<string | null>;
  displayedAmount: Signal<string>;
  currency: string;
  submitBudgetErrors: Signal<any[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SpendingCycleProps {
  menu: Signal<React.SetStateAction<string | null>>;
  submitBudgetErrors: Signal<any[]>;
  calendarDay: Signal<string>;
  budgettype: Signal<BudgetType>;
  isStale: boolean;
  openCalendar: Signal<boolean>;
  hasSwitchedBudgetType: Signal<boolean>;
}

export interface MenuAnimationBackgroundProps {
  menu: Signal<string | null>;
}
export interface AnalyticsSelectionAnimationProps
  extends MenuAnimationBackgroundProps {
  header: string;
  children: any;
}

export interface AnalyticsYearSelectionAnimationProps
  extends AnalyticsSelectionAnimationProps {}

export interface AnalyticsTimePeriodSelectionAnimationProps
  extends AnalyticsSelectionAnimationProps {}

export interface CycleSelectionProps {
  children: any;
  header: string;
}

export interface CreateBudgetConfirmationAnimationProps
  extends MenuAnimationBackgroundProps {
  submitBudget: () => Promise<void>;
}
export interface InfoBoxAnimationProps extends MenuAnimationBackgroundProps {}

export interface CurrencyOptionsAnimationProps
  extends MenuAnimationBackgroundProps {
  currency: Signal<React.SetStateAction<string>>;
  budgettype: Signal<BudgetType>;
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
  budgettype: Signal<BudgetType>;
  calendarDay: Signal<string>;
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
  backgroundcoloronselect?: string;
  style?: CSSProperties;
  key?: any;
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
  menu: Signal<React.SetStateAction<string | null>>;
  currency: Signal<React.SetStateAction<string>>;
  budgettype: Signal<BudgetType>;
}

export interface SpendingCycleInfoProps {
  menu: Signal<React.SetStateAction<string | null>>;
}

export interface ConfirmationForBudgetSubmissionProps {
  submitBudget: () => Promise<void>;
  menu: Signal<React.SetStateAction<string | null>>;
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

export interface CumulativeSpendingProps {
  currentDateIndex: number;
  monthsAndDaysArrays: string[][];
  cyclehaschanged: Signal<boolean>;
  allWeeksPerYear: Date[][];
  menu:Signal<string | null>;
}

export interface CycleOptionProps {
  selectedCycle: Signal<CycleType>;
  menu: Signal<React.SetStateAction<string | null>>;
  cyclehaschanged: Signal<boolean>;
}

export interface YearOptionProps {
  selectedYear: Signal<number>;
  menu: Signal<React.SetStateAction<string | null>>;
}

export interface CumulativeSpendingProps {
  selectedCycle: Signal<CycleType>;
  selectedYear: Signal<number>;
}

export interface CarouselProps {
  carouselItems: string[] | string[][];
  selectedTimeCycleIndex: Signal<number>;
  selectedCycle: Signal<CycleType>;
  cyclehaschanged: Signal<boolean>;
  menu:Signal<string | null>
}

export interface PeriodOptionProps {
  menu:Signal<string | null>
}
