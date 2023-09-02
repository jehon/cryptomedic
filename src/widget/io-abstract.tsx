import React from "react";

export default abstract class IOAbstract<T, Extra = {}> extends React.Component<
  {
    label: string;
    value: T;
    width?: number;
    edit?: boolean;
    required?: boolean;
    note?: boolean;
  } & Extra,
  {}
> {
  render() {
    const {
      label = "Label",
      value,
      edit = false,
      required = false,
      note = false
    } = this.props;

    // All execpt read without value
    const empty = !edit && !value;

    return (
      <div
        style={{
          display: !empty ? "flex" : "none",
          flexDirection: "row",
          padding: "5px 10px",
          columnGap: "5%",
          ...(note ? { fontSize: "smaller" } : {})
        }}
        data-empty={empty ? "true" : ""}
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
          data-function="label"
        ></label>
        <div
          style={{
            flexGrow: 1,
            textAlign: "left",
            color: "green"
          }}
          data-function="value"
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
  renderInput(value: T, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): T {
    return this.props.value;
  }
}
