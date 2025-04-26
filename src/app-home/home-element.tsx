import { icons } from "../config";
import {
  REPORT_ACTIVITY,
  REPORT_CASH_REGISTER,
  REPORT_CONSULTATIONS,
  REPORT_FINANCIAL,
  REPORT_STATISTICAL,
  REPORT_SURGICAL,
  REPORT_SURGICAL_SUGGESTED
} from "../constants";
import { MenuItem } from "./blocs/menu-item";
import "./home-element.css";

export default function HomeElement() {
  return (
    <div id="home" className="reduce-width">
      <h1 id="page_home" className="text-center">
        <img src="/static/img/home.gif" />
        Home
      </h1>
      <div className="grid">
        <div>XPatientByReference</div>
        <MenuItem
          title="Create a reference"
          requires="folder.edit"
          versalIcon={icons.models.patient}
          toRoute="getRouteToCreateReference()"
        >
          The reference is auto-generated.
        </MenuItem>
        <MenuItem
          title="Search"
          requires="folder.read"
          versalIcon="/static/img/patientsSearch.gif"
          toRoute="/search"
        >
          Search a patient
        </MenuItem>
        <MenuItem
          title="Consultations of the day"
          requires="planning.execute"
          versalIcon="/static/img/consultOfDay.gif"
          toRoute={`/reports/${REPORT_CONSULTATIONS}`}
        >
          Have a list of the consultations of the day
        </MenuItem>
        <MenuItem
          title="Activity Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_ACTIVITY}`}
        >
          If you want to know your activity, choose this report.
        </MenuItem>
        <MenuItem
          title="Statistical Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_STATISTICAL}`}
        >
          If you want to know the activity of the SARPV CDC on a period.
        </MenuItem>
        <MenuItem
          title="Cash Register Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_CASH_REGISTER}`}
        >
          If you want to know what is paid according to what is asked.
        </MenuItem>
        <MenuItem
          title="Surgical Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_SURGICAL}`}
        >
          Follow up of the surgical activity of the period.
        </MenuItem>
        <MenuItem
          title="Surgical Suggestions Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_SURGICAL_SUGGESTED}`}
        >
          List the suggestions for surgeries.
        </MenuItem>
        <MenuItem
          title="Financial Report"
          requires="reports.execute"
          versalIcon="/static/img/reports.gif"
          toRoute={`/reports/${REPORT_FINANCIAL}`}
        >
          Follow up of the finances.
        </MenuItem>
        <MenuItem
          title="Prices"
          requires="price.edit"
          versalIcon="/static/img/prices.png"
          toRoute="/prices"
        >
          Manage the various prices
        </MenuItem>
        <MenuItem
          title="Users management"
          requires="users.manage"
          versalIcon="/static/img/users.png"
          toRoute="/users"
        >
          Manage the users of Cryptomedic.
        </MenuItem>
        <MenuItem
          title="View matrix"
          requires="admin.securityMatrix"
          versalIcon="/static/img/matrix.png"
          toLocation="/api/admin/securityMatrix"
        >
          List of rights
        </MenuItem>
      </div>
    </div>
  );
}
