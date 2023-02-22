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
  timestamp: number;
  value: {
    amount: string;
    usd_value: string;
  };
}

export interface AccountEvents {
  [address: string]: {
    events: AccountEvent[];
  };
}
