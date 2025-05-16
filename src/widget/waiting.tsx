export default function Waiting(props: { message?: string }) {
  return (
    <p className="text-center alert alert-warning">
      <img src="/static/img/waiting.gif" /> Loading {props.message ?? ""}...
    </p>
  );
}
