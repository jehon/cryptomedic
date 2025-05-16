import FilePanel from "./blocs/file-panel";
import type { Payment } from "./objects";
import type { RelatedElementGeneratorProps } from "./patient-related-element-generator";

export default function PaymentElement(
  props: RelatedElementGeneratorProps<Payment>
): React.ReactNode {
  return (
    <FilePanel
      key={`payment.${props.file.id}`}
      type="payment"
      file={props.file}
      selfPath={`/patient/${props.patient.id}/bill/${props.file.id}/payment/${props.file.id}`}
      apiRootUrl="fiche/payment"
      header={
        <>
          {props.file.date}
          {props.file.amount}
          {props.file.comments}
        </>
      }
      canBeLocked={true}
      canBeDeleted={true}
      onCreated={() => {}}
      onUpdated={() => {}}
      onDeleted={() => {}}
    >
      {props.file.date}
      {props.file.amount}
      {props.file.comments}
    </FilePanel>
  );
}
