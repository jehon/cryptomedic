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
        className="io-line"
        // width will be  --min-width < w=width % -gap < 100%
        //  --min-width = minimum for it to be visible
        //  100% = the whole larger
        style={{
          width: `calc( 
              min(
                100%,
                max(
                  var(--min-width),
                  ${width * 100}% - var(--column-gap) / 2
                )
              )
            )`
        }}
      >
        <label>
          <span dangerouslySetInnerHTML={{ __html: label }}></span>
          {required ? <span className="required">*</span> : null}
        </label>
        {edit ? this.renderOutput(value) : this.renderInput(value, required)}
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
