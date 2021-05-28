export interface Interval {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface Offer {
  monthlyPayment: number;
  term: string;
  totalCostOfCredit: number;
  totalPrincipal: string;
  totalRepayableAmount: number;
}

export interface Constraints {
  amountInterval: Interval;
  termInterval: Interval;
}

export interface State {
  constraints: Constraints | null;
  offer: Offer | null;
  amountOptions: number[];
  termOptions: number[];
  pastOffers: { [key: string]: Offer };
}
