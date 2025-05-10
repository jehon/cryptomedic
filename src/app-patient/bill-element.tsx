import React, { useState } from "react";
import Bill from "../business/bill";

import Price from "../business/price";
import { getList } from "../utils/config";
import { getSession } from "../utils/session";
import { string2number } from "../utils/strings";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import "./bill-element.css";
import IOBillLine, { type BillLine } from "./blocs/io-bill-line";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function BillElement({
  file,
  props
}: {
  file: Bill;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  /** *************************
   *
   * Calculate the price_id
   *
   */
  const prices = getSession()?.prices;

  const [price, setPrice] = useState<Price | undefined>(prices[file.price_id]);
  const selectPrice = (date: string | Date) => {
    if (!date || !prices) {
      setPrice(undefined);
      return;
    }

    if (date instanceof Date) {
      date = date.toISOString().split("T")[0];
    }

    let price_id = "";
    for (const i in prices) {
      const p = prices[i];
      if (
        (!p["date_from"] || p["date_from"] <= date) &&
        (!p["date_to"] || p["date_to"] > date)
      ) {
        price_id = i;
      }
    }
    if (price_id == "") {
      throw new Error("Price Id not set");
    }
    setPrice(prices[price_id]);
  };

  const items = Object.keys((price ?? {}) as Record<string, any>)
    .sort()
    .filter((key) => Price.getCategories().includes(key.split("_")[0]))
    .map(
      (key) =>
        ({
          key,
          value: string2number((file as Record<string, any>)[key]),
          price: price?.[key] ?? 0
        }) as BillLine
    )
    .filter((line) => line.price > 0);

  /** *************************
   *
   * Calculate the social level
   *
   */
  const [socialLevelParams, setSocialLevelParams] = useState({
    family_salary: file.sl_family_salary,
    number_of_household_members: file.sl_number_of_household_members
  });

  const rationSalary: number = Math.ceil(
    socialLevelParams.family_salary /
      socialLevelParams.number_of_household_members
  );

  let socialLevel = 4;
  /**
     From TC:
     Level 0 is when the familial ration is                            FR <= social_level_threshold_1
     Level 1 is when the familial ration is social_level_threshold_1 < FR <= social_level_threshold_2
     Level 2 is when the familial ration is social_level_threshold_2 < FR <= social_level_threshold_3
     Level 3 is when the familial ration is social_level_threshold_3 < FR <= social_level_threshold_4
     Level 4 is when the familial ration is social_level_threshold_4 < FR
     */

  if (price && isFinite(rationSalary)) {
    // This work thanks to the order of the statements
    if (rationSalary <= price.social_level_threshold_4) {
      socialLevel = 3;
    }

    if (rationSalary <= price.social_level_threshold_3) {
      socialLevel = 2;
    }

    if (rationSalary <= price.social_level_threshold_2) {
      socialLevel = 1;
    }

    if (rationSalary <= price.social_level_threshold_1) {
      socialLevel = 0;
    }
  }

  const percentageAsked =
    price?.[`social_level_percentage_${socialLevel}`] ?? 1;

  /** *************************
   *
   * Calculate the total and various amounts
   *
   */
  const [currentBill, setCurrentBill] = useState(
    items
      .filter((value) => value.value > 0)
      .reduce(
        (acc, value) => acc.set(value.key, value),
        new Map<string, BillLine>()
      )
  );

  const getTotal = () =>
    Array.from(currentBill)
      .map((rec) => rec[1])
      .reduce((acc, val) => (acc += val.value * val.price), 0);

  const updateTotal = (value: BillLine) => {
    const newBill = new Map(currentBill);
    newBill.set(value.key, value);
    setCurrentBill(newBill);
  };

  const priceAsked = Math.round(getTotal() * percentageAsked);

  /** *************************
   *
   * Render
   *
   */
  return patientRelatedElementGenerator<Bill>(file, props, {
    header: (
      <>
        <span>total: {file.total_real}</span>
        <span>
          paid:{" "}
          {file
            .getPayments()
            .map((p) => p.amount)
            .reduce((acc, v) => acc + v, 0)}
        </span>
      </>
    ),
    body: (
      <>
        <TwoColumns>
          <Panel fixed label="Information">
            <IO.Date
              name="date"
              value={file.date}
              onChange={(value) => selectPrice(value)}
            />
            <IO.List
              name="examiner"
              value={file.examiner as string}
              list={getList("Examiners")}
            />
            <IO.List
              name="center"
              value={file.center as string}
              list={getList("Centers")}
            />
          </Panel>
          <Panel fixed label="Totals">
            <IO.Number
              name="sl_family_salary"
              label="Family Salary"
              value={socialLevelParams.family_salary}
              onChange={(value) =>
                setSocialLevelParams({
                  ...socialLevelParams,
                  family_salary: value
                })
              }
            />
            <IO.Number
              name="sl_number_of_household_members"
              label="Number of Household Members"
              value={socialLevelParams.number_of_household_members}
              htmlProps={{ max: 10 }}
              onChange={(value) =>
                setSocialLevelParams({
                  ...socialLevelParams,
                  number_of_household_members: value
                })
              }
            />
            <IO.Hidden name="social_level" value={socialLevel} />
            <IO.Hidden label="Percentage" value={percentageAsked * 100} />
            <IO.Hidden
              name="total_real"
              label="Raw Calculated Total"
              value={getTotal()}
            />
            <IO.Hidden
              name="total_asked"
              label="Price asked"
              value={priceAsked}
            />
          </Panel>
        </TwoColumns>
        {price && (
          <Panel fixed label="Bill Lines">
            {items.map((line) => (
              <IOBillLine
                value={line}
                key={line.key}
                onChange={(bl) => updateTotal(bl)}
              />
            ))}
          </Panel>
        )}
      </>
    )
  });
}
