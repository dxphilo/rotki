import axios from "axios";
import type { AccountBalances, AccountEvents } from "@/types";

export function sumOfAllUserBalancesinUsd(
  data: Record<string, AccountBalances>
): number {
  let totalUsdValue = 0;

  for (const [, userBalances] of Object.entries(data)) {
    for (const token of Object.values(userBalances)) {
      totalUsdValue += parseFloat(token.usd_value);
    }
  }

  return totalUsdValue;
}

export function sumofUsdValues(data: Record<string, AccountEvents>): number {
  let sum = 0;
  for (const address in data) {
    const events = data[address].events;
    for (let i = 0; i < events.length; i++) {
      const value = events[i].value;
      sum += parseFloat(value.usd_value);
    }
  }
  return sum;
}

export function errorHandler(error: unknown): void {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");
  if (axios.isAxiosError(error)) {
    const response = error.response;
    const request = error.request;

    if (error.code === "ERR_NETWORK") {
      console.log("Network connection problems..");
    } else if (error.code === "ERR_CANCELED") {
      console.log("Connection canceled..");
    }
    if (response) {
      const statusCode = response.status;
      if (statusCode === 404) {
        console.log(
          "The requested resource does not exist or has been deleted"
        );
      }
    } else if (request) {
      console.log("The request was made but no response was received");
    }
  }
  //Something happened in setting up the request and triggered an Error
  console.error(error);
}

export function percentageOfUserAsset(usd: string, totalSum: number): number {
  const usd_value = Number(usd);

  const percentage = (usd_value * 100) / totalSum;
  //we can round off to some decimal points
  return percentage;
}

const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
