import "./two-columns.css";

export default function TwoColumns(props: {
  children?: React.ReactNode;
}): React.ReactNode {
  return <div className="two-columns">{props.children}</div>;
}
