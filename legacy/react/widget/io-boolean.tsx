import React from "react";
import { Optional } from "../utils/generic-types";
import { ImgBooleanFalse, ImgBooleanTrue } from "./images";
import IOAbstract, { IOParams } from "./io-abstract";

export type StringBoolean = string | number;

export default function IOBoolean(
  options: IOParams<Optional<StringBoolean | boolean>>
) {
  return IOAbstract(options, {
    renderOutput: (value) => (value ? ImgBooleanTrue() : ImgBooleanFalse()),
    renderInput: (value) => (
      <>
        <div className="align">
          <input
            className="form-control"
            name={options.name}
            defaultChecked={value === true || value === 1}
            value="1"
            onBlur={(evt) => options.onChange && options.onChange(true)}
            type="radio"
          />
          <span>Yes</span>
        </div>
        <div className="align">
          <input
            className="form-control"
            name={options.name}
            defaultChecked={value === false || value === 0}
            value="0"
            onBlur={(evt) => options.onChange && options.onChange(false)}
            type="radio"
          />
          <span>No</span>
        </div>
        {!options.required && (
          <div className="align">
            <input
              className="form-control"
              name={options.name}
              defaultChecked={value === null}
              value=""
              onBlur={(evt) => options.onChange && options.onChange(false)}
              type="radio"
            />
            <span>Unknown</span>
          </div>
        )}
      </>
    )
  });
}
