import axios from "axios";
import type { AccountBalances, UserBalancesInUsd, dateString } from "@/types";

export function sumOfUserBalancesinUsd(
  data: Record<string, AccountBalances>
): UserBalancesInUsd {
  const result: UserBalancesInUsd = {};

  // Iterate over each user address in the data
  for (const address of Object.keys(data)) {
    const userBalances = data[address];
    let totalUsdValue = 0;

    // Iterate over each token balance for the current user
    for (const token of Object.values(userBalances)) {
      // Convert the usd_value string to a number and add it to the total
      totalUsdValue += parseFloat(token.usd_value);
    }

    result[address] = totalUsdValue;
  }

  return result;
}

export function sumOfAllUserBalancesinUsd(
  data: Record<string, AccountBalances>
): number {
  let totalUsdValue = 0;

  for (const address of Object.keys(data)) {
    const userBalances = data[address];
    for (const token of Object.values(userBalances)) {
      totalUsdValue += parseFloat(token.usd_value);
    }
  }

  return totalUsdValue;
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

const getFormat: dateString = (
  date,
  hideYear = false,
  preformattedDate = null,
  onlyDate = false
) => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (onlyDate) {
    return `${day} ${month} ${year}`;
  }

  let minutesString = `${minutes}`;
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutesString = `0${minutes}`;
  }

  if (preformattedDate) {
    // Today at 4:20
    return `${preformattedDate} at ${hours}:${minutesString}`;
  }

  if (hideYear) {
    return `${day} ${month} at ${hours}:${minutesString}`;
  }

  return `${day} ${month} ${year} at ${hours}:${minutesString}`;
};

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

export function formatDate(
  input: string | Date | number,
  dateOnly = false
): string {
  const date = input instanceof Date ? input : new Date(input);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);

  if (seconds < 0 || dateOnly) {
    return getFormat(date, false, null, true);
  }

  if (seconds < 5) {
    return `now`;
  }
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  if (isToday) {
    return getFormat(date, true, `Today`);
  }
  if (isYesterday) {
    return getFormat(date, true, `Yesterday`);
  }

  const isThisYear = today.getFullYear() === date.getFullYear();
  if (isThisYear) {
    return getFormat(date, true);
  }

  return getFormat(date);
}
