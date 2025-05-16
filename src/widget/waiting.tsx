export default function Waiting(props: { message?: string }) {
  return <div>Loading {props.message ?? ""}</div>;
}
