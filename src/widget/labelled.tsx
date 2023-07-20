import React from "react";

export default function Labelled({
  label,
  required = false,
  children = null
}: {
  label: string;
  required?: boolean;
  children?: any;
}): React.ReactNode {
  return (
    <div className="container">
      <div className="row">
        <label className="control-label col-xs-12 col-md-2">
          <span dangerouslySetInnerHTML={{ __html: label }}></span>
          {required ? <span className="required">*</span> : null}
        </label>
        <div className="col-xs-12 col-md-10">{children}</div>
      </div>
    </div>
  );
}
