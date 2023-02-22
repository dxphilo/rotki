import {
  sumOfAllUserBalancesinUsd,
  percentageOfUserAsset,
  formatDate,
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
  it("Return human readable date format", () => {
    const formattedDate = formatDate(1580940637);
    expect(formattedDate).toBe("Feb 6, 2020, 1:10:37");
  });
});
