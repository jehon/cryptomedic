import { useState } from "react";
import Price from "../business/price";
import { getPriceCategories } from "../config";
import { getList, getSession } from "../utils/session";
import { roundTo, string2number } from "../utils/strings";
import ActionButton from "../widget/action-button";
import ButtonsGroup from "../widget/buttons-group";
import { Modes } from "../widget/io-abstract";
import IODate from "../widget/io-date";
import IOFunction from "../widget/io-function";
import IOHidden from "../widget/io-hidden";
import IOList from "../widget/io-list";
import IONumber from "../widget/io-number";
import IOString from "../widget/io-string";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import "./bill-element.css";
import FilePanel from "./blocs/file-panel";
import IOBillLine, { type BillLine } from "./blocs/io-bill-line";
import type { Bill } from "./objects";
import {
  patientRelatedPropsGenerator,
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

/*
  TODO:

  <div ng-if='errors.consultPhisioAndDoctor'>
    <div class='alert alert-danger'>Error: you could not bill "physio" and "doctor" together!</div>
  </div>
  <div ng-if='errors.homeVisitAndGiveAppointment'>
    <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
  </div>
  <div ng-if='errors.dateInTheFuture'>
    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
  </div>
*/

export default function BillElement(
  props: PatientRelatedElementGeneratorProps<Bill>
): React.ReactNode {
  /** *************************
   *
   * Calculate the price_id
   *
   */
  const prices = getSession()?.prices;

  const [price, setPrice] = useState<Price | undefined>(
    prices[props.file.price_id]
  );
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
    .filter((key) => getPriceCategories().includes(key.split("_")[0]))
    .map(
      (key) =>
        ({
          key,
          value: string2number((props.file as Record<string, any>)[key], 0),
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
    family_salary: props.file.sl_family_salary,
    number_of_household_members: props.file.sl_number_of_household_members
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
  const totalPaid = roundTo(
    Array.isArray(props.file.payment)
      ? props.file.payment.map((p) => p.amount).reduce((acc, v) => acc + v, 0)
      : 0,
    0
  );

  /** *************************
   *
   * Render
   *
   */
  return (
    <FilePanel<Bill>
      key={`bill.${props.file.id}`}
      type="bill"
      file={props.file}
      {...patientRelatedPropsGenerator({
        ...props,
        type: "bill"
      })}
      selfPath={`/patient/${props.patient.id}/bill/${props.file.id ?? "add"}`}
      apiRootUrl={`fiche/bill`} // No leading slash!
      canBeDeleted={
        Array.isArray(props.file.payment)
          ? props.file.payment.length == 0
          : true
      }
      canBeLocked={true}
      footer={
        props.mode == Modes.output &&
        props.file.id &&
        price && (
          <Panel
            fixed
            label="Payments"
            testid={`bill.${props.file.id}.payments`}
          >
            <ButtonsGroup>
              <ActionButton
                style="Add"
                linkTo={`#/folder/${props.patient.id}/file/Bill/${props.file.id}`}
              />
              <ActionButton
                style="Edit"
                linkTo={`#/folder/${props.patient.id}/file/Bill/${props.file.id}`}
              />
            </ButtonsGroup>
            {Array.isArray(props.file.payment) &&
            props.file.payment.length == 0 ? (
              <div>No payment received</div>
            ) : (
              props.file.payment.map((payment) => (
                <div
                  key={`payment.${payment.id}`}
                  className="payment-line"
                  data-testid={`payment.${payment.id}`}
                >
                  <IODate value={payment.date} noLabel />
                  <IONumber value={payment.amount} noLabel />
                  <IOString value={payment.comments} noLabel />
                </div>
              ))
            )}
          </Panel>
        )
      }
      header={
        <>
          <span>total: {props.file.total_real}</span>
          <span>paid: {totalPaid}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Information">
          <input
            type="hidden"
            name="patient_id"
            defaultValue={props.patient.id}
          />
          <IODate
            name="date"
            value={props.file.date}
            onChange={(value) => selectPrice(value)}
          />
          {price && (
            <>
              <IOList
                name="examiner"
                value={props.file.examiner as string}
                list={getList("Examiners")}
              />
              <IOList
                name="center"
                value={props.file.center as string}
                list={getList("Centers")}
              />{" "}
            </>
          )}
        </Panel>
        {price && (
          <Panel fixed label="Totals">
            <IONumber
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
            <IONumber
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
            <IOHidden name="social_level" value={socialLevel} />
            <IOHidden label="Percentage" value={percentageAsked * 100} />
            <IOHidden
              name="total_real"
              label="Raw Calculated Total"
              value={getTotal()}
            />
            <IOHidden
              name="total_asked"
              label="Price asked"
              value={priceAsked}
            />
            <IOFunction
              label="Payments Received (see below)"
              value={() => totalPaid}
            />
          </Panel>
        )}
      </TwoColumns>
      {price ? (
        <Panel fixed label="Bill Lines">
          {items.map((line) => (
            <IOBillLine
              value={line}
              key={line.key}
              onChange={(bl) => updateTotal(bl)}
            />
          ))}
        </Panel>
      ) : (
        <div className="alert alert-warning">Please select a date first</div>
      )}
    </FilePanel>
  );
}
