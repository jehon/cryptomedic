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
    if (!edit && !value) {
      return null;
    }

    return (
      <div className={"io" + note ? " note" : ""}>
        <label
          dangerouslySetInnerHTML={{ __html: label + (required ? "*" : "") }}
        ></label>
        <div>
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
