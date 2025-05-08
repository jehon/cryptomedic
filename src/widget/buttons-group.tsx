export default function ButtonsGroup({
  children
}: {
  children: React.ReactNode;
}) {
  // https://getbootstrap.com/docs/4.0/components/button-group/
  return (
    <div className="nav justify-content-end">
      <div className="buttons btn-group" role="group">
        {children}
      </div>
    </div>
  );
}
