import IODate from "../widget/io-date";
import IONumber from "../widget/io-number";
import IOPanel from "../widget/io-panel";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import type { Payment } from "./objects-patient";

export default function PaymentElement(props: {
  file: Payment;
  closed: boolean;
  edit: boolean;
  onCreated: (file: Payment) => void;
  onDeleted: (file: Payment) => void;
  onUpdated: (file: Payment) => void;
}): React.ReactNode {
  return (
    <IOPanel<Payment>
      {...props}
      key={`payment.${props.file.id}`}
      type="payment"
      file={props.file}
      closed={props.closed}
      apiRootUrl="fiche/payment"
      header={
        <>
          <span className="payment_amount">{props.file.amount}&nbsp;৳</span>
        </>
      }
      restrictedTo="dev"
      canBeLocked={true}
      canBeDeleted={true}
    >
      <Panel fixed={true} header="Information">
        <IODate name="date" value={props.file.date} />
        <IONumber name="amount" value={props.file.amount} />
        <IOText name="comments" value={props.file.comments} />
      </Panel>
    </IOPanel>
  );
}
