import {
  sumOfAllUserBalancesinUsd,
  percentageOfUserAsset,
  formatDate,
  sumofUsdValues,
} from "@/helpers";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

describe("sumOfAllUserBalancesinUsd", () => {
  it("Calculates and returns the sum of all user balances in USD", () => {
    const data = {
      userJohn: {
        event1: {
          amount: "100.00",
          usd_value: "10.00",
        },
        event2: {
          amount: "200.00",
          usd_value: "20.00",
        },
      },
      userPhilip: {
        event1: {
          amount: "50.00",
          usd_value: "5.00",
        },
        event2: {
          amount: "150.00",
          usd_value: "15.00",
        },
      },
    };

    mount({
      template: "<div></div>",
      mounted() {
        const result = sumOfAllUserBalancesinUsd(data);
        expect(result).toBe(50.0);
      },
    });
  });
});

describe("percentageOfUserAsset", () => {
  it("Calculates and returns the percentage of user asset", () => {
    const usd = "10.00";
    const totalSum = 50.0;

    const percentage = percentageOfUserAsset(usd, totalSum);
    expect(percentage).toBe(20.0);
  });
});

describe("formatDate", () => {
  it("Returns human readable date format", () => {
    const formattedDate = formatDate(1580940637);
    expect(formattedDate).toBe("Feb 6, 2020, 1:10:37");
  });
});

describe("Calculates the sum of usd_values in  user events", () => {
  it("Calculates and retunrs the the sum of usd_values", () => {
    const data = {
      address1: {
        events: [
          { value: { usd_value: "10.00" } },
          { value: { usd_value: "5.00" } },
        ],
      },
      address2: {
        events: [
          { value: { usd_value: "2.50" } },
          { value: { usd_value: "7.50" } },
        ],
      },
    };
    const result = sumofUsdValues(data);
    expect(result).toBe(25);
  });

  it("returns 0 when no events are provided", () => {
    const data = {
      address1: {
        events: [],
      },
      address2: {
        events: [],
      },
    };
    const result = sumofUsdValues(data);
    expect(result).toBe(0);
  });

  it("returns 0 when no data is provided", () => {
    const data = {};
    const result = sumofUsdValues(data);
    expect(result).toBe(0);
  });
});
