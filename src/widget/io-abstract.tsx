import React from "react";
import { defaultWidthBox } from "../styles/style-helpers";

export default abstract class IOAbstract<T> extends React.Component<
  {
    label: string;
    value: T;
    width?: number;
    edit?: boolean;
    required?: boolean;
  },
  {}
> {
  render() {
    const {
      label = "Label",
      value,
      edit = false,
      required = false
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "5px 10px",
          columnGap: "5%"
        }}
      >
        <label
          style={{
            width: "25%",
            textAlign: "right",
            fontSize: "smaller",
            color: "gray",
            textOverflow: "ellipsis"
          }}
          dangerouslySetInnerHTML={{ __html: label + (required ? "*" : "") }}
        ></label>
        <div
          style={{
            flexGrow: 1,
            textAlign: "left",
            color: "green"
          }}
        >
          {edit ? this.renderOutput(value) : this.renderInput(value, required)}
        </div>
      </div>
    );
  }

  getValue(): T {
    if (this.props.edit) {
      return this.getInputValue();
    }
    return this.props.value;
  }

  abstract renderOutput(value: T): React.ReactNode;
  abstract renderInput(value: T, required: boolean): React.ReactNode;
  abstract getInputValue(): T;
}
