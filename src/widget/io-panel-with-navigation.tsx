import { useNavigate } from "react-router-dom";
import type { Pojo } from "../app-patient/_objects";
import { type BusinessType } from "../config";
import { routeParent } from "../utils/routing";
import IOPanel from "./io-panel";

export default function IOPanelWithNavigation<T extends Pojo>(props: {
  basePath: string; // blablabla/type/id or blablabla/type/add
  apiRootUrl: string;
  type: BusinessType;
  file: T;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  edit?: boolean;
  restrictedTo: string;
  canBeLocked: boolean;
  canBeDeleted: boolean;
  onCreated: (file: T) => void;
  onUpdated: (file: T) => void;
  onDeleted: (file: T) => void;
}): React.ReactNode {
  const navigate = useNavigate();
  const typeRootPath = routeParent(props.basePath);

  return (
    <IOPanel<T>
      {...props}
      onEdit={(edit: boolean) => {
        if (props.file.id) {
          // Already got the File
          if (edit) {
            navigate(`${typeRootPath}/${props.file.id}/edit`);
          } else {
            navigate(`${typeRootPath}/${props.file.id}`);
          }
        } else {
          // Add mode
          if (edit) {
            navigate(`${typeRootPath}/add`);
          } else {
            navigate(routeParent(typeRootPath ?? "", 1));
          }
        }
      }}
      onCreated={(file: T) => {
        navigate(`${typeRootPath}/${file.id}`);
        props.onCreated(file);
      }}
    >
      {props.children}
    </IOPanel>
  );
}
