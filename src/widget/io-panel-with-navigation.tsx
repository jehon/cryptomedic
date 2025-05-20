import type { Pojo } from "../app-patient/objects-patient";
import { type BusinessType } from "../config";
import IOPanel from "./io-panel";

export default function IOPanelWithNavigation<T extends Pojo>(props: {
  selfPath?: string; // Optional: for Payments, we don't want to update the URL
  apiRootUrl: string;
  type: BusinessType;
  file: T;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  edit?: boolean;
  canBeLocked: boolean;
  canBeDeleted: boolean;
  onCreated: (file: T) => void;
  onUpdated: (file: T) => void;
  onDeleted: (file: T) => void;
}): React.ReactNode {
  return (
    <IOPanel<T>
      {...props}
      onEdit={() => {}}
      onCreated={(file: T) => {
        props.onCreated(file);
      }}
      onUpdated={(file: T) => {
        props.onUpdated(file);
      }}
      onDeleted={(file: T) => {
        props.onDeleted(file);
      }}
    >
      {props.children}
    </IOPanel>
  );
}
