export interface AccountBalances {
  [key: string]: {
    amount: string;
    usd_value: string;
  };
}

export interface UserBalancesInUsd {
  [address: string]: number;
}
export interface rootStore {
  userBalances: Record<string, AccountBalances>;
  userEvents: Record<string, AccountEvents>;
}

export interface token {
  amount: string;
  usd_value: string;
}

export interface AccountEvent {
  asset: string;
  event_type: string;
  value: {
    amount: string;
    usd_value: string;
  };
  timestamp: number;
}

export interface AccountEvents {
  [address: string]: {
    events: AccountEvent[];
  };
}

export type dateString = (
  date: Date,
  hideYear?: boolean,
  preformattedDate?: string | null,
  onlyDate?: boolean
) => string;
