import React from "react";

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
      width = 1,
      edit = false,
      required = false
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          // Todo: handle gap
          width: `calc( 
              min(
                300px,
                100%,
                ${width * 100}% - 20px / 2
              )
            )`
          // maxWidth: "min(100%, 400px)"
        }}
      >
        <label
          style={{
            minWidth: "30%",
            maxWidth: "100%",
            textAlign: "left",
            fontSize: "smaller",
            color: "gray"
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: label }}></span>
          {required ? <span className="required">*</span> : null}
        </label>
        <div
          style={{
            minWidth: "60%",
            maxWidth: "100%",
            textAlign: "right",
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
