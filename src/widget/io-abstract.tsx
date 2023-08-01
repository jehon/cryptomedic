import React from "react";

const minWidth = "300px";

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
        className="io-line"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          // width will be  --min-width < w=width % -gap < 100%
          //  --min-width = minimum for it to be visible
          //  100% = the whole larger
          width: `calc( 
              min(
                100%,
                max(
                  ${minWidth},
                  ${width * 100}% - var(--column-gap) / 2
                )
              )
            )`
        }}
      >
        <label
          style={{
            color: "gray",
            textAlign: "left",
            fontSize: "smaller"
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: label }}></span>
          {required ? <span className="required">*</span> : null}
        </label>
        <div
          style={{
            width: "100%",
            color: "green",
            textAlign: "right"
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
