export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
}

export interface LoadingSpinnerProps {
  name: string;
  fontSize: number;
}

export interface QRscannerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface UserOptionsButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
}

export interface OptionsContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
}

export interface RecommendationProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TreeProps {
  items: string[];
}
